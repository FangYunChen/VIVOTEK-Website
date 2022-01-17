import { NgModule } from '@angular/core';
import { SafeHtmlPipe, SafeUrlPipe, TimesPipe } from './vvtk.pipe';

@NgModule({
  imports: [],
  declarations: [SafeHtmlPipe, SafeUrlPipe, TimesPipe],
  exports: [SafeHtmlPipe, SafeUrlPipe, TimesPipe]
})
export class VvtkPipeModule {}
