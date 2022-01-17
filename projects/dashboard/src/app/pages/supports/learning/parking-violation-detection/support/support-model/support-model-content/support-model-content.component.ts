import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../../../vvtk-core/services/vvtk.service';
import {
  ParkingViolationDetectionSupport,
  SupportType,
  SupportFeature
} from '../../../../../../../vvtk-core/classes/support-parking-violation-detection';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-support-model-content',
  templateUrl: './support-model-content.component.html'
})
export class SupportModelContentComponent implements OnInit {
  pageIsEditable: boolean;

  id: number;
  support: ParkingViolationDetectionSupport;
  path = 'ParkingViolationDetectionSupportModel';
  types: SupportType[] = [];
  features: SupportFeature[] = [];

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.support = {
      id: 0,
      modelName: '',
      url: '',
      typeId: null,
      statusId: null,
      featureIds: [],
      imageUrl: null,
      imageTitle: null,
      imageAlt: null
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.getTypeOptions();
    this.getFeatureOptions();
    const routeParams$ = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.getSupportModel();
      }
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getSupportModel() {
    this.vvtkService.get(
      {
        path: `api/Products/ParkingViolationDetection/Support/${this.id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.support = body;
        }
      }
    );
  }

  getTypeOptions() {
    this.vvtkService.get(
      {
        path: `api/Products/ParkingViolationDetection/Support/Filter/ModelType`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.types = body;
        }
      }
    );
  }

  // getStatusOptions() {
  //   this.vvtkService.get(
  //     {
  //       path: `api/Products/VIVOCloud/Support/Filter/ModelStatus`,
  //       disableLanguage: true
  //     },
  //     {
  //       next: resp => {
  //         const body = resp.json();
  //         this.statuses = body;
  //       }
  //     }
  //   );
  // }

  getFeatureOptions() {
    this.vvtkService.get(
      {
        path: `api/Products/ParkingViolationDetection/Support/Filter/ModelFeature`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.features = body;
        }
      }
    );
  }

  selectedFeaturesChecked(id: number): boolean {
    return this.support.featureIds.indexOf(id) >= 0;
  }

  selectedFeaturesChange(id: number, input: HTMLInputElement) {
    if (input.checked && this.support.featureIds.indexOf(id) === -1) {
      this.support.featureIds.push(id);
    } else {
      const index: number = this.support.featureIds.indexOf(id);
      if (index >= 0) {
        this.support.featureIds.splice(index, 1);
      }
    }
  }

  uploadModelImage($event) {
    const file: File = $event.target.files[0];
    this.support.imageTitle = file.name;
    this.support.imageAlt = file.name;
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x =>  this.support.imageUrl = x.link
      );
  }

  save() {
    this.isLoading = true;
    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Products/ParkingViolationDetection/Support`,
          disableLanguage: true
        },
        this.support,
        {
          next: resp => {
            this.router.navigate(['/supports/learning/parking-violation-detection/support/model']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Products/ParkingViolationDetection/Support/${this.id}`,
          disableLanguage: true
        },
        this.support,
        {
          next: resp => {
            this.router.navigate(['/supports/learning/parking-violation-detection/support/model']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

}
