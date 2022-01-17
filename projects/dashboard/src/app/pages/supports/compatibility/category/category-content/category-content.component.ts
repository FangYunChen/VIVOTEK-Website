import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VvtkApiService } from '../../../../../vvtk-core/services/vvtk-api.service';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { SupportCategory } from '../../../../../vvtk-core/interface/support-compatibility';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-category-content',
  templateUrl: './category-content.component.html'
})
export class CategoryContentComponent implements OnInit {

  pageIsEditable: boolean;

  id = 0;
  category: SupportCategory;

  isLoading = false;

  get isAddData() {
    return this.id === 0;
  }

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.category = {
      name: '',
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (!this.isAddData) {
        this.getSupportCategory();
      }
    });
  }

  getSupportCategory() {
    this.isLoading = true;
    this.vvtkApiService.get<SupportCategory>({
      path: `api/SupportCL/Categories/${this.id}`,
      disableLanguage: true
    }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      category => this.category = category
    );
  }

  save() {
    this.isLoading = true;
    if (this.isAddData) {
      this.vvtkApiService.post({
        path: `api/SupportCL/Categories`,
        disableLanguage: true
      }, this.category).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(
        _ => this.router.navigate(['/supports/compatibility/category'])
      );
    } else {
      this.vvtkApiService.patch({
        path: `api/SupportCL/Categories/${this.id}`,
        disableLanguage: true
      }, this.category).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(
        _ => this.router.navigate(['/supports/compatibility/category'])
      );
    }
  }

}
