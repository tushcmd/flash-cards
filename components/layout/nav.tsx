'use client';

import Logo from './logo';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { useUser, SignInButton, UserButton } from '@clerk/nextjs';

export default function Navbar() {
    const { isSignedIn } = useUser();

    return (
        <nav className="py-4">
            <div className="layout-container flex justify-between items-center border-b py-1">
                <Logo />

                {isSignedIn ? (
                    <UserButton />
                ) : (
                    <SignInButton>
                        <Button variant="default" size="sm">
                            <span>Sign In</span>
                            <ArrowRight className="size-4" />
                        </Button>
                    </SignInButton>
                )}
            </div>
        </nav>
    );
};


