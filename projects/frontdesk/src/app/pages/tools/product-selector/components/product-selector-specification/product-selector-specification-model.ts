import { ProductSelectorFilterModel } from '../product-selector-filter/product-selector-filter-model';

export interface ProductSelectorSpecificationModel {
  id: number;
  name: string;
  parentId: number;
  categoryId: number;
  isAttribute: boolean;
  selectorType?: ProductSelectorType;
  // purposeTypes?: number;
  selectorOptions?: ProductSelectorFilterModel[];
  children?: ProductSelectorSpecificationModel[];
  // custom properties
  allSelectorOptions?: ProductSelectorFilterModel[];
  isExpanded?: boolean;
}

export enum ProductSelectorType {
  Single = 1,
  Multiple = 2,
  Range = 3,
  YesNo = 4
}
