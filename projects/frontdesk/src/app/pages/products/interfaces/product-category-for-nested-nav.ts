export interface ProductCategoryForNestedNav {
  id: number;
  name: string;
  subRoute: string;
  imageId?: number;
  imagePath?: string;
  imageName?: string;
  displayOrder?: number;
  parentId?: number;
  children?: ProductCategoryForNestedNav[];
}
