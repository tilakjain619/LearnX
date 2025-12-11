'use client';

import { useState } from 'react';
import { Loader2, Brain } from 'lucide-react';

interface TopicInputProps {
  onGenerate: (learningPath: any) => void;
  onTopicChange?: (topic: string) => void;
}

export default function TopicInput({ onGenerate, onTopicChange }: TopicInputProps) {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/learnpath', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: topic.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to generate learning path');
      }

      if (data.success) {
        onGenerate(data.data);
        onTopicChange?.(topic.trim());
      } else {
        throw new Error(data.error || 'Failed to generate learning path');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="flex items-center gap-3 p-6 bg-zinc-900 rounded-2xl border-2 border-zinc-700 shadow-xl shadow-purple-500/10">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Brain className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="flex-grow">
              <input
                type="text"
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  setError('');
                }}
                placeholder="Enter a topic (e.g., React, Machine Learning, Python...)"
                className="w-full bg-zinc-950 border-2 border-zinc-600 rounded-xl px-4 py-3 text-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
                disabled={loading}
                maxLength={100}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !topic.trim()}
              className="flex-shrink-0 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transform hover:-translate-y-0.5"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </div>
              ) : (
                'Generate Path'
              )}
            </button>
          </div>

          {error && (
            <div className="mt-3 p-4 bg-red-500/10 border-l-4 border-red-500 rounded-lg">
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}
        </div>

        {loading && (
          <div className="p-6 bg-white rounded-xl border-2 border-purple-200 shadow-sm">
            <div className="flex items-center justify-center gap-3 text-purple-600">
              <Loader2 className="w-6 h-6 animate-spin" />
              <p className="text-lg font-medium">
                AI is crafting your personalized learning path...
              </p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
              <p className="text-sm text-gray-500 text-center">
                Analyzing topic, structuring modules, and creating lessons...
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
