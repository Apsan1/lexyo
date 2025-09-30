import { ResultCard } from "@/components/ui/ResultCard";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import Link from "next/link";
import { GeneratedArticle } from "@/types";

export default function ArticlePage({
  article,
}: {
  article: GeneratedArticle;
}) {
  return (
    <div className="min-h-screen p-8 mx-auto grid grid-cols-2 gap-4 relative">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col max-w-3xl max-auto w-full">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <p>
            <b>Generated At:</b> {article.generatedAt.toLocaleString()}
          </p>

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
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Share</h2>
          {article.socialMediaPosts != null &&
            article.socialMediaPosts.length > 0 && (
              <ResultCard title="Social Share Content" icon="clipboard">
                <div className="grid gap-2">
                  {article.socialMediaPosts.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-2 border py-2 border-black dark:border-white/20"
                    >
                      <p className="px-4 font-medium text-xl border-b border-inherit">
                        {item.platform}
                      </p>
                      <p className="px-4">{item.content}</p>
                    </div>
                  ))}
                </div>
              </ResultCard>
            )}

          {article.furtherReading != null &&
            article.furtherReading.length > 0 && (
              <ResultCard title="Read More" icon="clipboard">
                <div className="grid gap-2">
                  {article.furtherReading.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-2 border py-2 border-black dark:border-white/20"
                    >
                      <p className="px-4 font-medium text-xl border-b border-inherit">
                        {item.title}
                      </p>
                      <Link href={item.url} className="px-4">
                        {item.url}
                      </Link>
                    </div>
                  ))}
                </div>
              </ResultCard>
            )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">SEO</h2>
          <ResultCard
            title="Metadata"
            icon="clipboard"
            copyText={[
              `MetaTitle: ${article.title}`,
              `Slug: ${article.slug}`,
              `MetaDescription: ${article.metaDescription}`,
              `Keywords: ${article.keywords.join(", ")}`,
            ].join("\n")}
          >
            <p>
              <b>MetaTitle:</b> {article.title}
            </p>
            <p>
              <b>Slug:</b> {article.slug}
            </p>
            <p>
              <b>MetaDescription:</b> {article.metaDescription}
            </p>
            <p>
              <b>Keywords:</b> {article.keywords.join(", ")}
            </p>
          </ResultCard>

          <ResultCard title="Seo Suggestions" icon="clipboard">
            <ul className="list-disc px-2">
              {article.seoSuggestions.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </ResultCard>

          {article.imageSuggestions && (
            <ResultCard title="Image Suggestions" icon="code">
              <ul className="list-decimal bg-neutral-900 text-white p-2 rounded-md text-sm">
                {article.imageSuggestions.map((item, i) => (
                  <li key={i}>{item.description}</li>
                ))}
              </ul>
            </ResultCard>
          )}

          <ResultCard title="Backlink Suggestions" icon="clipboard">
            <ul className="list-disc px-2">
              {article.backlinks.map((item, i) => (
                <li key={i} className="flex flex-row gap-2">
                  <p>{item.anchorText}:</p>
                  <Link href={item.url} className="underline">
                    {item.url}
                  </Link>
                </li>
              ))}
            </ul>
          </ResultCard>

          <ResultCard title="Internal Links Suggestions" icon="clipboard">
            <ul className="list-disc px-2">
              {article.internalLinkingSuggestions.map((item, i) => (
                <li key={i} className="flex flex-row gap-2">
                  <p>{item.anchorText}:</p>
                  <Link href={item.suggestedSlug} className="underline">
                    {item.suggestedSlug}
                  </Link>
                </li>
              ))}
            </ul>
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
    </div>
  );
}
