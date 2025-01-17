import { readdirSync } from "node:fs";
import { join } from "node:path";
import { defineNuxtConfig } from "nuxt/config";
import { org } from "./types/schemas.ts";

/*
 * Reads the content directory and returns an array of all the files in the directory and subdirectories.
 */
const getRouteRenderingPaths = () => {
    const contentDir = join(process.cwd(), "content");
    const paths: string[] = [];

    const readDir = (dir: string) => {
        const files = readdirSync(dir);
        for (const file of files) {
            const filePath = join(dir, file);
            if (file.endsWith(".md")) {
                paths.push(
                    filePath
                        .replace(contentDir, "/articles")
                        .replace(".md", ""),
                );
            } else {
                readDir(filePath);
            }
        }
    };

    readDir(contentDir);

    return paths;
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxt/image",
        "nuxt-security",
        "@nuxt/fonts",
        "@nuxtjs/tailwindcss",
        "@vueuse/nuxt",
        "@nuxt/icon",
        "@nuxtjs/seo",
    ],
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    // Disable automatic component imports (for readability)
    components: false,
    robots: {
        blockNonSeoBots: true,
        disallow: [
            "AI2Bot",
            "Ai2Bot-Dolma",
            "Amazonbot",
            "anthropic-ai",
            "Applebot",
            "Applebot-Extended",
            "Bytespider",
            "CCBot",
            "ChatGPT-User",
            "Claude-Web",
            "ClaudeBot",
            "cohere-ai",
            "Diffbot",
            "FacebookBot",
            "facebookexternalhit",
            "FriendlyCrawler",
            "Google-Extended",
            "GoogleOther",
            "GoogleOther-Image",
            "GoogleOther-Video",
            "GPTBot",
            "iaskspider/2.0",
            "ICC-Crawler",
            "ImagesiftBot",
            "img2dataset",
            "ISSCyberRiskCrawler",
            "Kangaroo Bot",
            "Meta-ExternalAgent",
            "Meta-ExternalFetcher",
            "OAI-SearchBot",
            "omgili",
            "omgilibot",
            "PerplexityBot",
            "PetalBot",
            "Scrapy",
            "Sidetrade indexer bot",
            "Timpibot",
            "VelenPublicWebCrawler",
            "Webzio-Extended",
            "YouBot",
        ],
    },
    future: {
        compatibilityVersion: 4,
    },
    fonts: {
        defaults: {
            subsets: ["latin", "latin-ext"],
        },
    },
    security: {
        headers: {
            contentSecurityPolicy: {
                "img-src": [
                    "'self'",
                    "data:",
                    "images.pexels.com",
                    "cdn.versia.pub",
                ],
            },
        },
    },
    image: {
        domains: ["images.pexels.com"],
    },
    sitemap: {
        sources: [...getRouteRenderingPaths(), "/"],
    },
    // For sitemap generation
    site: {
        url: "https://versia.blog",
    },
    nitro: {
        preset: "bun",
        minify: true,
        prerender: {
            failOnError: true,
        },
    },
    app: {
        head: {
            link: [
                {
                    rel: "icon",
                    href: "/favicon.png",
                    type: "image/png",
                },
            ],
            htmlAttrs: {
                lang: "en-us",
            },
        },
    },
    schemaOrg: {
        identity: {
            name: "Versia",
            logo: "https://versia.pub/#logo",
            url: "https://versia.pub",
            sameAs: [],
        },
    },
});
