import { getAllLogSlugs, getLogBySlug } from "@/lib/posts";
import { ArrowLeft, BookOpen, Calendar, Coffee, Cpu, HelpCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";


// Icon mapping (same as NowStream)
const ICON_MAP: Record<string, any> = {
    coding: <Cpu className="size-5 text-gray-500" />,
    reading: <BookOpen className="size-5 text-gray-500" />,
    life: <Coffee className="size-5 text-gray-500" />,
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = getAllLogSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function LogPage({ params }: PageProps) {
    const { slug } = await params;
    const log = await getLogBySlug(slug);

    if (!log) return notFound();

    return (
        <article className="min-h-screen bg-white py-24 dark:bg-black dark:text-white">
            <div className="container mx-auto px-6 max-w-2xl">

                {/* Navigation */}
                <Link
                    href="/#now-stream"
                    className="group mb-12 inline-flex items-center text-sm font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                    <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
                    Back to Stream
                </Link>

                {/* Header: "Log" Aesthetic */}
                <header className="mb-10 flex items-start gap-4 border-b border-gray-100 pb-8 dark:border-gray-800">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-50 border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                        {ICON_MAP[log.type] || <HelpCircle className="size-5 text-gray-400" />}
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                {log.type}
                            </span>
                            <div className="flex items-center gap-1 text-sm text-gray-400 font-mono">
                                <Calendar className="size-3" />
                                <time>{new Date(log.date).toLocaleDateString()}</time>
                            </div>
                        </div>
                        {/* Optional Title if you added one to frontmatter, otherwise just Date */}
                        <h1 className="font-geist text-2xl font-bold">
                            {log.title !== "Log Entry" ? log.title : `Log: ${new Date(log.date).toLocaleDateString()}`}
                        </h1>
                    </div>
                </header>

                {/* Content */}
                <div
                    className="
            prose prose-lg dark:prose-invert 
            prose-p:font-mono prose-p:text-sm prose-p:leading-relaxed
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            max-w-none
          "
                    dangerouslySetInnerHTML={{ __html: log.contentHtml }}
                />

            </div>
        </article>
    );
}