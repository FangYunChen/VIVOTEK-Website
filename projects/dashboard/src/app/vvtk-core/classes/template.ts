export class TemplatePageOption {
  title: string;
  /** DB has column [HTMLContents] if and only if this is true */
  hasContent: boolean;
  /** DB has column [Templates] if and only if this is true */
  hasTemplate: boolean;
  hasSheet: boolean;
  dirPath: string;
  apis: {
    get: string;
    patch: string;
  };
  templateTypes?: number[];
}

export class Templates {
  content?: string;
  sheet?: string;
  templates?: Template[];
}

export class TabTemplates extends Templates {
  id: number;
  tabName?: string;
  anchorUrl?: string;
  isEnabled?: boolean;
  displayOrder?: number;
}

export class Template {
  hideContent?: boolean;
  showStyle?: boolean;
  type: number;
  title: string;
  subtitle: string;
  content: string;
  htmlContent: string;
  image: Image;
  images: Image[];
  linkImages: LinkImage[];
  imagePosition: string;
  url: string;
  urlEnabled: boolean;
  cards: Card[];
  panels: Panel[];
  columns: Column[];
  video: string;
  downloadList: Download[];
  icons: Icon[];
  listItems: ListItem[];
  listLinkItem: ListLinkItem;
  videos: Video[];
  bannerImage: BannerImage;
  bannerImages: BannerImages[];
  eventLocations: EventLocation[];
  rowColumn: number;
  imageTexts: ImageText[];
  articleList: ArticleList;
  tabs: Tab[];
  nestedSpecs: Specification[];
}

export class Card {
  hideContent?: boolean;
  title: string;
  subtitle: string;
  image: Image;
  url: string;
  htmlContent: string;
}

export class Panel {
  hideContent?: boolean;
  title: string;
  subtitle: string;
  image: Image;
  htmlContent: string;
}

export class ImageText {
  hideContent?: boolean;
  title: string;
  image: Image;
  htmlContent: string;
  url: string;
  horizontal: string;
  urlEnabled: boolean;
}

export class Column {
  hideContent?: boolean;
  title: string;
  htmlContent: string;
}

export class Image {
  hideContent?: boolean;
  src: string;
  alt: string;
  title: string;
  url?: string;
}

export class LinkImage {
  hideContent?: boolean;
  src: string;
  alt: string;
  title: string;
  linkText?: string;
  description?: string;
  url?: string;
}

export class Download {
  hideContent?: boolean;
  description: string;
  url: string;
}

export class Icon {
  hideContent?: boolean;
  title: string;
  htmlContent: string;
  image: Image;
  url: string;
  urlEnabled: boolean;
}

export class ListItem {
  hideContent?: boolean;
  title: string;
  itemTexts: ItemText[];
}

export class ItemText {
  text: string;
}

export class Video {
  hideContent?: boolean;
  title: string;
  videoUrl: string;
  url: string;
  urlEnabled: boolean;
}

export class BannerImage {
  imagePC: Image;
  imageTablet: Image;
  imageMobile: Image;
}

export class BannerImages {
  hideContent?: boolean;
  imagePC: Image;
  imageTablet: Image;
  imageMobile: Image;
}

export class ListLinkItem {
  hideContent?: boolean;
  backgroundColor: string;
  linkItems: LinkItem[];
}

export class LinkItem {
  hideContent?: boolean;
  text: string;
  url: string;
}

export class EventLocation {
  hideContent?: boolean;
  title: string;
  eventDate: string;
  eventTime: string;
  subtitle: string;
  placeName: string;
  address: string;
  image: Image;
  calendarUrl: string;
  url: string;
  urlEnabled: boolean;
}

export class ArticleList {
  categories: Category[];
  exportable?: boolean;
}

export class Category {
  hideContent?: boolean;
  title: string;
  articles: Article[];
}

export class Article {
  hideContent?: boolean;
  title: string;
  summary: string;
  htmlContent?: string;
  videos?: Video[];
}

/**有用到tab功能的template可以從這邊加屬性上去 */
export class Tab {
  hideContent?: boolean;
  tabName?: string;
  videos?: Video[];
}

export class Specification {
  hideContent?: boolean;
  name: string;
  isAttribute: boolean;
  content?: string;
  children?: Specification[];
}
