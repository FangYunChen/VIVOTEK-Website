import { Component, OnInit, Input, } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services/vvtk.service';
import { SIAPartner } from '@frontdesk/core/interfaces/sia-partner';
import { I18nService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-sia-partner-list',
  templateUrl: './sia-partner-list.component.html',
  styleUrls: ['./sia-partner-list.component.scss']
})
export class SIAPartnerListComponent implements OnInit {

  @Input() partnerCategory;
  @Input() partnerCategoryText;
  siaPartners: SIAPartner[] = [];
  filteredSiaPartners: SIAPartner[] = [];
  businessTerritoryFilter: any[] = [];
  businessTerritory = null;
  brandName: string = null;

  @Input() hasTypeFilter = false;
  partnerTypeFilter: any[] = [];
  partnerType = null;


  constructor(private vvtkService: VvtkService, private i18nService: I18nService) { }

  ngOnInit() {
    this.getData();
    this.getFilter();
  }

  getData() {
    this.vvtkService.get(
      {
        path: `api/SIAPartner/${this.partnerCategory}`,
        disableLanguage: true
      },
      {
        next: resp => {
          this.siaPartners = resp.json();
          this.filteredSiaPartners = this.siaPartners;
        }
      }
    );
  }

  getFilter() {
    this.vvtkService.get(
      {
        path: `api/SIAPartner/Filter/BusinessTerritory`,
        disableLanguage: true
      },
      {
        next: resp => {
          this.businessTerritoryFilter.push({ value: null, text: this.i18nService.getI18n('Filter by Business') });
          const filterList = resp.json().map(f => ({ value: f.id, text: f.countryArea }));
          this.businessTerritoryFilter = this.businessTerritoryFilter.concat(filterList);
        }
      }
    );
    if (this.hasTypeFilter) {
      this.vvtkService.get(
        {
          path: `api/SIAPartner/Filter/Type`,
          disableLanguage: true
        },
        {
          next: resp => {
            this.partnerTypeFilter.push({ value: null, text: 'Filter by Type' });
            const filterList = resp.json().map(f => ({ value: f.id, text: f.typeName }));
            this.partnerTypeFilter = this.partnerTypeFilter.concat(filterList);
          }
        }
      );
    }

  }

  filterPartners() {
    this.filteredSiaPartners = this.siaPartners.filter(s =>
      (!this.brandName || s.brandName.toLocaleLowerCase().indexOf(this.brandName.toLocaleLowerCase()) > -1)
      && (!this.businessTerritory || s.countryAreas.filter(area => area.id === this.businessTerritory).length > 0)
      && (!this.hasTypeFilter || (!this.partnerType || s.partnerTypes.filter(type => type.id === this.partnerType).length > 0))
    );
  }

  resetFilter() {
    this.businessTerritory = null;
    this.brandName = null;
    this.partnerType = null;
    this.filterPartners();
  }

}
