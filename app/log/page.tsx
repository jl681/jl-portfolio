
import { getNowStream } from "@/lib/posts";
import { ArrowLeft, ArrowRight, BookOpen, Coffee, Cpu, HelpCircle } from "lucide-react";
import Link from "next/link";

// Icon Map (Duplicate or move to a shared util like @/lib/icons.tsx)
const ICON_MAP: Record<string, any> = {
    coding: <Cpu className="size-4 text-gray-500" />,
    reading: <BookOpen className="size-4 text-gray-500" />,
    life: <Coffee className="size-4 text-gray-500" />,
};

export default function LogArchivePage() {
    const logs = getNowStream();

    return (
        <div className="min-h-screen bg-white py-24 dark:bg-black dark:text-white">
            <div className="container mx-auto px-6 max-w-2xl">

                {/* Navigation */}
                <div className="mb-12">
                    <Link
                        href="/"
                        className="group inline-flex items-center text-sm font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white mb-8"
                    >
                        <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
                        Return to Console
                    </Link>

                    <h1 className="font-geist text-3xl font-bold tracking-tight mb-2">
                        System Logs
                    </h1>
                </div>

                {/* The Full Timeline */}
                <div className="relative border-l border-gray-200 ml-3 space-y-12 dark:border-gray-800">
                    {logs.map((log) => {
                        const slug = log.id.replace(/\.md$/, "");

                        return (
                            <div key={log.id} className="relative pl-10 group">

                                {/* Icon Marker */}
                                <div className="absolute -left-[19px] top-1 flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                    {ICON_MAP[log.type] || <HelpCircle className="size-4 text-gray-400" />}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <time className="text-xs font-mono text-gray-400">
                                        {new Date(log.date).toLocaleDateString('en-US', {
                                            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                    </time>

                                    <Link
                                        href={`/log/${slug}`}
                                        className="group/link block"
                                    >
                                        <p className="font-mono text-sm text-gray-800 dark:text-gray-200 leading-relaxed group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors">
                                            {log.content}
                                        </p>
                                        <div className="flex items-center gap-1 text-xs font-medium text-blue-600 opacity-0 transition-opacity group-hover/link:opacity-100 mt-2">
                                            View Details <ArrowRight className="size-3" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* End of File Marker */}
                <div className="mt-12 border-t border-dashed border-gray-200 pt-8 dark:border-gray-800 text-center">
                    <span className="font-mono text-xs text-gray-400">End of stream.</span>
                </div>

            </div>
        </div>
    );
}