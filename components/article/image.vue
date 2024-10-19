<template>
    <nuxt-img :src="image" width="800" format="webp" alt=""
        class="drop-shadow-2xl w-full rounded bg-zinc-900 ring-1 ring-white/10" />
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps<{
    image: string;
}>();
</script>