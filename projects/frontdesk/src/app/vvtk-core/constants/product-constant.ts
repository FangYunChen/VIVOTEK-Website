/**這邊的value不要改，只能新增不能改。 */
export enum StateEnum {
  New = 1,
  ComingSoon = 2,
  Legacy = 3,
}

/**這邊的value不要改，只能新增不能改。 */
export const StateList: {
  value: number;
  labelText: string;
  color?: string;
  bgColor?: string;
}[] = [
    { value: 0, labelText: '' }, // No state
    { value: 1, labelText: 'NEW', bgColor: '#1877ff' },
    { value: 2, labelText: 'Coming Soon' },
    { value: 3, labelText: 'Legacy', color: '#fff', bgColor: '#adadad' }
  ];

export enum ProductSpecificaionPurposeType {
  PageSpec = 1,
  DatasheetSpec = 2,
  ProjectDatasheet = 3,
  ProductSelectorFilter = 4,
  ProductSelectorComparisonTable = 5
}
