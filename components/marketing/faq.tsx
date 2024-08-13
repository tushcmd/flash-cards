'use client'

import { useRef, useState } from "react";

interface FaqsCardProps {
    faqsList: {
        q: string;
        a: string;
    };
    idx: number;
}

const FaqsCard = ({ faqsList, idx }: FaqsCardProps) => {
    const answerElRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [answerHeight, setAnswerHeight] = useState("0px");

    const toggleAnswer = () => {
        const answerElHeight = answerElRef.current?.scrollHeight || 0;
        setIsOpen(!isOpen);
        setAnswerHeight(`${isOpen ? "0px" : `${answerElHeight}px`}`);
    };

    return (
        <div
            className="space-y-3 mt-5 overflow-hidden border-b border-muted"
            key={idx}
            onClick={toggleAnswer}
        >
            <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-foreground font-medium">
                {faqsList.q}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    {isOpen ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 12H4"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                        />
                    )}
                </svg>
            </h4>
            <div
                ref={answerElRef}
                className="duration-300"
                style={{ height: answerHeight }}
            >
                <div>
                    <p className="text-muted-foreground">{faqsList.a}</p>
                </div>
            </div>
        </div>
    );
};

export default function FAQSection(): JSX.Element {
    const faqsList: { q: string; a: string }[] = [
        {
            q: "How does AI generate flashcards?",
            a: "Our AI analyzes the content you provide, identifying key concepts and terms to create effective flashcards that enhance your learning experience.",
        },
        {
            q: "Can I customize my flashcards?",
            a: "Yes, you can customize flashcards by editing questions, answers, and adding additional notes to tailor them to your study preferences.",
        },
        {
            q: "Is there a limit to how many flashcards I can create?",
            a: "The Basic plan allows you to create up to 100 flashcards. Pro and Enterprise plans offer unlimited flashcard creation.",
        },
        {
            q: "Do you offer any study modes?",
            a: "Yes, we offer various study modes including spaced repetition, multiple-choice quizzes, and practice tests to reinforce your learning.",
        },
        {
            q: "Can I share my flashcards with others?",
            a: "Absolutely! You can share your flashcards with peers, study groups, or even publish them publicly for others to use.",
        },
    ];

    return (
        <section className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
            <div className="space-y-3 text-center">
                <h1 className="text-3xl text-foreground font-semibold">
                    Frequently Asked Questions
                </h1>
                <p className="text-muted-foreground max-w-lg mx-auto text-lg">
                    Have more questions? Check out our answers below or contact us for
                    further assistance.
                </p>
            </div>
            <div className="mt-14 max-w-2xl mx-auto">
                {faqsList.map((item, idx) => (
                    <FaqsCard key={idx} idx={idx} faqsList={item} />
                ))}
            </div>
        </section>
    );
}
