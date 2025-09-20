-- CreateTable
CREATE TABLE "public"."GeneratedArticle" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "keywords" TEXT[],
    "articleContent" TEXT NOT NULL,
    "seoSuggestions" TEXT[],
    "jsonLd" TEXT NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL,
    "backlinks" JSONB NOT NULL,
    "imageSuggestions" JSONB NOT NULL,
    "socialMediaPosts" JSONB NOT NULL,
    "internalLinkingSuggestions" JSONB NOT NULL,
    "furtherReading" JSONB NOT NULL,

    CONSTRAINT "GeneratedArticle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GeneratedArticle_slug_key" ON "public"."GeneratedArticle"("slug");
