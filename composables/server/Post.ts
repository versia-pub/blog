import { access, opendir, readFile } from "node:fs/promises";
import { join } from "node:path";
import type { FrontMatter, Post } from "~/types/posts";
import {
    getMarkdownRenderer,
    parseFrontMatter,
    stripFrontMatter,
} from "~/utils/markdown";

export const getPost = async (path: string): Promise<Post | null> => {
    const filePath = join(process.cwd(), "content", `${path}.md`);

    if (
        !(await access(filePath)
            .then(() => true)
            .catch(() => false))
    ) {
        return null;
    }

    const contents = await readFile(filePath, "utf8");

    const header = parseFrontMatter<FrontMatter>(contents);

    if (!header) {
        return null;
    }

    const renderedBody = await getMarkdownRenderer().then((renderer) =>
        renderer.render(stripFrontMatter(contents)),
    );

    return {
        author: {
            handle: header.author_handle,
            image: header.author_image,
            name: header.author,
        },
        private: header.private === "true",
        content: renderedBody,
        created_at: new Date(Number(header.created_at || 0)).toISOString(),
        description: header.description,
        image: {
            url: header.image,
            width: header.image_width ? Number(header.image_width) : undefined,
            height: header.image_height
                ? Number(header.image_height)
                : undefined,
        },
        title: header.title,
        path,
    };
};

export const getPostList = async (): Promise<Post[] | null> => {
    const directoryPath = join(process.cwd(), "content");

    const dir = await opendir(directoryPath, {
        recursive: true,
    });

    const files: string[] = [];

    for await (const dirent of dir) {
        if (dirent.isFile() && dirent.name.endsWith(".md")) {
            files.push(
                // Remove process.cwd() and .md from the path
                join(dirent.parentPath, dirent.name.replace(".md", "")).replace(
                    join(process.cwd(), "content"),
                    "",
                ),
            );
        }
    }

    const results: Post[] = [];

    for (const file of files) {
        const post = await getPost(file.replace(".md", ""));
        if (post) {
            results.push(post);
        }
    }

    return results.sort(
        (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
};
