import { Dashboard } from "@/components/Dashboard";
import prisma from "@/lib/prisma";
import type { GeneratedArticle } from "@/types";

export default async function Home() {
  const raw = await prisma.generatedArticle.findMany({
    orderBy: { generatedAt: "desc" },
  });

  const articles: GeneratedArticle[] = raw.map((a) => ({
    ...a,
    generatedAt: new Date(a.generatedAt),
    backlinks: a.backlinks as unknown as GeneratedArticle["backlinks"],
    imageSuggestions:
      a.imageSuggestions as unknown as GeneratedArticle["imageSuggestions"],
    socialMediaPosts:
      a.socialMediaPosts as unknown as GeneratedArticle["socialMediaPosts"],
    internalLinkingSuggestions:
      a.internalLinkingSuggestions as unknown as GeneratedArticle["internalLinkingSuggestions"],
    furtherReading:
      a.furtherReading as unknown as GeneratedArticle["furtherReading"],
  }));

  return (
    <div className="flex flex-1 w-full h-full">
      <Dashboard articles={articles} />
    </div>
  );
}
