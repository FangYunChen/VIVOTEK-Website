import { SubCategoryElement } from './oss.model';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, Subject } from 'rxjs';
import { VvtkService } from '@frontdesk/core/services';
@Injectable()
export class OssService {
  constructor(
    private vvtkService: VvtkService,
  ) { }
  private _ossTableDataSoucrce: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private _ossTableFilterSource: Subject<any> = new Subject<any>();
  // Observable string streams
  ossTableData$ = this._ossTableDataSoucrce.asObservable();
  ossTableFilter$ = this._ossTableFilterSource.asObservable();

  getTableData() {
    this.vvtkService.get(
      { path: `api/OSS/Model/List`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          body.sort((curr, last) => (curr.order - last.order));
          body.forEach(data => {
            data.subCategories.forEach(subList => {
              // Genereate property 'subCategoryName' then apply the value from subCategoryName.
              subList.models.forEach(model => {
                model['subCategoryName'] = subList['subCategoryName'];
              });
            });
            return data['isShow'] = true;
          });
          this._ossTableDataSoucrce.next(body);
        }
      }
    );
    // mockData.sort((curr, last) => (curr.order - last.order));
    // mockData.forEach(data => {
    //   data.subCategories.forEach(subList => {
    //     // Genereate property 'subCategoryName' then apply the value from subCategoryName.
    //     subList.models.forEach(model => {
    //       model['subCategoryName'] = subList['subCategoryName'];
    //     });
    //   });
    //   return data['isShow'] = true;
    // });
  }
  updateTableData(newData: any) {
    this._ossTableDataSoucrce.next(newData);
  }

  updateTableFilter(newFilter) {
    this._ossTableFilterSource.next(newFilter);
  }
}
