export type SiteConfig = {
    name: string;
    description: string;
    url: string;
    ogImage: string;
    mailSupport: string;
    links: {
        twitter: string;
        github: string;
        portfolio: string;
    };
};

interface FlashcardSet {
    setId: string;
    setName: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}


interface Flashcard {
    flashcardId: string;
    setId: string;
    question: string;
    answer: string;
    createdAt: Date;
    updatedAt: Date;
}

export type { FlashcardSet, Flashcard }