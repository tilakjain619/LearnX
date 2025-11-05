"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket, MessageCircle, CheckCircle2, CircleDashed, Flame } from "lucide-react";

// ────────────────────────────────────────────────────────────────────────────────
// Data — edit this list to manage roadmap items
// phase: "Planned" | "In Progress" | "Shipped"
// ────────────────────────────────────────────────────────────────────────────────
const ROADMAP: {
  id: number;
  title: string;
  desc: string;
  phase: "Planned" | "In Progress" | "Shipped";
  tags?: string[];
}[] = [
  {
    id: 1,
    title: "AI topic → auto lessons (v1)",
    desc: "Type a topic and instantly generate a structured learning path with modules and lesson summaries.",
    phase: "In Progress",
    tags: ["AI", "Generator"],
  },
  {
    id: 2,
    title: "Category discovery",
    desc: "Curated categories like Tech, Finance, Cooking, Fitness to browse community-created topics.",
    phase: "Planned",
    tags: ["UX", "Discovery"],
  },
  {
    id: 3,
    title: "Learning progress tracking",
    desc: "Mark lessons done, resume where you left off, and see completion % for each topic.",
    phase: "Planned",
    tags: ["Progress"],
  },
  {
    id: 4,
    title: "Quizzes & mini-assignments",
    desc: "Auto-generate quick checks for lessons with instant feedback.",
    phase: "Planned",
    tags: ["Assessment"],
  },
  {
    id: 5,
    title: "Public paths & sharing",
    desc: "Publish a path, share a link, and let others learn step-by-step.",
    phase: "In Progress",
    tags: ["Community"],
  },
  {
    id: 6,
    title: "Streaks & leaderboard",
    desc: "Daily learning streaks with a friendly leaderboard to encourage consistency.",
    phase: "Shipped",
    tags: ["Gamification"],
  },
];

// Visual helpers
const phaseBadge = (phase: "Planned" | "In Progress" | "Shipped") => {
  const base = "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xxs";
  switch (phase) {
    case "Planned":
      return (
        <span className={`${base} border-zinc-800 bg-zinc-950 text-zinc-400`}>
          <CircleDashed className="h-3 w-3" /> Planned
        </span>
      );
    case "In Progress":
      return (
        <span className={`${base} border-amber-400/20 bg-amber-500/10 text-amber-300`}>
          <Flame className="h-3 w-3" /> In Progress
        </span>
      );
    case "Shipped":
      return (
        <span className={`${base} border-emerald-400/20 bg-emerald-500/10 text-emerald-300`}>
          <CheckCircle2 className="h-3 w-3" /> Shipped
        </span>
      );
  }
};

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      {/* Header */}
      <header className="mx-auto max-w-5xl px-4 pt-14 pb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Product Roadmap</h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              A living, visual timeline of what we're planning, building, and shipping. No dates — just momentum.
            </p>
          </div>
          <a
            href="#feedback"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-sm hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-700"
          >
            <MessageCircle className="h-4 w-4" /> Give feedback
          </a>
        </div>
      </header>

      {/* Timeline */}
      <main className="relative mx-auto max-w-5xl px-4 pb-20">
        {/* Center line */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-linear-to-b from-zinc-800 via-zinc-700 to-zinc-800"
        />

        <ul className="space-y-12">
          {ROADMAP.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <li key={item.id} className="relative">
                {/* Node */}
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ type: "spring", stiffness: 120, damping: 12 }}
                  className="absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 rounded-full bg-zinc-200 shadow-[0_0_0_6px_rgba(255,255,255,0.06)]"
                />

                {/* Connector pulse */}
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: 0.05 }}
                  className="absolute left-1/2 top-3 -z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-zinc-200/10 blur-[2px]"
                />

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`group relative w-full md:w-[calc(50%-2rem)] ${
                    isLeft ? "md:pr-10 md:ml-0 md:mr-auto" : "md:pl-10 md:mr-0 md:ml-auto"
                  }`}
                >
                  <article
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-sm backdrop-blur transition-colors group-hover:border-zinc-700"
                  >
                    <header className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-medium leading-tight">
                        {item.title}
                      </h3>
                      {phaseBadge(item.phase)}
                    </header>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {item.desc}
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-zinc-800 bg-zinc-950 px-2 py-0.5 text-xxs text-zinc-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                </motion.div>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div id="feedback" className="mt-16 flex items-center justify-center">
          <a
            href="/feedback"
            className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-700"
          >
            <Rocket className="h-4 w-4" /> Suggest a feature
          </a>
        </div>
      </main>

      {/* tiny util styles */}
      <style jsx global>{`
        .text-xxs { font-size: 0.7rem; line-height: 1rem; }
      `}</style>
    </div>
  );
}
