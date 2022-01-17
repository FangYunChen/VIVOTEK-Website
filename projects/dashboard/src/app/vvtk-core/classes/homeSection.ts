export class HomeSection {
    id?: number;
    title?: string;
    type?: string;
    more?: {
        href: string;
        text: string;
    };
    items?: HomeSectionItem[];
}

export class HomeSectionItem {
    hideContent?: boolean;
    title?: string;
    description?: string;
    href?: string;
    img?: {
        src: string;
        alt: string;
        title: string;
    };
    video?: string;
}

export class HomeSectionSequence {
    id: number;
    sequence: number;
}
