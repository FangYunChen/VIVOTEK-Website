import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-amazon-kinesis-video-streams',
  templateUrl: './amazon-kinesis-video-streams.component.html',
  styleUrls: ['./amazon-kinesis-video-streams.component.scss']
})
export class AmazonKinesisVideoStreamsComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/LandingPages/AmazonKinesisVideoStreams'
    }).subscribe(result => this._Content = result || this._Content);
  }
}
