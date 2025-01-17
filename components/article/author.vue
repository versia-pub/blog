<template>
    <div class="flex flex-col gap-2 justify-center items-center">
        <p class="text-gray-400 text-xs font-semibold uppercase">Written by</p>
        <div class="flex items-center gap-4 ring-white/20 ring-1 rounded py-1 px-2">
            <nuxt-img :preload="true" format="webp" :src="avatar" alt="Author avatar" class="size-12 rounded" />
            <div class="flex flex-col justify-center pr-1">
                <h2 class="text font-bold text-gray-50">{{ name }}</h2>
                <p class="text-gray-500 text-sm">{{ handle }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    avatar?: string;
    name: string;
    handle?: string;
}>();
</script>