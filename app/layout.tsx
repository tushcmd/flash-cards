import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/nav";
import Footer from "@/components/layout/footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlashCards",
  description: "Generate smart FlashCards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          ><Navbar />
            {children}
            <Footer />
          </ThemeProvider>

        </body>
      </html>
    </ClerkProvider >
  );
}
