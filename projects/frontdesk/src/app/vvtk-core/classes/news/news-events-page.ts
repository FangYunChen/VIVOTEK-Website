import { NewsPage } from './news-page';

export class NewsEventsPage extends NewsPage {
  startAt: Date;
  endAt: Date;
  address: string;
  boothUrl: {
    url: string;
    title: string;
  };
  album: [
    {
      src: string;
      alt: string;
      title: string;
    }
  ];
  logo: {
    src: string;
    alt: string;
    title: string;
  };
  boothNumber: string;
  isTop: boolean;
}
