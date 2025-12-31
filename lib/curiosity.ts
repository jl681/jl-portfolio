
export type CuriosityItem = {
    id: string;
    category: "Reading" | "Listening" | "Tooling" | "Watching";
    title: string;
    subtitle: string; // Author, Artist, or Platform
    image?: string;   // Optional: URL to cover image
    link?: string;    // Optional: URL to external resource
    note?: string;    // Optional: Your 1-sentence take
};

export const CURIOSITY_ITEMS: CuriosityItem[] = [
    {
        id: "ddia",
        category: "Reading",
        title: "Designing Data-Intensive Applications",
        subtitle: "Martin Kleppmann",
        note: "The bible for distributed systems. Re-reading Chapter 5.",
        link: "https://dataintensive.net/",
    },
    {
        id: "staff-eng",
        category: "Listening",
        title: "StaffEng Podcast",
        subtitle: "Will Larson",
        note: "Great insights on the transition from Senior to Staff level.",
    },
    {
        id: "radiohead",
        category: "Listening",
        title: "In Rainbows",
        subtitle: "Radiohead",
        note: "My coding flow state album. 15 years later still a masterpiece.",
    },
    {
        id: "obsidian",
        category: "Tooling",
        title: "Obsidian",
        subtitle: "Note Taking",
        note: "Where my 'Second Brain' lives. Migrated from Notion.",
    },
    // ... Add more items here
];