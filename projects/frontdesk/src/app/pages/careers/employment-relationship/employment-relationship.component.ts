import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-employment-relationship',
  templateUrl: './employment-relationship.component.html',
  styleUrls: ['./employment-relationship.component.scss']
})
export class EmploymentRelationshipComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Careers/EmploymentRelationship'
    }).subscribe(result => {
      if (result === null) {
        this.route.navigateByUrl('/404?q=Employment%20Relationship');
      } else {
        this._Content = result || this._Content;
      }
    }
    );
  }
}

