export interface FrontMatter {
    title: string;
    description: string;
    image: string;
    image_width?: number;
    image_height?: number;
    created_at: string;
    private?: string;
    author: string;
    author_image: string;
    author_handle: string;
}

export interface Post {
    title: string;
    description: string;
    image: {
        url: string;
        width?: number;
        height?: number;
    };
    banner?: string;
    author: Author;
    private: boolean;
    created_at: string;
    content: string;
    path: string;
}

export interface Author {
    name: string;
    image: string;
    handle: string;
}
