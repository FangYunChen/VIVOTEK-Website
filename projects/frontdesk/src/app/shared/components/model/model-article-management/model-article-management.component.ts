import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../../vvtk-core/interfaces/article-management-models';
import { VvtkService } from '@frontdesk/core/services/vvtk.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'vvtk-model-article-management',
  templateUrl: './model-article-management.component.html',
  styleUrls: ['./model-article-management.component.scss']
})
export class ModelArticleManagementComponent implements OnInit {
  @Input()
  template;
  searchKeyWord = '';

  routePrifix = '';
  data: Category[] = [];
  constructor(private vvtkService: VvtkService, private router: Router) { }

  ngOnInit() {
    this.routePrifix = this.router.url.split('#')[0];
    this.data = this.template.articleList.categories;
    this.initLearnMore();
  }

  initLearnMore() {
    setTimeout(() => {
      const toggles = $('.article-toggle');
      toggles.hide();
    }, 100);
  }

  toggleLearnMore($event) {
    const toggleParent = $($event.target).parents('.article-context');
    const toggleTarget = toggleParent.find('.article-toggle');
    const toggleSummary = toggleParent.find('.article-summary');
    const toggleIcon = toggleParent.find(
      '.article-button-row .article-button-left > i'
    );

    if (toggleTarget.is('[style="display: none;"]')) {
      toggleSummary.hide();
      toggleTarget.show();
      toggleIcon
        .removeClass('fa-caret-square-o-down')
        .addClass('fa-caret-square-o-up');
    } else {
      toggleSummary.show();
      toggleTarget.hide();
      toggleIcon
        .removeClass('fa-caret-square-o-up')
        .addClass('fa-caret-square-o-down');
    }
  }

  scrollToTop() {
    $('html,body').scrollTop(0);
  }

  SetAnchorID(title) {
    const reg = /[\s,\/]+/;
    title = title
      .toLowerCase()
      .split(reg)
      .join('-');
    return `${title}`;
  }

  GetAnchorID(title) {
    const reg = /[\s,\/]+/;
    title = title
      .toLowerCase()
      .split(reg)
      .join('-');
    return `${this.routePrifix}#${title}`;
  }

  GetVideoID(videoUrl: string) {
    const reg = /[\s,\/=]+/;
    const urlTokens = videoUrl.split(reg);

    return urlTokens[urlTokens.length - 1];
  }

  SearchArticleTitleAndContext() {
    const sut = this;
    const keyword = sut.searchKeyWord.toLowerCase();
    this.ResetSearchResult();
    if (keyword) {
      const aritcleContexts = $('.article-articles  .article-context');
      $.each(aritcleContexts, function (idx, ele) {
        const context = $(ele);
        const title = context.find('.article-title');
        const summary = context.find('.article-summary');
        const paragraph = context.find('.article-paragraph');
        const titleMatched = title.html().toLowerCase().includes(keyword);
        const summaryMatched = summary.html().toLowerCase().includes(keyword);
        const paragraphMatched = paragraph.html().toLowerCase().includes(keyword);

        if (!titleMatched && !summaryMatched && !paragraphMatched) {
          const titleID = sut.GetAnchorID(title.children('h3').text());
          const listItem = $(
            `.list-layer-2nd > li > a[href="${titleID}"]`
          ).parent();
          listItem.hide();
          context.hide();
        }
      });
      this.searchKeyWord = keyword;
    }
  }

  ResetSearchResult() {
    const aritcleContexts = $('.article-articles  .article-context');
    const listItems = $('.list-layer-2nd > li');

    this.searchKeyWord = '';

    $.each(aritcleContexts, function (idx, ele) {
      const context = $(ele);
      context.show();
    });

    $.each(listItems, function (idx, ele) {
      const item = $(ele);
      item.show();
    });
  }
}
