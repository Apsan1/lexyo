// app/generate/[id]/page.tsx
import prisma from "@/lib/prisma";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import type { GeneratedArticle } from "@/types";
import { ResultCard } from "@/components/ui/ResultCard";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const raw = await prisma.generatedArticle.findUnique({
    where: { id: Number(params.id) },
  });

  if (!raw) return notFound();

  // Convert JSON → typed arrays
  const article: GeneratedArticle = {
    ...raw,
    generatedAt: new Date(raw.generatedAt),
    backlinks: raw.backlinks as unknown as GeneratedArticle["backlinks"],
    imageSuggestions:
      raw.imageSuggestions as unknown as GeneratedArticle["imageSuggestions"],
    socialMediaPosts:
      raw.socialMediaPosts as unknown as GeneratedArticle["socialMediaPosts"],
    internalLinkingSuggestions:
      raw.internalLinkingSuggestions as unknown as GeneratedArticle["internalLinkingSuggestions"],
    furtherReading:
      raw.furtherReading as unknown as GeneratedArticle["furtherReading"],
  };

  return (
    <div className="min-h-screen p-8 mx-auto grid grid-cols-2 gap-4 relative">
      <div className="flex flex-col max-w-3xl max-auto w-full">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

        <ResultCard
          title="Content"
          icon="sparkles"
          copyText={article.articleContent}
        >
          <div className="prose prose-slate dark:prose-invert w-full">
            <MarkdownRenderer content={article.articleContent} />
          </div>
        </ResultCard>
      </div>

      <div className="flex flex-col gap-2 sticky top-0 h-fit">
        <h2 className="text-2xl font-bold">SEO</h2>
        <ResultCard title="Metadata" icon="clipboard" copyText={article.title}>
          <p>Slug: {article.slug}</p>
          <p>Keywords: {article.keywords.join(", ")}</p>
          <p>Generated At: {article.generatedAt.toLocaleString()}</p>
        </ResultCard>

        {article.jsonLd && (
          <ResultCard
            title="Structured Data JSON"
            icon="code"
            copyText={article.jsonLd}
          >
            <pre className="bg-neutral-900 text-white p-4 rounded-md text-sm">
              {JSON.stringify(JSON.parse(article.jsonLd), null, 2)}
            </pre>
          </ResultCard>
        )}
      </div>
    </div>
  );
}
