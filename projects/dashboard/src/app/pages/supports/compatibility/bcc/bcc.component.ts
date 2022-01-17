import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkApiService } from '../../../../vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { UserBasicModel, UserCheckedModel } from 'projects/dashboard/src/app/vvtk-core/interface/user-model';

@Component({
  selector: 'vvtk-bcc',
  templateUrl: './bcc.component.html'
})
export class BccComponent implements OnInit {
  pageIsEditable: boolean;
  bccUsers: UserCheckedModel[] = [];
  isLoading = false;

  get options$(): Observable<UserBasicModel[]> {
    return this.vvtkApiService.getEditableAccountsByUrl('/supports/compatibility/bcc');
  }

  get data$(): Observable<UserBasicModel[]> {
    return this.vvtkApiService.get<UserBasicModel[]>({
      path: `api/SupportCL/BCC`,
      disableLanguage: true
    });
  }

  constructor(
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.getData();
  }

  getData() {
    this.isLoading = true;
    forkJoin(this.options$, this.data$).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(([options, data]) => {
      this.bccUsers = options.map(
        x => ({ ...x, checked: data.some(d => d.id === x.id) })
      );
    });
  }

  save() {
    this.isLoading = true;
    this.vvtkApiService.patch({
      path: `api/SupportCL/BCC`,
      disableLanguage: true
    }, this.postData).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  get postData() {
    return this.bccUsers.filter(x => x.checked).map(x => ({ id: x.id }));
  }

}
