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
  title: "LEXYO",
  description: "Prompt Ready For SEO friendly Articles",
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
