import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonCheckSelectOption } from '../../../vvtk-core/interface/common-model';

export interface CheckListData {
  title: string;
  options: CommonCheckSelectOption[];
}

@Component({
  selector: 'vvtk-check-list-dialog',
  templateUrl: './check-list-dialog.component.html',
  styleUrls: ['./check-list-dialog.component.scss']
})
export class CheckListDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CheckListDialogComponent, CommonCheckSelectOption[]>,
    @Inject(MAT_DIALOG_DATA) public data: CheckListData
  ) { }

  ngOnInit() { }

  submitList() {
    this.dialogRef.close(
      this.data.options.filter(x => x.checked)
    );
  }

  cancel() {
    this.dialogRef.close();
  }
}
