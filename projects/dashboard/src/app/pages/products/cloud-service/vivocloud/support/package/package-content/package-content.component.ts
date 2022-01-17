import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportPackage } from '../../../../../../../vvtk-core/classes/product-vivocloud';
import { VvtkService } from '../../../../../../../vvtk-core/services/vvtk.service';
import { SharedService } from '../../../../../../../vvtk-core/services/shared.service';

@Component({
  selector: 'vvtk-package-content',
  templateUrl: './package-content.component.html',
  styleUrls: ['./package-content.component.scss']
})

export class PackageContentComponent implements OnInit {
  pageIsEditable: boolean;

  id: number;
  package: SupportPackage;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.package = {
      id: 0,
      featureName: '',
      isDisplay: true
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    const routeParams$ = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.getPackage();
      }
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getPackage() {
    this.vvtkService.get(
      {
        path: `api/Products/VIVOCloud/Support/Package/${this.id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.package = body;
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Products/VIVOCloud/Support/Package`,
          disableLanguage: true
        },
        this.package,
        {
          next: resp => {
            this.router.navigate(['/products/cloud-service/vivocloud/support/package']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Products/VIVOCloud/Support/Package/${this.id}`,
          disableLanguage: true
        },
        this.package,
        {
          next: resp => {
            this.router.navigate(['/products/cloud-service/vivocloud/support/package']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

}
