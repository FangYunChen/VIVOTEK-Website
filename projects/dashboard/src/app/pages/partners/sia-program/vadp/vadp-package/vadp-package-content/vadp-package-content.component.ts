import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../../../../vvtk-core/services/tools.service';
import { VvtkService } from '../../../../../../vvtk-core/services/vvtk.service';
import { VADPPackageCompany } from '../../../../../../vvtk-core/classes/vadpPackage';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'vvtk-vadp-package-content',
  templateUrl: './vadp-package-content.component.html'
})
export class VADPPackageContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;
  id: number;
  company: VADPPackageCompany;
  path = 'VADPPackage';

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private toolsService: ToolsService,
    private router: Router
  ) {
    this.company = {
      companyId: 0,
      companyName: '',
      logoSrc: '',
      logoAlt: '',
      logoTitle: '',
      logoLink: '',
      reference: '',
      packages: []
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    this.id = +this.route.snapshot.params['id'];

    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      _ => {
        if (this.id > 0) {
          this.getVADPPackage();
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }

  getVADPPackage() {
    this.vvtkService.get(
      {
        path: `api/Partners/SIAProgram/VADP/VADPPackage/${this.id}`
      },
      {
        next: resp => {
          const body = resp.json();
          this.company = body;
        }
      }
    );
  }

  uploadCompanyLogo($event) {
    const file: File = $event.target.files[0];
    this.company.logoTitle = file.name;
    this.company.logoAlt = file.name;
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.company.logoSrc = x.link
      );
  }

  addPackage(idx: number) {
    this.toolsService.lockScrollTop();
    const clone = this.toolsService.copyObject(this.company.packages);
    clone.splice(idx, 0, {
      packageName: '',
      content: '',
      supportedModel: '',
      downloadUrl: '',
      userManualUrl: '',
      packageSrc: '',
      packageAlt: '',
      packageTitle: ''
    });
    this.company.packages = clone;
  }

  deletePackage(idx: number) {
    this.company.packages.splice(idx, 1);
  }

  uploadPackageImage($event, j: number) {
    const file: File = $event.target.files[0];
    this.company.packages[j].packageTitle = file.name;
    this.company.packages[j].packageAlt = file.name;
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.company.packages[j].packageSrc = x.link
      );
  }

  save() {
    this.isLoading = true;
    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Partners/SIAProgram/VADP/VADPPackage`
        },
        this.company,
        {
          next: resp => {
            this.router.navigate(['/partners/sia-program/vadp/vadp-package']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Partners/SIAProgram/VADP/VADPPackage/${this.id}`
        },
        this.company,
        {
          next: resp => {
            this.router.navigate(['/partners/sia-program/vadp/vadp-package']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

}
