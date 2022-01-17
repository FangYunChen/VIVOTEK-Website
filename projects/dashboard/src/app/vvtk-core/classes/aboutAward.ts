export class AboutAward {
    id?: number;
    year: number;
    month: number;
    image: Image;
    title: string;
    description: string;
    url: string;
    createdAt?: string;
}

interface Image {
    alt: string;
    title: string;
    src: string;
}
