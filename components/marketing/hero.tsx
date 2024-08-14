'use client';

import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useUser, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Flashcard from '../../.history/components/core/flash-card_20240814005515';

export default function Hero() {
    const { isSignedIn } = useUser(); // Check if user is signed in
    const router = useRouter(); // Use the router

    const handleAction = () => {
        if (isSignedIn) {
            router.push('/generate');
        }
    };

    return (
        // mt-16
        <div className="layout-container mx-auto pb-4 px-4 sm:px-8">
            <div className="text-center items-center flex flex-col gap-5">
                <h1 className="text-5xl lg:text-7xl tracking-tighter font-bold bg-gradient-to-br from-foreground via-secondary-foreground/90 to-muted-foreground bg-clip-text text-transparent drop-shadow-sm ">
                    AI Flashcards
                    <br />
                    Your Best
                    <br />
                    Learning Companion
                </h1>
                <p className="leading-relaxed text-muted-foreground max-w-4xl mx-auto text-xl">
                    It is established that concepts stick better with quick revision questions. Our flashcards offer you the best experience when revising in whichever topics.
                </p>
            </div>
            <div className="text-center space-x-4 space-y-3 mt-6 justify-center items-center sm:space-x-6 sm:space-y-0 sm:flex">

                <Button variant="outline" size={"lg"}>
                    <a href="/pricing">Go Pricing</a>
                </Button>

                {isSignedIn ? (
                    <Button variant="default" onClick={handleAction} size={"lg"}>
                        <span>Generate Flashcards</span>
                        <ArrowRight className="size-4" />
                    </Button>
                ) : (
                    <SignInButton>
                        <Button variant="default" size={"lg"}>
                            <span>Get Started</span>
                            <ArrowRight className="size-4" />
                        </Button>
                    </SignInButton>
                )}
            </div>
            <div className="text-center justify-center items-center flex mt-6">
                <Image
                    className="rounded-lg"
                    src="/_static/flashc60.png"
                    alt="alt"
                    width={494}
                    height={291}
                    style={{
                        maskImage: `linear-gradient(to top, transparent, black 20%)`,
                    }}
                />
            </div>
        </div>
    );
}
