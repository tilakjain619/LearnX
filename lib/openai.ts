import OpenAI from 'openai';
import { z } from 'zod';

/**
 * OpenAI client configuration
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Zod schemas for validation of AI response
 */
const LessonSchema = z.object({
  title: z.string().min(1, 'Lesson title is required'),
  summary: z.string().min(10, 'Lesson summary must be at least 10 characters'),
});

const ModuleSchema = z.object({
  title: z.string().min(1, 'Module title is required'),
  lessons: z
    .array(LessonSchema)
    .min(3, 'Each module must have at least 3 lessons')
    .max(5, 'Each module must have at most 5 lessons'),
});

const LearningPathResponseSchema = z.object({
  modules: z
    .array(ModuleSchema)
    .min(4, 'Learning path must have at least 4 modules')
    .max(7, 'Learning path must have at most 7 modules'),
});

export type LearningPathResponse = z.infer<typeof LearningPathResponseSchema>;

/**
 * Generates a structured learning path using OpenAI
 * @param topic - The topic to generate a learning path for
 * @returns Promise<LearningPathResponse>
 * @throws Error if API call fails or response is invalid
 */
export async function generateLearningPath(
  topic: string
): Promise<LearningPathResponse> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }

  const prompt = `You are an expert educational curriculum designer. Create a comprehensive learning path for the topic: "${topic}".

Requirements:
- Generate 4-7 modules, ordered from basic to advanced
- Each module should have a clear title
- Each module must contain exactly 3-5 lessons
- Each lesson must have a title and a 1-2 sentence summary
- Structure the content progressively, building on previous concepts
- Make it practical and actionable

Return ONLY a valid JSON object with this exact structure:
{
  "modules": [
    {
      "title": "Module Title",
      "lessons": [
        {
          "title": "Lesson Title",
          "summary": "A 1-2 sentence summary of what this lesson covers."
        }
      ]
    }
  ]
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert educational curriculum designer. You respond only with valid JSON objects, no additional text.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const responseText = completion.choices[0]?.message?.content;

    if (!responseText) {
      throw new Error('Empty response from OpenAI');
    }

    // Parse and validate the JSON response
    const parsedResponse = JSON.parse(responseText);
    const validatedResponse = LearningPathResponseSchema.parse(parsedResponse);

    return validatedResponse;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `AI response validation failed: ${error.issues.map((e) => e.message).join(', ')}`
      );
    }

    if (error instanceof SyntaxError) {
      throw new Error('AI returned invalid JSON');
    }

    if (error instanceof Error) {
      throw new Error(`OpenAI API error: ${error.message}`);
    }

    throw new Error('Unknown error generating learning path');
  }
}

/**
 * Refines an existing learning path based on user feedback
 * @param topic - The original topic
 * @param refinement - User's refinement instructions
 * @param previousPath - The previous learning path to refine
 * @returns Promise<LearningPathResponse>
 * @throws Error if API call fails or response is invalid
 */
export async function generateRefinedLearningPath(
  topic: string,
  refinement: string,
  previousPath: { modules: Array<{ title: string; lessons: Array<{ title: string; summary: string }> }> }
): Promise<LearningPathResponse> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }

  const prompt = `You are an expert educational curriculum designer. You previously created a learning path for "${topic}".

The user wants to refine it with this instruction: "${refinement}"

Previous learning path:
${JSON.stringify(previousPath, null, 2)}

Create an improved learning path that addresses the user's refinement request while maintaining:
- 4-7 modules, ordered from basic to advanced
- Each module with 3-5 lessons
- Each lesson with a title and 1-2 sentence summary
- Progressive structure building on concepts
- Practical and actionable content

Apply the refinement thoughtfully - this may mean:
- Adding new modules or lessons
- Reorganizing content
- Changing the focus or difficulty level
- Adding more examples or practical elements
- Whatever else the user requested

Return ONLY a valid JSON object with this exact structure:
{
  "modules": [
    {
      "title": "Module Title",
      "lessons": [
        {
          "title": "Lesson Title",
          "summary": "A 1-2 sentence summary of what this lesson covers."
        }
      ]
    }
  ]
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert educational curriculum designer. You respond only with valid JSON objects, no additional text. You excel at refining and improving learning paths based on user feedback.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const responseText = completion.choices[0]?.message?.content;

    if (!responseText) {
      throw new Error('Empty response from OpenAI');
    }

    // Parse and validate the JSON response
    const parsedResponse = JSON.parse(responseText);
    const validatedResponse = LearningPathResponseSchema.parse(parsedResponse);

    return validatedResponse;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `AI response validation failed: ${error.issues.map((e) => e.message).join(', ')}`
      );
    }

    if (error instanceof SyntaxError) {
      throw new Error('AI returned invalid JSON');
    }

    if (error instanceof Error) {
      throw new Error(`OpenAI API error: ${error.message}`);
    }

    throw new Error('Unknown error refining learning path');
  }
}

export default openai;
