"use client";

import React, { useState, useEffect } from 'react'
import { Home, BookOpen, Layers, Mail, Sun, Moon } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export default function Navbar() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')

    useEffect(() => {
        const saved = typeof window !== "undefined" ? localStorage.getItem("site-theme") : null;
        const initial = saved === "light" || saved === "dark" ? saved : "dark";
        setTheme(initial);

        if (initial === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
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

    const navItems = [
        { name: 'Home', url: '/', icon: Home },
        { name: 'Learn', url: '/roadmap', icon: BookOpen },
        { name: 'Features', url: '/#features', icon: Layers },
        { name: 'Contact', url: '/#contact', icon: Mail }
    ];

    return (
        <>
            <NavBar items={navItems} />
            <button
                aria-label="toggle theme"
                onClick={toggleTheme}
                className="fixed top-6 right-6 z-50 p-2 rounded-full bg-background/10 backdrop-blur-md border border-border hover:bg-background/20 text-foreground transition-colors"
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </>
    )
}