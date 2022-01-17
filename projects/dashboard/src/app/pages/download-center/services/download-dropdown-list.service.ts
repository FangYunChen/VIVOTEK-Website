import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { VvtkApiService } from '../../../vvtk-core/services/vvtk-api.service';
import { CommonSelectOption } from '../../../vvtk-core/interface/common-model';
import { DownloadDocumentType } from '../../../vvtk-core/interface/download-center';
import { ToolsService } from '../../../vvtk-core/services/tools.service';

@Injectable()
export class DownloadDropdownListService {

  constructor(
    private vvtkApiService: VvtkApiService,
    private toolsService: ToolsService
  ) { }

  /**All document type */
  getDocumentTypeOptions(includeChildren: boolean = false) {
    return this.vvtkApiService.get<DownloadDocumentType[]>({
      path: `api/DownloadCenter/DocumentTypes`,
      disableLanguage: true
    }).pipe(
      map(types => {
        return includeChildren ?
          this.mapDocumentTypeToArray(types).map(type => <CommonSelectOption>{
            optionText: type.name,
            value: type.id,
            parent: type.parent ? { value: type.parent.id, optionText: type.parent.name } : null
          })
          : types.map(type => <CommonSelectOption>{
            optionText: type.name,
            value: type.id
          });
      })
    );
  }

  getPermissionDocumentTypeOptions() {
    return this.vvtkApiService.get<DownloadDocumentType[]>({
      path: `api/DownloadCenter/DocumentTypes`,
      disableLanguage: true
    }).pipe(
      map(types =>
        this.toolsService.mapTreeToArray(types)
          .filter(type => type.isPermissionRequired)
          .map(type => <CommonSelectOption>{
            optionText: type.name,
            value: type.id,
          })
      )
    );
  }

  private mapDocumentTypeToArray(
    types: DownloadDocumentType[],
    spaceCount = -1,
    parentType: DownloadDocumentType = null
  ): DownloadDocumentType[] {
    if (types) {
      spaceCount++;
      const space = '　'.repeat(spaceCount);
      let result: DownloadDocumentType[] = [];
      types.forEach(type => {
        type.name = space + type.name;
        type.parent = parentType;
        result.push(type);
        if (type.children && type.children.length > 0) {
          const children = this.mapDocumentTypeToArray(type.children, spaceCount, type);
          result = [...result, ...children];
        }
      });
      return result;
    }
  }

  /**
   *
   * @param includeProductOption Product這個選項是否要視為ProductDocumentType
   */
  isProductDocumentType(option: CommonSelectOption, includeProductOption: boolean = true): boolean {
    // product相關的document type id是1或是parent id是1
    return includeProductOption ?
      option.value === 1 || (option.parent && option.parent.value === 1) :
      option.parent && option.parent.value === 1;
  }
}
