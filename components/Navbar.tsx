"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("site-theme")
        : null;

    const initial =
      saved === "light" || saved === "dark" ? saved : "dark";
    setTheme(initial);

    if (initial === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);

    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("site-theme", next);
  }

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link href="/" className="font-semibold text-gray-900 dark:text-white">
            LearnX
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-6">
            {["Home", "Create"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white"
              >
                {item}
              </Link>
            ))}

            <Link
              href="/roadmap"
              className="text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white"
            >
              Product Roadmap
            </Link>

            <Link
              href="/roadmaps"
              className="text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white"
            >
              Curated Roadmaps
            </Link>

            <a
              href="https://github.com/tilakjain619/LearnX"
              target="_blank"
              rel="noreferrer"
              className="text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white"
            >
              GitHub
            </a>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              aria-label="toggle theme"
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-800 dark:text-white"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile menu button */}
            <button
              className="sm:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-800 dark:text-white"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="sm:hidden mt-2 pb-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-2 px-2">
              {[
                { label: "Home", href: "/" },
                { label: "Create", href: "/create" },
                { label: "Product Roadmap", href: "/roadmap" },
                { label: "Curated Roadmaps", href: "/roadmaps" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {item.label}
                </Link>
              ))}

              <a
                href="https://github.com/tilakjain619/LearnX"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                GitHub
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
