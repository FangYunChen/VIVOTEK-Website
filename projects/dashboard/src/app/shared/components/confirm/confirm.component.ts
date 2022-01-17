import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'vvtk-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  isClick = false;
  constructor(private dialogRef: MatDialogRef<ConfirmComponent, boolean>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }

  OK() {
    this.isClick = true;
    this.dialogRef.close(true);
  }

  Cancel() {
    this.isClick = true;
    this.dialogRef.close(false);
  }
}
