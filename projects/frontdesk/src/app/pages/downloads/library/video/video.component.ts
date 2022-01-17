import { Component, OnInit } from '@angular/core';
import { GeneralDownloadOption } from '@frontdesk/core/interfaces/download-center';

@Component({
  selector: 'vvtk-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  option: GeneralDownloadOption = {
    title: 'Video',
    filters: ['Title', 'Category', 'Type'],
    documentTypeForData: ['Library', 'Video'],
    documentTypeForProperty: ['Library', 'Video'],
    needLang: true
  };

  constructor() { }

  ngOnInit() { }
}
