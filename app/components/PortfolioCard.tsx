import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface PortfolioCardProps {
    category: string;
    title: string;
    description: string;
    meta: string;
    icon: React.ReactNode;
    href: string;
}

export function PortfolioCard({
    category,
    title,
    description,
    meta,
    icon,
    href
}: PortfolioCardProps) {
    return (
        <Link
            href={href}
            className="group relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-gray-50/50 p-6 transition-all hover:bg-white hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50 dark:hover:bg-gray-900"
        >
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {category}
                    </span>
                    <ArrowUpRight className="size-4 text-gray-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>

                <h3 className="mb-2 font-geist text-lg font-bold text-black dark:text-white">
                    {title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-2">
                    {description}
                </p>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-gray-200/50 pt-4 dark:border-gray-700/50">
                <span className="text-xs font-mono font-medium uppercase tracking-wider text-gray-400">
                    {meta}
                </span>
                <div className="text-gray-300 transition-colors group-hover:text-black dark:group-hover:text-white">
                    {icon}
                </div>
            </div>
        </Link>
    );
}