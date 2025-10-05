import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SidebarDemo from "@/components/ui/Sidebar/SidebarWrapper";
import Landing from "@/components/landing";
import Banner from "@/components/Banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free AI SEO Blog Generator | Lexyo – Create SEO Articles Instantly",
  description:
    "Generate SEO-optimized blogs instantly for free with Lexyo. AI-powered content writer to help your website rank higher, write faster, and grow traffic.",
  keywords: [
    "free AI blog generator",
    "SEO content writing tool",
    "AI blog writer online free",
    "best SEO blog generator 2025",
    "generate SEO articles free",
    "SEO AI content creator",
    "Lexyo AI tool",
    "free blog writing AI",
  ],
  metadataBase: new URL("https://lexyo.apsan.com.np"),
  alternates: {
    canonical: "https://lexyo.apsan.com.np",
  },
  icons: {
    icon: "https://lexyo.apsan.com.np/favicon.ico",
    shortcut: "https://lexyo.apsan.com.np/favicon.ico",
    apple: "https://lexyo.apsan.com.np/logo/apple-touch-icon.png",
  },
  openGraph: {
    title: "Free AI SEO Blog Generator | Lexyo",
    description:
      "Write SEO-optimized blogs instantly with Lexyo. 100% free AI-powered blog generator to rank higher and grow website traffic.",
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
      "AI-powered blog writing tool to generate SEO-optimized articles for free. Boost your Google rankings with Lexyo.",
    images: ["https://lexyo.apsan.com.np/preview.png"],
    creator: "@apsan_",
  },
  robots: "index, follow",
  category: "SEO Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Lexyo",
              url: "https://lexyo.apsan.com.np",
              image: "https://lexyo.apsan.com.np/logo/logo.svg",
              publisher: {
                "@type": "Organization",
                name: "Lexyo",
                logo: {
                  "@type": "ImageObject",
                  url: "https://lexyo.apsan.com.np/logo/logo.svg",
                },
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Lexyo Custom Article Generator",
              description:
                "Premium AI-powered article generator with hosting, saved content, and API integrations like Gemini Pro or ChatGPT Pro. Perfect for SEO professionals.",
              brand: "Lexyo",
              offers: {
                "@type": "Offer",
                price: "40.00",
                priceCurrency: "USD",
                url: "https://apsan.com.np/contact",
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative`}
      >
        <Banner />
        <div className="flex flex-row gap-2">
          <nav className="hidden md:flex md:flex-col shrink-0 border-r border-neutral-700 fixed top-0 left-0 h-full">
            <SidebarDemo />
          </nav>
          <main className="w-full">{children}</main>
        </div>
        <Landing />
      </body>
    </html>
  );
}
