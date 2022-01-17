import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardOfDirectorsRoutingModule } from './board-of-directors-routing.module';
import { BoardOfDirectorsComponent } from './components/board-of-directors/board-of-directors.component';
import { SharedModule } from '@frontdesk/shared/shared.module';

@NgModule({
  imports: [CommonModule, BoardOfDirectorsRoutingModule, SharedModule],
  declarations: [BoardOfDirectorsComponent]
})
export class BoardOfDirectorsModule {}
