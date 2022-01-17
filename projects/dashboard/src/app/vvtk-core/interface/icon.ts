export interface Icon {
  id: number;
  name: string;
  typeId: number;
  imagePath: string;
  displayOrder?: number;
}

export interface IconType {
  id: number;
  name: string;
}
