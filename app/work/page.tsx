
import { getFeaturedWork } from "@/lib/posts";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { PortfolioCard } from "../components/PortfolioCard";

function getIconForCategory(category: string) {
    return <BookOpen className="size-5" />
    // const lowerCat = category.toLowerCase();
    // if (lowerCat.includes("system") || lowerCat.includes("backend")) return <Terminal className="size-5" />;
    // if (lowerCat.includes("learning") || lowerCat.includes("note")) return <BookOpen className="size-5" />;
    // if (lowerCat.includes("architecture") || lowerCat.includes("cloud")) return <GitCommit className="size-5" />;
    // return <LayoutTemplate className="size-5" />;
}

export default async function WorkArchivePage() {
    const works = getFeaturedWork(); // ✅ GET ALL ITEMS

    return (
        <div className="min-h-screen bg-white py-24 dark:bg-black dark:text-white">
            <div className="container mx-auto px-6 max-w-3xl">

                <div className="mb-12">
                    <Link
                        href="/"
                        className="group inline-flex items-center text-sm font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white mb-8"
                    >
                        <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
                        Back Home
                    </Link>

                    <h1 className="font-geist text-4xl font-bold tracking-tight mb-4">
                        The Archive
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        A complete collection of my engineering notes, case studies, and architectural patterns.
                    </p>
                </div>

                {/* The Full Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {works.map((work) => (
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

            </div>
        </div>
    );
}