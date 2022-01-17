export interface GeneralDownloadOption {
  title: string;
  filters: string[];
  documentTypeForData: string[];
  documentTypeForProperty: string[];
  needLang?: boolean;
}

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
}

export interface PropertyContent {
  id: number;
  type: number;
  content: string;
}

export interface PropertyContentFilter {
  id: number;
  name: string;
  content: string;
}

export interface DocumentTypeQueryResult {
  rootDocumentTypeId: number;
  currentDocumentType: number;
}

export interface ProductDownload {
  productName: string;
  downloadMains: DownloadCenterMain[];
}

export interface DownloadQuery {
  propertyContents?: PropertyContentFilter[];
  documentTypeId?: number;
  pageIndex: number;
  pageSize: number;
  productId?: number;
}

export interface ProductDownloadQuery {
  keyword: string;
  documentTypeId: number;
  productId: number;
  categoryId: number;
  pageIndex: number;
  pageSize: number;
}

export interface DownloadCenterApplication {
  userId: string;
  documentTypeId: number;
  isPermitted: boolean | null;
}
