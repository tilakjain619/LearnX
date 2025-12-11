import { Metadata } from "next";
import { Outfit, Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata = {
  title: "LearnX - Learn anything. Instantly.",
  description: "Type a topic. AI generates a structured learning path. Follow step‑by‑step.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${syne.variable} ${spaceGrotesk.variable} font-sans antialiased min-h-screen flex flex-col bg-black text-gray-100 transition-colors duration-300`}
      >
        <Cursor />
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
