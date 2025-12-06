import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function BlogPost({ params }: { params: { slug: string } }) {
    // In a real app, you would fetch content based on params.slug
    // For now, we will just show a static template to prove it works.

    return (
        <div className="max-w-3xl mx-auto space-y-12 animate-fade-in">

            {/* Back Button */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors text-sm font-medium">
                <ArrowLeft size={16} />
                Back to Writing
            </Link>

            {/* Post Header */}
            <header className="space-y-6">
                <div className="text-sm text-gray-400 font-mono">Published on Dec 02, 2025</div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                    Migrating from React Router to Next.js App Router
                </h1>
            </header>

            {/* Post Content (Placeholder) */}
            <article className="prose prose-gray prose-lg hover:prose-a:text-blue-600">
                <p>
                    This is where your actual blog post content will go. To keep things simple for now,
                    we are just displaying this placeholder text.
                </p>
                <p>
                    In the future, we can set this up to read <strong>Markdown files</strong> so you can write your posts
                    like a document and they will automatically appear here.
                </p>
                <h3>Why I made the switch</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </article>

        </div>
    )
}