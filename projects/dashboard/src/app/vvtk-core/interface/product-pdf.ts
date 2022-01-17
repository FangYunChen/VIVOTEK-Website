export interface ProductPdfInfo {
  productId?: number;
  subtitle?: string;
  shortDescription?: string;
  accessoryTemplate?: string;
  orderInformation?: string;
  pdfTemplates?: PdfTemplate[];
  showOverview?: boolean;
}

export interface PdfTemplate {
  type?: string;
  title?: string;
  htmlContent?: string;
  AccessoryItems?: AccessoryItem[];
}

export interface AccessoryItem {
  model: string;
  title?: string;
  imgSrc?: string;
  description?: string;
  hideContent?: boolean;
}
