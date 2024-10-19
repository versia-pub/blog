import { getPostList } from "~/composables/server/Post";
import { defineEventHandler } from "#imports";

export default defineEventHandler(async () => {
    const files = await getPostList();

    return files ?? [];
});
