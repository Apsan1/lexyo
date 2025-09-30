'use server';

import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedArticle, Tone } from '@/types';

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A compelling, SEO-friendly title (50-60 characters) for the article topic, incorporating the focus keyword." },
        metaDescription: { type: Type.STRING, description: "A meta description (150-160 characters) summarizing the article with a strong call-to-action." },
        slug: { type: Type.STRING, description: "A short, URL-friendly slug using the focus keyword, separated by hyphens." },
        keywords: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 5-10 relevant primary and secondary keywords, with the main focus keyword listed first."
        },
        articleContent: {
            type: Type.STRING,
            description: "A plagiarism-free, human-readable, SEO-optimized blog article of around 400-500 words in clean Markdown format, safe for CMS RTEs (like Strapi, Payload). The article's top-level headings must use ## (not #). The first paragraph must be engaging and under 150 words. The tone should be conversational and blog-friendly. Cite credible, widely trusted sources using inline markdown hyperlinks, e.g., [Source Name](https://example.com). Do not use footnotes. If applicable, include a '## Further Reading' section at the end with a bulleted list of 3-5 relevant, non-paywalled links."
        },
        seoSuggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 3-5 actionable suggestions to further improve the SEO of this article."
        },
        imageSuggestions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    description: { type: Type.STRING, description: "A description of a relevant image for the article." },
                    altText: { type: Type.STRING, description: "A descriptive, SEO-optimized alt-text for the suggested image." },
                },
                required: ["description", "altText"]
            },
            description: "2-3 relevant image ideas, each with a descriptive, SEO-optimized alt-text."
        },
        backlinks: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    url: { type: Type.STRING, description: "The full URL of a high-authority, relevant backlink source." },
                    anchorText: { type: Type.STRING, description: "Suggested anchor text for the backlink." },
                },
                required: ["url", "anchorText"]
            },
            description: "2-3 relevant, high-authority websites that could be used for backlinking."
        },
        jsonLd: {
            type: Type.STRING,
            description: "A complete and valid JSON-LD (Schema.org) script for an 'Article' or 'FAQPage' schema, formatted as a JSON string. This should include details like headline, author, publisher, and main entity of the page."
        },
        socialMediaPosts: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    platform: { type: Type.STRING, description: "The social media platform (e.g., 'Twitter', 'LinkedIn')." },
                    content: { type: Type.STRING, description: "A compelling, ready-to-post snippet to promote the article on that platform, including hashtags." },
                },
                required: ["platform", "content"]
            },
            description: "2-3 social media posts for different platforms to promote the article."
        },
        internalLinkingSuggestions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    anchorText: { type: Type.STRING, description: "The anchor text within the article to add a link to." },
                    suggestedSlug: { type: Type.STRING, description: "A suggested URL slug for another article on the same website that this article could link to, to build topical authority." },
                },
                required: ["anchorText", "suggestedSlug"]
            },
            description: "2-3 internal linking opportunities within the generated article to related topics."
        },
        furtherReading: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    url: { type: Type.STRING, description: "The full URL of the resource." },
                    title: { type: Type.STRING, description: "The title of the resource." },
                },
                required: ["url", "title"]
            },
            description: "A list of 3-5 great extra readings as non-paywalled links. This should correspond to the 'Further Reading' section in the article content. Provide an empty array if no suitable readings are found."
        }
    },
    required: ["title", "metaDescription", "slug", "keywords", "articleContent", "seoSuggestions", "imageSuggestions", "backlinks", "jsonLd", "socialMediaPosts", "internalLinkingSuggestions", "furtherReading"]
};

export interface GenerateSeoArticleParams {
    topic: string;
    focusKeyword: string;
    audience: string;
    questions: string;
    tone: Tone;
    additional: string;
    token: string;
}

export const generateSeoArticle = async ({ topic, focusKeyword, audience, questions, tone, additional, token }: GenerateSeoArticleParams): Promise<GeneratedArticle> => {
    if (!token) {
        throw new Error("API_KEY environment variable not set");
    }

    const ai = new GoogleGenAI({ apiKey: token });

    const prompt = `
    You are an expert SEO content strategist and professional copywriter. Generate a comprehensive, SEO-optimized blog article according to the following:

    **Article Details:**
    - Primary Topic: ${topic}
    - Focus Keyword: ${focusKeyword} (use naturally in title, headings, meta description, and throughout content)
    - Target Audience: ${audience}
    - Content Tone: ${tone} yet approachable; no childish or overly casual language; highly readable for developers or tech-savvy readers.
    ${questions ? `- Key Questions to Answer: ${questions}` : ''}
    - Additional: ${additional}

    **SEO & Formatting Rules:**
    1. **Markdown only:** Safe for CMS RTE (Strapi, Payload).
    2. **Headings:** Use '##' for top-level headings only.
    3. **Engaging Intro:** First paragraph must hook the reader (<150 words) and establish authority.
    4. **SEO Optimization:** Include focus keyword naturally in headings, first paragraph, and meta description. Use related secondary keywords organically.
    5. **Credible Sources:** Cite only authoritative sources via inline Markdown links. Avoid footnotes. The found credible sources would also be use in the article/blog itself into the content directly.
    6. **Content Quality:** Informative, actionable, and value-driven; do not be academic or “storytelling casual.”
    7. **Meta & Social:** Generate SEO meta description, suggested social snippets, and internal/external linking ideas for better search performance.
    8. **Further Reading:** On some topics only above are not enough so for them include 3 to 5 credible non-paywalled links under '## Further Reading'.

    Guidelines:
    1. Write an authoritative, fact-rich article in clean Markdown. Use starting heading “##”.
    2. First paragraph: engaging, <150 words, establish expertise.
    3. Use the focus keyword naturally in title, intro, one heading, and meta description.
    4. Cite **credible, high-authority sources** (e.g., docs, research, respected blogs). Search for the best references yourself — include 2–3 as inline Markdown links.

    Output a single JSON object strictly following the provided schema.
`;


    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonText = response.text!.trim();
        const articleData = JSON.parse(jsonText);

        // Add the generatedAt timestamp
        articleData.generatedAt = new Date().toISOString();

        return articleData as GeneratedArticle;

    } catch (error) {
        console.error("Error generating article with Gemini:", error);
        throw new Error("Failed to generate the article. The model may have returned an invalid response.");
    }
};