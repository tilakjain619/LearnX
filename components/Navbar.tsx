"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sun, Moon, Menu, X } from 'lucide-react'

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const saved = typeof window !== "undefined" ? localStorage.getItem("site-theme") : null;
        const initial = saved === "light" || saved === "dark" ? saved : "dark";
        setTheme(initial);

        if (initial === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    function toggleTheme() {
        const next = theme === 'dark' ? 'light' : 'dark'
        setTheme(next)

        if (next === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

        localStorage.setItem('site-theme', next)
    }

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Learn", href: "/roadmap" },
        { name: "Features", href: "/#features" },
        { name: "Contact", href: "/#contact" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/80 dark:bg-black/50 backdrop-blur-xl border-b border-zinc-200 dark:border-white/5'
                    : 'bg-transparent border-transparent'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* left: logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg transition-colors">
                            L
                        </div>
                        <span className="font-semibold text-lg text-zinc-900 dark:text-white tracking-tight transition-colors">LearnX</span>
                    </Link>

                    {/* center: links */}
                    <div className="hidden md:flex md:items-center md:gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* right: actions */}
                    <div className="flex items-center gap-6">
                        <a
                            href="https://github.com/tilakjain619/LearnX"
                            target="_blank"
                            rel="noreferrer"
                            className="hidden sm:block text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                            GitHub
                        </a>
                        <button
                            aria-label="toggle theme"
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {/* mobile menu button */}
                        <button
                            className="md:hidden p-2 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                            onClick={() => setOpen(o => !o)}
                            aria-expanded={open}
                            aria-label="Open menu"
                        >
                            {open ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile nav */}
                {open && (
                    <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-zinc-200 dark:border-white/10 animate-in slide-in-from-top-5">
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                                    onClick={() => setOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <a
                                href="https://github.com/tilakjain619/LearnX"
                                target="_blank"
                                rel="noreferrer"
                                className="text-lg font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}