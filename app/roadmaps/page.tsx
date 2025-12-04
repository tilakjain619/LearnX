"use client";

import { CURATED_ROADMAPS } from "./data";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function CuratedRoadmaps() {
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem("learnx-roadmap-progress");
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100 pt-20">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center px-6">
        <h1 className="text-4xl font-bold">Curated Roadmaps</h1>
        <p className="mt-3 text-zinc-400 text-sm">
          Choose a domain to start learning step-by-step.
        </p>
      </section>

      {/* Cards */}
      <section className="max-w-6xl mx-auto px-6 mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {CURATED_ROADMAPS.map((rm) => {
          const pct = progress[rm.slug] || 0;

          return (
            <a
              key={rm.id}
              href={`/roadmaps/${rm.slug}`}
              className="
                block rounded-2xl p-6 
                bg-zinc-900 border border-zinc-800
                hover:border-zinc-600 hover:bg-zinc-800/60 transition
              "
            >
              {/* Title */}
              <h2 className="text-xl font-semibold mb-4">{rm.title}</h2>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${pct}%` }}
                ></div>
              </div>

              {/* Progress text */}
              <p className="mt-2 text-sm text-zinc-400">
                {pct}% completed
              </p>

              {/* CTA */}
              <p className="mt-4 text-sm text-blue-400 inline-flex items-center">
                View Roadmap <ArrowRight size={16} className="ml-1" />
              </p>
            </a>
          );
        })}
      </section>
    </div>
  );
}
