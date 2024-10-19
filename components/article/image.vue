<template>
    <nuxt-img :src="image" :width="width" :height="height" format="webp" alt="" :preload="true"
        class="drop-shadow-2xl w-full rounded bg-zinc-900 ring-1 ring-white/10" />
</template>

<script lang="ts" setup>
defineProps<{
    image: string;
    width?: number;
    height?: number;
}>();
</script>