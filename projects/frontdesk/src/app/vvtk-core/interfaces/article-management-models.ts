export class Category {
  title: string;
  articles: Article[];
}

export class Article {
  title: string;
  articleId: number;
  articleLang: string;
  summary: string;
  content: string;
  youtubeUrls: string[];
}
