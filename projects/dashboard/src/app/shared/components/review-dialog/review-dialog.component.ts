import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonSelectOption } from '../../../vvtk-core/interface/common-model';

export interface ReviewData {
  title: string;
}

export interface ReviewResult {
  reviewResult: boolean;
  rejectedReason: string;
}

@Component({
  selector: 'vvtk-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent implements OnInit {

  reviewResult: ReviewResult = { reviewResult: null, rejectedReason: null };
  reviewOptions: CommonSelectOption[] = [
    { value: true, optionText: 'Pass' },
    { value: false, optionText: 'Reject' }
  ];

  constructor(
    private dialogRef: MatDialogRef<ReviewDialogComponent, ReviewResult>,
    @Inject(MAT_DIALOG_DATA) public data: ReviewData
  ) { }

  ngOnInit() { }

  review() {
    this.dialogRef.close(this.reviewResult);
  }

  cancel() {
    this.dialogRef.close();
  }
}
