import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CheckListDialogComponent } from 'projects/dashboard/src/app/shared/components/check-list-dialog/check-list-dialog.component';
import { ProductCategoryCheck } from 'projects/dashboard/src/app/vvtk-core/interface/product-category';

@Component({
  selector: 'vvtk-member-content',
  templateUrl: './member-content.component.html'
})
export class MemberContentComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CheckListDialogComponent, number[]>,
    @Inject(MAT_DIALOG_DATA) public data: ProductCategoryCheck[]
  ) { }

  ngOnInit() { }

  checkChange(checkCategory: ProductCategoryCheck, checkValue: boolean) {
    if (checkValue) {
      this.data.forEach(category => {
        // 兒子勾，父親跟著勾
        if (category.allChildrenIds.includes(checkCategory.id)) {
          category.checked = checkValue;
        }
        // 父親勾，兒子跟著勾
        if (checkCategory.allChildrenIds.find(x => x === category.id)) {
          category.checked = checkValue;
        }
      });
    } else {
      // 父親取消，兒子跟著取消
      const cancels = checkCategory.allChildrenIds;
      this.data.forEach(category => {
        if (cancels.includes(category.id)) {
          category.checked = checkValue;
        }
      });
    }
  }

  submitList() {
    this.dialogRef.close(
      this.data.filter(x => x.checked).map(x => x.id)
    );
  }

  cancel() {
    this.dialogRef.close();
  }
}
