import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import LearningPath from '@/models/LearningPath';

/**
 * GET /api/learnpath/history
 * Retrieves all learning paths from the database, sorted by creation date (newest first)
 *
 * @returns JSON response with all learning paths or error
 */
export async function GET() {
  try {
    // Connect to database
    await connectDB();

    // Fetch all learning paths, sorted by creation date (newest first)
    const learningPaths = await LearningPath.find({})
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return NextResponse.json(
      {
        success: true,
        count: learningPaths.length,
        data: learningPaths,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch learning path history',
        message: error instanceof Error ? error.message : 'Database error',
      },
      { status: 500 }
    );
  }
}
