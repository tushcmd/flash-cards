import { ReactNode } from "react";
import { BookOpen, Layers, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Feature = {
    title: string;
    desc: string;
    icon: ReactNode;
};

export default function FeaturesSection() {
    const features: Feature[] = [
        {
            title: "AI-Powered Flashcards",
            desc: "Generate intelligent flashcards that adapt to your learning style and preferences.",
            icon: <Target />,
        },
        {
            title: "Comprehensive Study Modes",
            desc: "Choose from various study modes, including spaced repetition, quiz mode, and more.",
            icon: <Layers />,
        },
        {
            title: "Analytics & Insights",
            desc: "Track your progress with detailed analytics and insights to optimize your learning.",
            icon: <BookOpen />,
        },
    ];

    return (
        <section className="mt-12">
            {/* <div className="max-w-xl mx-auto text-center space-y-4">
                <h2 className="text-4xl font-bold">Unlock Your Learning Potential</h2>
                <p className="text-muted-foreground">
                    Our AI Flashcards app provides the tools and features you need to master any subject efficiently.
                </p>
            </div> */}
            <ul className="mt-8 mx-auto max-w-7xl grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((item, index) => (
                    <li key={index}>
                        <Card className="hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="flex items-start justify-center">
                                {item.icon}
                            </CardHeader>
                            <CardContent>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.desc}</CardDescription>
                            </CardContent>
                        </Card>
                    </li>
                ))}
            </ul>
        </section>
    );
}
