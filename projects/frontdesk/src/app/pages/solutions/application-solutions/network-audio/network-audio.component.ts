import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-network-audio',
  templateUrl: './network-audio.component.html',
  styleUrls: ['./network-audio.component.scss']
})
export class NetworkAudioComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Solutions/NetworkAudio'
    }).subscribe(result => {
      if (result === null) {
        this.route.navigateByUrl('/404?q=Solutions%20NetworkAudio');
      } else {
        this._Content = result || this._Content;
      }
    }
    );
  }
}
