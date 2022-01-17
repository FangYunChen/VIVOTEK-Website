import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryMenuComponent } from './tree/category-menu/category-menu.component';
import { ProductSelectorSettingComponent } from './product-selector-setting/product-selector-setting.component';


const routes: Routes = [
  {
    path: 'tree',
    component: CategoryMenuComponent
  },
  {
    path: 'product-selector-setting',
    component: ProductSelectorSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
