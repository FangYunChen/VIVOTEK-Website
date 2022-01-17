import { Component, OnInit } from '@angular/core';
import { SharedService } from 'projects/dashboard/src/app/vvtk-core/services/shared.service';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { DropdownListService } from 'projects/dashboard/src/app/vvtk-core/services/dropdown-list.service';
import { CommonSelectOption } from 'projects/dashboard/src/app/vvtk-core/interface/common-model';
import { ProductSpecificationDisplaySetting } from 'projects/dashboard/src/app/vvtk-core/interface/product-specification';
import { finalize, map } from 'rxjs/operators';
import { ProductSpecificaionPurposeTypeList } from 'projects/dashboard/src/app/vvtk-core/constants/product-specification-constant';

@Component({
  selector: 'vvtk-display-setting',
  templateUrl: './display-setting.component.html',
  styleUrls: ['./display-setting.component.scss']
})
export class DisplaySettingComponent implements OnInit {

  get pageIsEditable() {
    return this.sharedService.pageIsEditable;
  }

  isLoading;
  productCategoryId: number;
  productCategoryOptions: CommonSelectOption[] = [];

  displaySettings: ProductSpecificationDisplaySetting[] = [];

  purposeColumns = ProductSpecificaionPurposeTypeList.map(
    x => ({ key: x.optionText.replace(/ /g, ''), headerText: x.optionText, purposeTypeIndex: +x.value - 1 })
  );
  displayedColumns = [
    'spec',
    ...this.purposeColumns.map(x => x.key)
  ];

  constructor(
    private sharedService: SharedService,
    private vvtkApiService: VvtkApiService,
    private dropdownListService: DropdownListService
  ) { }

  ngOnInit() {
    this.dropdownListService.getProductCategoryOptions().subscribe(
      categories => this.productCategoryOptions = categories
    );
  }

  changeCategory() {
    this.isLoading = true;
    this.vvtkApiService.get<ProductSpecificationDisplaySetting[]>({
      path: `api/Product/Specification`,
      query: { categoryId: this.productCategoryId }
    }).pipe(
      finalize(() => this.isLoading = false),
      map(displaySettings => this.mapDisplaySettingToArray(displaySettings))
    ).subscribe(x => this.displaySettings = x);
  }

  private mapDisplaySettingToArray(
    displaySettings: ProductSpecificationDisplaySetting[],
    spaceCount = -1,
    parentId = -1
  ): ProductSpecificationDisplaySetting[] {
    if (displaySettings) {
      spaceCount++;
      const space = '　'.repeat(spaceCount);
      let result: ProductSpecificationDisplaySetting[] = [];
      displaySettings.forEach(displaySetting => {
        displaySetting.purposeTypeChecks = ProductSpecificaionPurposeTypeList.map(
          x => ({ type: +x.value, checked: displaySetting.purposeTypes.includes(+x.value) })
        );
        displaySetting.parentId = parentId;
        displaySetting.name = space + displaySetting.name;
        displaySetting.allChildrenIds = displaySetting.allChildrenIds || [];
        result.push(displaySetting);
        if (displaySetting.children && displaySetting.children.length > 0) {
          const children = this.mapDisplaySettingToArray(displaySetting.children, spaceCount, displaySetting.id);
          displaySetting.allChildrenIds = Array.from(new Set(
            children.map(x => ([x.id, ...x.allChildrenIds])).reduce((pre, cur) => pre.concat(cur)))
          );
          result = [...result, ...children];
        }
      });
      return result;
    }
  }

  checkChange(specId: number, purposeTypeIndex: number, checkValue: boolean) {
    const checkDisplaySetting = this.displaySettings.find(x => x.id === specId);
    if (checkDisplaySetting) {
      if (checkValue) {
        this.displaySettings.forEach(displaySetting => {
          // 兒子勾，父親跟著勾
          if (displaySetting.allChildrenIds.includes(specId)) {
            displaySetting.purposeTypeChecks[purposeTypeIndex].checked = checkValue;
          }
          // 父親勾，兒子跟著勾
          if (checkDisplaySetting.allChildrenIds.find(x => x === displaySetting.id)) {
            displaySetting.purposeTypeChecks[purposeTypeIndex].checked = checkValue;
          }
        });
      } else {
        // 父親取消，兒子跟著取消
        const cancels = checkDisplaySetting.allChildrenIds;
        this.displaySettings.forEach(x => {
          if (cancels.includes(x.id)) {
            x.purposeTypeChecks[purposeTypeIndex].checked = checkValue;
          }
        });
      }
    }
  }

  rowTrackBy(index, item) {
    return item ? item.id : undefined;
  }

  columnTrackBy(index, item) {
    return item ? item.key : undefined;
  }

  save() {
    this.isLoading = true;
    this.vvtkApiService.patch({
      path: `api/Product/Specification/Purposes`,
      disableLanguage: true,
      query: { categoryId: this.productCategoryId }
    }, this.postData).pipe(
      finalize(() => this.isLoading = false),
    ).subscribe();
  }

  private get postData() {
    return this.displaySettings.map(
      displaySetting => displaySetting.purposeTypeChecks.map(
        purposeTypeCheck => ({ specId: displaySetting.id, purposeType: purposeTypeCheck.type, checked: purposeTypeCheck.checked })
      )
    ).reduce(
      (pre, cur) => pre.concat(cur)
    ).filter(
      x => x.checked
    );
  }

}
