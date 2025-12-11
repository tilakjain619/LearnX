'use client';

import { useState } from 'react';
import TopicInput from '@/components/TopicInput';
import LearningPathView from '@/components/LearningPathView';
import History from '@/components/History';
import { Brain, Clock } from 'lucide-react';

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

export default function LearnPathGenerator() {
  const [currentPath, setCurrentPath] = useState<LearningPath | null>(null);
  const [currentTopic, setCurrentTopic] = useState('');
  const [activeTab, setActiveTab] = useState<'generator' | 'history'>('generator');
  const [historyRefreshTrigger, setHistoryRefreshTrigger] = useState(0);

  const handleGenerate = (learningPath: LearningPath) => {
    setCurrentPath(learningPath);
    setActiveTab('generator');
    // Trigger history refresh
    setHistoryRefreshTrigger((prev) => prev + 1);
  };

  const handleRegenerate = async () => {
    if (!currentTopic) return;
    
    try {
      const response = await fetch('/api/learnpath', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: currentTopic }),
      });

      const data = await response.json();

      if (data.success) {
        setCurrentPath(data.data);
        setHistoryRefreshTrigger((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Regeneration error:', error);
    }
  };

  const handleRefine = (refinedPath: LearningPath) => {
    setCurrentPath(refinedPath);
    setHistoryRefreshTrigger((prev) => prev + 1);
  };

  const handleSelectFromHistory = (path: LearningPath) => {
    setCurrentPath(path);
    setCurrentTopic(path.topic);
    setActiveTab('generator');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-zinc-950 border-b border-zinc-800 shadow-lg shadow-purple-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Sparkles className="w-8 h-8 text-white" />
              </div> */}
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  AI Learning Path Generator
                </h1>
                <p className="text-gray-400 mt-1">
                  Generate personalized learning paths powered by AI
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-6 py-4 font-semibold transition-all flex items-center gap-2 border-b-2 ${
                activeTab === 'generator'
                  ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-zinc-900'
              }`}
            >
              <Brain className="w-5 h-5" />
              Generator
            </button>
            
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-4 font-semibold transition-all flex items-center gap-2 border-b-2 ${
                activeTab === 'history'
                  ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-zinc-900'
              }`}
            >
              <Clock className="w-5 h-5" />
              History
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'generator' ? (
          <div className="space-y-12">
            {/* Topic Input */}
            <TopicInput
              onGenerate={handleGenerate}
              onTopicChange={setCurrentTopic}
            />

            {/* Learning Path View */}
            {currentPath && (
              <div className="animate-fade-in">
                <LearningPathView
                  learningPath={currentPath}
                  onRegenerate={handleRegenerate}
                  onRefine={handleRefine}
                  currentTopic={currentTopic}
                />
              </div>
            )}

            {/* Empty State */}
            {!currentPath && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-zinc-900 rounded-2xl border-2 border-dashed border-zinc-700 p-16 shadow-xl shadow-purple-500/5">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
                      <Brain className="w-12 h-12 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-100 mb-3">
                      Generate Your First Learning Path
                    </h3>
                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                      Enter a topic above and let AI create a personalized,
                      structured learning path just for you.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                      {['React', 'Python', 'Machine Learning', 'Web Design'].map(
                        (topic) => (
                          <button
                            key={topic}
                            onClick={() => {
                              const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                              if (input) {
                                input.value = topic;
                                input.dispatchEvent(new Event('input', { bubbles: true }));
                              }
                            }}
                            className="px-5 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all font-medium border border-purple-500/30"
                          >
                            Try: {topic}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <History
            onSelectPath={handleSelectFromHistory}
            refreshTrigger={historyRefreshTrigger}
          />
        )}
      </main>


      {/* Global Styles for animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
