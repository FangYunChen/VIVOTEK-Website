import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-download-list',
  templateUrl: './download-list.component.html',
  styleUrls: ['./download-list.component.scss']
})
export class DownloadListComponent implements OnInit {
  @Input() downloadList;
  videoUrl = '';
  openPopup = false;

  constructor() {}

  ngOnInit() {}

  openVideo(href: string) {
    if (href) {
      this.videoUrl = href;
      this.openPopup = true;
    } else {
      this.openPopup = false;
    }
  }
  windowPopup($event) {
    this.openPopup = $event;
  }
}
