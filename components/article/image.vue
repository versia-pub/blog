<template>
    <figure class="space-y-3 w-full">
        <nuxt-img :src="image" :width="width" :height="height" format="webp" alt="" :preload="true"
            class="drop-shadow-2xl w-full rounded bg-zinc-900 ring-1 ring-white/10" />
        <figcaption v-if="caption" class="text-center text-sm text-gray-400">{{ caption }}</figcaption>
    </figure>
</template>

<script lang="ts" setup>
defineProps<{
    image: string;
    width?: number;
    height?: number;
    caption?: string;
}>();
</script>