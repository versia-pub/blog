<template>
    <main :class="[$style.content, 'w-full h-full min-h-screen bg-gradient-to-tr from-zinc-900 to-zinc-800']">
        <slot />
    </main>
</template>

<style lang="css" module>
.content {
    font-family: Inter, sans-serif;
}
</style>