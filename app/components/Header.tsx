"use client"; // Required for potential scroll interactions

import { Box, Terminal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    const NAV_ITEMS = [
        {
            label: "Log",
            href: isHome ? "#now-stream" : "/#now-stream",
            icon: <Terminal className="size-4" />,
            description: "Daily updates & learning log",
        },
        {
            label: "Work",
            href: isHome ? "#featured-work" : "/#featured-work",
            icon: <Box className="size-4" />,
            description: "Deep dives & case studies",
        },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50 bg-white/80 backdrop-blur-md dark:border-gray-800/50 dark:bg-black/80">
            <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4">


                <Link
                    href="/"
                    className="flex items-center gap-2 font-geist text-lg font-bold tracking-tight hover:opacity-70 transition-opacity"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black">
                        <span className="font-mono text-sm">JL</span>
                    </div>
                    <span className="hidden sm:inline-block">Dev</span>
                </Link>


                <nav className="flex items-center gap-6">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="group flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                        >
                            <span className="text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                                {item.icon}
                            </span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}