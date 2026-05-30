import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ToolVerse AI – 100+ Free AI Tools for Creators & Students",
  description: "Use 100+ AI-powered writing, image, YouTube, and business tools for free without login. Optimize titles, remove backgrounds, compress PDFs, and generate copy instantly.",
  keywords: ["free AI tools", "pdf compressor", "thumbnail generator", "instagram bio", "speech to text", "youtube optimization"],
  openGraph: {
    type: "website",
    title: "ToolVerse AI – 100+ Free AI Tools",
    description: "Generate copy, extract text, resize images, compile PDFs, check titles, and more - all in one place.",
    siteName: "ToolVerse AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolVerse AI",
    description: "100+ Free AI and developer tools for creators, students, and businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
