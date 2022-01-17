import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PressReleasesPageComponent } from './components/press-releases-page/press-releases-page.component';
import { PressReleasesTagComponent } from './components/press-releases-tag/press-releases-tag.component';
import { PressReleasesComponent } from './components/press-releases/press-releases.component';

const routes: Routes = [
  {
    path: '',
    component: PressReleasesComponent
  },
  {
    path: 'tags/:id',
    component: PressReleasesTagComponent
  },
  {
    path: ':id',
    component: PressReleasesPageComponent
  },
  {
    path: ':id/:title',
    component: PressReleasesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PressReleasesRoutingModule {}
