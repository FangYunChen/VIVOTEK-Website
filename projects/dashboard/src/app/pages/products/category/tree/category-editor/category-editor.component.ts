import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';
import { ProductCategory } from '../../../../../vvtk-core/interface/product-category';
import { ImageType, Image } from '../../../../../vvtk-core/interface/image';
import { CommonSelectOption } from '../../../../../vvtk-core/interface/common-model';
import { ToolsService } from '../../../../../vvtk-core/services/tools.service';

@Component({
  selector: 'vvtk-category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss']
})
export class CategoryEditorComponent implements OnInit {
  pageIsEditable: boolean;

  isLoading = false;

  type: string;
  data: ProductCategory;
  node: any;

  imageTypes: CommonSelectOption[] = [];
  images: Image[] = [];
  selectedImageType: number;

  constructor(
    private sharedService: SharedService,
    private vvtkService: VvtkService,
    private toolService: ToolsService
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.getImageTypes();
  }

  getImageTypes() {
    this.vvtkService.get(
      {
        path: `api/ImageGroup/ImageTypes/All`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.imageTypes = (<ImageType[]>body).map(x => <CommonSelectOption>{
            value: x.id,
            optionText: x.name
          });
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
          }
        }
      );
    }
  }

  removeCoverImage() {
    this.data.imageId = null;
    this.data.imageName = null;
    this.data.imagePath = null;
  }

  chooseCoverImage(image: Image) {
    this.data.imageId = image.id;
    this.data.imageName = image.name;
    this.data.imagePath = image.imagePath;
  }

  setNode(node: any) {
    this.node = node;
    this.type = node.data.type;
    this.data = this.toolService.copyObject(node.data.dbData);
  }

  save() {
    this.isLoading = true;
    const id = this.data.id;
    if (this.data.imageId === 0) {
      this.data.imageId = null;
    }
    if (id && id !== 0) {
      this.vvtkService.post(
        {
          path: `api/Product/Categories/${id}`
        },
        this.data,
        {
          next: resp => {
            this.node.setTitle(this.data.name);
            this.node.data.dbData = this.data;
            this.node.render();
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.post(
        {
          path: `api/Product/Categories`,
          disableLanguage: true
        },
        this.data,
        {
          next: resp => {
            const body = resp.json();
            this.data.id = body.id;
            this.node.key = body.id;
            this.node.setTitle(this.data.name);
            this.node.data.dbData = this.data;
            this.node.render();
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

}
