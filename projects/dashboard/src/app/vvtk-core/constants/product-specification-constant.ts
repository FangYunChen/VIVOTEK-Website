import { CommonSelectOption } from '../interface/common-model';

export enum ProductSpecificaionPurposeType {
  PageSpec = 1,
  DatasheetSpec = 2,
  ProjectDatasheet = 3,
  ProductSelectorFilter = 4,
  ProductSelectorComparisonTable = 5
}

export const ProductSpecificaionPurposeTypeList: CommonSelectOption[] = [
  { value: ProductSpecificaionPurposeType.PageSpec, optionText: 'Page Spec' },
  { value: ProductSpecificaionPurposeType.DatasheetSpec, optionText: 'Datasheet Spec' },
  { value: ProductSpecificaionPurposeType.ProjectDatasheet, optionText: 'Project Datasheet' },
  { value: ProductSpecificaionPurposeType.ProductSelectorFilter, optionText: 'Product Selector Filter' },
  { value: ProductSpecificaionPurposeType.ProductSelectorComparisonTable, optionText: 'Product Selector Comparison Table' },
];
