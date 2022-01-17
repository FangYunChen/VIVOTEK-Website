import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CareersVacancy } from '../../../../vvtk-core/classes/careers';
import { Country, States } from '../../../../vvtk-core/classes/continent';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-careers-vacancy-content',
  templateUrl: './careers-vacancy-content.component.html',
  styleUrls: ['./careers-vacancy-content.component.scss']
})
export class CareersVacancyContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;

  id: number;
  data: CareersVacancy;
  countries: Country[] = [];
  states: States[] = [];

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.data = {
      description: '',
      responsibilities: '',
      requirements: '',
      title: '',
      category: '',
      country: {},
      states: {},
      location: ''
    };
    this.countries = [];
    this.states = [];
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    this.getCountries();
    const routeParams$ = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getSelectedLanguage();
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
          const selected = this.countries.filter(item => {
            return item.id === this.data.country.id;
          });
          if (selected.length === 0) {
            this.data.country.id = null;
            this.data.states.id = null;
            this.states = [];
          }
        }
      }
    );
  }

  getStates() {
    const id = this.data.country.id;
    this.vvtkService.get(
      {
        path: `api/Countries/${id}/States`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.states = body;
          const selected = this.states.filter(item => {
            return item.id === this.data.states.id;
          });
          if (selected.length === 0) {
            this.data.states.id = null;
          }
        }
      }
    );
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        if (this.id > 0) {
          this.getData();
        }
      }
    );
  }

  getData() {
    this.vvtkService.get(
      { path: `api/Careers/Vacancy/${this.id}` },
      {
        next: resp => {
          const body = resp.json();
          this.data = body;
          this.data.states = this.data.states || { id: null };
          this.getStates();
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

  getStateName(stateId: number) {
    const find = this.states.find(state => {
      return state.id === stateId;
    });
    return find ? find.name : '';
  }

  save() {
    this.isLoading = true;

    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Careers/Vacancy`,
          language: 'global'
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/careers/vacancies/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Careers/Vacancy/${this.id}`
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/careers/vacancies/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
