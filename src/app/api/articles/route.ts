import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const article = body;

        const saved = await prisma.generatedArticle.create({
            data: {
                title: article.title,
                metaDescription: article.metaDescription,
                slug: article.slug,
                keywords: article.keywords,
                articleContent: article.articleContent,
                seoSuggestions: article.seoSuggestions,
                jsonLd: article.jsonLd,
                generatedAt: new Date(article.generatedAt),
                backlinks: article.backlinks,
                imageSuggestions: article.imageSuggestions,
                socialMediaPosts: article.socialMediaPosts,
                internalLinkingSuggestions: article.internalLinkingSuggestions,
                furtherReading: article.furtherReading,
            },
        });

        return NextResponse.json({ success: true, article: saved });
    } catch (error) {
        console.error("Failed to save article:", error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const articles = await prisma.generatedArticle.findMany({
            orderBy: { generatedAt: "desc" },
        });

        return NextResponse.json({ success: true, articles });
    } catch (error) {
        console.error("Failed to fetch articles:", error);
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}