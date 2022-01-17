export class AboutCSRActivity {
    id?: number;
    title?: string;
    date?: string;
    image?: Image;
    description?: string;
    content?: string;
    status?: number;
}

interface Image {
    title: string;
    alt: string;
    src: string;
}
