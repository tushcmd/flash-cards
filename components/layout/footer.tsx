import React, { FC } from 'react'
import { siteConfig } from "@/config/site";
import { Github } from 'lucide-react';
import ThemeSwitcher from '../ui/ThemeSwitcher';

export default function Footer() {
    return (
        <footer className='py-4'>
            {/* <div>© 2024 Flashcard App</div> */}
            <div className="layout-container flex justify-between items-center border-t py-4">
                <p>Built by <a href={siteConfig.links.portfolio} target="_blank" className='underline underliend-offset-4'>Muturi David.</a></p>

                <div className='flex items-center gap-3'>

                    <a
                        href={siteConfig.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        <Github className="size-5" />
                    </a>
                    <ThemeSwitcher />
                </div>
            </div>
        </footer>
    )
}

