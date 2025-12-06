import { getPostData, getSortedPostsData } from '@/lib/posts';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Notice we now await getPostData because it uses remark (which is async)
    const post = await getPostData(slug);

    return (
        <div className="max-w-3xl mx-auto space-y-12 animate-fade-in">

            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors text-sm font-medium">
                <ArrowLeft size={16} />
                Back to Writing
            </Link>

            <header className="space-y-6">
                <div className="text-sm text-gray-400 font-mono">Published on {post.date}</div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                    {post.title}
                </h1>
            </header>

            {/* RENDER THE HTML HERE */}
            {/* The 'prose' class automates the styling (h1, p, lists, bold, etc.) */}
            <article className="prose prose-lg prose-gray max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            </article>

        </div>
    )
}