<template>
    <NuxtLayout name="app">
        <NuxtPage />
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { useSchemaOrg, useServerSeoMeta } from "#imports";
import { logo, org } from "./types/schemas.ts";

useServerSeoMeta({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} · Versia Blog` : "Versia Blog";
    },
});

useSchemaOrg([org, logo]);
</script>