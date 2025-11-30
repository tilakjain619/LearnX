"use client";

import { use, useEffect, useState } from "react";
import { CURATED_ROADMAPS } from "../data";

export default function RoadmapDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const roadmap = CURATED_ROADMAPS.find((r) => r.slug === slug);

  const [done, setDone] = useState<Record<number, boolean>>({});
  const [progress, setProgress] = useState(0);

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem(`progress-${slug}`);
    if (saved) setDone(JSON.parse(saved));
  }, [slug]);

  // Update progress
  useEffect(() => {
    if (!roadmap) return;

    const total = roadmap.steps.length;
    const completed = roadmap.steps.filter((s) => done[s.id]).length;

    const pct = Math.round((completed / total) * 100);
    setProgress(pct);

    localStorage.setItem(`progress-${slug}`, JSON.stringify(done));

    const all = JSON.parse(localStorage.getItem("learnx-roadmap-progress") || "{}");
    all[slug] = pct;
    localStorage.setItem("learnx-roadmap-progress", JSON.stringify(all));
  }, [done, roadmap, slug]);

  if (!roadmap) {
    return (
      <div className="text-white text-center py-20">
        <h1 className="text-3xl font-bold">Roadmap Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      {/* Centered container */}
      <div className="max-w-5xl mx-auto px-4 py-16">

        {/* Header */}
        <h1 className="text-4xl font-bold">{roadmap.title}</h1>

        <p className="text-zinc-400 mt-2">Your progress: {progress}% completed</p>

        {/* Progress bar */}
        <div className="w-full bg-zinc-800 h-2 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps */}
        <div className="mt-10 space-y-6">
          {roadmap.steps.map((step) => (
            <div
              key={step.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition"
            >
              {/* Title + checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={done[step.id] || false}
                  onChange={() =>
                    setDone((prev) => ({ ...prev, [step.id]: !prev[step.id] }))
                  }
                  className="h-5 w-5 accent-emerald-500 mt-1"
                />
                <div>
                  <h2 className="text-xl font-semibold">{step.title}</h2>

                  {/* Resources */}
                  <div className="mt-3 space-y-1">
                    {step.resources.map((res) => (
                      <a
                        key={res.url}
                        href={res.url}
                        target="_blank"
                        className="block text-blue-400 hover:text-blue-300 text-sm"
                      >
                        • {res.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
