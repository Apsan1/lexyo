"use client";

import { useEffect, useState, useTransition } from "react";
import { generateArticleAction } from "@/lib/actions/generateArticleAction";
import ArticlePage from "../Article";
import Cookies from "js-cookie";
import { GeneratedArticle } from "@/types";
import TokenModal from "../ui/TokenModal";

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
  const [additional, setAdditional] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [article, setArticle] = useState<GeneratedArticle | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [token, setToken] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load token from cookie on mount
  useEffect(() => {
    const savedToken = Cookies.get("userToken");
    if (!savedToken) {
      setIsModalOpen(true);
    } else {
      setToken(savedToken);
    }
  }, []);

  const handleSubmit = () => {
    if (!token) {
      setIsModalOpen(true);
      return;
    }
    if (!topic.trim() || !audience.trim()) {
      setError("Topic and Audience are required.");
      return;
    }
    setError(null);
    startTransition(async () => {
      try {
        setLoading(true);
        const result = await generateArticleAction({
          topic,
          focusKeyword,
          audience,
          questions,
          tone,
          additional,
          token,
        });

        setArticle(result);
      } catch (e) {
        setError("Failed to generate article");
      }
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col justify-start items-center gap-8 w-full">
      {!article && !loading && (
        <div className="w-full bg-white dark:bg-neutral-900 shadow p-6 space-y-4 max-w-4xl">
          <h1 className="text-3xl uppercase">Generate Content</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mb-4 px-4 py-2 bg-gray-800 text-white rounded"
          >
            Set API Token
          </button>
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
          <InputField
            label="Additionals (Optional)"
            value={additional}
            onChange={setAdditional}
            placeholder="Add optional info..."
            type="textarea"
            rows={4}
          />

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
      )}

      {loading && (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-7xl">
            Lexy
            <span className="lexyO" />
          </p>
        </div>
      )}

      <TokenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(t) => setToken(t)}
      />

      {article && (
        <div className="w-full max-w-6xl">
          <ArticlePage article={article} />
        </div>
      )}
    </div>
  );
}
