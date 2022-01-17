import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, VvtkApiService } from '@frontdesk/core/services';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'vvtk-oss-announcement',
  templateUrl: './oss-announcement.component.html',
  styleUrls: ['./oss-announcement.component.scss']
})
export class OssAnnouncementComponent {
  downloadAddress: string;
  modelId = this.route.snapshot.paramMap.get('modelId');
  isLoading = false;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private authService: AuthService,
    private vvtkApiService: VvtkApiService,
  ) { }
  openDialog(): void {
    const userPayload = {
      id: this.authService.userData.id,
      name: this.authService.userData.displayName,
      email: this.authService.userData.email
    };
    this.isLoading = true;
    this.vvtkApiService.post({
      path: `api/OSS/Model/${this.modelId}/Download`,
      needAuth: true
    }, userPayload)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        _ => {
          this.dialog.open(OssAnnouncementDialogComponent, {
            width: '400px',
          });
        }
      );
  }
}

@Component({
  selector: 'vvtk-oss-announcement-dialog',
  templateUrl: 'oss-announcement-dialog.component.html',
  styleUrls: ['./oss-announcement.component.scss']
})
export class OssAnnouncementDialogComponent {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<OssAnnouncementDialogComponent>
  ) { }

  onNoClick(): void {
    this.router.navigate(['/oss']);
    this.dialogRef.close();
  }
  onDownloadClick(): void {
    this.dialogRef.close();
  }
}
