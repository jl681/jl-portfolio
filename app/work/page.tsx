import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function WorkPage() {
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
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Selected Work.</h1>
                <p className="text-gray-500 max-w-lg text-lg">
                    A collection of projects exploring performance, accessibility, and design.
                </p>
            </div>

            {/* The Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-gray-100 pt-10">

                {/* Project Card 1 */}
                <div className="group space-y-4 cursor-pointer">
                    <div className="aspect-4/3 bg-gray-100 rounded-xl overflow-hidden relative border border-gray-100">
                        {/* Placeholder for Image */}
                        <div className="w-full h-full bg-gray-100 group-hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-400">
                            Project Image
                        </div>
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">E-Commerce Dashboard</h3>
                            <p className="text-gray-500 text-sm mt-1">Next.js • Tailwind • Stripe</p>
                        </div>
                        <ArrowUpRight size={18} className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                </div>

                {/* Project Card 2 */}
                <div className="group space-y-4 cursor-pointer">
                    <div className="aspect-4/3 bg-gray-100 rounded-xl overflow-hidden relative border border-gray-100">
                        <div className="w-full h-full bg-gray-100 group-hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-400">
                            Project Image
                        </div>
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">AI Chat Interface</h3>
                            <p className="text-gray-500 text-sm mt-1">React • OpenAI API</p>
                        </div>
                        <ArrowUpRight size={18} className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                </div>

                {/* Project Card 3 (Example of adding more) */}
                <div className="group space-y-4 cursor-pointer">
                    <div className="aspect-4/3 bg-gray-100 rounded-xl overflow-hidden relative border border-gray-100">
                        <div className="w-full h-full bg-gray-100 group-hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-400">
                            Project Image
                        </div>
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Finance Tracker</h3>
                            <p className="text-gray-500 text-sm mt-1">Mobile App • Swift</p>
                        </div>
                        <ArrowUpRight size={18} className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                </div>

            </div>
        </div>
    )
}