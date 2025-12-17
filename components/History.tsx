'use client';

import { useEffect, useState } from 'react';
import { History as HistoryIcon, Loader2, ChevronDown, ChevronUp, Calendar, BookOpen } from 'lucide-react';

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

interface HistoryProps {
  onSelectPath?: (path: LearningPath) => void;
  refreshTrigger?: number;
}

export default function History({ onSelectPath, refreshTrigger = 0 }: HistoryProps) {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  const fetchHistory = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/learnpath/history');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to fetch history');
      }

      if (data.success) {
        setLearningPaths(data.data);
      } else {
        throw new Error(data.error || 'Failed to fetch history');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [refreshTrigger]);

  const togglePath = (pathId: string) => {
    const newExpanded = new Set(expandedPaths);
    if (newExpanded.has(pathId)) {
      newExpanded.delete(pathId);
    } else {
      newExpanded.add(pathId);
    }
    setExpandedPaths(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatDate(dateString);
  };

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-zinc-900 rounded-2xl border-2 border-zinc-700 p-12 flex flex-col items-center justify-center shadow-xl shadow-purple-500/10">
          <Loader2 className="w-12 h-12 text-purple-400 animate-spin mb-4" />
          <p className="text-gray-300 text-lg">Loading history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-red-500/10 border-2 border-red-500/50 rounded-2xl p-8">
          <p className="text-red-400 font-medium text-center">{error}</p>
          <button
            onClick={fetchHistory}
            className="mt-4 mx-auto block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (learningPaths.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-zinc-900 rounded-2xl border-2 border-zinc-700 p-12 shadow-xl shadow-purple-500/10">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
              <HistoryIcon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-100 mb-2">No Learning Paths Yet</h3>
            <p className="text-gray-300 text-lg">
              Generate your first AI-powered learning path to get started!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
            <HistoryIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Learning Path History</h2>
            <p className="text-gray-300">
              {learningPaths.length} {learningPaths.length === 1 ? 'path' : 'paths'} generated
            </p>
          </div>
        </div>

        <button
          onClick={fetchHistory}
          className="px-4 py-2 text-purple-400 hover:bg-zinc-800 rounded-lg transition-all flex items-center gap-2 border border-zinc-700"
        >
          <Loader2 className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Learning Paths List */}
      <div className="space-y-4">
        {learningPaths.map((path) => {
          const isExpanded = expandedPaths.has(path._id);
          const totalLessons = path.modules.reduce((acc, m) => acc + m.lessons.length, 0);

          return (
            <div
              key={path._id}
              className="bg-zinc-900 rounded-xl border-2 border-zinc-700 shadow-lg shadow-purple-500/10 hover:shadow-xl hover:shadow-purple-500/20 transition-all overflow-hidden"
            >
              {/* Path Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-gray-100 mb-2">
                      {path.topic}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatRelativeTime(path.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{path.modules.length} modules</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{totalLessons} lessons</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {onSelectPath && (
                      <button
                        onClick={() => onSelectPath(path)}
                        className="px-4 py-2 bg-purple-700 text-gray-200 rounded-lg hover:bg-purple-800 transition-all text-sm font-semibold shadow-lg shadow-purple-500/20"
                      >
                        View Full
                      </button>
                    )}
                    
                    <button
                      onClick={() => togglePath(path._id)}
                      className="px-4 py-2 border-2 border-zinc-600 text-gray-300 rounded-lg hover:bg-zinc-800 transition-all flex items-center gap-2"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          <span className="text-sm font-semibold">Hide</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          <span className="text-sm font-semibold">Expand</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Module Preview (always show first 2 modules) */}
                {!isExpanded && (
                  <div className="space-y-2">
                    {path.modules.slice(0, 2).map((module, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/30"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-purple-500/30">
                          {idx + 1}
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold text-gray-100">{module.title}</p>
                          <p className="text-xs text-gray-400">{module.lessons.length} lessons</p>
                        </div>
                      </div>
                    ))}
                    {path.modules.length > 2 && (
                      <p className="text-sm text-gray-400 text-center pt-2">
                        + {path.modules.length - 2} more modules
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Expanded View */}
              {isExpanded && (
                <div className="px-6 pb-6 space-y-3 bg-zinc-950">
                  {path.modules.map((module, moduleIdx) => (
                    <div
                      key={moduleIdx}
                      className="bg-zinc-800 rounded-lg p-4 border border-zinc-700"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-700 to-blue-700 rounded-lg flex items-center justify-center text-gray-200 text-sm font-bold shadow-md shadow-purple-500/20">
                          {moduleIdx + 1}
                        </div>
                        <h4 className="font-bold text-gray-100">{module.title}</h4>
                      </div>
                      
                      <div className="ml-11 space-y-2">
                        {module.lessons.map((lesson, lessonIdx) => (
                          <div
                            key={lessonIdx}
                            className="p-3 bg-zinc-900 rounded-lg border border-zinc-600"
                          >
                            <p className="font-medium text-gray-100 text-sm mb-1">
                              {lessonIdx + 1}. {lesson.title}
                            </p>
                            <p className="text-xs text-gray-300">{lesson.summary}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
