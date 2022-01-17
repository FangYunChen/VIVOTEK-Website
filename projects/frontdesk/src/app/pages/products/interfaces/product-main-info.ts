export interface ProductMainInfo {
  shortDescription: string;
  legacyDescription?: string;
  series: string;
  type: number;
  name: string;
  reviewState: number;
  id: number;
  state: number;
  url?: string;
  msg: string;
  images: {
    id: number;
    imagePath: string;
    name: string;
    type?: any;
    typeId: number;
  }[];
  icons: {
    id: number;
    imagePath: string;
    name: string;
    type?: any;
    typeId: number;
  }[];
}
