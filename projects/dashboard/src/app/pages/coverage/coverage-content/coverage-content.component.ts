import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortablejsOptions } from 'angular-sortablejs';
import { Subscription } from 'rxjs';
import { Coverage } from '../../../vvtk-core/classes/coverage';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../vvtk-core/services/tools.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';
declare var moment: any;

@Component({
  selector: 'vvtk-coverage-content',
  templateUrl: './coverage-content.component.html',
  styleUrls: ['./coverage-content.component.scss']
})
export class CoverageContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  groupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 300
  };

  @ViewChild('editor')
  editor: any;
  id: number;
  coverage: Coverage;
  status: boolean;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private toolsService: ToolsService,
    private router: Router
  ) {
    this.coverage = {
      title: '',
      description: '',
      url: '',
      publishAt: '',
      status: 1
    };
    this.status = true;
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    // this.getNewsTags();
    const routeParams$ = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getSelectedLanguage();
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.selectedLanguage = selectedLanguage;
        if (this.id > 0) {
          this.getCoverage();
        }
      }
    );
  }

  getCoverage() {
    this.vvtkService.get(
      {
        path: `api/Coverage/${this.id}`
      },
      {
        next: resp => {
          const body = resp.json();
          this.coverage = body;
          this.status = body.status === 1;
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    this.coverage.publishAt = moment(this.coverage.publishAt).format();
    this.coverage.status = this.status ? 1 : 0;
    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Coverage`,
          language: 'global'
        },
        this.coverage,
        {
          next: resp => {
            this.router.navigate(['/coverage/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/coverage/${this.id}`
        },
        this.coverage,
        {
          next: resp => {
            this.router.navigate(['/coverage/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

  typeof(obj) {
    return typeof obj;
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
