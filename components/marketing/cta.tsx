import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
    return (
        <section className="relative py-16 bg-gradient-to-r from-primary to-primary-foreground overflow-hidden rounded-lg shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-foreground opacity-75"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                    <div className="max-w-xl text-center lg:text-left">
                        <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
                            Boost Your Learning Today
                        </h2>
                        <p className="mt-4 text-lg text-black">
                            Unlock all features and take your studies to the next level. Our AI-powered tools are designed to help you succeed.
                        </p>
                    </div>
                    <div className="mt-10 lg:mt-0 lg:flex lg:items-center">
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                            <SignInButton>
                                <Button variant="default" size="lg" className="mb-4 sm:mb-0">
                                    Get Started
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </SignInButton>
                            <Button variant="outline" size="lg">
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                    className="h-64 w-64 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3"
                    />
                </svg>
            </div>
        </section>
    );
}
