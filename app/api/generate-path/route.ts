import { OpenAI } from 'openai';
import { getLearningPathsCollection } from '@/lib/mongodb';
import { generateMockLearningPath } from '@/lib/mockData';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build',
}); export interface Module {
    title: string;
    description: string;
    lessons: Lesson[];
}

export interface Lesson {
    title: string;
    summary: string;
    duration: string;
}

export interface LearningPath {
    _id?: string;
    topic: string;
    title: string;
    description: string;
    modules: Module[];
    createdAt: Date;
    userId?: string;
}

export async function POST(request: NextRequest) {
    try {
        const { topic } = await request.json();

        if (!topic || topic.trim().length === 0) {
            return NextResponse.json(
                { error: 'Topic is required' },
                { status: 400 }
            );
        }

        let pathData;
        const hasValidApiKey = process.env.OPENAI_API_KEY &&
            process.env.OPENAI_API_KEY !== 'dummy-key-for-build' &&
            !process.env.OPENAI_API_KEY.startsWith('sk-test');

        if (hasValidApiKey) {
            try {
                // Call OpenAI to generate learning path
                const prompt = `You are an expert educational content creator. Generate a comprehensive structured learning path for the topic: "${topic}".

Return ONLY a valid JSON object (no markdown, no extra text) with this structure:
{
  "title": "Brief title for the learning path",
  "description": "2-3 sentence description of what the learner will achieve",
  "modules": [
    {
      "title": "Module name",
      "description": "What this module covers",
      "lessons": [
        {
          "title": "Lesson name",
          "summary": "Brief 2-3 sentence summary of the lesson content",
          "duration": "15-30 mins" (estimated time)
        }
      ]
    }
  ]
}

Requirements:
- Create 4-6 modules total
- Start from basics and progress to advanced
- Each module should have 3-5 lessons
- Lesson summaries should be concise and actionable
- Include realistic time durations for each lesson`;

                const message = await openai.chat.completions.create({
                    model: 'gpt-4',
                    messages: [
                        {
                            role: 'user',
                            content: prompt,
                        },
                    ],
                    temperature: 0.7,
                    max_tokens: 2000,
                });

                const content = message.choices[0]?.message?.content;
                if (!content) {
                    return NextResponse.json(
                        { error: 'Failed to generate learning path' },
                        { status: 500 }
                    );
                }

                pathData = JSON.parse(content);
            } catch (apiError: any) {
                console.warn('OpenAI API error, falling back to mock data:', apiError.message);
                // Fall back to mock data if API fails
                pathData = generateMockLearningPath(topic);
            }
        } else {
            // Use mock data for demonstration
            console.log('Using mock data for demo (configure OPENAI_API_KEY for real AI generation)');
            pathData = generateMockLearningPath(topic);
        }

        // Try to store in MongoDB if configured
        try {
            const collection = await getLearningPathsCollection();
            const learningPathDoc = {
                topic,
                title: pathData.title,
                description: pathData.description,
                modules: pathData.modules,
                createdAt: new Date(),
            };

            const result = await collection.insertOne(learningPathDoc);

            return NextResponse.json(
                {
                    success: true,
                    path: {
                        _id: result.insertedId,
                        ...learningPathDoc,
                    },
                    demo: !hasValidApiKey,
                },
                { status: 201 }
            );
        } catch (dbError) {
            console.warn('MongoDB not available, returning mock data only:', dbError);
            // Return mock data even if MongoDB fails
            return NextResponse.json(
                {
                    success: true,
                    path: {
                        topic,
                        ...pathData,
                        createdAt: new Date(),
                    },
                    demo: true,
                    warning: 'Data not persisted: MongoDB not configured',
                },
                { status: 201 }
            );
        }
    } catch (error) {
        console.error('Error generating learning path:', error);

        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to generate learning path' },
            { status: 500 }
        );
    }
}
