export class Campaign {
    id?: number;
    title?: string;
    image?: {
        src: string;
        alt: string;
        title: string;
    };
    description?: string;
    startAt?: string;
    endAt?: string;
    status?: number;
    content?: string;
    area?: string;
    address?: string;
    emailContent?: string;
    stickTop?: boolean;
}
