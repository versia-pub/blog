<template>
    <header class="shadow bg-zinc-800">
        <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div class="relative flex h-16 justify-between">
                <div class="relative z-10 flex px-2 lg:px-0">
                    <div class="flex flex-shrink-0 items-center">
                        <img class="h-8 w-auto" src="https://cdn.versia.pub/branding/icon.svg"
                            alt="Pink rounded square with three white star icons in the center" />
                    </div>
                </div>
                <div class="relative z-0 flex flex-1 items-center justify-center px-2">
                    <div class="w-full max-w-xl">
                        <label for="search" class="sr-only">Search</label>
                        <div class="relative">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Icon name="tabler:search" class="size-5 text-gray-300" aria-hidden="true" />
                            </div>
                            <input id="search" name="search"
                                class="block w-full rounded-md border-0 bg-zinc-700 py-1.5 pl-10 pr-3 text-gray-200 ring-1 ring-inset ring-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                                placeholder="Search" type="search" />
                        </div>
                    </div>
                </div>
            </div>
            <nav class="hidden sm:flex sm:flex-row flex-col justify-evenly gap-x-8 gap-y-2 py-2" aria-label="Global">
                <a v-for="item in navigation" :key="item.name" :href="item.href"
                    :class="['text-gray-100 hover:bg-zinc-700 hover:text-gray-50 inline-flex items-center justify-center rounded py-2 px-3 text-sm font-medium duration-200 w-full']">{{ item.name }}</a>
            </nav>
        </div>
    </header>
</template>

<script lang="ts" setup>
const navigation = [
    { name: "Dashboard", href: "#", current: true },
    { name: "Team", href: "#", current: false },
    { name: "Projects", href: "#", current: false },
    { name: "Calendar", href: "#", current: false },
];
</script>