export class AboutMilestone {
    id?: number;
    year: number;
    month: number;
    image: Image;
    title: string;
    description: string;
    createdAt?: string;
}

interface Image {
    alt: string;
    title: string;
    src: string;
}
