import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  {
    path: 'page',
    component: PageComponent
  },
  {
    path: 'model',
    loadChildren: './support-model/support-model.module#SupportModelModule'
  },
  {
    path: 'type',
    loadChildren: './model-type/model-type.module#ModelTypeModule'
  },
  {
    path: 'package',
    loadChildren: './package/package.module#PackageModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
