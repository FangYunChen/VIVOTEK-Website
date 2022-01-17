export interface ProductCategoryForGridItem {
  subRoute?: string;
  parentId: number;
  id: number;
  name: string;
  url?: any;
  image: {
    id: number;
    imagePath: string;
    name: string;
    type?: any;
    typeId: number;
  };
}
