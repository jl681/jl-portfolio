
import { getFeaturedWork } from "@/lib/posts";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import { PortfolioCard } from "./PortfolioCard";

export default async function FeaturedWork() {
    const allWorks = getFeaturedWork();
    const featuredWorks = allWorks.slice(0, 4);

    return (
        <section className="py-24">
            <div className="container mx-auto px-6 max-w-3xl">

                {/* Header */}
                <div className="mb-12 flex items-baseline justify-between">
                    <h2 className="font-geist text-3xl font-bold tracking-tight text-black dark:text-white">
                        Selected Artifacts
                    </h2>
                    <Link
                        href="/work"
                        className="group hidden sm:inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white"
                    >o
                        View Archive <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {featuredWorks.map((work) => (
                        <PortfolioCard
                            key={work.slug}
                            title={work.title}
                            category={work.category}
                            description={work.description}
                            meta={work.tags.slice(0, 3).join(" • ")}
                            href={`/work/${work.slug}`}
                            icon={getIconForCategory(work.category)}
                        />
                    ))}
                </div>

                {/* Mobile-only "View All" Button */}
                <div className="mt-8 sm:hidden">
                    <Link
                        href="/work"
                        className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-800 dark:bg-black dark:text-white dark:hover:bg-gray-900"
                    >
                        View All Projects
                    </Link>
                </div>

            </div>
        </section>
    );
}

// Helper (Keep this in the file or move to a util)
function getIconForCategory(category: string) {
    return <Terminal className="size-5" />
    // const lowerCat = category.toLowerCase();
    // if (lowerCat.includes("system") || lowerCat.includes("backend")) return <Terminal className="size-5" />;
    // if (lowerCat.includes("learning") || lowerCat.includes("note")) return <BookOpen className="size-5" />;
    // if (lowerCat.includes("architecture") || lowerCat.includes("cloud")) return <GitCommit className="size-5" />;
    // return <LayoutTemplate className="size-5" />;
}