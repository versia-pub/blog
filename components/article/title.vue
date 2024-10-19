<template>
    <div class="mx-auto max-w-2xl text-center flex items-center justify-center gap-8 flex-col">
        <h1 v-if="title" class="text-4xl font-bold tracking-tight text-gray-50 sm:text-5xl">
            {{ title }}
        </h1>
        <div>
            <time data-allow-mismatch v-if="created_at" :datetime="created_at" class="text-gray-500">
                {{ formatDate(created_at) }}
            </time>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps<{
    title: string;
    created_at: string;
}>();

const formatDate = (date?: string) => {
    return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    }).format(Date.parse(date ?? new Date().toISOString()));
};
</script>