export interface ProductCategory {
  id: number;
  parentId?: number;
  name: string;
  subRoute?: string;
  imageId?: number;
  imageName?: string;
  imagePath?: string;
  displayOrder: number;
  isDisplayOnSelector: boolean;
  children?: ProductCategory[];
  allChildrenIds?: number[];
}

export interface ProductCategoryCheck extends ProductCategory {
  checked: boolean;
}
