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