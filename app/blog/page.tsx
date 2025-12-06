import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// 1. This is your blog data. Later, we can move this to a database or Markdown files.
const posts = [
    {
        slug: 'migrating-to-nextjs-app-router',
        title: 'Migrating from React Router to Next.js App Router',
        date: 'Dec 02, 2025',
        excerpt: 'Why I decided to make the switch and how it improved my site performance by 40%.'
    },
    {
        slug: 'building-accessible-forms',
        title: 'Building Accessible Forms with React',
        date: 'Nov 15, 2025',
        excerpt: 'Accessibility is not an afterthought. Here is a guide to building inclusive forms.'
    },
    {
        slug: 'my-vs-code-setup',
        title: 'My VS Code Setup for 2025',
        date: 'Oct 28, 2025',
        excerpt: 'A list of extensions, themes, and settings I use to stay productive.'
    }
]

export default function BlogIndex() {
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
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Writing.</h1>
                <p className="text-gray-500 max-w-lg text-lg">
                    Thoughts on software development, design, and building products.
                </p>
            </div>

            {/* Blog List (Time Series) */}
            <div className="space-y-10 border-t border-gray-100 pt-10">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="block group"
                    >
                        <article className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-10">
                            <span className="text-sm text-gray-400 w-32 shrink-0 font-mono">
                                {post.date}
                            </span>
                            <div className="space-y-2">
                                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-gray-500 leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <div className="text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity pt-1">
                                    Read Article &rarr;
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    )
}