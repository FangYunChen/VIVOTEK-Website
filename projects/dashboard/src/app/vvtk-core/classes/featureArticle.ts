import { Template } from './template';

export class FeatureArticleList {
  list: FeatureArticleListItem[];
}

export class FeatureArticleListItem {
  id: string;
  title?: string;
  linkText?: string;
  description?: string;
  isEnabled?: boolean;
  /** DB has column [HTMLContents] if and only if this is true */
  hasContent?: boolean;
  /** DB has column [Templates] if and only if this is true */
  hasTemplate?: boolean;
  hasSheet?: boolean;
  dirPath?: string;
  apis?: {
    get: string;
    post: string;
    patch: string;
  };
  templateTypes?: number[];
  displayOrder?: number;
  templates?: Template[];
  updatedAt?: string;
  updatedUser?: {
    id: string;
    name: string;
    email: string;
  };
}

export class Banner {
  type: string;
  imageName: string;
  imageAlt: string;
  imageUrl: string;
  hideContent?: boolean;
}

export class Banners {
  PC: Banner;
  Tablet: Banner;
  Mobile: Banner;
}
