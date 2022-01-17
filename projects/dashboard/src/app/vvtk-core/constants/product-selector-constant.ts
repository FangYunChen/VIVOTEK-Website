import { CommonSelectOption } from '../interface/common-model';

export enum ProductSelectorType {
  Single = 1,
  Multiple = 2,
  Range = 3,
  YN = 4
}

export const ProductSelectorTypeOptions: CommonSelectOption[] = [
  { value: ProductSelectorType.Single, optionText: 'Single' },
  { value: ProductSelectorType.Multiple, optionText: 'Multiple' },
  { value: ProductSelectorType.Range, optionText: 'Range' },
  { value: ProductSelectorType.YN, optionText: 'Yes or No' },
];
