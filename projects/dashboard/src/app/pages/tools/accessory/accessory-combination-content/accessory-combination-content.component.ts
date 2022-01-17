import { Component, OnInit } from '@angular/core';
import {
  ToolsAccessoryCombination,
  CombinationDetail,
  CombinationDetailItem
} from 'projects/dashboard/src/app/vvtk-core/interface/tools-accessory';
import { SortablejsOptions } from 'angular-sortablejs';
import { ActivatedRoute, Router } from '@angular/router';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { SharedService } from 'projects/dashboard/src/app/vvtk-core/services/shared.service';
import { MatDialog } from '@angular/material';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'vvtk-accessory-combination-content',
  templateUrl: './accessory-combination-content.component.html',
  styleUrls: ['./accessory-combination-content.component.scss']
})

export class AccessoryCombinationContentComponent implements OnInit {
  pageIsEditable: boolean;
  data: ToolsAccessoryCombination = {
    combinationName: '',
    centerImg: '',
    combinationDetails: []
  };

  id = 0;
  cid = 0;
  isLoading = false;

  groupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 150
  };

  get isAddData() {
    return this.cid === 0;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.route.paramMap
      .pipe(
        tap(paramMap => {
          this.id = +paramMap.get('id');
          this.cid = +paramMap.get('cid');
        }),
        switchMap(paramMap => {
          if (this.isAddData) {
            return of(paramMap);
          } else {
            this.isLoading = true;
            return this.getData()
              .pipe(
                finalize(() => this.isLoading = false)
              );
          }
        }),
      ).subscribe();
  }

  getData() {
    return this.vvtkApiService.get<ToolsAccessoryCombination>({
      path: `api/Tools/Accessory/${this.id}/Combination/${this.cid}`,
      disableLanguage: true
    }).pipe(
      tap(data => this.data = data)
    );
  }

  uploadFile($event) {
    const file: File = $event.target.files[0];
    this.vvtkApiService.uploadFile(file, `Tools/Accessory/${file.name}`).pipe(
      finalize(() => $event.target.value = null)
    ).subscribe(
      x => this.data.centerImg = x.link
    );
  }

  uploadCombinationDetailImgFile(combinationDetail: CombinationDetail, $event) {
    const file: File = $event.target.files[0];
    this.vvtkApiService.uploadFile(file, `Tools/Accessory/${file.name}`).pipe(
      finalize(() => $event.target.value = null)
    ).subscribe(
      x => combinationDetail.img = x.link
    );
  }

  addCombinationDetail(index: number) {
    this.data.combinationDetails = this.data.combinationDetails || [];

    this.data.combinationDetails.splice(index, 0, {
      detailName: '',
      img: '',
      combinationDetailItems: [],
      hideContent: false
    });
  }

  addCombinationDetailItem(detailIdx: number, itemIdx: number) {
    this.data.combinationDetails[detailIdx].combinationDetailItems = this.data.combinationDetails[detailIdx].combinationDetailItems || [];
    this.data.combinationDetails[detailIdx].combinationDetailItems.splice(itemIdx, 0, {
      itemName: '',
      description: ''
    });
  }

  deleteDetail(CombinationDetails: CombinationDetail[], index: number) {
    CombinationDetails.splice(index, 1);
  }

  deleteItem(combinationDetail: CombinationDetail, combinationDetailItem: CombinationDetailItem, itemIdx: number) {
    combinationDetail.combinationDetailItems = combinationDetail.combinationDetailItems.filter(x => x !== combinationDetailItem);
  }

  save() {
    this.isLoading = true;
    this.vvtkApiService.patch({
      path: `api/Tools/Accessory/${this.id}/Combination/${this.cid}`,
      disableLanguage: true
    }, this.data).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      _ => this.router.navigate(['/tools/accessory', this.id, 'combination-list'])
    );
  }
}
