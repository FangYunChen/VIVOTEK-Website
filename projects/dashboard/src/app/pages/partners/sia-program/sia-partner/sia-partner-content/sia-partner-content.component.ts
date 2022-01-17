import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SIAPartnerContent, PartnerCountry, PartnerCategory, PartnerType } from '../../../../../vvtk-core/classes/siaPartner';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';
import { TemplatesComponent } from '../../../../../shared/components/templates/templates.component';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-sia-partner-content',
  templateUrl: './sia-partner-content.component.html'
})
export class SIAPartnerContentComponent implements OnInit {
  pageIsEditable: boolean;

  path = 'SIAPartner';
  id: number;
  partner: SIAPartnerContent;
  countries: string[] = [];
  businesses: PartnerCountry[] = [];
  categories: PartnerCategory[] = [];
  types: PartnerType[] = [];

  @ViewChild('templates') templates: TemplatesComponent;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.partner = {
      companyName: '',
      brandName: '',
      partnerCountry: '',
      address: '',
      address_TC: '',
      telephone: '',
      fax: '',
      webSite: '',
      email: '',
      supportEmail: '',
      companyProfile: '',
      cameraIntegration: '',
      reference: '',
      logoSrc: '',
      logoAlt: '',
      logoTitle: '',
      countryAreaIDs: [],
      categoryIDs: [],
      typeIDs: []
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.getCountryOptions();
    this.getBusinessOptions();
    this.getCategoryOptions();
    this.getTypeOptions();
    const routeParams$ = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.getSIAPartner();
      }
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getCountryOptions() {
    this.vvtkService.get(
      {
        path: `api/SIAPartner/Filter/PartnerCountry`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.countries = body;
        }
      }
    );
  }

  getBusinessOptions() {
    this.vvtkService.get(
      {
        path: `api/SIAPartner/Filter/BusinessTerritory`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.businesses = body;
        }
      }
    );
  }

  getCategoryOptions() {
    this.vvtkService.get(
      {
        path: `api/SIAPartner/Filter/Category`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.categories = body;
        }
      }
    );
  }

  getTypeOptions() {
    this.vvtkService.get(
      {
        path: `api/SIAPartner/Filter/Type`,
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

  getSIAPartner() {
    this.vvtkService.get(
      {
        path: `api/SIAPartner/${this.id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.partner = body;
          this.templates.setData(this.partner.templates || []);
        }
      }
    );
  }

  imgFileSelect($event) {
    const file: File = $event.target.files[0];
    this.partner.logoTitle = file.name;
    this.partner.logoAlt = file.name;
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.partner.logoSrc = x.link
      );
  }

  save() {
    this.isLoading = true;
    const templates = this.templates.getData();
    this.partner.templates = templates;
    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/SIAPartner`,
          disableLanguage: true
        },
        this.partner,
        {
          next: resp => {
            this.router.navigate(['/partners/sia-program/sia-partner']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/SIAPartner/${this.id}`,
          disableLanguage: true
        },
        this.partner,
        {
          next: resp => {
            this.router.navigate(['/partners/sia-program/sia-partner']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

  selectedBusinessesChecked(id: number): boolean {
    return this.partner.countryAreaIDs.indexOf(id) >= 0;
  }

  selectedBusinessesChange(id: number, input: HTMLInputElement) {
    if (input.checked && this.partner.countryAreaIDs.indexOf(id) === -1) {
      this.partner.countryAreaIDs.push(id);
    } else {
      const index: number = this.partner.countryAreaIDs.indexOf(id);
      if (index >= 0) {
        this.partner.countryAreaIDs.splice(index, 1);
      }
    }
  }

  selectedCategoriesChecked(id: number): boolean {
    return this.partner.categoryIDs.indexOf(id) >= 0;
  }

  selectedCategoriesChange(id: number, input: HTMLInputElement) {
    if (input.checked && this.partner.categoryIDs.indexOf(id) === -1) {
      this.partner.categoryIDs.push(id);
    } else {
      const index: number = this.partner.categoryIDs.indexOf(id);
      if (index >= 0) {
        this.partner.categoryIDs.splice(index, 1);
      }
    }
  }

  selectedTypesChecked(id: number): boolean {
    return this.partner.typeIDs.indexOf(id) >= 0;
  }

  selectedTypesChange(id: number, input: HTMLInputElement) {
    if (input.checked && this.partner.typeIDs.indexOf(id) === -1) {
      this.partner.typeIDs.push(id);
    } else {
      const index: number = this.partner.typeIDs.indexOf(id);
      if (index >= 0) {
        this.partner.typeIDs.splice(index, 1);
      }
    }
  }

}
