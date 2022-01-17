import { Image } from './image';
import { Icon } from './icon';
import { Template } from '../classes/template';
import { ProductReviewStateType, ProductUserReviewStateType } from '../constants/product-review-state-constant';

export interface ProductListItem {
  id: number;
  name: string;
  series: string;
  type: number;
  rootCategories: string[];
  parentCategories: number[];
  langOnTheMarket: string[];
  reviewState: ProductReviewStateType;
  msg: string;
}

export interface Product {
  id?: number;
  /**for copy mode to reference productId */
  duplicateProductId?: number;
  parentCategories: number[];
  name?: string;
  type: number;
  series?: string;
  images: ProductImage[];
  icons: Icon[];
  url?: string;
  state?: number;
  shortDescription?: string;
  legacyDescription?: string;
  reviewState?: ProductReviewStateType;
  msg: string;
  showMsg: boolean;
}

export interface ProductImage {
  type: number;
  images: Image[];
}

export interface ProductTabDetail {
  productName?: string;
  productType?: number;
  list?: ProductTab[];
}

export interface ProductFeature {
  id: number;
  content: string;
  displayOrder: number;
}

export interface ProductTab extends ProductTabDetail {
  id?: number;
  tabName?: string;
  anchorUrl?: string;
  tabType?: number;
  templates?: Template[];
  isDisplayOnTop?: boolean;
  displayOrder?: number;
}

export interface ProductSpecificationDetail {
  id: number;
  parentId?: number;
  name: string;
  content?: string;
  isAttribute: boolean;
  displayOrder?: number;
  children?: ProductSpecificationDetail[];
  hideContent?: boolean;
}

export interface ProductCard {
  id: number;
  name: string;
  shortDescription?: string;
  imagePath?: string;
}

export interface ProductReviewItem {
  id: number;
  name: string;
  url: string;
  userReviewState: ProductUserReviewStateType;
}
