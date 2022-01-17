export class Sitemap {
    id: number;
    parentId: number;
    title?: string;
    url?: string;
    image?: string;
    description?: string;
    displayOrder: number;
    isEnabled?: boolean;
    i18n?: I18n[];
}

export class I18n {
    lang: string;
    title: string;
    url: string;
    image: string;
    description: string;
}
