export interface ProductForGridItem {
  parentId: number;
  id: number;
  name: string;
  shortDescription: string;
  state: number;
  url: string;
  image: {
    id: number;
    imagePath: string;
    name: string;
    type?: any;
    typeId: number;
  };
}
