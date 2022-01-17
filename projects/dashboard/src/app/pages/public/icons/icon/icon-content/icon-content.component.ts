import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';
import { Icon } from '../../../../../vvtk-core/interface/icon';
import { CommonSelectOption } from '../../../../../vvtk-core/interface/common-model';
import { Subject } from 'rxjs';
import { distinctUntilChanged, share, takeUntil, finalize } from 'rxjs/operators';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-icon-content',
  templateUrl: './icon-content.component.html'
})
export class IconContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  id: number;
  destroy$ = new Subject();

  icon: Icon;
  path = 'Public/Icons';
  types: CommonSelectOption[] = [];

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.icon = {
      id: 0,
      name: '',
      typeId: null,
      imagePath: null
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.getTypeOptions();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.sharedService.selectedLanguage$.pipe(
          distinctUntilChanged(),
          share(),
          takeUntil(this.destroy$)
        ).subscribe(
          selectedLanguage => {
            this.getIcon();
          }
        );
      }
    }).unsubscribe();
  }

  getIcon() {
    this.vvtkService.get(
      {
        path: `api/Icons/${this.id}`
      },
      {
        next: resp => {
          const body = resp.json();
          this.icon = body;
        }
      }
    );
  }

  getTypeOptions() {
    this.vvtkService.get(
      {
        path: `api/Icons/IconTypes/All`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.types = body.map(x => <CommonSelectOption>{
            value: x.id,
            optionText: x.name
          });
        }
      }
    );
  }

  uploadModelImage($event) {
    const file: File = $event.target.files[0];
    this.icon.imagePath = file.name;
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.icon.imagePath  = x.link
      );
  }

  save() {
    this.isLoading = true;

    let apiPath;
    if (this.id === 0) {
      apiPath = {
        path: `api/Icons`,
        disableLanguage: true
      };
    } else {
      apiPath = {
        path: `api/Icons/${this.id}`
      };
    }
    this.vvtkService.post(
      apiPath,
      this.icon,
      {
        next: resp => {
          this.router.navigate(['/public/icons/icon']);
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }

}
