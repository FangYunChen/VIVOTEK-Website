export class AboutCommunity {
    id?: number;
    title?: string;
    image?: Image;
    url?: string;
    footerEnabled?: boolean;
    displayOrder?: number;
}

interface Image {
    src: string;
    alt: string;
    title: string;
}
