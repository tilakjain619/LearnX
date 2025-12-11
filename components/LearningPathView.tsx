'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, RefreshCw, Wand2, CheckCircle2 } from 'lucide-react';
import RefineModal from '@/components/RefineModal';

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

interface LearningPathViewProps {
  learningPath: LearningPath;
  onRegenerate: () => void;
  onRefine: (refinedPath: LearningPath) => void;
  currentTopic: string;
}

export default function LearningPathView({
  learningPath,
  onRegenerate,
  onRefine,
  currentTopic,
}: LearningPathViewProps) {
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([0]));
  const [isRefineModalOpen, setIsRefineModalOpen] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const toggleModule = (index: number) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedModules(newExpanded);
  };

  const handleRegenerate = async () => {
    setRegenerating(true);
    await onRegenerate();
    setRegenerating(false);
  };

  const expandAll = () => {
    setExpandedModules(new Set(learningPath.modules.map((_, i) => i)));
  };

  const collapseAll = () => {
    setExpandedModules(new Set());
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

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl shadow-purple-500/30">
        <div className="flex items-start justify-between">
          <div className="flex-grow">
            <h1 className="text-4xl font-bold mb-2">{learningPath.topic}</h1>
            <p className="text-purple-100 text-lg">
              {learningPath.modules.length} modules • {' '}
              {learningPath.modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
            </p>
            <p className="text-purple-200 text-sm mt-2">
              Generated on {formatDate(learningPath.createdAt)}
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleRegenerate}
              disabled={regenerating}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-semibold transition-all flex items-center gap-2 border border-white/30 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${regenerating ? 'animate-spin' : ''}`} />
              {regenerating ? 'Regenerating...' : 'Regenerate'}
            </button>
            
            <button
              onClick={() => setIsRefineModalOpen(true)}
              className="px-6 py-3 bg-white text-purple-600 hover:bg-purple-50 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-md"
            >
              <Wand2 className="w-5 h-5" />
              Refine Path
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className="px-4 py-2 text-sm text-purple-400 hover:bg-zinc-800 rounded-lg transition-all border border-zinc-700"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-4 py-2 text-sm text-purple-400 hover:bg-zinc-800 rounded-lg transition-all border border-zinc-700"
          >
            Collapse All
          </button>
        </div>
        
        <div className="text-sm text-gray-400">
          {expandedModules.size} of {learningPath.modules.length} modules expanded
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-4">
        {learningPath.modules.map((module, moduleIndex) => {
          const isExpanded = expandedModules.has(moduleIndex);
          
          return (
            <div
              key={moduleIndex}
              className="bg-zinc-900 rounded-xl border-2 border-zinc-700 shadow-lg shadow-purple-500/10 hover:shadow-xl hover:shadow-purple-500/20 transition-all overflow-hidden"
            >
              {/* Module Header */}
              <button
                onClick={() => toggleModule(moduleIndex)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-zinc-800 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30">
                    {moduleIndex + 1}
                  </div>
                  
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-100">
                      {module.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {module.lessons.length} lessons
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-semibold rounded-full border border-purple-500/30">
                    {moduleIndex === 0 ? 'Beginner' : moduleIndex < learningPath.modules.length - 1 ? 'Intermediate' : 'Advanced'}
                  </span>
                  
                  {isExpanded ? (
                    <ChevronUp className="w-6 h-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Module Content */}
              {isExpanded && (
                <div className="px-6 pb-6 space-y-3 bg-zinc-950">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="bg-zinc-800 rounded-lg p-5 border border-zinc-700 hover:border-purple-500/50 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        </div>
                        
                        <div className="flex-grow">
                          <h4 className="font-semibold text-gray-100 mb-2 text-lg">
                            {lessonIndex + 1}. {lesson.title}
                          </h4>
                          <p className="text-gray-300 leading-relaxed">
                            {lesson.summary}
                          </p>
                        </div>

                        <div className="flex-shrink-0">
                          <BookOpen className="w-5 h-5 text-purple-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Footer */}
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border-2 border-green-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-100">Ready to Start Learning?</h3>
            <p className="text-gray-300 mt-1">
              Follow this path from basic to advanced to master {learningPath.topic}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-400">
              {learningPath.modules.reduce((acc, m) => acc + m.lessons.length, 0)}
            </div>
            <div className="text-sm text-gray-400">Total Lessons</div>
          </div>
        </div>
      </div>

      {/* Refine Modal */}
      <RefineModal
        isOpen={isRefineModalOpen}
        onClose={() => setIsRefineModalOpen(false)}
        learningPath={learningPath}
        currentTopic={currentTopic}
        onRefine={onRefine}
      />
    </div>
  );
}
