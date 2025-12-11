import { z } from 'zod';

/**
 * Zod schemas for validation (same as real AI services)
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
 * Mock learning path templates for different topics
 */
const mockTemplates: Record<string, LearningPathResponse> = {
  // Generic programming template
  programming: {
    modules: [
      {
        title: 'Introduction to Programming Fundamentals',
        lessons: [
          {
            title: 'Understanding Variables and Data Types',
            summary: 'Learn about different data types including integers, strings, booleans, and how to store data in variables. Understanding data types is crucial for writing efficient code.',
          },
          {
            title: 'Control Flow and Logic',
            summary: 'Master conditional statements (if/else) and loops (for/while) to control program execution. These are the building blocks of any programming logic.',
          },
          {
            title: 'Functions and Code Reusability',
            summary: 'Discover how to write reusable code with functions, parameters, and return values. Functions help organize code and make it more maintainable.',
          },
          {
            title: 'Debugging and Error Handling',
            summary: 'Learn essential debugging techniques and how to handle errors gracefully in your programs. Good error handling makes applications more robust.',
          },
        ],
      },
      {
        title: 'Data Structures and Algorithms',
        lessons: [
          {
            title: 'Arrays and Lists',
            summary: 'Understand how to work with ordered collections of data. Arrays and lists are fundamental data structures used in almost every program.',
          },
          {
            title: 'Hash Maps and Dictionaries',
            summary: 'Learn about key-value pair storage for fast data retrieval. Hash maps are essential for building efficient applications.',
          },
          {
            title: 'Basic Sorting and Searching',
            summary: 'Master common algorithms for organizing and finding data. These algorithms form the foundation of computer science.',
          },
          {
            title: 'Time and Space Complexity',
            summary: 'Understand Big O notation and how to analyze algorithm efficiency. This knowledge helps you write performant code.',
          },
        ],
      },
      {
        title: 'Object-Oriented Programming',
        lessons: [
          {
            title: 'Classes and Objects',
            summary: 'Learn how to create blueprints (classes) and instances (objects) to model real-world entities in code.',
          },
          {
            title: 'Inheritance and Polymorphism',
            summary: 'Understand code reuse through inheritance and how polymorphism enables flexible code design.',
          },
          {
            title: 'Encapsulation and Abstraction',
            summary: 'Master data hiding and interface design to create maintainable, secure applications.',
          },
          {
            title: 'Design Patterns Basics',
            summary: 'Introduction to common design patterns like Singleton, Factory, and Observer that solve recurring problems.',
          },
        ],
      },
      {
        title: 'Working with APIs and Databases',
        lessons: [
          {
            title: 'RESTful API Fundamentals',
            summary: 'Learn how to interact with web services using HTTP methods (GET, POST, PUT, DELETE) and understand API design.',
          },
          {
            title: 'Database Basics and SQL',
            summary: 'Understand relational databases and write SQL queries to store and retrieve data efficiently.',
          },
          {
            title: 'Authentication and Security',
            summary: 'Learn about securing applications with authentication, authorization, and protecting sensitive data.',
          },
          {
            title: 'Data Validation and Error Responses',
            summary: 'Master input validation and proper error handling in API interactions for robust applications.',
          },
        ],
      },
      {
        title: 'Building Real Projects',
        lessons: [
          {
            title: 'Project Planning and Architecture',
            summary: 'Learn how to plan software projects, break them into components, and design system architecture.',
          },
          {
            title: 'Version Control with Git',
            summary: 'Master Git for tracking changes, collaborating with others, and managing code versions effectively.',
          },
          {
            title: 'Testing and Quality Assurance',
            summary: 'Understand unit testing, integration testing, and how to write reliable, bug-free code.',
          },
          {
            title: 'Deployment and Production',
            summary: 'Learn how to deploy applications to production environments and maintain them effectively.',
          },
        ],
      },
    ],
  },
  
  // Web development template
  web: {
    modules: [
      {
        title: 'HTML and CSS Fundamentals',
        lessons: [
          {
            title: 'HTML Structure and Semantic Markup',
            summary: 'Learn how to structure web pages with HTML5 semantic elements for better accessibility and SEO.',
          },
          {
            title: 'CSS Styling and Layout',
            summary: 'Master CSS for styling elements, creating layouts with Flexbox and Grid, and making responsive designs.',
          },
          {
            title: 'Responsive Design Principles',
            summary: 'Understand mobile-first design, media queries, and how to create websites that work on all devices.',
          },
          {
            title: 'CSS Frameworks and Tools',
            summary: 'Explore popular CSS frameworks like Tailwind CSS and Bootstrap for rapid development.',
          },
        ],
      },
      {
        title: 'JavaScript Essentials',
        lessons: [
          {
            title: 'JavaScript Basics and DOM Manipulation',
            summary: 'Learn JavaScript syntax, variables, and how to interact with HTML elements through the DOM.',
          },
          {
            title: 'Events and User Interactions',
            summary: 'Master event handling to create interactive web experiences that respond to user actions.',
          },
          {
            title: 'Asynchronous JavaScript',
            summary: 'Understand promises, async/await, and how to handle asynchronous operations effectively.',
          },
          {
            title: 'Modern ES6+ Features',
            summary: 'Learn modern JavaScript features like arrow functions, destructuring, and modules for cleaner code.',
          },
        ],
      },
      {
        title: 'Frontend Frameworks',
        lessons: [
          {
            title: 'Introduction to React',
            summary: 'Learn component-based architecture, JSX, and how to build modern user interfaces with React.',
          },
          {
            title: 'State Management',
            summary: 'Master React hooks and state management to create dynamic, interactive applications.',
          },
          {
            title: 'Routing and Navigation',
            summary: 'Implement client-side routing for single-page applications using React Router.',
          },
          {
            title: 'API Integration',
            summary: 'Learn to fetch data from APIs and integrate backend services into your React applications.',
          },
        ],
      },
      {
        title: 'Backend Development',
        lessons: [
          {
            title: 'Server-Side Programming',
            summary: 'Understand server-side concepts and learn Node.js for building backend applications.',
          },
          {
            title: 'RESTful API Design',
            summary: 'Design and implement RESTful APIs with proper routing, controllers, and middleware.',
          },
          {
            title: 'Database Integration',
            summary: 'Connect to databases (MongoDB, PostgreSQL) and perform CRUD operations efficiently.',
          },
          {
            title: 'Authentication and Authorization',
            summary: 'Implement secure user authentication with JWT tokens and role-based access control.',
          },
        ],
      },
      {
        title: 'Full-Stack Project',
        lessons: [
          {
            title: 'Project Architecture',
            summary: 'Design a full-stack application architecture connecting frontend, backend, and database.',
          },
          {
            title: 'Development and Testing',
            summary: 'Build features incrementally with proper testing at each layer of the stack.',
          },
          {
            title: 'Deployment and DevOps',
            summary: 'Deploy your application to cloud platforms like Vercel, Netlify, or AWS.',
          },
          {
            title: 'Performance Optimization',
            summary: 'Optimize application performance, implement caching, and monitor production issues.',
          },
        ],
      },
    ],
  },
};

/**
 * Generate a mock learning path based on the topic
 * Simulates AI generation with realistic delay
 */
export async function generateLearningPath(
  topic: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner'
): Promise<LearningPathResponse> {
  // Simulate API delay (500-1500ms)
  await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000));

  const topicLower = topic.toLowerCase();
  
  let template: LearningPathResponse;
  
  if (
    topicLower.includes('web') ||
    topicLower.includes('html') ||
    topicLower.includes('css') ||
    topicLower.includes('javascript') ||
    topicLower.includes('react') ||
    topicLower.includes('frontend') ||
    topicLower.includes('backend')
  ) {
    template = mockTemplates.web;
  } else {
    template = mockTemplates.programming;
  }

  // Customize the first module title to include the topic
  const customizedPath: LearningPathResponse = {
    modules: template.modules.map((module, index) => {
      if (index === 0) {
        return {
          ...module,
          title: `Introduction to ${topic}`,
        };
      }
      return module;
    }),
  };

  return customizedPath;
}

/**
 * Generate a refined mock learning path based on feedback
 * Simulates refinement with realistic delay
 */
export async function generateRefinedLearningPath(
  topic: string,
  previousPath: LearningPathResponse,
  feedback: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner'
): Promise<LearningPathResponse> {
  
  await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000));
  
  const refinedPath: LearningPathResponse = {
    modules: previousPath.modules.map((module, moduleIndex) => ({
      ...module,
      title: `${module.title} (Refined)`,
      lessons: module.lessons.map((lesson, lessonIndex) => {
        // Add "Updated" to some lessons to show refinement
        if ((moduleIndex + lessonIndex) % 2 === 0) {
          return {
            ...lesson,
            title: `${lesson.title} - Updated`,
            summary: `${lesson.summary} This has been refined based on your feedback: "${feedback.substring(0, 50)}..."`,
          };
        }
        return lesson;
      }),
    })),
  };

  return refinedPath;
}

/**
 * Check if mock AI mode is enabled
 */
export function isMockMode(): boolean {
  return process.env.USE_MOCK_AI === 'true';
}
