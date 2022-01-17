import { ProductCategoryForNestedNav } from '../../../../products/interfaces/product-category-for-nested-nav';

export interface ProductSelectorCategoryModel extends ProductCategoryForNestedNav {
  hasSpec: boolean;
  children?: ProductSelectorCategoryModel[];
  // custom properties
  active?: boolean;
  /**
   * 此 category 節點到 root 節點上最近的 categoryId (有直接對應的 SpecTree)
   */
  categoryIdWhichHasSpec?: number;
  /**
   * 用來決定 specification 和 selector 是否要顯示
   */
  isDisplaySpecifications?: boolean;
}
