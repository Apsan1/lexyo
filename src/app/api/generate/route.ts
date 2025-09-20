// src/app/api/generate/route.ts
import { NextResponse } from 'next/server';
import { generateSeoArticle } from '@/lib/services/gemini';

export async function POST(req: Request) {
    const body = await req.json();
    const article = await generateSeoArticle(body);
    return NextResponse.json(article);
}
