'use client';

import { useState } from 'react';
import { X, Wand2, Loader2 } from 'lucide-react';

interface Lesson {
  title: string;
  summary: string;
}

interface Module {
  title: string;
  lessons: Lesson[];
}

interface LearningPath {
  _id: string;
  topic: string;
  modules: Module[];
  createdAt: string;
}

interface RefineModalProps {
  isOpen: boolean;
  onClose: () => void;
  learningPath: LearningPath;
  currentTopic: string;
  onRefine: (refinedPath: LearningPath) => void;
}

export default function RefineModal({
  isOpen,
  onClose,
  learningPath,
  currentTopic,
  onRefine,
}: RefineModalProps) {
  const [refinementText, setRefinementText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!refinementText.trim()) {
      setError('Please describe what you want to change');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/learnpath/refine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: currentTopic,
          refinement: refinementText.trim(),
          previousPath: learningPath,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to refine learning path');
      }

      if (data.success) {
        onRefine(data.data);
        handleClose();
      } else {
        throw new Error(data.error || 'Failed to refine learning path');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setRefinementText('');
    setError('');
    setLoading(false);
    onClose();
  };

  const suggestions = [
    'Add more practical examples',
    'Make it more beginner-friendly',
    'Include advanced topics',
    'Focus on real-world projects',
    'Add more hands-on exercises',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Wand2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Refine Learning Path</h2>
              <p className="text-purple-100 text-sm">Tell us what you'd like to change</p>
            </div>
          </div>
          
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[calc(90vh-180px)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Topic */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
              <p className="text-sm text-purple-600 font-semibold mb-1">Current Topic:</p>
              <p className="text-lg font-bold text-purple-900">{currentTopic}</p>
            </div>

            {/* Refinement Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What would you like to change or improve?
              </label>
              <textarea
                value={refinementText}
                onChange={(e) => {
                  setRefinementText(e.target.value);
                  setError('');
                }}
                placeholder="E.g., 'Add more hands-on projects', 'Focus on advanced concepts', 'Include more real-world examples'..."
                className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                disabled={loading}
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  Be specific about what you want to change
                </p>
                <p className="text-xs text-gray-400">
                  {refinementText.length}/500
                </p>
              </div>
            </div>

            {/* Suggestions */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Quick Suggestions:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setRefinementText(suggestion)}
                    disabled={loading}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-all disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
                <div className="flex items-center justify-center gap-3 text-purple-600">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <p className="text-lg font-medium">
                    AI is refining your learning path...
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={handleClose}
            disabled={loading}
            className="px-6 py-3 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={loading || !refinementText.trim()}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Refining...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Refine Path
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
