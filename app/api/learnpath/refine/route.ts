import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import connectDB from '@/lib/mongodb';
import LearningPath from '@/models/LearningPath';
import { generateRefinedLearningPath as refineWithOpenAI } from '@/lib/openai';
import { generateRefinedLearningPath as refineWithMock, isMockMode } from '@/lib/mock-ai';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

/**
 * Request body validation schema for refining learning paths
 */
const RefineRequestSchema = z.object({
  topic: z.string().min(1, 'Topic is required').trim(),
  refinement: z
    .string()
    .min(1, 'Refinement instruction is required')
    .max(500, 'Refinement instruction must be less than 500 characters')
    .trim(),
  previousPath: z.object({
    modules: z.array(
      z.object({
        title: z.string(),
        lessons: z.array(
          z.object({
            title: z.string(),
            summary: z.string(),
          })
        ),
      })
    ),
  }),
});

/**
 * POST /api/learnpath/refine
 * Refines an existing learning path based on user feedback
 *
 * @param request - Next.js request object
 * @returns JSON response with the refined learning path or error
 */
export async function POST(request: NextRequest) {
  try {
    // Check rate limit (5 requests per minute per IP - stricter for refinement)
    const clientId = getClientIdentifier(request);
    const rateLimitResult = checkRateLimit(clientId, {
      maxRequests: 5,
      windowMs: 60 * 1000, // 1 minute
    });

    if (!rateLimitResult.allowed) {
      const resetTime = new Date(rateLimitResult.resetTime).toISOString();
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded',
          message: `Too many refinement requests. Please try again after ${resetTime}`,
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = RefineRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: validation.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    const { topic, refinement, previousPath } = validation.data;

    // Connect to database
    await connectDB();

    // Generate refined learning path using Mock AI or OpenAI based on environment
    let refinedPathData;
    try {
      // Use mock data if USE_MOCK_AI is enabled, otherwise use OpenAI
      if (isMockMode()) {
        refinedPathData = await refineWithMock(
          topic,
          previousPath,
          refinement
        );
      } else {
        refinedPathData = await refineWithOpenAI(
          topic,
          refinement,
          previousPath
        );
      }
    } catch (aiError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to refine learning path',
          message:
            aiError instanceof Error
              ? aiError.message
              : 'AI service encountered an error',
        },
        { status: 500 }
      );
    }

    // Save refined path to MongoDB
    try {
      const refinedLearningPath = new LearningPath({
        topic,
        modules: refinedPathData.modules,
      });

      const savedLearningPath = await refinedLearningPath.save();

      return NextResponse.json(
        {
          success: true,
          data: savedLearningPath,
        },
        { status: 201 }
      );
    } catch (dbError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to save refined learning path to database',
          message:
            dbError instanceof Error ? dbError.message : 'Database error',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON in request body',
        },
        { status: 400 }
      );
    }

    // Handle all other errors
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
