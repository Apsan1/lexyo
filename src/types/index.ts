export interface Backlink {
    url: string;
    anchorText: string;
}

export interface FurtherReading {
    url: string;
    title: string;
}

export interface ImageSuggestion {
    description: string;
    altText: string;
}

export interface SocialMediaPost {
    platform: string;
    content: string;
}

export interface InternalLinkingSuggestion {
    anchorText: string;
    suggestedSlug: string;
}

export interface GeneratedArticle {
    id: number;
    title: string;
    metaDescription: string;
    slug: string;
    keywords: string[];
    articleContent: string;
    seoSuggestions: string[];
    jsonLd: string;
    generatedAt: Date;
    backlinks: Backlink[];
    imageSuggestions: ImageSuggestion[];
    socialMediaPosts: SocialMediaPost[];
    internalLinkingSuggestions: InternalLinkingSuggestion[];
    furtherReading: FurtherReading[];
}

export type Tone = "Professional" | "Casual" | "Technical" | "Witty" | "Authoritative";
