"use client";


import { useEffect } from "react";
import Link from "next/link";
import { Rocket, Github, Map } from "lucide-react";

import Footer from "@/components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <main className="min-h-screen bg-black text-zinc-100 flex flex-col items-center justify-center pt-15 lg:pt-24">
      <div className="max-w-3xl mx-auto mt-8 md:mt-0 text-center px-6 md:px-0">
        <h1 data-aos="fade-down" className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Learn anything. Instantly.
        </h1>
        <p data-aos="fade-out" className="mt-4 text-zinc-400 text-base sm:text-lg">
          Type a topic. AI generates a structured learning path. Follow step-by-step.
        </p>

        <div data-aos="fade-up" className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/roadmap"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm hover:bg-zinc-800"
          >
            <Map className="h-4 w-4" /> Product Roadmap
          </Link>

          <a
            href="https://github.com/tilakjain619/LearnX"
            target="_blank"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm hover:bg-zinc-800"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>

          <Link
            href="/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-500 bg-indigo-600 px-4 py-2 text-sm hover:bg-indigo-500"
          >
            <Rocket className="h-4 w-4" /> Start Creating Topic
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <section className="mt-20 w-[90%] md:w-[75%] mx-auto">
        <h2 data-aos="fade-in" className="text-2xl font-semibold tracking-tight text-center mb-10">Why LearnX?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "AI Powered", desc: "Type a topic → AI creates a syllabus with modules and lesson breakdown." },
            { title: "Community Driven", desc: "Anyone can publish, teach, share and learn from others." },
            { title: "Multi Category", desc: "Tech, Fitness, Cooking, Finance, DIY, Languages, etc." },
            { title: "Track Progress", desc: "Mark lessons complete, watch your progress grow." },
            { title: "Micro Assignments", desc: "Mini tasks in every topic to make learning actionable." },
            { title: "No Overload", desc: "Simple lessons, short readable content. No long boring notes." },
          ].map((feature, index) => (
            <div key={feature.title}>
              <div data-aos={index < 3 ? "fade-up" : "fade-down"} className="border border-zinc-800 bg-zinc-900/50 rounded-2xl p-6">
                <h3 className="font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
