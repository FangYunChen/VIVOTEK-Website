import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportLicense } from '../../../../../../../vvtk-core/classes/support-smart-vca';
import { VvtkService } from '../../../../../../../vvtk-core/services/vvtk.service';
import { SharedService } from '../../../../../../../vvtk-core/services/shared.service';

@Component({
  selector: 'vvtk-model-license-content',
  templateUrl: './model-license-content.component.html',
  styleUrls: ['./model-license-content.component.scss']
})

export class ModelLicenseContentComponent implements OnInit {
  pageIsEditable: boolean;

  id: number;
  license: SupportLicense;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.license = {
      id: 0,
      licenseName: ''
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    const routeParams$ = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.getModelType();
      }
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getModelType() {
    this.vvtkService.get(
      {
        path: `api/Products/SmartVca/Support/License/${this.id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.license = body;
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Products/SmartVca/Support/License`,
          disableLanguage: true
        },
        this.license,
        {
          next: resp => {
            this.router.navigate(['/supports/learning/smart-vca/support/license']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Products/SmartVca/Support/License/${this.id}`,
          disableLanguage: true
        },
        this.license,
        {
          next: resp => {
            this.router.navigate(['/supports/learning/smart-vca/support/license']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

}
