

export default function HeroSection() {
    return (
        <section className="pt-32 pb-16 md:pt-48 md:pb-32">
            <div className="container mx-auto px-6 max-w-3xl">
                <h1 className="font-geist text-4xl font-bold tracking-tight text-black dark:text-white md:text-6xl leading-[1.1]">
                    Software Engineer <br />
                    <span className="text-gray-500 dark:text-gray-400">
                        architecting scalable systems.
                    </span>
                </h1>

                <p className="mt-8 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                    I specialize in <strong className="font-semibold text-black dark:text-white">Java, Cloud Native, and Distributed Architecture</strong>.
                    Currently working as a Consultant/Developer at Thoughtworks, focused on building
                    resilient backend services for enterprise clients.
                </p>
            </div>
        </section>
    );
}
