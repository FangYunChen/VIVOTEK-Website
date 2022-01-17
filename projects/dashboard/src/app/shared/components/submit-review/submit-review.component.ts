import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UserCheckedModel, UserBasicModel } from '../../../vvtk-core/interface/user-model';
import { Observable } from 'rxjs';
import { VvtkApiService } from '../../../vvtk-core/services/vvtk-api.service';
import { finalize, map } from 'rxjs/operators';
import { AuthService } from '../../../vvtk-core/services/auth.service';

export interface SubmitReviewSetting {
  title: string;
  /**取得Reviewers的apiUrl */
  apiUrl?: string;
  /**其他API取得的reviewer, 有設值會忽略apiRoute參數 */
  reviewerList?: UserBasicModel[];
}

export interface SubmitReviewData {
  reviewers: string[];
  reviewNote: string;
}

@Component({
  selector: 'vvtk-submit-review',
  templateUrl: './submit-review.component.html',
  styleUrls: ['./submit-review.component.scss']
})
export class SubmitReviewComponent implements OnInit {

  isLoading = false;
  reviewUsers: UserCheckedModel[] = [];
  reviewNote = '';

  get title() {
    return this.data.title;
  }

  get isInvalidSubmitReviewer() {
    return this.reviewUsers.filter(x => x.checked).length === 0;
  }

  constructor(
    private vvtkApiService: VvtkApiService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<SubmitReviewComponent, SubmitReviewData>,
    @Inject(MAT_DIALOG_DATA) private data: SubmitReviewSetting
  ) {
    if (!data.reviewerList) {
      this.isLoading = true;
      this.getReviewerList(data.apiUrl)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe(x => this.reviewUsers = x);
    }
  }

  getReviewerList(apiUrl: string): Observable<UserCheckedModel[]> {
    return this.vvtkApiService.get<UserBasicModel[]>({
      path: apiUrl,
      disableLanguage: true
    }).pipe(
      map(x => x
        .filter(this.authService.excludeSelf())
        .map(y => ({ ...y, checked: false }))
      )
    );
  }

  ngOnInit() { }

  submitReview() {
    this.dialogRef.close(
      <SubmitReviewData>{
        reviewers: this.reviewUsers
          .filter(x => x.checked)
          .map(x => x.id),
        reviewNote: this.reviewNote
      }
    );
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
