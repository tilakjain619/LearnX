'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, BookOpen, Clock } from 'lucide-react';
import { Module } from '@/app/api/generate-path/route';

interface LearningPathDisplayProps {
    title: string;
    description: string;
    modules: Module[];
    onRegenerate?: () => void;
    isRegenerating?: boolean;
}

export function LearningPathDisplay({
    title,
    description,
    modules,
    onRegenerate,
    isRegenerating = false,
}: LearningPathDisplayProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl"
        >
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-3">{title}</h2>
                <p className="text-zinc-400 text-lg">{description}</p>
            </div>

            <div className="space-y-6">
                {modules.map((module, moduleIndex) => (
                    <motion.div
                        key={moduleIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: moduleIndex * 0.1 }}
                        className="border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900/50"
                    >
                        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                Module {moduleIndex + 1}: {module.title}
                            </h3>
                            <p className="text-indigo-100 text-sm mt-1">{module.description}</p>
                        </div>

                        <div className="p-6">
                            <div className="space-y-3">
                                {module.lessons.map((lesson, lessonIndex) => (
                                    <motion.div
                                        key={lessonIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: moduleIndex * 0.1 + lessonIndex * 0.05 }}
                                        className="border border-zinc-700 rounded-lg p-4 hover:bg-zinc-800/50 transition-colors"
                                    >
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-white">{lesson.title}</h4>
                                                <p className="text-zinc-400 text-sm mt-1">{lesson.summary}</p>
                                                <div className="flex items-center gap-1 text-zinc-500 text-xs mt-2">
                                                    <Clock className="h-3 w-3" />
                                                    {lesson.duration}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {onRegenerate && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 flex gap-3 justify-center"
                >
                    <button
                        onClick={onRegenerate}
                        disabled={isRegenerating}
                        className="px-6 py-3 rounded-lg border border-indigo-500 text-indigo-500 hover:bg-indigo-500/10 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all"
                    >
                        {isRegenerating ? 'Regenerating...' : 'Regenerate Path'}
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
}
