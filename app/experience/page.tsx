import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function ExperiencePage() {
    return (
        <div className="space-y-16 animate-fade-in">

            {/* Navigation: Back to Home */}
            <nav>
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors text-sm font-medium">
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
            </nav>

            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Experience.</h1>
                <p className="text-gray-500 max-w-lg text-lg">
                    My professional journey and career milestones.
                </p>
            </div>

            {/* Resume / Timeline Section */}
            <div className="border-t border-gray-100 pt-10 space-y-12">

                {/* Job 1 (Current) */}
                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 md:gap-10">
                    <div className="text-sm text-gray-400 font-mono pt-1">
                        2023 — Present
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-900">Senior Frontend Engineer</h3>
                        <div className="text-gray-500 font-medium">TechCompany Inc.</div>
                        <p className="text-gray-600 leading-relaxed max-w-2xl">
                            Leading the frontend migration from legacy code to Next.js. Improved site performance scores by 40% and established a new internal design system used by 5 different teams.
                        </p>
                        {/* Optional: Skills used in this job */}
                        <div className="flex gap-2 pt-2">
                            <span className="px-2 py-1 bg-gray-50 text-xs text-gray-500 rounded border border-gray-100">React</span>
                            <span className="px-2 py-1 bg-gray-50 text-xs text-gray-500 rounded border border-gray-100">GraphQL</span>
                        </div>
                    </div>
                </div>

                {/* Job 2 */}
                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 md:gap-10">
                    <div className="text-sm text-gray-400 font-mono pt-1">
                        2021 — 2023
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-900">Software Developer</h3>
                        <div className="text-gray-500 font-medium">Creative Agency NYC</div>
                        <p className="text-gray-600 leading-relaxed max-w-2xl">
                            Developed interactive websites for high-profile clients using React and WebGL. Collaborated closely with designers to ensure pixel-perfect implementation of Figma designs.
                        </p>
                    </div>
                </div>

                {/* Job 3 */}
                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 md:gap-10">
                    <div className="text-sm text-gray-400 font-mono pt-1">
                        2019 — 2021
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-900">Junior Web Developer</h3>
                        <div className="text-gray-500 font-medium">StartUp Hub</div>
                        <p className="text-gray-600 leading-relaxed max-w-2xl">
                            Built landing pages and email templates. Maintained the company WordPress blog and optimized images for faster loading speeds.
                        </p>
                    </div>
                </div>

            </div>

            {/* Optional: Download Resume Button */}
            <div className="pt-10">
                <a
                    href="/resume.pdf"
                    target="_blank"
                    className="inline-flex items-center gap-2 text-gray-900 font-semibold border-b border-gray-900 pb-0.5 hover:text-blue-600 hover:border-blue-600 transition-all"
                >
                    Download Full Resume
                    <ArrowUpRight size={16} />
                </a>
            </div>

        </div>
    )
}