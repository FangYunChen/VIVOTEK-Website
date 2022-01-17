import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';
import { ImageType } from '../../../../../vvtk-core/interface/image';

@Component({
  selector: 'vvtk-image-type-content',
  templateUrl: './image-type-content.component.html'
})
export class ImageTypeContentComponent implements OnInit {
  pageIsEditable: boolean;

  id: number;
  imageType: ImageType;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.imageType = {
      id: 0,
      name: ''
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    const routeParams$ = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.getImageType();
      }
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getImageType() {
    this.vvtkService.get(
      {
        path: `api/ImageGroup/ImageTypes/${this.id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.imageType = body;
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/ImageGroup/ImageTypes`,
          disableLanguage: true
        },
        this.imageType,
        {
          next: resp => {
            this.router.navigate(['/public/images/type']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/ImageGroup/ImageTypes/${this.id}`,
          disableLanguage: true
        },
        this.imageType,
        {
          next: resp => {
            this.router.navigate(['/public/images/type']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

}
