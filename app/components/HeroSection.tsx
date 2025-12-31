export default function HeroSection() {
    return (
        <section className="pt-24 pb-8 md:pt-36 md:pb-16">
            <div className="container mx-auto px-6 max-w-3xl">
                <h1 className="font-geist text-5xl font-bold tracking-tight text-black dark:text-white md:text-7xl leading-[1.1]">
                    Architecting <br />
                    <span className="text-gray-400 dark:text-gray-500">
                        scalable systems.
                    </span>
                </h1>

                <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-lg font-mono">
                    Specializing in Java, Cloud Native, and Distributed Architecture.
                </p>
            </div>
        </section>
    );
}
