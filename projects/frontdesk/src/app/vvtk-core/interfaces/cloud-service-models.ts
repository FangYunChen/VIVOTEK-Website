export class MainCategory {
  title: string;
  order: Number;
  subCategories: SubCategory[];
}

export class SubCategory {
  title: string;
  order: Number;
  articles: Article[];
}

export class Article {
  title: string;
  articleId: Number;
  order: Number;
  articleLang: string;
  summary: string;
  content: string;
  youtubeUrls: string[];
}
