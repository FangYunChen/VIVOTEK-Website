import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CommonSelectOption } from '../../../../../vvtk-core/interface/common-model';

@Component({
  selector: 'vvtk-available-lang',
  templateUrl: './available-lang.component.html'
})
export class AvailableLangComponent implements OnInit {

  isClick = false;
  selectedLang: string[] = [];
  langList: CommonSelectOption[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AvailableLangComponent>,
  ) {
    this.selectedLang = data.product.langOnTheMarket;
    this.langList = data.langOptions;
  }

  ngOnInit() { }

  OK() {
    this.isClick = true;
    this.dialogRef.close(this.selectedLang);
  }

  Cancel() {
    this.isClick = true;
    this.dialogRef.close();
  }
}
