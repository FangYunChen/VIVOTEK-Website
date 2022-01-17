import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  StakeholderFAQ,
  StakeholderFAQCategory
} from '../../../../../vvtk-core/classes/stakeholderFaq';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../../../vvtk-core/services/tools.service';
import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-investors-stakeholder-faq-content',
  templateUrl: './investors-stakeholder-faq-content.component.html',
  styleUrls: ['./investors-stakeholder-faq-content.component.scss']
})
export class InvestorsStakeholderFaqContentComponent
  implements OnInit, OnDestroy {
  @ViewChild('editor') editor: any;
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;

  id: number;
  data: StakeholderFAQ;
  categoryList: StakeholderFAQCategory[] = [];
  categoryParentId: number = null;
  categorySub: StakeholderFAQCategory[] = [];

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private toolsService: ToolsService,
    private router: Router
  ) {
    this.data = {
      question: '',
      answer: '',
      categoryId: null
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
        this.getCategory();
        if (this.id > 0) {
          this.getData();
        }
      }
    );
  }

  getCategory() {
    const lang = this.id === 0 ? 'global' : null;

    this.vvtkService.get(
      {
        path: `api/StakeholderFAQ/Category/List`,
        language: lang
      },
      {
        next: resp => {
          const body = resp.json();
          this.categoryList = body;
          this.getCategoryParentId();
        }
      }
    );
  }

  getData() {
    this.vvtkService.get(
      { path: `api/StakeholderFAQ/${this.id}` },
      {
        next: resp => {
          const body = resp.json();

          this.data = body;

          this.editor.setHtml(this.data.answer);
          this.getCategoryParentId();
        }
      }
    );
  }

  updateEditorHtml() {
    this.data.answer = this.editor.getHtml();
  }

  getCategoryParentName(id: number) {
    const find = this.categoryList.find(item => {
      return item.id === id;
    });
    return find ? find.name : '';
  }

  getCategoryName(id: number) {
    const find = this.categorySub.find(item => {
      return item.id === id;
    });
    return find ? find.name : '';
  }

  getCategoryParentId() {
    if (this.categoryList.length === 0 || !this.data.categoryId) {
      return;
    }
    const filterParent: StakeholderFAQCategory[] = this.categoryList.filter(
      categoryParent => {
        const filterSub: StakeholderFAQCategory[] = categoryParent.sub.filter(
          categorySub => {
            return categorySub.id === this.data.categoryId;
          }
        );
        return filterSub.length > 0;
      }
    );
    if (filterParent.length > 0) {
      this.categoryParentId = filterParent[0].id;
      this.categorySub = filterParent[0].sub;
    } else {
      this.categoryParentId = null;
      this.categorySub = [];
      this.data.categoryId = null;
    }
  }

  changeCategoryParentId() {
    const filterParent: StakeholderFAQCategory[] = this.categoryList.filter(
      categoryParent => {
        return categoryParent.id === this.categoryParentId;
      }
    );
    this.categorySub = filterParent[0].sub;
    this.data.categoryId = null;
  }

  save() {
    this.isLoading = true;
    this.updateEditorHtml();
    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/StakeholderFAQ`,
          language: 'global'
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/investors/stakeholder/faq/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/StakeholderFAQ/${this.id}`
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/investors/stakeholder/faq/list']);
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
