import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="mt-24 border-t border-gray-100 py-12 dark:border-gray-900">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                    <div className="flex gap-4">
                        <a
                            href="https://github.com/jl681"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all text-sm font-medium dark:bg-white dark:text-black dark:hover:bg-gray-200"
                        >
                            <Github size={18} />
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/jing-li-9a74652a7/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all text-sm font-medium dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-200"
                        >
                            <Linkedin size={18} />
                            LinkedIn
                        </a>
                    </div>

                    {/* Email Call to Action */}
                    <a
                        href="mailto:jljanice23@gmail.com"
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                        <Mail size={16} />
                        <span>Get in touch</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}