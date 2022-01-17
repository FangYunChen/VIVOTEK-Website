import { ProductForGridItem } from './product-for-grid-item';
import { ProductCategoryForGridItem } from './product-category-for-grid-item';

export interface ProductCategoryAndProduct {
  products: ProductForGridItem[];
  categories: ProductCategoryForGridItem[];
}
