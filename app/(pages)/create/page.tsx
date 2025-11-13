'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TopicInputForm } from '@/components/TopicInputForm';
import { LearningPathDisplay } from '@/components/LearningPathDisplay';
import { LearningPath } from '@/app/api/generate-path/route';
import { motion } from 'framer-motion';

export default function CreatePage() {
  const [currentPath, setCurrentPath] = useState<LearningPath | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleGeneratePath = async (topic: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate learning path');
      }

      const data = await response.json();
      setCurrentPath(data.path);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!currentPath) return;
    setIsRegenerating(true);
    try {
      await handleGeneratePath(currentPath.topic);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleReset = () => {
    setCurrentPath(null);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="sticky top-0 z-10 border-b border-zinc-800 bg-black/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {!currentPath ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-bold mb-3">Create Your Learning Path</h1>
              <p className="text-xl text-zinc-400">
                Enter any topic and our AI will generate a structured curriculum just for you.
              </p>
            </motion.div>

            <TopicInputForm onSubmit={handleGeneratePath} isLoading={isLoading} />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Your Learning Path</h2>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg border border-zinc-700 hover:bg-zinc-800 transition-colors"
              >
                Create New Path
              </button>
            </div>

            <LearningPathDisplay
              title={currentPath.title}
              description={currentPath.description}
              modules={currentPath.modules}
              onRegenerate={handleRegenerate}
              isRegenerating={isRegenerating}
            />
          </div>
        )}
      </div>
    </div>
  );
}
