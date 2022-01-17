import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-compensation-and-benefit',
  templateUrl: './compensation-and-benefit.component.html',
  styleUrls: ['./compensation-and-benefit.component.scss']
})
export class CompensationAndBenefitComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Careers/CompensationAndBenefit'
    }).subscribe(result => {
      if (result === null) {
        this.route.navigateByUrl('/404?q=Compensation%20And%20Benefit');
      } else {
        this._Content = result || this._Content;
      }
    }
    );
  }
}

