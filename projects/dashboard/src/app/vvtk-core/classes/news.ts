export class News {
    id?: number;
    title?: string;
    image?: {
        src: string;
        alt: string;
        title: string;
    };
    description?: string;
    publishAt?: string;
    status?: number;
    stickTop?: boolean;
    tags?: number[];
    content?: string;
    url?: string;
    related?: {
        hideContent?: boolean;
        id: number;
        title: string;
        image: {
            src: string;
            alt: string;
            title: string;
        };
        publishAt: string;
        url: string;
    }[];
    updatedAt?: string;
    updatedUser?: {
        id: string;
        name: string;
        email: string;
    };
}
