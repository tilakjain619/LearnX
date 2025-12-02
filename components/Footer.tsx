import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/tilakjain619/LearnX" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Email", icon: Mail, href: "mailto:support@learnx.com" },
]

const Footer = () => {
  return (
    <footer className="bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-white/10 w-full transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors">LearnX</span>
            </Link>
            <p className="text-zinc-600 dark:text-zinc-500 text-sm leading-relaxed max-w-sm transition-colors">
              Master any subject with AI-generated structured learning paths.
              Simple, effective, and free for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-6 transition-colors">Platform</h3>
            <ul className="space-y-4">
              {["Home", "Roadmap", "Features", "Contact"].map((link) => (
                <li key={link}>
                  <Link href={`/${link === "Home" ? "" : link.toLowerCase()}`} className="text-zinc-600 dark:text-zinc-500 hover:text-black dark:hover:text-white text-sm transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-6 transition-colors">Connect</h3>
            <ul className="space-y-4">
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-zinc-600 dark:text-zinc-500 hover:text-black dark:hover:text-white text-sm transition-colors group"
                  >
                    <Icon className="h-4 w-4" />
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 transition-colors">
          <p className="text-zinc-500 text-xs">
            &copy; {new Date().getFullYear()} LearnX. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-400 text-xs transition-colors">Privacy</Link>
            <Link href="/terms" className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-400 text-xs transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer