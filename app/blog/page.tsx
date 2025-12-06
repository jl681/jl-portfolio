import { getSortedPostsData } from '@/lib/posts'; // Import our new helper
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BlogIndex() {
    const posts = getSortedPostsData(); // Fetch real posts from files

    return (
        <div className="space-y-16 animate-fade-in">
            <nav>
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors text-sm font-medium">
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
            </nav>

            <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Writing.</h1>
                <p className="text-gray-500 max-w-lg text-lg">
                    Thoughts on software development, design, and building products.
                </p>
            </div>

            <div className="space-y-10 border-t border-gray-100 pt-10">
                {posts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
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
    );
}