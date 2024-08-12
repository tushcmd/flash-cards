import { db } from '../config';
import { addDoc, updateDoc, deleteDoc, collection, getDocs, query, where, doc } from 'firebase/firestore';
import { FlashcardSet, Flashcard } from '@/types';

const COLLECTION_NAME = 'flashcardSets';

