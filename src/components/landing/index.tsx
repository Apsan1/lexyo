import React from "react";
import Link from "next/link";

export default function Landing() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-12">
      {/* Hero / Intro */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Free AI SEO Blog Generator | Create SEO-Optimized Articles Instantly
        </h1>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Struggling to write <strong>SEO-friendly articles</strong> that rank
          on Google?{" "}
          <Link
            href="https://lexyo.apsan.com.np"
            className="text-blue-600 dark:text-blue-400 underline"
            target="_blank"
          >
            Lexyo
          </Link>{" "}
          is a <strong>free AI-powered SEO blog generator</strong> that helps
          bloggers, marketers, and businesses quickly create keyword-rich,
          structured content that drives organic traffic.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Unlike generic AI writers,{" "}
          <strong>Lexyo focuses specifically on SEO</strong>, ensuring your
          blogs are optimized for search engines while saving you time and
          effort.
        </p>
        <hr className="border-gray-300 dark:border-neutral-700" />
      </div>

      {/* Why Choose Lexyo */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Why Choose Lexyo for SEO Content
        </h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
          <li>
            <strong>100% Free</strong> – Generate unlimited SEO-optimized
            articles without limits.
          </li>
          <li>
            <strong>AI-Powered & SEO Optimized</strong> – Create content with
            headings, keywords, and structure for search engines.
          </li>
          <li>
            <strong>Save Time</strong> – Write long-form blogs and SEO articles
            in minutes.
          </li>
          <li>
            <strong>Beginner-Friendly</strong> – No SEO experience needed.
          </li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300">
          Learn more about SEO basics from{" "}
          <a
            href="https://moz.com/beginners-guide-to-seo"
            target="_blank"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Moz&apos;s Beginner’s Guide to SEO
          </a>
          .
        </p>
        <hr className="border-gray-300 dark:border-neutral-700" />
      </div>

      {/* Who Can Use Lexyo */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Who Can Benefit From Lexyo
        </h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
          <li>
            <strong>Content Creators</strong> – Quickly generate SEO-friendly
            blogs and articles.
          </li>
          <li>
            <strong>Digital Marketers</strong> – Scale content marketing without
            outsourcing.
          </li>
          <li>
            <strong>Small Businesses</strong> – Rank higher on Google with
            professional SEO content.
          </li>
          <li>
            <strong>Students & Bloggers</strong> – Write structured essays and
            blogs easily.
          </li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300">
          Compare with other SEO tools like{" "}
          <a
            href="https://neilpatel.com/ubersuggest/"
            target="_blank"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Neil Patel’s Ubersuggest
          </a>
          .
        </p>
        <hr className="border-gray-300 dark:border-neutral-700" />
      </div>

      {/* How Lexyo Helps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          How Lexyo Improves SEO Rankings
        </h2>
        <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2">
          <li>
            <strong>Keyword Integration</strong> – Natural inclusion of focus
            keywords and long-tail phrases.
          </li>
          <li>
            <strong>SEO-Friendly Structure</strong> – Proper H1, H2, H3 headings
            for Google indexing.
          </li>
          <li>
            <strong>Authority Links</strong> – Internal and external links
            improve trust and relevance.
          </li>
        </ol>
        <hr className="border-gray-300 dark:border-neutral-700" />
      </div>

      {/* FAQ */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <div>
            <h3 className="font-medium">Is Lexyo really free?</h3>
            <p>
              Yes! Lexyo is <strong>100% free</strong> for unlimited SEO blog
              generation.
            </p>
          </div>
          <div>
            <h3 className="font-medium">
              Can AI-generated blogs rank on Google?
            </h3>
            <p>
              Absolutely. As long as your content is{" "}
              <strong>useful, original, and SEO-optimized</strong>, it can rank
              on Google.
            </p>
          </div>
          <div>
            <h3 className="font-medium">
              What makes Lexyo different from other AI writers?
            </h3>
            <p>
              Lexyo is <strong>SEO-focused</strong>, generating content with
              structured headings, keywords, and readability in mind.
            </p>
          </div>
        </div>
        <hr className="border-gray-300 dark:border-neutral-700" />
      </div>

      {/* Call to Action */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Start Generating SEO Articles Today
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Create SEO-optimized blogs instantly with{" "}
          <strong>Lexyo – Free AI SEO Blog Generator</strong>. Save time, boost
          rankings, and grow traffic.
        </p>
        <Link
          href="https://lexyo.apsan.com.np"
          target="_blank"
          className="text-white bg-black dark:bg-neutral-300 dark:text-black px-6 py-3 rounded-md font-semibold inline-block hover:opacity-90 transition"
        >
          Try Lexyo for Free
        </Link>
      </div>

      {/* Premium / Custom Offering */}
      <div className="space-y-6 bg-gray-50 dark:bg-neutral-900 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Lexyo Custom Article Generator
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Need professional automation? Our{" "}
          <strong>custom article generator</strong> offers:
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
          <li>Automatic saving of all generated articles.</li>
          <li>Secure hosting of your content by us.</li>
          <li>
            Integration with Gemini Pro, ChatGPT Pro, or other APIs for advanced
            SEO generation.
          </li>
          <li>Fully automated SEO blog workflow without technical hassle.</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          All this for only <strong>$40/month</strong>. Perfect for bloggers,
          marketers, and businesses scaling their content strategy.
        </p>
        <Link
          href="https://apsan.com.np/contact"
          className="inline-block text-white bg-black dark:bg-neutral-300 dark:text-black px-6 py-3 rounded-md font-semibold hover:opacity-90 transition"
        >
          Get Started – $40/month
        </Link>
      </div>
    </section>
  );
}
