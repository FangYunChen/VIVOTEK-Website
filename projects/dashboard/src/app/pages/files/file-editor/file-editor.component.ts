import { Component, OnInit } from '@angular/core';
import { FileOrFolder } from '../../../vvtk-core/classes/fileOrFolder';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';
import { VvtkApiService } from '../../../vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-file-editor',
  templateUrl: './file-editor.component.html',
  styleUrls: ['./file-editor.component.scss']
})
export class FileEditorComponent implements OnInit {
  pageIsEditable: boolean;

  node: any;
  data: FileOrFolder;
  folderPath: string;
  isLoading = false;
  constructor(
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService
  ) {
    this.data = {
      id: 0,
      parentId: 0,
      type: '',
      name: '',
      url: ''
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
  }

  setNode(node: any) {
    this.node = node;
    this.folderPath = '';
    console.log(node);
    this.getFolderPath(this.node);
    console.log(this.folderPath);
    this.data = {
      id: this.node.data.dbData.id,
      parentId: this.node.data.dbData.parentId,
      type: this.node.data.dbData.type,
      name: this.node.data.dbData.name,
      url: this.node.data.dbData.url
    };
  }

  getFolderPath(node: any) {
    const parent = node.parent;
    if (parent.data.dbData) {
      this.folderPath = `${parent.data.dbData.name}/${this.folderPath}`;
      this.getFolderPath(parent);
    }
  }

  fileSelect($event) {
    const file: File = $event.target.files[0];
    this.data.file = file;
    this.data.name = file.name;
    this.data.type = file.type;
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `${this.folderPath}${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => {
          this.data.id = 1;
          this.data.url = x.link;
          const urlSplit = x.link.split('/');
          this.data.name = urlSplit[urlSplit.length - 1];
          this.data.type = file.type;
          this.node.data.type = file.type;
          this.node.setTitle(urlSplit[urlSplit.length - 1]);
          this.node.render();
          this.sortNode(this.node.parent);
        }
      );
  }

  save() {
    this.isLoading = true;
    if (this.data.id === 0) {
      this.vvtkService.postFormData(
        {
          path: `api/File`,
          disableLanguage: true
        },
        this.data,
        {
          next: resp => {
            const body = resp.json();
            this.data = body;
            this.data.id = body.id;
            this.node.setTitle(this.data.name);
            this.node.data.type = this.data.type;
            this.node.data.dbData = this.data;
            this.node.render();
            this.sortNode(this.node.parent);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/File/${this.data.id}`,
          disableLanguage: true
        },
        this.data,
        {
          next: resp => {
            this.node.setTitle(this.data.name);
            this.node.data.dbData = this.data;
            this.node.render();
            this.sortNode(this.node.parent);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

  typeof(obj) {
    return typeof obj;
  }

  sortNode(node: any) {
    node.sortChildren(function (a, b) {
      const x = (a.isFolder() ? '0' : '1') + a.title.toLowerCase(),
        y = (b.isFolder() ? '0' : '1') + b.title.toLowerCase();
      return x === y ? 0 : x > y ? 1 : -1;
    }, true);
  }
}
