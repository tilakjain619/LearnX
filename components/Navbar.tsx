"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Sun, Moon, Menu, X, User, LogOut } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
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

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-zinc-900">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <span className="font-semibold text-gray-900 dark:text-white">
                LearnX
              </span>
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden sm:flex sm:items-center sm:gap-6">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"

            >
              Home
            </Link>

            <Link
              href="/learnpath-generator"
              className="text-gray-700 dark:text-gray-200 hover:text-white"
            >
              Create
            </Link>

            {/* Product Roadmap (existing) */}
            <Link
              href="/roadmap"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              Product Roadmap
            </Link>

            {/* NEW: Learning Roadmaps */}
            <Link
              href="/roadmaps"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              Curated Roadmaps
            </Link>

            <a
              href="https://github.com/tilakjain619/LearnX"
              target="_blank"
              rel="noreferrer"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              GitHub
            </a>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {session ? (
              <>
                {/* Desktop: Profile link and logout */}
                <div className="hidden sm:flex sm:items-center sm:gap-3">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                        <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                    )}
                    <span className="text-sm font-medium">
                      {session.user?.name || "Profile"}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <LogOut size={16} />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Desktop: Login/Signup links */}
                <div className="hidden sm:flex sm:items-center sm:gap-3">
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-gray-100 transition-colors text-sm font-medium"
                  >
                    Sign up
                  </Link>
                </div>
              </>
            )}

            <button
              aria-label="toggle theme"
              onClick={toggleTheme}
              className="p-2 rounded-md
    bg-gray-200 dark:bg-gray-900
    text-gray-900 dark:text-white
    hover:bg-gray-300 dark:hover:bg-gray-800
    transition-colors duration-200"
            >
              {theme === "dark" ? (
                <Sun size={18}/>
              ) : (
                <Moon size={18} />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="sm:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label="Open menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="sm:hidden mt-2 pb-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-2 px-2">
              <Link href="/"  className="block px-3 py-2 rounded-md">
                Home
              </Link>

              <Link href="/learnpath-generator" className="block px-3 py-2 rounded-md">
                Create
              </Link>

              <Link href="/roadmap" className="block px-3 py-2 rounded-md">
                Product Roadmap
              </Link>

              {/* NEW: Learning Roadmaps on mobile */}
              <Link href="/roadmaps" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
                Curated Roadmaps
              </Link>

              {session ? (
                <>
                  <Link href="/profile" className="block px-3 py-2 rounded-md flex items-center gap-2">
                    <User size={16} />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-3 py-2 rounded-md text-left flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-3 py-2 rounded-md">
                    Sign in
                  </Link>
                  <Link href="/signup" className="block px-3 py-2 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-black">
                    Sign up
                  </Link>
                </>
              )}

              <a
                href="https://github.com/tilakjain619/LearnX"
                target="_blank"
                rel="noreferrer"
                className="block px-3 py-2 rounded-md"
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