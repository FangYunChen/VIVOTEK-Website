import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-learning-and-development',
  templateUrl: './learning-and-development.component.html',
  styleUrls: ['./learning-and-development.component.scss']
})
export class LearningAndDevelopmentComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Careers/LearningAndDevelopment'
    }).subscribe(result => {
      if (result === null) {
        this.route.navigateByUrl('/404?q=Learning%20And%20Development');
      } else {
        this._Content = result || this._Content;
      }
    }
    );
  }
}

