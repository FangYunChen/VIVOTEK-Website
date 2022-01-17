import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortablejsOptions } from 'angular-sortablejs';
import { Subscription } from 'rxjs';
import { TemplatesComponent } from '../../../shared/components/templates/templates.component';
import { Case, Country } from '../../../vvtk-core/classes/case';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../vvtk-core/services/tools.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';
import { VvtkApiService } from '../../../vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

declare var moment: any;
@Component({
  selector: 'vvtk-case-content',
  templateUrl: './case-content.component.html',
  styleUrls: ['./case-content.component.scss']
})
export class CaseContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  groupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 300
  };

  @ViewChild('templates') templates: TemplatesComponent;
  id: number;
  data: Case;
  status: boolean;
  publishAt: Date;
  countries: Country[] = [];
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private toolsService: ToolsService,
    private router: Router
  ) {
    this.data = {
      status: 1,
      title: '',
      publishAt: '',
      image: {
        src: '',
        alt: '',
        title: ''
      },
      templates: [],
      vertical: '',
      country: {},
      solutions: [],
      software: [],
      partners: [],
      specialThanksList: [],
      relatedList: []
    };
    this.status = true;
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    const routeParams$ = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getSelectedLanguage();
      this.getCountries();
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getCountries() {
    this.vvtkService.get(
      {
        path: `api/Countries/Real`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          body.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          });
          this.countries = body;
        }
      }
    );
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.selectedLanguage = selectedLanguage;
        if (this.id > 0) {
          this.getData();
        }
      }
    );
  }

  getData() {
    this.vvtkService.get(
      {
        path: `api/Case/${this.id}`
      },
      {
        next: resp => {
          const body = resp.json();

          this.data = body;
          this.publishAt = new Date(this.data.publishAt);
          this.status = body.status === 1;
          this.data.templates = this.data.templates || [];
          this.data.solutions = this.data.solutions || [];
          this.data.software = this.data.software || [];
          this.data.partners = this.data.partners || [];
          this.data.specialThanksList = this.data.specialThanksList || [];
          this.data.relatedList = this.data.relatedList || [];
          this.templates.setData(this.data.templates);
        }
      }
    );
  }

  getCountryName(countryId: number) {
    const find = this.countries.find(country => {
      return country.id === countryId;
    });
    return find ? find.name : '';
  }

  save() {
    this.isLoading = true;
    this.data.templates = this.templates.getData();
    this.data.publishAt = moment(this.publishAt)
      .format()
      .split('T')[0];
    this.data.status = this.status ? 1 : 0;
    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Case`,
          language: 'global'
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/cases/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Case/${this.id}`
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/cases/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

  imgFileSelect($event) {
    const file: File = $event.target.files[0];
    this.data.image.title = file.name;
    this.data.image.alt = file.name;
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `SuccessCase/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.data.image.src = x.link
      );
  }

  relatedImgFileSelect($event, i: number) {
    const file: File = $event.target.files[0];
    this.data.relatedList[i].image.title = file.name;
    this.data.relatedList[i].image.alt = file.name;
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `SuccessCase/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.data.relatedList[i].image.src = x.link
      );
  }

  addSolution(idx: number) {
    this.toolsService.lockScrollTop();

    const clone = this.toolsService.copyObject(this.data.solutions);
    clone.splice(idx, 0, {
      title: '',
      url: ''
    });
    this.data.solutions = clone;
  }

  deleteSolution(i: number) {
    this.data.solutions.splice(i, 1);
    this.data.solutions = this.toolsService.copyObject(this.data.solutions);
  }

  addSoftware(idx: number) {
    this.toolsService.lockScrollTop();

    const clone = this.toolsService.copyObject(this.data.software);
    clone.splice(idx, 0, {
      title: '',
      url: ''
    });
    this.data.software = clone;
  }

  deleteSoftware(i: number) {
    this.data.software.splice(i, 1);
    this.data.software = this.toolsService.copyObject(this.data.software);
  }

  addPartner(idx: number) {
    this.toolsService.lockScrollTop();

    const clone = this.toolsService.copyObject(this.data.partners);
    clone.splice(idx, 0, {
      title: '',
      url: ''
    });
    this.data.partners = clone;
  }

  deletePartner(i: number) {
    this.data.partners.splice(i, 1);
    this.data.partners = this.toolsService.copyObject(this.data.partners);
  }

  addRelated(idx: number) {
    if (this.data.relatedList.length >= 3) {
      return;
    }
    this.toolsService.lockScrollTop();

    const clone = this.toolsService.copyObject(this.data.relatedList);
    clone.splice(idx, 0, {
      id: 0,
      title: '',
      image: {
        src: '',
        alt: '',
        title: ''
      },
      url: ''
    });
    this.data.relatedList = clone;
  }

  deleteRelated(i: number) {
    this.data.relatedList.splice(i, 1);
    this.data.relatedList = this.toolsService.copyObject(this.data.relatedList);
  }

  addSpecialThanks(idx: number) {
    this.toolsService.lockScrollTop();

    const clone = this.toolsService.copyObject(this.data.specialThanksList);
    clone.splice(idx, 0, {
      title: '',
      url: ''
    });
    this.data.specialThanksList = clone;
  }

  deleteSpecialThanks(i: number) {
    this.data.specialThanksList.splice(i, 1);
    this.data.specialThanksList = this.toolsService.copyObject(
      this.data.specialThanksList
    );
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
