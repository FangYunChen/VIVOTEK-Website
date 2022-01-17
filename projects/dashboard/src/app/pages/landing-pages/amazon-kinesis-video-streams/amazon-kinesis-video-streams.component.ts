import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-amazon-kinesis-video-streams',
  templateUrl: './amazon-kinesis-video-streams.component.html',
  styleUrls: ['./amazon-kinesis-video-streams.component.scss']
})
export class AmazonKinesisVideoStreamsComponent implements OnInit {
  opts: TemplatePageOption = {
    title: 'Amazon Kinesis Video Streams',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'api/LandingPages/AmazonKinesisVideoStreams',
    apis: {
      get: 'api/LandingPages/AmazonKinesisVideoStreams',
      patch: 'api/LandingPages/AmazonKinesisVideoStreams'
    }
  };

  constructor() {}

  ngOnInit() {}
}
