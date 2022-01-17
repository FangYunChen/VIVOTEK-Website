import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
class Maincategory {
  id: number;
  categoryName: string;
  subCategories: Array<any>;
}
@Component({
  selector: 'vvtk-oss-category-delete-confirm',
  templateUrl: './oss-category-delete-confirm.component.html',
  styleUrls: ['./oss-category-delete-confirm.component.scss']
})
export class OssCategoryDeleteConfirmComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<OssCategoryDeleteConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  form: FormGroup;
  isClick: boolean;
  selectedMain: Maincategory = new Maincategory();
  ngOnInit() {
    if (this.data.isSub) {
      this.form = new FormGroup({
        mainCategoryObj: new FormControl('', Validators.required),
        subCategoryId: new FormControl('', Validators.required),
      });
    } else {
      this.form = new FormGroup({
        mainCategoryObj: new FormControl('', Validators.required),
      });
    }
  }
  Delete() {
    console.log();
    if (this.data.isSub) {
      console.log('sub delete', this.data.id, this.form.value);
      this.isClick = true;
      this.dialogRef.close({
        state: 'true',
        removedId: this.data.id,
        payload: {
          replacedCategoryId: this.form.value.mainCategoryObj.id,
          replacedSubCategoryId: this.form.value.subCategoryId
        }
      });
    } else {
      console.log('main delete', this.data.id, this.form.value);
      this.isClick = true;
      this.dialogRef.close({
        state: 'true',
        removedId: this.data.id,
        payload: {
          replacedCategoryId: this.form.value.mainCategoryObj.id
        }
      });
    }
  }

  Cancel() {
    this.isClick = true;
    this.dialogRef.close({ state: 'false' });
  }

}
