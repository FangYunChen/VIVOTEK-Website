import { SupportArticleOverviewType, SupportArticleType } from '../constants/support-article-constant';

export interface SupportArticleSearchResult {
  /** Product Name */
  name: string;
  articles: SupportArticle[];
  isExpand?: boolean;
}

export interface SupportArticle {
  headline: string;
  subRoute: string;
  lead: string;
  publishedAt: Date;
}

export interface SupportAricleContent extends SupportArticle {
  id: number;
  type: SupportArticleType;
  clickThrough: number;
  content: string;
  productTypes: number[];
  categories: number[];
  tags: SupportArticleTag[];
  createdAt: string;
  videos?: SupportArticleVideo[];
}

export interface SupportArticleTag {
  id: number;
  lang: string;
  name: string;
}

export interface SupportArticleVideo {
  title: string;
  link: string;
}

export interface SupportOverviewArticleFilterModel {
  overviewType: SupportArticleOverviewType;
  overviewCount: number;
}

export interface SupportProduct {
  id: number;
  name: string;
  imagePath: string;
  subRoute: string;
  categories?: SupportCategory[];
}

export interface SupportCategory {
  id: number;
  parentId?: number;
  name: string;
  displayOrder: number;
  children: SupportCategory[];
}
