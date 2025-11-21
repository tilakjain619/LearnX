import { getLearningPathsCollection } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const collection = await getLearningPathsCollection();
        const paths = await collection
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({ paths }, { status: 200 });
    } catch (error) {
        console.error('Error fetching paths:', error);
        return NextResponse.json(
            { error: 'Failed to fetch learning paths' },
            { status: 500 }
        );
    }
}
