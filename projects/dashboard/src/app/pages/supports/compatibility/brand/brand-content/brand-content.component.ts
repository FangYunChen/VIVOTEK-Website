import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VvtkApiService } from '../../../../../vvtk-core/services/vvtk-api.service';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { SupportBrand } from '../../../../../vvtk-core/interface/support-compatibility';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-brand-content',
  templateUrl: './brand-content.component.html'
})
export class BrandContentComponent implements OnInit {

  pageIsEditable: boolean;

  id = 0;
  brand: SupportBrand;

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
    this.brand = {
      name: '',
      websiteUrl: ''
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (!this.isAddData) {
        this.getSupportBrand();
      }
    });
  }

  getSupportBrand() {
    this.isLoading = true;
    this.vvtkApiService.get<SupportBrand>({
      path: `api/SupportCL/Brands/${this.id}`,
      disableLanguage: true
    }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      brand => this.brand = brand
    );
  }

  save() {
    this.isLoading = true;
    if (this.isAddData) {
      this.vvtkApiService.post({
        path: `api/SupportCL/Brands`,
        disableLanguage: true
      }, this.brand).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(
        _ => this.router.navigate(['/supports/compatibility/brand'])
      );
    } else {
      this.vvtkApiService.patch({
        path: `api/SupportCL/Brands/${this.id}`,
        disableLanguage: true
      }, this.brand).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(
        _ => this.router.navigate(['/supports/compatibility/brand'])
      );
    }
  }

}
