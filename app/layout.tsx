import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider, } from '@clerk/nextjs'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GadiGuru",
  description: "Find your dream cars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

      <html lang="en">
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <footer className="bg-gray-50 py-12">
            <div className="container mx-auto text-center px-4 text-gray-600 animate-pulse">
              <p className="text-lg font-semibold">
                Made with <span className="text-red-500 animate-bounce inline-block">❤️</span> by{" "}
                <a
                  href="https://myportfolio-two-lovat-28.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline transition-all duration-300"
                >
                  Khum Ghale
                </a>
              </p>
            </div>


          </footer>
        </body>
      </html>
    </ClerkProvider>

  );
}
