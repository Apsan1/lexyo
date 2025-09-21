"use client";

import React, { useState } from "react";
import { Icon } from "./Icon";

interface ResultCardProps {
  title: string;
  icon:
    | "clipboard"
    | "lightbulb"
    | "sparkles"
    | "globe"
    | "link"
    | "image"
    | "tag"
    | "code"
    | "share"
    | "academic-cap";
  children: React.ReactNode;
  copyText?: string;
  isHtml?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  title,
  icon,
  children,
  copyText,
  isHtml = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (copyText) {
      navigator.clipboard.writeText(copyText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 shadow-sm overflow-hidden mb-6 w-full">
      <div className="p-4 border-b border-neutral-400 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Icon icon={icon} className="w-6 h-6 text-brand-primary" />
          <h3 className="text-lg font-semibold text-neutral-700 dark:text-white">
            {title}
          </h3>
        </div>
        {copyText && (
          <button
            onClick={handleCopy}
            className={`transition-all duration-200 ease-in-out text-xs font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-xs ${
              copied
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {copied ? (
              <Icon icon="check" className="w-4 h-4" />
            ) : (
              <Icon icon="clipboard" className="w-4 h-4" />
            )}
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>
      <div className={`p-6 ${isHtml ? "prose prose-blue" : ""}`}>
        {children}
      </div>
    </div>
  );
};
