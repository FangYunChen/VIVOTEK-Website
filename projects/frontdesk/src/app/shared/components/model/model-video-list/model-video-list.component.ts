import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-model-video-list',
  templateUrl: './model-video-list.component.html',
  styleUrls: ['./model-video-list.component.scss']
})
export class ModelVideoListComponent implements OnInit {
  @Input() template;
  constructor() { }

  ngOnInit() {
    if (this.template && this.template.videos) {
      this.template.videos.forEach(video => {
        this.setVideoUrl(video);
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
