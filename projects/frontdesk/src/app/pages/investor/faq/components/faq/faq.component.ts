import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  collapseContrl: number;
  selectedCategoryParent = 1;
  selectedCategorySub = 2;

  _Category: {
    id: number;
    name: string;
    parentId?: number; // 最上層主分類是 null
    sub: {
      id: number;
      name: string;
      parentId?: number;
    }[];
  }[] = [];

  _FAQList: {
    id: number;
    categoryId: number;
    question: string;
    answer: string;
  }[] = [];

  constructor(private vvtkService: VvtkService) {}

  ngOnInit() {
    this.vvtkService.getStakeholderFAQ('Category', undefined, resp => {
      this._Category = resp.json() ? resp.json() : this._Category;
      if (this._Category.length > 0) {
        this.selectedCategoryParent = this._Category[0].id;
        if (this._Category[0].sub.length > 0) {
          this.selectedCategorySub = this._Category[0].sub[0].id;
          this.getFAQList(this.selectedCategorySub.toString());
        } else {
          this.getFAQList(this.selectedCategoryParent.toString());
        }
      }
    });
  }

  getFAQList(categoryId?: string) {
    this.vvtkService.getStakeholderFAQ('List', categoryId, resp => {
      this._FAQList = resp.json() ? resp.json() : this._FAQList;
      this._FAQList.forEach(x => {
        x.answer = x.answer.split(/\r?\n/).join('<br>');
      });
    });
  }

  collapseOpen(id) {
    if (this.collapseContrl === id) {
      this.collapseContrl = null;
    } else {
      this.collapseContrl = id;
    }
  }

  changeCategoryParent(selectedCategoryParent) {
    this.selectedCategoryParent = selectedCategoryParent;
    this._Category.forEach(item => {
      if (item.id === selectedCategoryParent) {
        if (item.sub.length > 0) {
          this.selectedCategorySub = item.sub.length > 0 ? item.sub[0].id : -1;
          this.getFAQList(this.selectedCategorySub.toString());
        } else {
          this.getFAQList(this.selectedCategoryParent.toString());
        }
      }
    });
  }

  changeCategorySub(selectedCategorySub) {
    this.selectedCategorySub = selectedCategorySub;
    this.getFAQList(this.selectedCategorySub.toString());
  }
}
