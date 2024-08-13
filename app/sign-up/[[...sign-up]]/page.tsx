import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="page-container items-center justify-center min-h-screen">
            <SignUp />
        </div>
    );
}