"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Rocket, Github, Map } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <main className="w-full bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-center pt-24 lg:pt-32 overflow-hidden selection:bg-indigo-500/20 dark:selection:bg-white/20 transition-colors duration-300">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/[0.05] dark:bg-white/[0.02] rounded-full blur-3xl -z-10" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            v1.0 Public Beta
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl font-bold tracking-tight sm:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-500 dark:from-white dark:via-white dark:to-zinc-500 pb-2">
            Learn anything. <br />
            <span className="text-zinc-900 dark:text-white">Instantly.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-8 text-zinc-600 dark:text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Type a topic. AI generates a structured learning path. <br className="hidden sm:block" />
            Follow step-by-step and master new skills.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/create">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-4 text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg shadow-zinc-500/20 dark:shadow-none"
              >
                <Rocket className="h-4 w-4" /> Start Learning
              </motion.div>
            </Link>

            <Link href="/roadmap">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 px-8 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                <Map className="h-4 w-4" /> View Roadmap
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <section className="mt-32 w-full max-w-7xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">Why LearnX?</h2>
          <p className="text-zinc-600 dark:text-zinc-500">Everything you need to master your next skill.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "AI Powered", desc: "Type a topic → AI creates a syllabus with modules and lesson breakdown." },
            { title: "Community Driven", desc: "Anyone can publish, teach, share and learn from others." },
            { title: "Multi Category", desc: "Tech, Fitness, Cooking, Finance, DIY, Languages, etc." },
            { title: "Track Progress", desc: "Mark lessons complete, watch your progress grow." },
            { title: "Micro Assignments", desc: "Mini tasks in every topic to make learning actionable." },
            { title: "No Overload", desc: "Simple lessons, short readable content. No long boring notes." },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group border border-zinc-200 dark:border-white/5 bg-white dark:bg-white/[0.02] hover:bg-zinc-50 dark:hover:bg-white/[0.04] backdrop-blur-sm rounded-3xl p-8 transition-colors shadow-sm dark:shadow-none"
            >
              <h3 className="font-semibold text-lg mb-3 text-zinc-900 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">{feature.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-500 leading-relaxed group-hover:text-zinc-700 dark:group-hover:text-zinc-400 transition-colors">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
