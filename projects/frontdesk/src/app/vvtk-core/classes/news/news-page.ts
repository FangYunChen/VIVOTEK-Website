export class NewsPage {
  id: string;
  title: string;
  video: string;
  image: {
    src: string;
    alt: string;
    title: string;
  };
  status: number;
  content: string;
  newsType: string;
  templates: [
    {
      type: number;
    }
  ];
}
