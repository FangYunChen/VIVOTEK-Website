import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VvtkService } from '@frontdesk/core/services/vvtk.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'vvtk-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.scss']
})
export class TransportationComponent implements OnInit {

  contents = [];
  selectedTabIndex = 0;
  routerUrl;

  constructor(
    private vvtkService: VvtkService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.routerUrl = this.router.url.split('#')[0];
    this.route.fragment.pipe(first()).subscribe(fragment => {
      this.vvtkService.get(
        {
          path: 'api/Solutions/Transportation'
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
