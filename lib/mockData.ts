import { Module } from '@/app/api/generate-path/route';

// Mock learning path data for demonstration/testing
export function generateMockLearningPath(topic: string) {
    const mockPaths: Record<string, any> = {
        'springboot': {
            title: 'Mastering Spring Boot Development',
            description: 'Learn to build production-ready Spring Boot applications from fundamentals to advanced enterprise patterns.',
            modules: [
                {
                    title: 'Spring Boot Fundamentals',
                    description: 'Get started with Spring Boot basics and ecosystem',
                    lessons: [
                        {
                            title: 'What is Spring Boot?',
                            summary: 'Understand Spring Boot and its advantages over traditional Spring Framework. Learn how it simplifies application development.',
                            duration: '20-25 mins'
                        },
                        {
                            title: 'Setting Up Your First Project',
                            summary: 'Create your first Spring Boot application using Spring Initializr. Configure dependencies and understand project structure.',
                            duration: '15-20 mins'
                        },
                        {
                            title: 'Auto-Configuration Magic',
                            summary: 'Explore Spring Boot\'s auto-configuration feature. Learn how it intelligently configures your application.',
                            duration: '25-30 mins'
                        }
                    ]
                },
                {
                    title: 'Web Development with Spring Boot',
                    description: 'Build REST APIs and web applications using Spring MVC and Spring Boot',
                    lessons: [
                        {
                            title: 'REST API Development',
                            summary: 'Create RESTful web services using @RestController. Learn HTTP methods and status codes.',
                            duration: '30-35 mins'
                        },
                        {
                            title: 'Request Handling & Validation',
                            summary: 'Handle different types of requests and validate input data. Implement error handling.',
                            duration: '25-30 mins'
                        },
                        {
                            title: 'JWT Authentication',
                            summary: 'Implement JWT-based authentication for your REST APIs. Secure your endpoints effectively.',
                            duration: '35-40 mins'
                        }
                    ]
                },
                {
                    title: 'Database Integration',
                    description: 'Learn data persistence with Spring Data JPA and database management',
                    lessons: [
                        {
                            title: 'Spring Data JPA Basics',
                            summary: 'Understand ORM concepts and Spring Data JPA repositories. Write efficient database queries.',
                            duration: '30-35 mins'
                        },
                        {
                            title: 'Entity Relationships',
                            summary: 'Master one-to-many, many-to-one, and many-to-many relationships in JPA.',
                            duration: '25-30 mins'
                        },
                        {
                            title: 'Transaction Management',
                            summary: 'Learn ACID properties and how Spring manages transactions. Handle rollbacks and propagation.',
                            duration: '20-25 mins'
                        }
                    ]
                },
                {
                    title: 'Advanced Topics',
                    description: 'Explore caching, messaging, and microservices patterns',
                    lessons: [
                        {
                            title: 'Caching with Spring',
                            summary: 'Implement caching strategies using Spring Cache abstraction. Improve application performance.',
                            duration: '25-30 mins'
                        },
                        {
                            title: 'Message-Driven Services',
                            summary: 'Use Spring for asynchronous messaging with RabbitMQ or Kafka. Build event-driven systems.',
                            duration: '30-35 mins'
                        },
                        {
                            title: 'Microservices Architecture',
                            summary: 'Build microservices with Spring Boot. Learn service discovery and inter-service communication.',
                            duration: '40-45 mins'
                        }
                    ]
                }
            ]
        },
        'react hooks': {
            title: 'Complete Guide to React Hooks',
            description: 'Master modern React development with hooks. Learn state management, side effects, and custom hooks patterns.',
            modules: [
                {
                    title: 'Hooks Fundamentals',
                    description: 'Introduction to React Hooks and why they changed functional components',
                    lessons: [
                        {
                            title: 'Why Hooks?',
                            summary: 'Understand the problems hooks solve in functional components. Learn the motivation behind their introduction.',
                            duration: '15-20 mins'
                        },
                        {
                            title: 'useState Hook',
                            summary: 'Master state management in functional components. Learn to update state and handle multiple state variables.',
                            duration: '20-25 mins'
                        },
                        {
                            title: 'useEffect Hook',
                            summary: 'Handle side effects in functional components. Learn cleanup and dependency arrays.',
                            duration: '25-30 mins'
                        }
                    ]
                },
                {
                    title: 'Advanced Hooks Patterns',
                    description: 'Learn context, reducers, and performance optimization hooks',
                    lessons: [
                        {
                            title: 'useContext Hook',
                            summary: 'Manage global state with Context API. Avoid prop drilling in your applications.',
                            duration: '20-25 mins'
                        },
                        {
                            title: 'useReducer Hook',
                            summary: 'Manage complex state logic with reducers. Perfect for multi-action state updates.',
                            duration: '25-30 mins'
                        },
                        {
                            title: 'Performance Hooks',
                            summary: 'Optimize performance with useMemo and useCallback. Prevent unnecessary re-renders.',
                            duration: '25-30 mins'
                        }
                    ]
                },
                {
                    title: 'Custom Hooks',
                    description: 'Write reusable custom hooks for common patterns and logic',
                    lessons: [
                        {
                            title: 'Creating Custom Hooks',
                            summary: 'Extract component logic into custom hooks. Follow hooks conventions and best practices.',
                            duration: '20-25 mins'
                        },
                        {
                            title: 'Common Hook Patterns',
                            summary: 'Learn useAsync, useFetch, useLocalStorage, and other commonly used patterns.',
                            duration: '30-35 mins'
                        },
                        {
                            title: 'Testing Hooks',
                            summary: 'Test custom hooks effectively using React Testing Library. Write reliable hook tests.',
                            duration: '25-30 mins'
                        }
                    ]
                }
            ]
        }
    };

    // Return mock data if available, otherwise create a generic one
    const lowerTopic = topic.toLowerCase();
    for (const key in mockPaths) {
        if (lowerTopic.includes(key)) {
            return mockPaths[key];
        }
    }

    // Generate a generic mock path for any topic
    return {
        title: `Complete Guide to ${topic}`,
        description: `Master ${topic} through this comprehensive learning path. Progress from fundamental concepts to advanced techniques and best practices.`,
        modules: [
            {
                title: 'Foundations & Basics',
                description: `Essential concepts and fundamentals of ${topic}`,
                lessons: [
                    {
                        title: `What is ${topic}?`,
                        summary: `Introduction to ${topic} and its key concepts. Understand the importance and applications in modern development.`,
                        duration: '20-25 mins'
                    },
                    {
                        title: 'Getting Started',
                        summary: `Set up your development environment for ${topic}. Install necessary tools and dependencies.`,
                        duration: '15-20 mins'
                    },
                    {
                        title: 'Core Concepts',
                        summary: `Learn the fundamental principles and core concepts of ${topic}. Master the building blocks.`,
                        duration: '25-30 mins'
                    }
                ]
            },
            {
                title: 'Intermediate Skills',
                description: `Build practical skills and real-world applications`,
                lessons: [
                    {
                        title: 'Practical Applications',
                        summary: `Apply ${topic} concepts to real-world scenarios. Build your first project.`,
                        duration: '30-40 mins'
                    },
                    {
                        title: 'Best Practices',
                        summary: `Learn industry best practices and patterns for ${topic}. Write clean and maintainable code.`,
                        duration: '25-30 mins'
                    },
                    {
                        title: 'Common Patterns',
                        summary: `Discover common design patterns used with ${topic}. Solve typical problems efficiently.`,
                        duration: '25-30 mins'
                    }
                ]
            },
            {
                title: 'Advanced Mastery',
                description: `Expert-level techniques and optimization`,
                lessons: [
                    {
                        title: 'Performance Optimization',
                        summary: `Optimize your ${topic} applications for speed and efficiency. Profile and measure improvements.`,
                        duration: '30-35 mins'
                    },
                    {
                        title: 'Architecture & Design',
                        summary: `Design scalable systems using ${topic}. Plan for growth and maintainability.`,
                        duration: '35-40 mins'
                    },
                    {
                        title: 'Production Deployment',
                        summary: `Deploy ${topic} applications to production. Handle monitoring, logging, and troubleshooting.`,
                        duration: '30-35 mins'
                    }
                ]
            }
        ]
    };
}
