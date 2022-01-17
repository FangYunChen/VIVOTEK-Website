import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-job-opportunities',
  templateUrl: './job-opportunities.component.html',
  styleUrls: ['./job-opportunities.component.scss']
})
export class JobOpportunitiesComponent implements OnInit {

  _cardsItems = [];
  constructor(private vvtkService: VvtkService) { }

  ngOnInit() {
    this.vvtkService.getCareers('Vacancies', undefined, resp => {
      this._cardsItems = resp.json();
    });
  }
}
