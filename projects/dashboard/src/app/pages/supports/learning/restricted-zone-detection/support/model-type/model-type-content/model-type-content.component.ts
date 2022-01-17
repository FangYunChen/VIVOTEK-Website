import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportType } from '../../../../../../../vvtk-core/classes/support-restricted-zone-detection';
import { VvtkService } from '../../../../../../../vvtk-core/services/vvtk.service';
import { SharedService } from '../../../../../../../vvtk-core/services/shared.service';

@Component({
  selector: 'vvtk-model-type-content',
  templateUrl: './model-type-content.component.html',
  styleUrls: ['./model-type-content.component.scss']
})

export class ModelTypeContentComponent implements OnInit {
  pageIsEditable: boolean;

  id: number;
  type: SupportType;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.type = {
      id: 0,
      typeName: ''
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
        path: `api/Products/RestrictedZoneDetection/Support/Type/${this.id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.type = body;
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Products/RestrictedZoneDetection/Support/Type`,
          disableLanguage: true
        },
        this.type,
        {
          next: resp => {
            this.router.navigate(['/supports/learning/restricted-zone-detection/support/type']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Products/RestrictedZoneDetection/Support/Type/${this.id}`,
          disableLanguage: true
        },
        this.type,
        {
          next: resp => {
            this.router.navigate(['/supports/learning/restricted-zone-detection/support/type']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

}
