export interface SupportCategory {
  id?: number;
  name?: string;
}

export interface SupportProduct {
  id?: number;
  name?: string;
  categories: SupportCategory[];
  categoryIds?: number[];
  categoriesText?: string;
}

export interface SupportBrand {
  id?: number;
  name: string;
  websiteUrl?: string;
}

export interface SupportFeature {
  id: number;
  name: string;
  displayOrder: number;
  isEnabled: boolean;
}

export interface SupportModel {
  id?: number;
  brandName: string;
  name: string;
  websiteUrl?: string;
}

export interface SupportModelDetail {
  id?: number;
  brandId: number;
  name: string;
  websiteUrl?: string;
  products: SupportModelProduct[];
}

export interface SupportModelProduct {
  hideContent?: boolean;
  id: number;
  categories: SupportModelCategory[];
}

export interface SupportModelCategory {
  hideContent?: boolean;
  id: number;
  features: SupportModelFeature[];
}

export interface SupportModelFeature {
  id: number;
  description: string;
  descriptionUrl?: string;
}
