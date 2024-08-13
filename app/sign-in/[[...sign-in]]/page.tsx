import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="page-container items-center justify-center min-h-screen">
            <SignIn />
        </div>
    );
}