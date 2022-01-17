export interface ModelElement {
  'modelsString': string;
  'announcementLink': string;
}
export interface SubCategoryElement {
  subCategoryName: string;
  order: number;
  models: Array<ModelElement>;
}
