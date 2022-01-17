export interface Tags {
  id: number;
  lang?: string;
  name?: string;
}

export interface TagLang {
  lang?: string;
  name?: string;
}

export interface SupportArticleProductCategoryChildren {
  id?: number;
  parentId?: number;
  name: string;
  displayOrder?: number;
  children?: SupportArticleProductCategoryChildren[];
}

export interface SupportArticleProductDisplayOrder {
  id?: number;
  displayOrder?: number;
}

export interface SupportArticleProductCategories {
  id?: number;
  parentId?: number;
  name: string;
  displayOrder?: number;
  children: SupportArticleProductCategoryChildren[];
}

export interface SupportArticleProductType {
  id?: number;
  name: string;
  imagePath?: string;
  subRoute?: string;
  isDisplayOnTop?: boolean;
  categories?: SupportArticleProductCategories[];
  selectedCategories?: number[];
}

export interface SupportArticleList {
  list: SupportArticle[];
  filterTotal: number;
}

export interface SupportArticle {
  id?: number;
  type?: number;
  clickThrough?: number;
  headline?: string;
  lead?: string;
  content?: string;
  subRoute?: string;
  productTypes?: number[];
  categories?: number[];
  tags?: Tags[];
  publishedAt?: Date;
  createdAt?: string;
  videos?: SupportArticleVideo[];
  selectedTagsArray?: number[];
  updatedAt?: Date;
  updatedUserEmail?: string;
}

export interface SupportArticleVideo {
  title?: string;
  link?: string;
  hideContent?: boolean;
}
