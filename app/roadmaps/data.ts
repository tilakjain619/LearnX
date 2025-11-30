export interface RoadmapStep {
  id: number;
  title: string;
  resources: { label: string; url: string }[];
}

export interface CuratedRoadmap {
  id: number;
  title: string;
  slug: string;
  steps: RoadmapStep[];
}

export const CURATED_ROADMAPS: CuratedRoadmap[] = [
  // 1. Web Development
  {
    id: 1,
    title: "Web Development",
    slug: "web-development",
    steps: [
      {
        id: 1,
        title: "HTML Basics",
        resources: [
          { label: "MDN HTML Guide", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
          { label: "FreeCodeCamp HTML", url: "https://www.freecodecamp.org/learn/responsive-web-design/" }
        ]
      },
      {
        id: 2,
        title: "CSS Fundamentals",
        resources: [
          { label: "MDN CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
          { label: "Flexbox Froggy", url: "https://flexboxfroggy.com/" }
        ]
      },
      {
        id: 3,
        title: "JavaScript Basics",
        resources: [
          { label: "JavaScript.info", url: "https://javascript.info/" },
          { label: "FreeCodeCamp JS", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" }
        ]
      },
      {
        id: 4,
        title: "Frontend Frameworks",
        resources: [
          { label: "React Docs", url: "https://react.dev/" },
          { label: "Next.js Docs", url: "https://nextjs.org/docs" }
        ]
      }
    ]
  },

  // 2. Data Science
  {
    id: 2,
    title: "Data Science",
    slug: "data-science",
    steps: [
      {
        id: 1,
        title: "Python Basics",
        resources: [
          { label: "Python Tutorial", url: "https://docs.python.org/3/tutorial/" },
          { label: "freeCodeCamp Python", url: "https://www.youtube.com/watch?v=rfscVS0vtbw" }
        ]
      },
      {
        id: 2,
        title: "NumPy & Pandas",
        resources: [
          { label: "NumPy Docs", url: "https://numpy.org/doc/" },
          { label: "Pandas Docs", url: "https://pandas.pydata.org/docs/" }
        ]
      },
      {
        id: 3,
        title: "Data Visualization",
        resources: [
          { label: "Matplotlib", url: "https://matplotlib.org/" },
          { label: "Seaborn", url: "https://seaborn.pydata.org/" }
        ]
      },
      {
        id: 4,
        title: "Machine Learning Basics",
        resources: [
          { label: "Sklearn Docs", url: "https://scikit-learn.org/" },
          { label: "Andrew Ng ML", url: "https://www.coursera.org/learn/machine-learning" }
        ]
      }
    ]
  },

  // 3. AI Engineer
  {
    id: 3,
    title: "AI Engineer",
    slug: "ai-engineer",
    steps: [
      {
        id: 1,
        title: "Python Foundations",
        resources: [
          { label: "Python Docs", url: "https://docs.python.org/" }
        ]
      },
      {
        id: 2,
        title: "Deep Learning Basics",
        resources: [
          { label: "Neural Networks — 3Blue1Brown", url: "https://www.youtube.com/watch?v=aircAruvnKk" },
          { label: "DeepLearning.AI", url: "https://www.deeplearning.ai/" }
        ]
      },
      {
        id: 3,
        title: "LLM Fundamentals",
        resources: [
          { label: "Intro to LLMs", url: "https://www.promptingguide.ai/" },
          { label: "Transformers", url: "https://huggingface.co/learn" }
        ]
      },
      {
        id: 4,
        title: "Vector Databases",
        resources: [
          { label: "Pinecone Docs", url: "https://docs.pinecone.io/" },
          { label: "Weaviate Docs", url: "https://weaviate.io/developers/weaviate" }
        ]
      },
      {
        id: 5,
        title: "AI Deployment",
        resources: [
          { label: "FastAPI Guide", url: "https://fastapi.tiangolo.com/" },
          { label: "Serverless AI book", url: "https://vercel.com/blog" }
        ]
      }
    ]
  },

  // 4. Backend Engineer
  {
    id: 4,
    title: "Backend Engineering",
    slug: "backend-engineering",
    steps: [
      {
        id: 1,
        title: "Programming Basics",
        resources: [
          { label: "JavaScript Info", url: "https://javascript.info/" }
        ]
      },
      {
        id: 2,
        title: "APIs & Server Basics",
        resources: [
          { label: "Node.js Docs", url: "https://nodejs.org/en/docs" }
        ]
      },
      {
        id: 3,
        title: "Databases",
        resources: [
          { label: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/" }
        ]
      },
      {
        id: 4,
        title: "Authentication",
        resources: [
          { label: "JWT Guide", url: "https://jwt.io/introduction" }
        ]
      }
    ]
  },

  // 5. DevOps Engineer
  {
    id: 5,
    title: "DevOps",
    slug: "devops",
    steps: [
      {
        id: 1,
        title: "Linux Basics",
        resources: [
          { label: "Linux Journey", url: "https://linuxjourney.com/" }
        ]
      },
      {
        id: 2,
        title: "Networking",
        resources: [
          { label: "Network Basics", url: "https://www.geeksforgeeks.org/computer-network-tutorials/" }
        ]
      },
      {
        id: 3,
        title: "Docker",
        resources: [
          { label: "Docker Docs", url: "https://docs.docker.com/" }
        ]
      },
      {
        id: 4,
        title: "CI/CD",
        resources: [
          { label: "GitHub Actions Docs", url: "https://docs.github.com/en/actions" }
        ]
      }
    ]
  },

  // 6. Mobile Development
  {
    id: 6,
    title: "Mobile Development",
    slug: "mobile-development",
    steps: [
      {
        id: 1,
        title: "Dart Basics",
        resources: [{ label: "Dart Docs", url: "https://dart.dev/guides" }]
      },
      {
        id: 2,
        title: "Flutter UI",
        resources: [{ label: "Flutter Docs", url: "https://docs.flutter.dev/" }]
      }
    ]
  },

  // 7. UI/UX Design
  {
    id: 7,
    title: "UI/UX Design",
    slug: "ui-ux-design",
    steps: [
      {
        id: 1,
        title: "UX Fundamentals",
        resources: [{ label: "NNGroup UX", url: "https://www.nngroup.com/articles/ux-basics/" }]
      },
      {
        id: 2,
        title: "Figma Basics",
        resources: [{ label: "Figma Learn", url: "https://help.figma.com/" }]
      }
    ]
  },

  // 8. Cybersecurity
  {
    id: 8,
    title: "Cybersecurity",
    slug: "cybersecurity",
    steps: [
      {
        id: 1,
        title: "Security Basics",
        resources: [
          { label: "OWASP", url: "https://owasp.org/www-project-top-ten/" }
        ]
      },
      {
        id: 2,
        title: "Networking",
        resources: [
          { label: "Cisco Networking", url: "https://www.cisco.com/c/en/us/solutions/enterprise-networks/what-is-networking.html" }
        ]
      }
    ]
  },

  // 9. Blockchain Developer
  {
    id: 9,
    title: "Blockchain Development",
    slug: "blockchain-development",
    steps: [
      {
        id: 1,
        title: "Web3 Basics",
        resources: [{ label: "Ethereum Docs", url: "https://ethereum.org/en/developers/docs/" }]
      },
      {
        id: 2,
        title: "Smart Contracts",
        resources: [{ label: "Solidity Docs", url: "https://docs.soliditylang.org/" }]
      }
    ]
  },

  // 10. Game Development
  {
    id: 10,
    title: "Game Development",
    slug: "game-development",
    steps: [
      {
        id: 1,
        title: "Unity Basics",
        resources: [{ label: "Unity Learn", url: "https://learn.unity.com/" }]
      },
      {
        id: 2,
        title: "C# Basics",
        resources: [{ label: "C# Docs", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" }]
      }
    ]
  },
];
