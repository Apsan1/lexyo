"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { generateArticleAction } from "@/lib/actions/generateArticleAction";

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
}) => (
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
        className="w-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-800 dark:text-gray-100"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-800 dark:text-gray-100"
      />
    )}
  </div>
);

export default function GeneratorClient() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [questions, setQuestions] = useState("");
  const [tone, setTone] = useState("Professional");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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

        const saveRes = await fetch("/api/articles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result),
        });

        if (!saveRes.ok) {
          console.error("Failed to save article:", await saveRes.text());
          return;
        }

        const data = await saveRes.json();
        const articleId = data.article?.id;

        if (!articleId) {
          console.error("No article id returned:", data);
          return;
        }

        router.push(`/generate/${articleId}`);
      } catch (e) {
        setError("Failed to generate article");
      }
    });
  };

  return (
    <div className="min-h-screen p-8 flex justify-center items-start">
      <div className="w-full bg-white dark:bg-neutral-900 shadow p-6 space-y-4">
        <h1 className="text-3xl uppercase">Generate Content</h1>
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
            className="w-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-800 dark:text-gray-100"
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
          className="inline-flex items-center justify-center w-full px-5 py-2 font-semibold text-white bg-black dark:text-black dark:bg-neutral-300 disabled:opacity-50 border"
        >
          {isPending ? "Generating…" : "Generate Article"}
        </button>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
}
