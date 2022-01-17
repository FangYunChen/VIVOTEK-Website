import { CommonSelectOption } from '../interface/common-model';

export enum ProductImageMappingType {
  Cover = 1,
  General = 2,
  SixView = 3
}

/**這邊的value不要改，只能新增不能改。 */
export const ProductPageTypeList: CommonSelectOption[] = [
  { value: 1, optionText: 'Normal' },
  { value: 2, optionText: 'Template page(one page)' },
  { value: 3, optionText: 'Template page(switch by tab)' },
  { value: 4, optionText: 'Url' },
];

/**這邊的value不要改，只能新增不能改。 */
export const SeriesList: CommonSelectOption[] = [
  { value: '', optionText: 'No series' },
  { value: 'S', optionText: 'S' },
  { value: 'V', optionText: 'V' },
  { value: 'C', optionText: 'C' },
  { value: 'insight', optionText: 'insight' }
];

/**這邊的value不要改，只能新增不能改。 */
export const StateList: CommonSelectOption[] = [
  { value: 0, optionText: 'No status' },
  { value: 1, optionText: 'NEW' },
  { value: 2, optionText: 'Coming Soon' },
  { value: 3, optionText: 'Legacy' }
];

/**這邊的value不要改，只能新增不能改。 */
export const TabTypeList: CommonSelectOption[] = [
  { value: 0, optionText: 'templates' },
  { value: 1, optionText: 'features' },
  { value: 2, optionText: 'overview' },
  { value: 3, optionText: 'special highlights' },
  { value: 4, optionText: 'specifications' },
  { value: 5, optionText: 'video' },
  { value: 6, optionText: 'support' },
  { value: 7, optionText: 'accessories' },
  { value: 8, optionText: 'downloads' },
  { value: 9, optionText: 'ordering information' },
  { value: 10, optionText: 'related product' },
];

export const DatasheetTypeList: CommonSelectOption[] = [
  { value: 1, optionText: 'official' }, // Download
  { value: 2, optionText: 'project' }, // Internal
];
