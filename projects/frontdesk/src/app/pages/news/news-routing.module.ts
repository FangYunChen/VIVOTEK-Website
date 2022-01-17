import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'press-releases',
    loadChildren: './press-releases/press-releases.module#PressReleasesModule'
  },
  {
    path: 'successful-cases',
    loadChildren:
      './successful-cases/successful-cases.module#SuccessfulCasesModule'
  },
  {
    path: 'events',
    loadChildren: './events/events.module#EventsModule'
  },
  {
    path: 'campaigns',
    loadChildren: './campaigns/campaigns.module#CampaignsModule'
  },
  {
    path: 'social-media',
    loadChildren: './social-media/social-media.module#SocialMediaModule'
  },
  {
    path: 'industry-coverage',
    loadChildren:
      './industry-coverage/industry-coverage.module#IndustryCoverageModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule {}
