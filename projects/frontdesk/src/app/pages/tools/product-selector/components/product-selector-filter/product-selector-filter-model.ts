export interface ProductSelectorFilterModel {
  id: number;
  specId: number;
  name: string;
  isFilter: boolean;
  minimum?: number;
  maximum?: number;
  unit?: string;
  // displayOrder?: number;
  // content?: string;
  children?: ProductSelectorFilterModel[];
  // custom properties
  model?: ProductSelectorModel;
}

export interface ProductSelectorModel {
  singleValue?: boolean;
  multipleValue?: boolean;
  rangeMinValue?: number;
  rangeMaxValue?: number;
  yesNoValue?: boolean;
}
