import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatasheetListComponent } from './datasheet-list/datasheet-list.component';
import { DatasheetContentComponent } from './datasheet-content/datasheet-content.component';

const routes: Routes = [
  {
    path: '',
    component: DatasheetListComponent
  },
  {
    path: ':id',
    component: DatasheetContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatasheetRoutingModule { }
