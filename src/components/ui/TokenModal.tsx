"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

type TokenModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (token: string) => void;
};

export default function TokenModal({
  isOpen,
  onClose,
  onSave,
}: TokenModalProps) {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (isOpen) {
      const savedToken = Cookies.get("userToken") || "";
      setToken(savedToken);
    }
  }, [isOpen]);

  const handleSave = () => {
    Cookies.set("userToken", token, {
      expires: 365, // 1 year
      path: "/", // only this site
      sameSite: "strict", // prevents cross-site use
      secure: true, // HTTPS only
    });
    onSave(token);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg w-96 space-y-4 shadow-lg">
        <h2 className="text-xl font-bold">Enter Your API Token</h2>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your Gemini token here"
          className="w-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-800 dark:text-gray-100 rounded"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-neutral-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
