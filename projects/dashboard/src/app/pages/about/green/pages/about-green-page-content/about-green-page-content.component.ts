import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TemplatesComponent } from '../../../../../shared/components/templates/templates.component';
import {
  AboutGreenCategory,
  AboutGreenPage
} from '../../../../../vvtk-core/classes/aboutGreen';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-about-green-page-content',
  templateUrl: './about-green-page-content.component.html',
  styleUrls: ['./about-green-page-content.component.scss']
})
export class AboutGreenPageContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  @ViewChild('editor') editor: any;
  @ViewChild('templates') templates: TemplatesComponent;

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  dirPath = 'About/Green';

  id: number;
  categories: AboutGreenCategory[] = [];
  data: AboutGreenPage;

  oldCategoryId: number; // 更換類別要把排序拉到最後面

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.data = {
      categoryId: null,
      title: '',
      content: '',
      templates: [],
      displayOrder: 0
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    const routeParams$ = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getSelectedLanguage();
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.selectedLanguage = selectedLanguage;
        this.getCategories();
        if (this.id > 0) {
          this.getData();
        }
      }
    );
  }

  getCategories() {
    this.vvtkService.get(
      {
        path: `api/GreenVivotek/Categories/List`
      },
      {
        next: resp => {
          const body = resp.json();
          this.categories = body || [];
        }
      }
    );
  }

  getCategoryName(id: number) {
    const find = this.categories.find(category => {
      return category.id === id;
    });
    return find ? find.name : '';
  }

  getData() {
    this.vvtkService.get(
      {
        path: `api/GreenVivotek/Page/${this.id}`
      },
      {
        next: resp => {
          const body = resp.json();
          this.data = body;
          this.oldCategoryId = this.data.categoryId;
          this.data.templates = this.data.templates || [];
          this.templates.setData(this.data.templates);
          this.data.content = this.data.content || '';
          this.editor.setHtml(this.data.content);
        }
      }
    );
  }

  updateEditorHtml() {
    this.data.content = this.editor.getHtml();
  }

  save() {
    this.isLoading = true;

    this.data.templates = this.templates.getData();
    this.data.content = this.editor.getHtml();

    if (this.oldCategoryId !== this.data.categoryId) {
      this.data.displayOrder = 0;
    }

    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/GreenVivotek/Page`,
          language: 'global'
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/about/green/pages/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/GreenVivotek/Page/${this.id}`
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/about/green/pages/list']);
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
