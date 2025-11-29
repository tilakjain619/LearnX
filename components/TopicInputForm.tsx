'use client';

import { useState } from 'react';
import { Sparkles, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

interface TopicInputFormProps {
    onSubmit: (topic: string) => Promise<void>;
    isLoading?: boolean;
}

export function TopicInputForm({ onSubmit, isLoading = false }: TopicInputFormProps) {
    const [topic, setTopic] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!topic.trim()) {
            setError('Please enter a topic');
            return;
        }

        try {
            await onSubmit(topic.trim());
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate path');
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col gap-4">
                <div>
                    <label htmlFor="topic" className="block text-sm font-medium mb-2">
                        Enter a topic to learn
                    </label>
                    <div className="relative">
                        <input
                            id="topic"
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., React Hooks, Quantum Physics, Digital Marketing..."
                            disabled={isLoading}
                            className="w-full px-4 py-3 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-red-400 flex items-center gap-2"
                    >
                        ⚠️ {error}
                    </motion.div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-all"
                >
                    {isLoading ? (
                        <>
                            <Loader className="h-4 w-4 animate-spin" />
                            Generating your learning path...
                        </>
                    ) : (
                        <>
                            <Sparkles className="h-4 w-4" />
                            Generate Learning Path
                        </>
                    )}
                </button>

                <p className="text-xs text-zinc-500 text-center">
                    AI will create a structured curriculum from basics to advanced • Powered by GPT-4
                </p>
            </div>
        </motion.form>
    );
}
