import { ProductSpecification } from './product-specification';
import { ProductSelectorType } from '../constants/product-selector-constant';

export interface ProductSelectorContent {
  id: number;
  name: string;
  /**api data */
  specifications: ProductSpecification[];
  selectors: Selector[];
}

export interface Selector {
  specName: string;
  selectorType: ProductSelectorType;
  selectorOptions: SelectorOption[];
}

export interface SelectorOption {
  id: number;
  name: string;
  /** json string*/
  content: string | boolean | SelectorOptionRange | null;
  isFilter: boolean;
  minimum?: number;
  maximum?: number;
  unit?: string;
  children: SelectorOption[];
}

export interface SelectorOptionRange {
  minimum?: number;
  maximum?: number;
}

export interface ProductSelector {
  id: number;
  name: string;
  minimum?: number;          // selectorType 為 Range 且 isFilter 為 true 才會有值
  maximum?: number;          // selectorType 為 Range 且 isFilter 為 true 才會有值
  unit?: string;         // selectorType 為 Range 且 isFilter 為 true 才會有值
  displayOrder?: number;
  isFilter: boolean;
  children: ProductSelector[]; // isFilter 為 false 才會有值
  /** json string*/
  content?: string | boolean | {
    minimum?: number;
    maximum?: number;
  } | null;
}
