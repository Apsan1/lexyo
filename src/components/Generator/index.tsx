"use client";

import { useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import { ResultCard } from "@/components/ui/ResultCard";
import type { GeneratedArticle } from "@/types";
import { generateArticleAction } from "@/lib/actions/generateArticleAction";
import { Icon } from "@/components/ui/Icon";

type Tab = "preview" | "metadata" | "structuredData" | "strategy" | "promotion";

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "textarea";
  rows?: number;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  rows,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows || 3}
          className="w-full rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-800 dark:text-gray-100"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-800 dark:text-gray-100"
        />
      )}
    </div>
  );
};

export default function GeneratorClient() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [questions, setQuestions] = useState("");
  const [tone, setTone] = useState("Professional");
  const [article, setArticle] = useState<GeneratedArticle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("preview");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!topic.trim() || !audience.trim()) {
      setError("Topic and Audience are required.");
      return;
    }
    setError(null);

    startTransition(async () => {
      try {
        const result = await generateArticleAction({
          topic,
          focusKeyword,
          audience,
          questions,
          tone,
        });
        setArticle(result);
        const saveRes = await fetch("/api/articles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result),
        });

        if (!saveRes.ok) {
          console.error("Failed to save article:", await saveRes.text());
        }
        setActiveTab("preview");
      } catch (e) {
        setError("Failed to generate article");
      }
    });
  };

  const handleExportJson = () => {
    if (!article) return;
    const blob = new Blob([JSON.stringify(article, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${article.slug}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const TabButton: React.FC<{ tab: Tab; label: string }> = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
        activeTab === tab
          ? "bg-neutral-600 text-white"
          : "text-neutral-600 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen p-8">
      {!article ? (
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 space-y-4">
          <InputField
            label="Topic *"
            value={topic}
            onChange={setTopic}
            placeholder="e.g. Modern Web Performance"
          />
          <InputField
            label="Audience *"
            value={audience}
            onChange={setAudience}
            placeholder="e.g. Developers, Marketers"
          />
          <InputField
            label="Focus Keyword"
            value={focusKeyword}
            onChange={setFocusKeyword}
            placeholder="e.g. SEO optimization"
          />
          <InputField
            label="Key Questions (Optional)"
            value={questions}
            onChange={setQuestions}
            placeholder="Optional..."
            type="textarea"
            rows={4}
          />

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-800 dark:text-gray-100"
            >
              <option>Professional</option>
              <option>Casual</option>
              <option>Technical</option>
              <option>Witty</option>
              <option>Authoritative</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="inline-flex items-center px-5 py-2 rounded-md bg-brand-primary text-white font-semibold hover:bg-brand-dark disabled:opacity-50"
          >
            {isPending ? "Generating…" : "Generate Article"}
          </button>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{article.title}</h2>
            <button
              onClick={handleExportJson}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Icon icon="download" className="w-5 h-5" /> Export JSON
            </button>
          </div>

          <div className="border-b border-gray-200 mb-4">
            <nav className="flex space-x-2">
              <TabButton tab="preview" label="Preview" />
              <TabButton tab="metadata" label="Metadata" />
              <TabButton tab="structuredData" label="Structured Data" />
              <TabButton tab="strategy" label="SEO Strategy" />
              <TabButton tab="promotion" label="Promotion" />
            </nav>
          </div>

          {activeTab === "preview" && (
            <ResultCard
              title="Article Content"
              icon="sparkles"
              copyText={article.articleContent}
            >
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <ReactMarkdown>{article.articleContent}</ReactMarkdown>
              </div>
            </ResultCard>
          )}

          {activeTab === "metadata" && (
            <ResultCard
              title="Metadata"
              icon="clipboard"
              copyText={article.title}
            >
              <p>Title: {article.title}</p>
              <p>Slug: {article.slug}</p>
              <p>Focus Keyword: {article.keywords?.join(", ")}</p>
            </ResultCard>
          )}

          {activeTab === "structuredData" && article.jsonLd && (
            <ResultCard title="JSON-LD" icon="code" copyText={article.jsonLd}>
              <pre className="bg-neutral-900 text-white p-4 rounded-md text-sm overflow-x-auto">
                {JSON.stringify(JSON.parse(article.jsonLd), null, 2)}
              </pre>
            </ResultCard>
          )}

          {/* SEO Strategy, Promotion tabs can be added similarly */}

          <button
            onClick={() => setArticle(null)}
            className="mt-4 px-4 py-2 rounded-md bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-100 border-1 border-neutral-500"
          >
            Generate Another
          </button>
        </div>
      )}
    </div>
  );
}
