import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import connectDB from '@/lib/mongodb';
import LearningPath from '@/models/LearningPath';
import { generateRefinedLearningPath as refineWithOpenAI } from '@/lib/openai';
import { generateRefinedLearningPath as refineWithMock, isMockMode } from '@/lib/mock-ai';

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
        console.log('🎭 Using MOCK AI for refinement - No API costs!');
        refinedPathData = await refineWithMock(
          topic,
          previousPath,
          refinement
        );
      } else {
        console.log('🤖 Using OpenAI API for refinement');
        refinedPathData = await refineWithOpenAI(
          topic,
          refinement,
          previousPath
        );
      }
    } catch (aiError) {
      console.error('AI refinement error:', aiError);
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
      console.error('Database error:', dbError);
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
    console.error('Unexpected error:', error);

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
