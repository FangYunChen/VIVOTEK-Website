import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CommonSelectOption } from '../../../vvtk-core/interface/common-model';

export interface DeleteConfirmResult {
  value: any;
}

@Component({
  selector: 'vvtk-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  isClick = false;
  options: CommonSelectOption[] = [];
  selectedOptionId: number;
  placeholder = 'Choose Option';
  constructor(private dialogRef: MatDialogRef<DeleteConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.options = data.options;
    this.placeholder = data.placeholder;
  }

  ngOnInit() { }

  OK() {
    this.isClick = true;
    this.dialogRef.close(<DeleteConfirmResult>{
      value: this.selectedOptionId
    });
  }

  Cancel() {
    this.isClick = true;
    this.dialogRef.close(false);
  }
}
