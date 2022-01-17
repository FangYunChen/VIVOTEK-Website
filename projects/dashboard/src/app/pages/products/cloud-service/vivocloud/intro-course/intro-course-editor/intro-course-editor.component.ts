import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SortablejsOptions } from 'angular-sortablejs';
import { SharedService } from '../../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../../vvtk-core/services/vvtk.service';
import { ToolsService } from '../../../../../../vvtk-core/services/tools.service';

@Component({
  selector: 'vvtk-intro-course-editor',
  templateUrl: './intro-course-editor.component.html',
  styleUrls: ['./intro-course-editor.component.scss']
})
export class IntroCourseEditorComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  isLoading = false;

  path = 'VIVOCloudIntroCourse';
  type: string;
  data: any;
  node: any;

  youtubeUrls: { value: string }[];
  groupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 300
  };

  constructor(
    private sharedService: SharedService,
    private toolsService: ToolsService,
    private vvtkService: VvtkService
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.selectedLanguage = selectedLanguage;
        if (this.node) {
          this.setNode(this.node);
        }
      }
    );
  }

  setNode(node: any) {
    this.node = node;
    this.type = this.node.data.type;
    this.data = this.node.data.dbData;
    if (this.type === 'article') {
      this.youtubeUrls = this.data.YoutubeUrls.map(x => ({ value: x })) || [];
    }
  }

  addYoutubeUrl(idx: number) {
    this.toolsService.lockScrollTop();
    const clone = this.toolsService.copyObject(this.youtubeUrls);
    clone.splice(idx, 0, { value: '' });
    this.youtubeUrls = clone;
  }

  deleteYoutubeUrl(idx: number) {
    this.youtubeUrls.splice(idx, 1);
    this.youtubeUrls = this.toolsService.copyObject(this.youtubeUrls);
  }

  save() {
    this.isLoading = true;

    let savePath = '';
    switch (this.type) {
      case 'mainCategory':
        savePath = `api/Products/VIVOCloud/Intro/MainCategory`;
        break;
      case 'subCategory':
        savePath = `api/Products/VIVOCloud/Intro/SubCategory`;
        break;
      case 'article':
        savePath = `api/Products/VIVOCloud/Intro/Article`;
        this.data.YoutubeUrls = this.youtubeUrls.map(x => x.value);
        break;
    }

    const id = this.data.Id;

    if (id === 0) {
      this.vvtkService.post(
        {
          path: savePath,
        },
        this.data,
        {
          next: resp => {
            const body = resp.json();
            this.data.Id = body.id;
            this.node.setTitle(this.data.Title);
            this.node.data.dbData = this.data;
            this.node.render();
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `${savePath}/${id}`
        },
        this.data,
        {
          next: resp => {
            this.node.setTitle(this.data.Title);
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

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
