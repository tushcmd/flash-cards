import { db } from "../config";
import { collection, doc, writeBatch } from "firebase/firestore";
import { Flashcard } from "@/types";

const COLLECTION_NAME = "flashcardSets";

export const saveFlashcardSet = async (
  userId: string,
  setName: string,
  flashcards: Flashcard[],
) => {
  try {
    const userDocRef = doc(collection(db, "users"), userId);
    const flashcardSetRef = doc(
      collection(userDocRef, COLLECTION_NAME),
      setName,
    );

    const batch = writeBatch(db);

    // Set flashcard set document
    batch.set(flashcardSetRef, { name: setName, flashcards });

    // You could add additional operations to the batch here

    await batch.commit();
    console.log("Flashcards saved successfully!");
  } catch (error) {
    console.error("Error saving flashcards:", error);
    throw new Error("An error occurred while saving flashcards.");
  }
};
