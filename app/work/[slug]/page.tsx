import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}


export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function WorkPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return notFound();
    }

    return (
        <article className="min-h-screen bg-white py-24 dark:bg-black dark:text-white">
            <div className="container mx-auto px-6 max-w-3xl">

                {/* Navigation */}
                <div className="mb-12">
                    <Link
                        href="/#featured-work"
                        className="group inline-flex items-center text-sm font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                    >
                        <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
                        Back to Work
                    </Link>
                </div>

                {/* Header */}
                <header className="mb-12 border-b border-gray-200 pb-8 dark:border-gray-800">
                    <div className="mb-6 flex gap-2">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                            {post.category}
                        </span>
                    </div>

                    <h1 className="mb-6 font-geist text-4xl font-bold tracking-tight md:text-5xl">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 text-sm font-mono text-gray-500">
                        <time>{post.date}</time>
                        <span>•</span>
                        <div className="flex gap-2">
                            {(post.tags as string[]).map((tag) => (
                                <span key={tag}>#{tag}</span>
                            ))}
                        </div>
                    </div>
                </header>
                <div
                    className="
            prose prose-lg max-w-none dark:prose-invert
            prose-headings:font-geist prose-headings:font-bold
            prose-code:text-sm prose-code:font-mono prose-code:bg-gray-100 dark:prose-code:bg-gray-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
          "
                    dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />

            </div>
        </article>
    );
}