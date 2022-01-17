import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-model-tab-videos',
  templateUrl: './model-tab-videos.component.html',
  styleUrls: ['./model-tab-videos.component.scss']
})
export class ModelTabVideosComponent implements OnInit {
  @Input() template;
  constructor() { }

  ngOnInit() {
    if (this.template && this.template.tabs) {
      this.template.tabs.forEach(tab => {
        if (tab.videos) {
          tab.videos.forEach(video => {
            this.setVideoUrl(video);
          });
        }
      });
    }
  }

  setVideoUrl(video) {
    if (video.videoUrl.split('v=').length > 1) {
      video.videoUrl = video.videoUrl.split('v=')[1].split('&')[0];
    }
    if (video.videoUrl.split('/v/').length > 1) {
      video.videoUrl = video.videoUrl.split('/v/')[1].split('&')[0];
    }
  }
}
