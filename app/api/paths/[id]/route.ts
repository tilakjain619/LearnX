import { getLearningPathsCollection } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const collection = await getLearningPathsCollection();
        const path = await collection.findOne({
            _id: new ObjectId(id),
        });

        if (!path) {
            return NextResponse.json(
                { error: 'Learning path not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ path }, { status: 200 });
    } catch (error) {
        console.error('Error fetching path:', error);
        return NextResponse.json(
            { error: 'Failed to fetch learning path' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const collection = await getLearningPathsCollection();
        const result = await collection.deleteOne({
            _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: 'Learning path not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Path deleted' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting path:', error);
        return NextResponse.json(
            { error: 'Failed to delete learning path' },
            { status: 500 }
        );
    }
}
