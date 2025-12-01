"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Rocket, Github, Map } from "lucide-react";

import AOS from "aos";
import "aos/dist/aos.css";

export default function HomePage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <main
        className="min-h-screen text-zinc-100 flex flex-col items-center justify-start pt-24"
        style={{
          background:
            `radial-gradient(1200px 400px at 10% 10%, rgba(124,58,237,0.08), transparent 8%),
             radial-gradient(900px 300px at 90% 90%, rgba(6,182,212,0.04), transparent 8%),
             linear-gradient(180deg,#000000 0%, #050508 35%)`,
          backgroundBlendMode: "screen, screen, normal",
        }}
      >
        <div className="max-w-3xl mx-auto mt-8 md:mt-0 text-center px-6 md:px-0">
          <h1
            data-aos="fade-down"
            className="text-4xl font-semibold tracking-tight sm:text-5xl leading-tight"
            style={{ color: "rgba(250,250,250,0.98)" }}
          >
            Learn anything. Instantly.
          </h1>

          <p data-aos="fade-out" className="mt-4 text-zinc-400 text-base sm:text-lg">
            Type a topic. AI generates a structured learning path. Follow step-by-step.
          </p>

          <div
            data-aos="fade-up"
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              href="/roadmap"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm hover:bg-zinc-800 transition transform hover:-translate-y-0.5"
            >
              <Map className="h-4 w-4" /> Product Roadmap
            </Link>

            <a
              href="https://github.com/tilakjain619/LearnX"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm hover:bg-zinc-800 transition transform hover:-translate-y-0.5"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>

            <Link
              href="/create"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-500 bg-indigo-600 px-4 py-2 text-sm hover:bg-indigo-500 transition transform hover:-translate-y-0.5"
            >
              <Rocket className="h-4 w-4" /> Start Creating Topic
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-20 w-[90%] md:w-[75%] mx-auto pb-20">
          <h2
            data-aos="fade-in"
            className="text-2xl font-semibold tracking-tight text-center mb-10"
          >
            Why LearnX?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "AI Powered",
                desc: "Type a topic → AI creates a syllabus with modules and lesson breakdown.",
                icon: "🤖",
              },
              {
                title: "Community Driven",
                desc: "Anyone can publish, teach, share and learn from others.",
                icon: "🤝",
              },
              {
                title: "Multi Category",
                desc: "Tech, Fitness, Cooking, Finance, DIY, Languages, etc.",
                icon: "📚",
              },
              {
                title: "Track Progress",
                desc: "Mark lessons complete, watch your progress grow.",
                icon: "📈",
              },
              {
                title: "Micro Assignments",
                desc: "Mini tasks in every topic to make learning actionable.",
                icon: "📝",
              },
              {
                title: "No Overload",
                desc: "Simple lessons, short readable content. No long boring notes.",
                icon: "✨",
              },
            ].map((feature, index) => (
              <div key={feature.title} data-aos={index < 3 ? "fade-up" : "fade-down"}>
                <div className="group border border-zinc-800 bg-zinc-900/50 rounded-2xl p-6 hover:scale-[1.02] transition transform">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-lg bg-zinc-800/40 flex items-center justify-center text-xl">
                        <span aria-hidden>{feature.icon}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-zinc-100">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-zinc-400">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
