import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';
import { Image } from '../../../../../vvtk-core/interface/image';
import { CommonSelectOption } from '../../../../../vvtk-core/interface/common-model';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-image-content',
  templateUrl: './image-content.component.html'
})
export class ImageContentComponent implements OnInit {
  pageIsEditable: boolean;

  id: number;

  image: Image;
  path = 'Public/Images';
  types: CommonSelectOption[] = [];

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.image = {
      id: 0,
      name: '',
      typeId: null,
      imagePath: null
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.getTypeOptions();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.getImage();
      }
    }).unsubscribe();
  }

  getImage() {
    this.vvtkService.get(
      {
        path: `api/ImageGroup/${this.id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.image = body;
        }
      }
    );
  }

  getTypeOptions() {
    this.vvtkService.get(
      {
        path: `api/ImageGroup/ImageTypes/All`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.types = body.map(x => <CommonSelectOption>{
            value: x.id,
            optionText: x.name
          });
        }
      }
    );
  }

  uploadModelImage($event) {
    const file: File = $event.target.files[0];
    this.image.imagePath = file.name;
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x =>  this.image.imagePath = x.link
      );
  }

  save() {
    this.isLoading = true;
    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/ImageGroup`,
          disableLanguage: true
        },
        this.image,
        {
          next: resp => {
            this.router.navigate(['/public/images/image']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/ImageGroup/${this.id}`,
          disableLanguage: true
        },
        this.image,
        {
          next: resp => {
            this.router.navigate(['/public/images/image']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }

  }

}
