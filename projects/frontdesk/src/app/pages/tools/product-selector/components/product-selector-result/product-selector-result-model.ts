export interface ProductSelectorResultCategory {
  id: number;
  name: string;
  children?: ProductSelectorResultCategory[];
  products?: ProductSelectorResultProduct[];
  // custom properties
  displayName: string;
  filteredProducts?: ProductSelectorResultProduct[];
}

export interface ProductSelectorResultProduct {
  id: number;
  name: string;
  imagePath: string;
  imageName: string;
  selectorOptions?: ProductSelectorResultOptions[];
  // custom properties
  url?: string;
}

export interface ProductSelectorResultOptions {
  id: number;
  specId: number;
  name?: string;
  minimum?: number;
  maximum?: number;
  unit?: string;
  // displayOrder: number;
  isFilter: boolean;
  content: string;
  contentObj?: { minimum: number, maximum: number };
  children?: ProductSelectorResultOptions[];
}
