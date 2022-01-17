export interface Image {
  id: number;
  name: string;
  typeId: number;
  imagePath: string;
  displayOrder?: number;
}

export interface ImageType {
  id: number;
  name: string;
}
