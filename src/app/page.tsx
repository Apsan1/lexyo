import { Dashboard } from "@/components/Dashboard";
import prisma from "@/lib/prisma";
import type { GeneratedArticle } from "@/types";

export default async function Home() {
  // Fetch articles from the database
  const articles = await prisma.generatedArticle.findMany({
    orderBy: { generatedAt: "desc" },
  });

  const handleViewArticle = (article: GeneratedArticle) => {
    // You can handle viewing an article, e.g., open a modal or navigate to detail page
    console.log("Viewing article:", article);
  };

  return (
    <div className="flex flex-1 w-full h-full">
      <Dashboard articles={articles} onViewArticle={handleViewArticle} />
    </div>
  );
}
