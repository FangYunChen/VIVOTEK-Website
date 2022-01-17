import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services/vvtk.service';
import { ProductVIVOCloudSupportModel } from '@frontdesk/core/interfaces/vivocloud-support-model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'vvtk-support-list',
  templateUrl: './support-list.component.html',
  styleUrls: ['./support-list.component.scss']
})
export class SupportListComponent implements OnInit {

  supportModels: ProductVIVOCloudSupportModel[] = [];
  filteredSupportModels: ProductVIVOCloudSupportModel[] = [];
  groupedSupportModels: Map<number, ProductVIVOCloudSupportModel[]> = new Map<number, ProductVIVOCloudSupportModel[]>();

  supportTypeFilter: any[] = [];
  supportType = null;

  supportStatusFilter: any[] = [];
  supportStatus = null;

  supportFeatureFilter: any[] = [];
  supportFeature = null;

  modelName: string = null;

  _Content = { templates: [{ type: 0 }] };

  contents = [];
  selectedTabIndex = 0;
  routerUrl;

  constructor(private vvtkService: VvtkService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getTemplate();
    this.getData();
    this.getFilter();
    this.getTabs();
  }

  getTabs() {
    this.routerUrl = this.router.url.split('#')[0];
    this.vvtkService.get(
      {
        path: 'api/Product/VIVOCloud'
      },
      {
        next: resp => {
          const data = resp.json();
          this.contents = data ? data : this.contents;
        }
      }
    );
  }

  getTemplate() {
    this.vvtkService.get(
      {
        path: 'api/Products/VIVOCloud/SupportPage'
      },
      {
        next: resp => {
          this._Content = resp.json() ? resp.json() : this._Content;
        }
      }
    );
  }

  getData() {
    this.vvtkService.get(
      {
        path: `api/Products/VIVOCloud/Support`,
        disableLanguage: true
      },
      {
        next: resp => {
          this.supportModels = resp.json();
          this.filteredSupportModels = this.supportModels;
          this.groupSupportModel();
        }
      }
    );
  }

  getFilter() {
    this.vvtkService.get(
      {
        path: `api/Products/VIVOCloud/Support/Filter/ModelType`,
        disableLanguage: true
      },
      {
        next: resp => {
          this.supportTypeFilter.push({ value: null, text: 'Filter by Type' });
          const filterList = resp.json().map(f => ({ value: f.id, text: f.typeName }));
          this.supportTypeFilter = this.supportTypeFilter.concat(filterList);
        }
      }
    );
    this.vvtkService.get(
      {
        path: `api/Products/VIVOCloud/Support/Filter/ModelStatus`,
        disableLanguage: true
      },
      {
        next: resp => {
          this.supportStatusFilter.push({ value: null, text: 'Filter by Status' });
          const filterList = resp.json().map(f => ({ value: f.id, text: f.statusName }));
          this.supportStatusFilter = this.supportStatusFilter.concat(filterList);
        }
      }
    );
    this.vvtkService.get(
      {
        path: `api/Products/VIVOCloud/Support/Filter/ModelFeature`,
        disableLanguage: true
      },
      {
        next: resp => {
          this.supportFeatureFilter.push({ value: null, text: 'Filter by Package' });
          const filterList = resp.json().filter(f => f.isDisplay).map(f => ({ value: f.id, text: f.featureName }));
          this.supportFeatureFilter = this.supportFeatureFilter.concat(filterList);
        }
      }
    );
  }

  groupSupportModel() {
    const groupModels: Map<number, ProductVIVOCloudSupportModel[]> = new Map<number, ProductVIVOCloudSupportModel[]>();
    this.filteredSupportModels.forEach(s => {
      if (!groupModels.has(s.typeId)) {
        groupModels.set(s.typeId, []);
      }
      groupModels.get(s.typeId).push(s);
    });
    this.groupedSupportModels = groupModels;
  }

  filterSupportModel() {
    this.filteredSupportModels = this.supportModels.filter(s =>
      (!this.modelName || s.modelName.toLocaleLowerCase().indexOf(this.modelName.toLocaleLowerCase()) > -1)
      && (!this.supportType || s.typeId === this.supportType)
      && (!this.supportStatus || s.statusId === this.supportStatus)
      && (!this.supportFeature || s.featureIds.filter(feature => feature === this.supportFeature).length > 0)
    );
    this.groupSupportModel();
  }

  resetFilter() {
    this.modelName = null;
    this.supportType = null;
    this.supportStatus = null;
    this.supportFeature = null;
    this.filterSupportModel();
  }

}
