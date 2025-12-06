import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-24 md:space-y-32">

      {/* --- HERO SECTION --- */}
      <section className="space-y-8 animate-fade-in">
        <nav className="flex justify-between items-center text-sm font-medium text-gray-500 mb-16">
          <span className="text-gray-900 font-bold">Alex Dev.</span>
          <div className="flex gap-6">
            {/* UPDATED LINK: Now points to /work instead of #work */}
            <Link href="/work" className="hover:text-black transition-colors">Work</Link>
            <Link href="/blog" className="hover:text-black transition-colors">Writing</Link>
            <Link href="/experience" className="hover:text-black transition-colors">Experience</Link>
          </div>
        </nav>

        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            Software Engineer building accessible digital products.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
            I specialize in React, Next.js, and TypeScript. Currently focused on building performant web applications with clean, gallery-like aesthetics.
          </p>

          <div className="flex gap-4 pt-2">
            <a
              href="https://github.com"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-medium"
            >
              <Github size={18} />
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:border-gray-400 transition-all text-sm font-medium"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="pt-10 pb-10 text-sm text-gray-400 flex justify-between items-center">
        <p>© 2024 Alex. All rights reserved.</p>
        <a href="mailto:alex@example.com" className="flex items-center gap-2 hover:text-gray-900 transition-colors">
          <Mail size={16} />
          Get in touch
        </a>
      </footer>

    </div>
  )
}