import { Template } from './template';
export class Case {
    id?: number;
    status?: number;
    stickTop?: boolean;
    title?: string;
    publishAt?: string;
    image?: Image;
    templates?: Template[];
    vertical?: string;
    country?: Country;
    solutions?: TitleWithUrl[];
    software?: TitleWithUrl[];
    partners?: TitleWithUrl[];
    specialThanksList?: TitleWithUrl[];
    relatedList?: RelatedList[];
    isHideTw?: boolean;
}

export class RelatedList {
    hideContent?: boolean;
    title: string;
    image: Image;
    url: string;
}

export class Country {
    id?: number;
    name?: string;
}

export class TitleWithUrl {
    hideContent?: boolean;
    title: string;
    url: string;
}

export class Image {
    src: string;
    alt: string;
    title: string;
}
