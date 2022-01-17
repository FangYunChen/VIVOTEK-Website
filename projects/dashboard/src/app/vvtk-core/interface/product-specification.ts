import { ProductSelectorType } from '../constants/product-selector-constant';
import { ProductSelector } from './product-selector';

export interface ProductSpecification {
  id: number;
  parentId?: number;
  name: string;
  categoryId?: number;
  isAttribute: boolean;
  displayOrder?: number;
  children: ProductSpecification[];

  selectorType?: ProductSelectorType; // isAttribute 為 true 才會有值
  selectorOptions?: ProductSelector[]; // isAttribute 為 true 才會有值
}

export interface ProductSpecificationDisplaySetting extends ProductSpecification {
  purposeTypes: number[];
  purposeTypeChecks: { type: number, checked: boolean }[];
  allChildrenIds: number[];
  children: ProductSpecificationDisplaySetting[];
}

export interface ProductSpecificationDisplayOrder extends ProductSpecificationDisplaySetting {
  hideContent?: boolean;
  displayOrder: number;
  children: ProductSpecificationDisplayOrder[];
}
