import { Album } from './album';
export class Event {
    logo: Image;
    image: Image;
    title: string;
    startAt: string;
    endAt: string;
    address: string;
    boothNumber: string;
    content: string;
    status: number;
    stickTop?: boolean;
    boothUrl: BoothUrl;
    album: Album[];
}

export class BoothUrl {
    url: string;
    title: string;
}

export class Image {
    src: string;
    alt: string;
    title: string;
}
