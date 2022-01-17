import { Component, Input, OnInit } from '@angular/core';
import * as screenfull from 'screenfull';

@Component({
  selector: 'vvtk-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input('sidenav') sidenav: any;
  isFullscreen = false;

  showBreadcrumbs = false;

  constructor() {}

  ngOnInit() {}

  toggleFullscreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    }
  }
}
