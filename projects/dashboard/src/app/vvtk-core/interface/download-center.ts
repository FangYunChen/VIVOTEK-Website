export interface DownloadCenterProperty {
  id?: number;
  type: number;
  name: string;
}

export interface DocumentPropertyMapping extends DownloadCenterProperty {
  propertyId: number;
  isEnabled: boolean;
  displayOrder: number;
}

export interface DownloadDocumentType {
  id?: number;
  name: string;
  isPermissionRequired?: boolean;
  parent?: DownloadDocumentType;
  children: DownloadDocumentType[];
}

export interface DownloadCenterMain {
  id: number;
  documentTypeId?: number;
  documentTypeName?: string;
  productId?: number;
  productName?: string;
  propertyContents: PropertyContent[];
  /**for show list */
  propertyContentMap?: Map<number, string>;
  isHide: boolean;
}

export interface PropertyContent extends DownloadCenterProperty {
  id: number;
  content: string;
}

export interface DownloadCenterMainDetail extends DownloadCenterMain {
  documentTypeId: number;
  productId?: number;
}

export interface DownloadCenterApplication {
  userId?: string;
  documentTypeId: number;
  isPermitted: boolean | null;
  rejectedReason?: string;
}
