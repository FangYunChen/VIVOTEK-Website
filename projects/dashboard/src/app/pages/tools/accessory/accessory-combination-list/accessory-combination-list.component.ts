import { Component, OnInit } from '@angular/core';
import { ToolsAccessoryCombination } from 'projects/dashboard/src/app/vvtk-core/interface/tools-accessory';
import { ActivatedRoute } from '@angular/router';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { SharedService } from 'projects/dashboard/src/app/vvtk-core/services/shared.service';
import { finalize, switchMap, tap, concatMap } from 'rxjs/operators';
import { SortablejsOptions } from 'angular-sortablejs';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from 'projects/dashboard/src/app/shared/components/confirm/confirm.component';
import { CommonDisplayOrder } from 'projects/dashboard/src/app/vvtk-core/interface/common-model';

@Component({
  selector: 'vvtk-accessory-combination-list',
  templateUrl: './accessory-combination-list.component.html',
  styleUrls: ['./accessory-combination-list.component.scss']
})
export class AccessoryCombinationListComponent implements OnInit {
  isLoading = false;
  pageIsEditable: boolean;
  combinations: ToolsAccessoryCombination[] = [];
  id = 0;

  groupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 150,
    onUpdate: (event: any) => {
      this.patchSequence();
    }
  };

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.isLoading = true;
    this.route.paramMap
      .pipe(
        tap(paramMap => {
          this.id = +paramMap.get('id');
        }),
        switchMap(_ =>
          this.getData()
            .pipe(finalize(() => this.isLoading = false))
        ),
      ).subscribe();
  }

  getData() {
    return this.vvtkApiService.get<ToolsAccessoryCombination[]>({
      path: `api/Tools/Accessory/${this.id}/Combination`,
      disableLanguage: true
    }).pipe(
      tap(data => this.combinations = data)
    );
  }

  patchSequence() {
    const sequenceData: CommonDisplayOrder[] = this.combinations.map((combination, index) => ({
      id: combination.combinationId,
      displayOrder: index + 1
    }));
    this.isLoading = true;
    this.vvtkApiService.patch({
      path: `api/Tools/Accessory/${this.id}/Combination/ChangeDisplayOrder`,
      disableLanguage: true
    }, sequenceData)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe();
  }

  deleteCombination(combinationId: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'delete?',
        message: `確定刪除?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.isLoading = true;
        this.vvtkApiService.delete(
          {
            path: `api/Tools/Accessory/${this.id}/Combination/${combinationId}`,
            disableLanguage: true
          }
        ).pipe(
          concatMap(_ => this.getData()),
          finalize(() => this.isLoading = false)
        ).subscribe();
      }
    });
  }


}
