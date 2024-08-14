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

// Grouping flashcards with their set
export type FlashcardSetWithCards = {
  setName: string;
  userId: string;
  flashcards: Flashcard[];
};

export type { FlashcardSet, Flashcard, FlashcardSetWithCards };
