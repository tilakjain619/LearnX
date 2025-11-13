# Setup Guide - AI Learning Path Generator Feature

## Overview
This document explains the changes made to implement the core feature from Issue #1: AI-powered learning path generation with MongoDB persistence.

## Changes Made

### 1. **Dependencies Added**
- `mongodb@^6.3.0` - For database persistence
- `openai@^4.47.0` - For AI-powered content generation

Install with:
```bash
npm install
```

### 2. **Database Setup** (`lib/mongodb.ts`)
- MongoDB connection utility with caching
- Handles connection pooling and error management
- Stores learning paths in MongoDB collection

**Required Environment Variable:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/learnx
```

### 3. **API Routes**

#### POST `/api/generate-path`
Generates a structured learning path using OpenAI GPT-4.

**Request:**
```json
{
  "topic": "React Hooks"
}
```

**Response:**
```json
{
  "success": true,
  "path": {
    "_id": "...",
    "topic": "React Hooks",
    "title": "Mastering React Hooks",
    "description": "...",
    "modules": [
      {
        "title": "Module 1: Foundations",
        "description": "...",
        "lessons": [
          {
            "title": "What are Hooks?",
            "summary": "...",
            "duration": "15-30 mins"
          }
        ]
      }
    ],
    "createdAt": "2025-11-13T..."
  }
}
```

#### GET `/api/paths`
Retrieves all stored learning paths from MongoDB.

#### GET `/api/paths/[id]`
Retrieves a specific learning path by ID.

#### DELETE `/api/paths/[id]`
Deletes a learning path from the database.

### 4. **Frontend Components**

#### `TopicInputForm.tsx`
- User-friendly form for entering topics
- Loading states with spinner animation
- Error handling and validation
- Framer Motion animations for smooth UX

#### `LearningPathDisplay.tsx`
- Displays structured modules with lessons
- Shows lesson summaries and time estimates
- Includes regenerate button for refining paths
- Responsive gradient design matching dark theme

### 5. **Updated Pages**

#### `/create` (Create Page)
- Complete overhaul from "Coming soon" to fully functional page
- Integration of form and display components
- State management for generated paths
- Regenerate/Refine functionality
- "Create New Path" button to start over

## Environment Variables Setup

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Then fill in your credentials:

```env
# MongoDB Connection (Get from MongoDB Atlas)
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/learnx?retryWrites=true&w=majority

# OpenAI API Key (Get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-your-api-key-here
```

## How to Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster
4. Create a database user with username and password
5. Get your connection string and add to `.env.local`
6. Collections are created automatically on first write

## How to Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key
5. Add it to `.env.local`

## Local Development

```bash
# Install dependencies
npm install

# Create .env.local with MongoDB URI and OpenAI API key
echo "MONGODB_URI=your_uri" > .env.local
echo "OPENAI_API_KEY=your_key" >> .env.local

# Run development server
npm run dev
```

Visit `http://localhost:3000/create` to start using the feature.

## Build & Production

```bash
# Build the project
npm run build

# Run in production
npm start
```

## Features Implemented

✅ **Topic Input Field** - Functional form for entering topics  
✅ **AI Content Generation** - GPT-4 generates structured modules and summaries  
✅ **Readable Output** - Logically ordered modules from basics to advanced  
✅ **Regenerate Option** - Users can tweak and regenerate paths  
✅ **MongoDB Integration** - Paths stored for persistence and history  
✅ **Error Handling** - Graceful error messages  
✅ **Loading States** - Visual feedback during generation  
✅ **Responsive Design** - Works on mobile and desktop  

## File Structure

```
app/
├── api/
│   ├── generate-path/
│   │   └── route.ts (POST endpoint)
│   └── paths/
│       ├── route.ts (GET all)
│       └── [id]/
│           └── route.ts (GET/DELETE single)
├── (pages)/
│   └── create/
│       └── page.tsx (Main feature page)
└── ...
components/
├── TopicInputForm.tsx
└── LearningPathDisplay.tsx
lib/
└── mongodb.ts (Database connection)
.env.local.example
```

## Testing the Feature

1. Start the dev server: `npm run dev`
2. Navigate to `/create`
3. Enter a topic (e.g., "Python for beginners")
4. Wait for AI to generate the learning path (5-10 seconds)
5. View the structured curriculum
6. Click "Regenerate Path" to refine
7. Click "Create New Path" to try a different topic

## Performance Notes

- Learning path generation takes 5-10 seconds (OpenAI API latency)
- Paths are cached in MongoDB for instant retrieval
- Consider adding a loading state indicator for better UX

## Future Enhancements

- User authentication and personal path history
- Path sharing and collaboration
- Progress tracking within lessons
- Custom path editing
- Export paths to PDF
- Integration with external learning resources
