import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";
import { remark } from "remark";
import html from "remark-html";

const WORK_DIR = path.join(process.cwd(), "posts");
const STREAM_DIR = path.join(process.cwd(), "stream");



function getMarkdownFiles(directory: string) {
    if (!fs.existsSync(directory)) return [];
    return fs.readdirSync(directory).filter((file) => file.endsWith(".md"));
}

export function getFeaturedWork() {
    const files = getMarkdownFiles(WORK_DIR);

    const posts = files.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(WORK_DIR, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
            slug,
            title: data.title,
            category: data.category,
            description: data.description,
            date: data.date,
            tags: (data.tags as string[]) || [],
        };
    });

    return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}


export async function getPostBySlug(slug: string) {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = path.join(WORK_DIR, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);


    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        slug: realSlug,
        title: data.title,
        date: data.date,
        category: data.category,
        tags: (data.tags as string[]) || [],
        contentHtml,
    };
}

export function getAllPostSlugs() {
    const files = fs.readdirSync(WORK_DIR);
    console.log("====" + files.length)
    return files.map((file) => file.replace(/\.md$/, ""));
}

export function getNowStream() {
    const files = getMarkdownFiles(STREAM_DIR);

    const logs = files.map((fileName) => {
        const fullPath = path.join(STREAM_DIR, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
            id: fileName,
            date: data.date,
            type: data.type || "life", // coding | reading | life
            content: content.trim(),
        };
    });

    return logs.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}


export async function getLogBySlug(slug: string) {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = path.join(STREAM_DIR, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(content);

    return {
        slug: realSlug,
        date: data.date,
        type: data.type || "life",
        title: data.title || "Log Entry", // Fallback title
        contentHtml: processedContent.toString(),
    };
}

export function getAllLogSlugs() {
    if (!fs.existsSync(STREAM_DIR)) return [];
    const files = fs.readdirSync(STREAM_DIR);
    return files.map((file) => file.replace(/\.md$/, ""));
}