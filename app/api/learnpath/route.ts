import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import connectDB from '@/lib/mongodb';
import LearningPath from '@/models/LearningPath';
import { generateLearningPath as generateWithOpenAI } from '@/lib/openai';
import { generateLearningPath as generateWithMock, isMockMode } from '@/lib/mock-ai';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

/**
 * Request body validation schema
 */
const RequestSchema = z.object({
  topic: z
    .string()
    .min(1, 'Topic is required')
    .trim()
    .max(100, 'Topic must be less than 100 characters'),
});

/**
 * POST /api/learnpath
 * Generates a new AI-powered learning path and saves it to the database
 *
 * @param request - Next.js request object
 * @returns JSON response with the created learning path or error
 */
export async function POST(request: NextRequest) {
  try {
    // Check rate limit (10 requests per minute per IP)
    const clientId = getClientIdentifier(request);
    const rateLimitResult = checkRateLimit(clientId, {
      maxRequests: 10,
      windowMs: 60 * 1000, // 1 minute
    });

    if (!rateLimitResult.allowed) {
      const resetTime = new Date(rateLimitResult.resetTime).toISOString();
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded',
          message: `Too many requests. Please try again after ${resetTime}`,
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = RequestSchema.safeParse(body);

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

    const { topic } = validation.data;

    // Connect to database
    await connectDB();

    // Generate learning path using Mock AI or OpenAI based on environment
    let learningPathData;
    try {
      // Use mock data if USE_MOCK_AI is enabled, otherwise use OpenAI
      if (isMockMode()) {
        learningPathData = await generateWithMock(topic);
      } else {
        learningPathData = await generateWithOpenAI(topic);
      }
    } catch (aiError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to generate learning path',
          message:
            aiError instanceof Error
              ? aiError.message
              : 'AI service encountered an error',
        },
        { status: 500 }
      );
    }

    // Save to MongoDB
    try {
      const learningPath = new LearningPath({
        topic,
        modules: learningPathData.modules,
      });

      const savedLearningPath = await learningPath.save();

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
          error: 'Failed to save learning path to database',
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
