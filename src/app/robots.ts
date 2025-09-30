import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://lexyo.apsan.com.np";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/admin/", "/private/", "/next/"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
