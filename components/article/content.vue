<template>
    <!-- <article
        class="$style.content mx-auto max-w-3xl prose prose-invert mt-10 prose-code:before:content-none prose-code:after:content-none prose-a:text-orange-500 prose-a:underline"
        v-html="body"></article> -->
    <article :class="[$style.content, 'prose prose-invert prose-code:before:content-none prose-code:after:content-none']" v-html="body"></article>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps<{
    body: string;
}>();
</script>

<style lang="postcss" module>
.content h1,
.content h2,
.content h3,
.content h4,
.content h5 {
    scroll-margin-top: 8rem;
    @apply block relative;
}

.content img {
    @apply drop-shadow-2xl w-full rounded bg-zinc-900 ring-1 ring-white/10 mx-auto;
}

.content figure figcaption img {
    @apply h-6 w-6 flex-none rounded-full bg-gray-800;
}

.content :global .header-anchor {
    @apply no-underline absolute w-16 md:w-auto text-right left-[calc(100%-3.75rem)] md:-left-10 text-gray-200
}

.content :global .header-anchor::before {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='1.5em' width='1.5em' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23e5e7eb' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m9 15l6-6m-4-3l.463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5l-.397.534a5.068 5.068 0 0 1-7.127 0a4.972 4.972 0 0 1 0-7.071L6 11'/%3E%3C/svg%3E");
}

.content ul li input[type="checkbox"],
.content ol li input[type="checkbox"] {
    @apply rounded text-orange-500 mb-0 mt-0 mr-3;
}

.content pre:has(code) {
    white-space: pre;
    word-break: normal;
    word-spacing: normal;
    overflow-x: auto;
    @apply ring-1 ring-white/10 mt-4 bg-white/5 px-4 py-3 rounded;
}

.content pre code {
    @apply block p-0;
}

.content code:not(pre code) {
    @apply rounded px-2 py-1 ring-1 ring-white/10 bg-white/5;
}
</style>