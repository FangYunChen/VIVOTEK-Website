import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { finalize, concatMap, map } from 'rxjs/operators';
import { SortablejsOptions } from 'angular-sortablejs/dist';
import { VvtkApiService } from '../../../../vvtk-core/services/vvtk-api.service';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { CommonSelectOption } from '../../../../vvtk-core/interface/common-model';
import { DownloadDropdownListService } from '../../services/download-dropdown-list.service';
import { Observable } from 'rxjs';
import { DocumentPropertyMapping } from '../../../../vvtk-core/interface/download-center';

@Component({
  selector: 'vvtk-property',
  templateUrl: './property.component.html'
})
export class PropertyComponent implements OnInit {

  pageIsEditable: boolean;
  isLoading = false;
  groupOptions: SortablejsOptions = {
    group: 'group',
    handle: '.drag-handle',
    animation: 300
  };

  documentTypeId: number;
  documentTypeOptions$: Observable<CommonSelectOption[]>;
  documentPropertyMappings: DocumentPropertyMapping[] = [];

  get postData(): DocumentPropertyMapping[] {
    return this.documentPropertyMappings.map((mapping, idx) => <DocumentPropertyMapping>{
      propertyId: mapping.id,
      isEnabled: mapping.isEnabled,
      displayOrder: idx + 1
    });
  }

  constructor(
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    private dropdownListService: DownloadDropdownListService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.documentTypeOptions$ = this.dropdownListService.getDocumentTypeOptions(true)
      .pipe(
        map(options => options
          .map(option => this.dropdownListService.isProductDocumentType(option, false) ?
            ({ ...option, disabled: true }) :
            option
          )
        )
      );
  }

  selectDocumentType(documentTypeId: number) {
    this.documentTypeId = documentTypeId;
    this.isLoading = true;
    this.getDocumentPropertyMapping(documentTypeId).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      mapping => this.documentPropertyMappings = mapping
    );
  }

  getDocumentPropertyMapping(documentTypeId: number) {
    return this.vvtkApiService.get<DocumentPropertyMapping[]>({
      path: `api/DownloadCenter/DocumentTypes/${documentTypeId}/properties`,
      disableLanguage: true,
      query: { isEnabled: null }
    });
  }

  save() {
    this.isLoading = true;
    this.vvtkApiService.post({
      path: `api/DownloadCenter/DocumentTypes/${this.documentTypeId}/properties`,
      disableLanguage: true
    }, this.postData).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

}
