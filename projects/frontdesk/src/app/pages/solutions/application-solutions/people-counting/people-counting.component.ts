import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-people-counting',
  templateUrl: './people-counting.component.html',
  styleUrls: ['./people-counting.component.scss']
})
export class PeopleCountingComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Solutions/PeopleCounting'
    }).subscribe(result => this._Content = result || this._Content);
  }
}
