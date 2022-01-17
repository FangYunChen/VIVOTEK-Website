export class CardsItems {
  id: number;
  title: string;
  description: string;
  date: string; // 時間字串
  video?: string; // 自訂影片，若無自訂則 null

  // 基本上img 跟 image 是一樣的，只是開API的時候有出入，所以另外做處理把它合併
  // img; // (註解掉，另外做處理)
  image: {
    src: string;
    alt: string;
    title: string;
  };
  get img(): {
    src: string;
    alt: string;
    title: string;
  } {
    return this.image;
  }
  set img(value: { src: string; alt: string; title: string }) {
    this.image = value;
  }

  url?: string;
  customPath?: string; // 自訂網址，若無自訂則 null
  get href(): string {
    return this.url;
  }
  set href(value: string) {
    this.url = value;
  }
}
