<template>
    <div v-if="post" class="mx-auto max-w-3xl py-24 sm:py-32 px-6 lg:px-8 flex flex-col items-center gap-10">
        <Title v-if="post.title" :created_at="post.created_at" :title="post.title" />
        <Image v-if="post.image" :image="post.image.url" :width="post.image.width" :height="post.image.height" />
        <Content :body="body" />
    </div>
</template>

<script lang="ts" setup>
import Content from "~/components/article/content.vue";
import Image from "~/components/article/image.vue";
import Title from "~/components/article/title.vue";
import type { Post } from "~/types/posts";
import {
    createError,
    defineArticle,
    useFetch,
    useImage,
    useRoute,
    useSchemaOrg,
    useServerSeoMeta,
} from "#imports";

const filePath = (useRoute().params.path as string[]).join("/");

const { data: post } = await useFetch<Post>(
    `/api/article?path=${encodeURIComponent(`/${filePath}`)}`,
);

if (!post.value) {
    throw createError({
        statusCode: 404,
        message: "Post not found",
    });
}

useSchemaOrg([
    defineArticle({
        author: {
            name: post.value.author.name,
            image: post.value.author.image,
        },
        datePublished: post.value.created_at,
        image: {
            url: post.value.image.url,
            width: post.value.image.width,
            height: post.value.image.height,
        },
        description: post.value.description,
        inLanguage: "en-US",
        thumbnailUrl: post.value.image.url,
    }),
]);

useServerSeoMeta({
    title: post.value.title,
    ogTitle: post.value.title,
    author: post.value.author.name,
    description: post.value.description,
    ogDescription: post.value.description,
    ogImage: post.value.image.url,
    ogImageHeight: post.value.image.height,
    ogImageWidth: post.value.image.width,
    twitterCard: "summary_large_image",
    twitterImage: post.value.image.url,
});

let body = post.value.content;
// Fix for optimizing images during prerendering
const img = useImage();

// Find all links of type /_ipx/ in body
const ipxLinks = body.match(/\/_ipx\/[^"]+/g) || [];

for (const ipxLink of ipxLinks) {
    body = body.replace(
        ipxLink,
        // Replace the link with the optimized image
        img(`/${ipxLink.split("/").slice(3).join("/")}` || "", {
            width: 800,
            format: "webp",
        }),
    );
}
</script>