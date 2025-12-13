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
    <header className="sticky top-0 z-40 bg-white dark:bg-zinc-900 transition-colors">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="font-semibold text-gray-900 dark:text-white">
              LearnX
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden sm:flex items-center gap-6">
            {[
              { name: "Home", href: "/" },
              { name: "Create", href: "/create" },
              { name: "Product Roadmap", href: "/roadmap" },
              { name: "Curated Roadmaps", href: "/roadmaps" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-200 
                           hover:text-gray-900 dark:hover:text-white transition"
              >
                {item.name}
              </Link>
            ))}

            <a
              href="https://github.com/tilakjain619/LearnX"
              target="_blank"
              rel="noreferrer"
              className="text-gray-700 dark:text-gray-200 
                         hover:text-gray-900 dark:hover:text-white transition"
            >
              GitHub
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-white" />
              ) : (
                <Moon size={18} className="text-gray-900" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden p-2 rounded-md 
                         hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label="Open menu"
            >
              {open ? (
                <X size={20} className="text-gray-900 dark:text-white" />
              ) : (
                <Menu size={20} className="text-gray-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="sm:hidden mt-2 pb-4 
                          bg-white dark:bg-zinc-900 
                          border-t border-gray-200 dark:border-gray-800 transition">
            <div className="flex flex-col gap-2 px-2 pt-2">
              {[
                { name: "Home", href: "/" },
                { name: "Create", href: "/create" },
                { name: "Product Roadmap", href: "/roadmap" },
                { name: "Curated Roadmaps", href: "/roadmaps" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 rounded-md 
                             text-gray-700 dark:text-gray-200
                             hover:bg-gray-100 dark:hover:bg-gray-800
                             hover:text-gray-900 dark:hover:text-white transition"
                >
                  {item.name}
                </Link>
              ))}

              <a
                href="https://github.com/tilakjain619/LearnX"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-md 
                           text-gray-700 dark:text-gray-200
                           hover:bg-gray-100 dark:hover:bg-gray-800
                           hover:text-gray-900 dark:hover:text-white transition"
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
