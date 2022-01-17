import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Image, ImageType } from '../../../vvtk-core/interface/image';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss']
})
export class ImageSelectorComponent implements OnInit {

  @Input() pageIsEditable = false;
  @Input() imageTypes: ImageType[] = [];
  @Input() selectedImages: Image[] = [];
  @Input() selectImageText = 'Choose Image';
  @Input() multiple = true;
  @Input() needDisplaySelectedImages = true;

  @Output() selectedImagesChange: EventEmitter<Image[]> = new EventEmitter<Image[]>();
  @Output() addSelect: EventEmitter<Image> = new EventEmitter<Image>();
  @Output() removeSelect: EventEmitter<Image> = new EventEmitter<Image>();

  selectedImageType: number;
  images: Image[] = [];
  canSelectImages: Image[] = [];

  constructor(private vvtkService: VvtkService) { }

  ngOnInit() {
    if (!this.imageTypes || this.imageTypes.length === 0) {
      this.getImageTypeOptions();
    }
  }

  getImageTypeOptions() {
    this.vvtkService.get(
      {
        path: `api/ImageGroup/ImageTypes/All`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.imageTypes = body;
        }
      }
    );
  }

  imageTypeChange(imageTypeId) {
    if (imageTypeId) {
      this.vvtkService.get(
        {
          path: `api/ImageGroup`,
          disableLanguage: true,
          query: {
            typeId: imageTypeId,
            pageIndex: 0,
            pageSize: 10000
          }
        },
        {
          next: resp => {
            const body = resp.json().list;
            this.images = body;
            this.filterAvailableImages();
          }
        }
      );
    }
  }

  filterAvailableImages() {
    this.canSelectImages = this.images.filter(image =>
      this.selectedImages.filter(selectedImage => image.id === selectedImage.id).length === 0);
  }

  addImage(image: Image) {
    if (!this.multiple) {
      this.selectedImages.splice(0, this.selectedImages.length);
    }
    this.selectedImages.push(image);
    this.filterAvailableImages();
    this.addSelect.emit(image);
  }

  removeImage(image: Image) {
    this.selectedImages = this.selectedImages.filter(x => x.id !== image.id);
    this.selectedImagesChange.emit(this.selectedImages);
    this.filterAvailableImages();
    this.removeSelect.emit(image);
  }

}
