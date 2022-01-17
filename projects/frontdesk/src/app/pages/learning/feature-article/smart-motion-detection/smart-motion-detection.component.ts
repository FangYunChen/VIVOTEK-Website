import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VvtkService } from '@frontdesk/core/services/vvtk.service';
import { first } from 'rxjs/operators';
import { I18nService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-smart-motion-detection',
  templateUrl: './smart-motion-detection.component.html',
  styleUrls: ['./smart-motion-detection.component.scss']
})
export class SmartMotionDetectionComponent implements OnInit {

  contents = [];
  selectedTabIndex = 0;
  routerUrl;

  constructor(
    private vvtkService: VvtkService,
    private route: ActivatedRoute,
    private router: Router,
    public i18nService: I18nService
  ) { }

  ngOnInit() {
    this.routerUrl = this.router.url.split('#')[0];
    this.route.fragment.pipe(first()).subscribe(fragment => {
      this.vvtkService.get(
        {
          path: 'api/SmartMotionDetection'
        },
        {
          next: resp => {
            const data = resp.json();
            data.forEach((d, index) => {
              if (d.anchorUrl === fragment) {
                this.selectedTabIndex = index;
              }
            });
            this.contents = data ? data : this.contents;
          }
        }
      );
    }).unsubscribe();
  }

}
