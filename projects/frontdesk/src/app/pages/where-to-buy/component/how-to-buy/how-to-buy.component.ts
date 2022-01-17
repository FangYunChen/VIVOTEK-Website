import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-how-to-buy',
  templateUrl: './how-to-buy.component.html',
  styleUrls: ['./how-to-buy.component.scss']
})
export class HowToBuyComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkService: VvtkService) {}

  ngOnInit() {
    this.vvtkService.get(
      {
        path: 'api/Buy/How',
        disableLanguage: false
      },
      {
        next: resp => {
          const data = resp.json();
          if (data) {
            this._Content = data;
          }
        }
      }
    );
  }
}
