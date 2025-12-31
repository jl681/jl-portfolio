import { getNowStream } from "@/lib/posts";
import { BookOpen, Coffee, Cpu, HelpCircle } from "lucide-react";
import Link from "next/link";

const ICON_MAP: Record<string, any> = {
    coding: <Cpu className="size-3.5 text-gray-500" />,
    reading: <BookOpen className="size-3.5 text-gray-500" />,
    life: <Coffee className="size-3.5 text-gray-500" />,
};

export default async function NowStream() {
    const logs = getNowStream().slice(0, 5);

    return (
        <section className="py-24 border-b border-gray-100 dark:border-gray-900">
            <div className="container mx-auto px-6 max-w-3xl">

                <div className="mb-12 flex items-baseline justify-between">
                    <h2 className="font-geist text-3xl font-bold tracking-tight text-black dark:text-white">
                        System Log
                    </h2>
                    <Link
                        href="/log"
                        className="hidden sm:inline-block text-xs font-mono text-gray-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-widest"
                    >
                        View Full History →
                    </Link>
                </div>
                <div className="relative border-l border-gray-200 ml-3 space-y-8 dark:border-gray-800">
                    {logs.map((log) => {
                        const slug = log.id.replace(/\.md$/, "");

                        return (
                            <div key={log.id} className="relative pl-8 group cursor-pointer">

                                {/* 1. The Dot (Centered perfectly on the line) */}
                                <div className="absolute -left-4 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 transition-transform group-hover:scale-110">
                                    {ICON_MAP[log.type] || <HelpCircle className="size-3.5 text-gray-400" />}
                                </div>

                                {/* 2. The Content (Side-by-Side on Desktop) */}
                                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 pt-1.5">

                                    {/* Date Column (Fixed width for alignment) */}
                                    <time className="shrink-0 text-xs font-mono text-gray-400 w-32">
                                        {new Date(log.date).toLocaleDateString('en-US', {
                                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                    </time>

                                    {/* Content Column */}
                                    <Link
                                        href={`/log/${slug}`}
                                        className="block group/link"
                                    >
                                        <div className="font-mono text-sm text-gray-800 dark:text-gray-200 group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors">
                                            {/* Line clamp ensures it stays neat */}
                                            <span className="line-clamp-2 md:line-clamp-1">
                                                {log.content}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}

                    <div className="pl-8 pt-4">
                        <span className="text-xs font-mono italic text-gray-400">End of recent logs...</span>
                    </div>
                </div>

                <div className="mt-8 sm:hidden">
                    <Link
                        href="/log"
                        className="block w-full text-center rounded-lg border border-gray-200 bg-white py-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
                    >
                        View Full History
                    </Link>
                </div>

            </div>
        </section>
    );
}