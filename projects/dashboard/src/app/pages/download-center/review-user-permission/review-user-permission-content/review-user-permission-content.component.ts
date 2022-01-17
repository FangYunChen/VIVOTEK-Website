import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonSelectOption } from 'projects/dashboard/src/app/vvtk-core/interface/common-model';
import { DownloadCenterApplication } from 'projects/dashboard/src/app/vvtk-core/interface/download-center';


export interface ReviewUserPermissionData {
  title: string;
  reviewDocumentTypes: {
    documentTypeId: number,
    documentTypeText: string,
    reviewResult?: boolean | null,
    rejectedReason?: string;
  }[];
}

@Component({
  selector: 'vvtk-review-user-permission-content',
  templateUrl: './review-user-permission-content.component.html'
})
export class ReviewUserPermissionContentComponent implements OnInit {

  reviewOptions: CommonSelectOption[] = [
    { value: null, optionText: '--' },
    { value: true, optionText: 'Pass' },
    { value: false, optionText: 'Reject' }
  ];

  constructor(
    private dialogRef: MatDialogRef<ReviewUserPermissionContentComponent, DownloadCenterApplication[]>,
    @Inject(MAT_DIALOG_DATA) public data: ReviewUserPermissionData
  ) { }

  ngOnInit() { }

  submitList() {
    this.dialogRef.close(
      this.data.reviewDocumentTypes
        .filter(x => x.reviewResult !== null && x.reviewResult !== undefined)
        .map(x => ({
          documentTypeId: x.documentTypeId,
          isPermitted: x.reviewResult,
          rejectedReason: x.rejectedReason,
        }) as DownloadCenterApplication)
    );
  }

  cancel() {
    this.dialogRef.close();
  }

}
