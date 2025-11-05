import Link from "next/link";
import { Rocket, Github, Map } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 flex flex-col items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Learn anything. Instantly.
        </h1>
        <p className="mt-4 text-zinc-400 text-base sm:text-lg">
          Type a topic. AI generates a structured learning path. Follow step‑by‑step.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/roadmap"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm hover:bg-zinc-800"
          >
            <Map className="h-4 w-4" /> Product Roadmap
          </Link>

          <a
            href="https://github.com/"
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
      <section className="mt-20 max-w-5xl w-full">
        <h2 className="text-2xl font-semibold tracking-tight text-center mb-10">Why LearnX?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-zinc-800 bg-zinc-900/50 rounded-2xl p-6">
            <h3 className="font-medium mb-2">AI Powered</h3>
            <p className="text-sm text-zinc-400">Type a topic → AI creates a syllabus with modules and lesson breakdown.</p>
          </div>
          <div className="border border-zinc-800 bg-zinc-900/50 rounded-2xl p-6">
            <h3 className="font-medium mb-2">Community Driven</h3>
            <p className="text-sm text-zinc-400">Anyone can publish, teach, share and learn from others.</p>
          </div>
          <div className="border border-zinc-800 bg-zinc-900/50 rounded-2xl p-6">
            <h3 className="font-medium mb-2">Multi Category</h3>
            <p className="text-sm text-zinc-400">Tech, Fitness, Cooking, Finance, DIY, Languages, etc.</p>
          </div>
          <div className="border border-zinc-800 bg-zinc-900/50 rounded-2xl p-6">
            <h3 className="font-medium mb-2">Track Progress</h3>
            <p className="text-sm text-zinc-400">Mark lessons complete, watch your progress grow.</p>
          </div>
          <div className="border border-zinc-800 bg-zinc-900/50 rounded-2xl p-6">
            <h3 className="font-medium mb-2">Micro Assignments</h3>
            <p className="text-sm text-zinc-400">Mini tasks in every topic to make learning actionable.</p>
          </div>
          <div className="border border-zinc-800 bg-zinc-900/50 rounded-2xl p-6">
            <h3 className="font-medium mb-2">No Overload</h3>
            <p className="text-sm text-zinc-400">Simple lessons, short readable content. No long boring notes.</p>
          </div>
        </div>
      </section>

    </main>
  );
}
