'use client';

import type { GeneratedArticle } from '@/types';

export async function generateArticleAction(data: {
  topic: string;
  questions: string;
  focusKeyword?: string;
  audience: string;
  tone: string;
  additional: string;
  token: string;
}): Promise<GeneratedArticle> {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || 'Failed to generate article');
  }

  return res.json();
}
