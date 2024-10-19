import { join } from "node:path";
import { getPost } from "~/composables/server/Post";
import { createError, defineEventHandler } from "#imports";

export default defineEventHandler((event) => {
    const url = new URL(
        event.node.req.url ?? "",
        `http://${event.node.req.headers.host}`,
    );

    // Get the path query parameter
    const filePath = decodeURIComponent(url.searchParams.get("path") ?? "");

    const post = getPost(filePath);

    if (!post) {
        throw createError({
            statusCode: 404,
            message: "Post not found",
        });
    }

    return post;
});
