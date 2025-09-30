import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SidebarDemo from "@/components/ui/Sidebar/SidebarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free AI SEO Blog Generator | Lexyo",
  description:
    "Generate SEO-optimized blogs for free with Lexyo. AI-powered content writer to rank higher, write faster, and boost your website traffic instantly.",
  keywords: [
    "free ai blog generator",
    "seo content writing tool",
    "ai blog writer online free",
    "best seo blog generator 2025",
    "generate seo articles free",
    "Lexyo",
  ],
  alternates: {
    canonical: "https://lexyo.apsan.com.np",
  },
  openGraph: {
    title: "Free AI SEO Blog Generator | Lexyo",
    description:
      "Write SEO-optimized blogs instantly with Lexyo. 100% free AI-powered blog generator to rank higher and grow traffic.",
    url: "https://lexyo.apsan.com.np",
    siteName: "Lexyo",
    images: [
      {
        url: "https://lexyo.apsan.com.np/preview.png",
        width: 1200,
        height: 630,
        alt: "Lexyo AI SEO Blog Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI SEO Blog Generator | Lexyo",
    description:
      "AI-powered blog writing tool to generate SEO-optimized articles for free. Boost your rankings with Lexyo.",
    images: ["https://lexyo.apsan.com.np/preview.png"],
    creator: "@apsan_",
  },
  category: "SEO Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-row gap-2`}
      >
        <nav className="hidden md:flex md:flex-col shrink-0 border-r border-neutral-700">
          <SidebarDemo />
        </nav>
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
