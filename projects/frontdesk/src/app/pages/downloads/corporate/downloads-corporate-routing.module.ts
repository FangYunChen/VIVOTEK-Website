import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoComponent } from './logo/logo.component';
import { WallPaperComponent } from './wall-paper/wall-paper.component';
import { CisComponent } from './cis/cis.component';

const routes: Routes = [
  {
    path: 'logo',
    component: LogoComponent
  },
  {
    path: 'wall-paper',
    component: WallPaperComponent
  },
  {
    path: 'cis',
    component: CisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadsCorporateRoutingModule { }
