export interface SmartVcaSupportModel {
  id: number;
  modelName: string;
  typeId: number;
  licenseId: number;
  url: string;
  imageUrl: string;
  imageTitle: string;
  imageAlt: string;
  featureIds: number[];
  typeName: string;
  licenseName: string;
  statusName: string;
  features: string[];
  featureDownloadUrl: string[];
}
