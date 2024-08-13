
import { WalletCards } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";

const Logo: FC = () => {
    return (
        <Link href="/" className="flex items-center gap-2 component-focus rounded-md">
            <WalletCards className="w-5 h-5 fill-current" />
            <h1 className="inline-flex flex-col gap-0 leading-none font-medium">
                <p>FlashCards</p>
            </h1>
        </Link>
    );
};

export default Logo;