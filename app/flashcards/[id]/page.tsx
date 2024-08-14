'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchFlashcardsBySet } from '@/firebase/firestore/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, ArrowRight, ArrowLeft, ChevronLeft, Loader2 } from 'lucide-react';
import type { Flashcard } from '@/types';

export default function FlashcardSetPage() {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [flip, setFlip] = useState<boolean>(false);
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const userId = "user-id"; // Replace with actual userId
                    const fetchedFlashcards = await fetchFlashcardsBySet(userId, id as string);
                    setFlashcards(fetchedFlashcards);
                } catch (error) {
                    console.error('Error fetching flashcards:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [id]);

    const currentCard = flashcards[currentIndex];

    const handleFlip = () => setFlip(!flip);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        setFlip(false);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
        setFlip(false);
    };

    if (loading) return (
        <div className="min-h-screen flex justify-center">
            <Loader2 className="w-16 h-16 animate-spin text-primary" />
        </div>
    );

    return (
        <div className="min-h-screen p-4 relative page-container">
            {/* Back button in top-left corner */}
            <Button
                variant="outline"
                onClick={() => router.push('/flashcards')}
                className="absolute top-4 left-4"
                size="icon"
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>

            {flashcards.length > 0 ? (
                <div className="flex flex-col items-center justify-center min-h-screen p-4">
                    <Card className="w-full max-w-3xl">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Flashcards</CardTitle>
                            {currentCard && (
                                <p className="text-sm text-muted-foreground">
                                    Card {currentIndex + 1} of {flashcards.length}
                                </p>
                            )}
                        </CardHeader>
                        <CardContent>
                            <Card className="bg-secondary">
                                <CardContent className="p-6 h-64 flex flex-col justify-center items-center">
                                    {currentCard ? (
                                        <>
                                            <h2 className="text-xl font-semibold mb-4">{currentCard.question}</h2>
                                            {flip && <p className="text-muted-foreground mx-auto text-lg">{currentCard.answer}</p>}
                                        </>
                                    ) : (
                                        <p>No flashcards available.</p>
                                    )}
                                </CardContent>
                            </Card>
                            <div className="flex justify-between mt-4">
                                <Button onClick={handleFlip} variant="ghost" size="icon" disabled={!currentCard}>
                                    <RefreshCw className="h-6 w-6" />
                                </Button>
                                <div>
                                    <Button onClick={handlePrevious} variant="ghost" size="icon" disabled={!currentCard}>
                                        <ArrowLeft className="h-6 w-6" />
                                    </Button>
                                    <Button onClick={handleNext} variant="ghost" size="icon" disabled={!currentCard}>
                                        <ArrowRight className="h-6 w-6" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <p>No flashcards found for this set.</p>
            )}
        </div>
    );
}
