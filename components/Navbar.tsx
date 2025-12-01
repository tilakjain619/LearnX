"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X, Github, Map, Rocket } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/create", label: "Create" },
  { href: "/roadmap", label: "Roadmap" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const pathname = usePathname() || "/";

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("site-theme") : null;
    const initial = saved === "light" || saved === "dark" ? saved : "dark";
    setTheme(initial);

    if (initial === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("site-theme", next);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-[#0b0b0b]/95 backdrop-blur-sm border-b border-zinc-800">
      {/* changed to full-width wrapper to allow corner-aligned groups */}
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* LEFT: logo + nav */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
                LearnX
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-3" aria-label="Primary">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    "text-sm font-medium px-3 py-1 rounded-md transition " +
                    (isActive(item.href)
                      ? "text-white bg-zinc-800"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-800")
                  }
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}

              <a
                href="https://github.com/tilakjain619/LearnX"
                target="_blank"
                rel="noreferrer"
                className="ml-2 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 px-2 py-1 rounded-md transition"
                aria-label="LearnX on GitHub"
              >
                <Github className="h-4 w-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </nav>
          </div>

          {/* RIGHT: action buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              aria-label="toggle theme"
              onClick={toggleTheme}
              className="p-2 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Map className="h-4 w-4" />
              Roadmap
            </Link>

            <Link
              href="/create"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Rocket className="h-4 w-4" />
              Create
            </Link>
          </div>

          {/* MOBILE: menu toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              aria-label="toggle theme"
              onClick={toggleTheme}
              className="p-2 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              aria-label="Open menu"
              className="p-2 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transform-gpu transition-all origin-top ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden border-t border-zinc-800 bg-[#0b0b0b]`}
      >
        <div className="px-4 py-3 flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-md transition ${
                isActive(item.href) ? "bg-zinc-800 text-white" : "text-zinc-200 hover:bg-zinc-800"
              }`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}

          <a
            href="https://github.com/tilakjain619/LearnX"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-zinc-200 hover:bg-zinc-800"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>

          <div className="pt-2 flex gap-2">
            <Link
              href="/roadmap"
              onClick={() => setOpen(false)}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800 transition"
            >
              <Map className="h-4 w-4" />
              Roadmap
            </Link>

            <Link
              href="/create"
              onClick={() => setOpen(false)}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition"
            >
              <Rocket className="h-4 w-4" />
              Create
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
