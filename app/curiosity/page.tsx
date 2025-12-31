
import { CURIOSITY_ITEMS } from "@/lib/curiosity";
import { ArrowLeft, BookOpen, ExternalLink, Headphones, MonitorPlay, Wrench } from "lucide-react";
import Link from "next/link";

const ICON_MAP = {
    Reading: <BookOpen className="size-4" />,
    Listening: <Headphones className="size-4" />,
    Tooling: <Wrench className="size-4" />,
    Watching: <MonitorPlay className="size-4" />,
};

export default function CuriosityPage() {
    return (
        <div className="min-h-screen bg-white py-24 dark:bg-black dark:text-white">
            <div className="container mx-auto px-6 max-w-4xl">

                {/* Header */}
                <div className="mb-16">
                    <Link
                        href="/"
                        className="group inline-flex items-center text-sm font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white mb-8"
                    >
                        <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
                        Back Home
                    </Link>

                    <h1 className="font-geist text-4xl font-bold tracking-tight mb-4">
                        Cabinet of Curiosities
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
                        "You are what you eat." This is a collection of the books, podcasts, music, and tools feeding my brain right now.
                    </p>
                </div>

                {/* The Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CURIOSITY_ITEMS.map((item) => (
                        <div
                            key={item.id}
                            className="group relative flex flex-col rounded-xl border border-gray-100 bg-gray-50/50 p-6 transition-all hover:bg-white hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/50 dark:hover:bg-gray-900"
                        >
                            {/* Category Icon */}
                            <div className="mb-4 flex items-center justify-between text-gray-400">
                                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
                                    {ICON_MAP[item.category] || <BookOpen className="size-4" />}
                                    {item.category}
                                </div>
                                {item.link && <ExternalLink className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="font-geist text-lg font-bold text-gray-900 dark:text-gray-100">
                                    {item.title}
                                </h3>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {item.subtitle}
                                </p>

                                {/* The "Note" - Personal touch */}
                                {item.note && (
                                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-2 border-gray-200 pl-3 dark:border-gray-700">
                                        "{item.note}"
                                    </p>
                                )}
                            </div>

                            {/* Clickable Area Overlay */}
                            {item.link && (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 rounded-xl"
                                    aria-label={`View ${item.title}`}
                                />
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}