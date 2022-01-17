import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sitemap } from '../../../../../../vvtk-core/classes/sitemap';
import { TreeNode } from '../../../../../../vvtk-core/classes/tree';
import { SharedService } from '../../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../../vvtk-core/services/vvtk.service';
import { IntroCourseEditorComponent } from '../intro-course-editor/intro-course-editor.component';

declare var $: any;
@Component({
  selector: 'vvtk-intro-course-menu',
  templateUrl: './intro-course-menu.component.html',
  styleUrls: ['./intro-course-menu.component.scss']
})
export class IntroCourseMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  treeSource: TreeNode[];
  tree;
  selectedNode: any;
  selectedType: string;

  headerMaxLevel = 4;

  @ViewChild('editIntroCoure') editIntroCoure: IntroCourseEditorComponent;


  constructor(
    private sharedService: SharedService,
    private vvtkService: VvtkService
  ) {
    this.selectedType = 'root';
    this.treeSource = [
      {
        title: 'root',
        expanded: true,
        folder: true,
        type: 'root',
        lazy: false,
        dbData: null,
        children: []
      }
    ];
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.getSelectedLanguage();
    }, 10);
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.selectedLanguage = selectedLanguage;
        this.resetTree();
        this.getIntroCourseAndSetTree();
      }
    );
  }

  getIntroCourseAndSetTree() {
    this.vvtkService.get(
      {
        path: `api/Products/VIVOCloud/Intro/ManagerAllData`,
      },
      {
        next: resp => {
          const body = resp.json();
          const data = body.mainCategories;
          const result = data.map(mainCategory => <TreeNode>{
            title: mainCategory.title,
            expanded: false,
            folder: true,
            type: 'mainCategory',
            lazy: false,
            dbData: { Id: mainCategory.id, Lang: mainCategory.lang, Title: mainCategory.title, DisplayOrder: mainCategory.order },
            children: mainCategory.subCategories.map(sub => <TreeNode>{
              title: sub.title,
              expanded: false,
              folder: true,
              type: 'subCategory',
              lazy: false,
              dbData: {
                Id: sub.id,
                Lang: sub.lang,
                Title: sub.title,
                DisplayOrder: sub.order,
                MainCategoryId: mainCategory.id,
                MainCategoryLang: mainCategory.lang
              },
              children: sub.articles.map(article => <TreeNode>{
                title: article.title,
                expanded: false,
                folder: false,
                type: 'article',
                lazy: false,
                dbData: {
                  Id: article.articleId,
                  Lang: article.lang,
                  SubCategoryId: sub.id,
                  SubCategoryLang: sub.lang,
                  Title: article.title,
                  Summary: article.summary,
                  Content: article.content,
                  DisplayOrder: article.order,
                  YoutubeUrls: article.youtubeUrls
                }
              })
            })
          });
          this.treeSource[0].children = result;
          $('#tree').fancytree('option', 'source', this.treeSource);
        }
      }
    );
  }

  resetTree() {
    this.tree = $('#tree').fancytree({
      debugLevel: 0,
      selectMode: 1,
      source: this.treeSource,
      extensions: this.pageIsEditable ? ['contextMenu', 'dnd'] : [],
      renderNode: (event, data) => {
        const node = data.node;
        if (node.getLevel() > this.headerMaxLevel) {
          $(node.span)
            .closest('li')
            .addClass('hide');
        } else {
          $(node.span)
            .closest('li')
            .removeClass('hide');
        }
        const $span = $(node.span);
        switch (node.data.type) {
          case 'root':
            $span
              .find('> span.fancytree-icon')
              .css({
                'background-image': 'none'
              })
              .attr('class', 'fancytree-icon fa fa-sitemap');
            break;
          default:
            $span
              .find('> span.fancytree-icon')
              .css({
                'background-image': 'none'
              })
              .attr('class', 'fancytree-icon fa fa-file-o');
            break;
        }
      },
      contextMenu: {
        menu: node => {
          switch (node.data.type) {
            case 'root':
              return {
                add: { name: 'Add', icon: 'add' }
              };
            default:
              if (node.getLevel() < this.headerMaxLevel) {
                return {
                  add: { name: 'Add', icon: 'add' },
                  delete: { name: 'Delete', icon: 'delete' }
                };
              } else {
                return {
                  delete: { name: 'Delete', icon: 'delete' }
                };
              }
          }
        },
        actions: (node, action: string, options) => {
          switch (action) {
            case 'add':
              let type = '';
              const data = {
                Id: 0,
                Title: '',
                DisplayOrder: node.children === null ? 1 : node.children.length + 1,
                MainCategoryId: null,
                MainCategoryLang: this.selectedLanguage,
                SubCategoryId: null,
                SubCategoryLang: this.selectedLanguage,
                Summary: null,
                Content: null,
                YoutubeUrls: null
              };
              switch (node.data.type) {
                case 'root':
                  type = 'mainCategory';
                  break;
                case 'mainCategory':
                  type = 'subCategory';
                  data.MainCategoryId = node.data.dbData.Id;
                  break;
                case 'subCategory':
                  type = 'article';
                  data.SubCategoryId = node.data.dbData.Id;
                  data.Summary = '';
                  data.Content = '';
                  data.YoutubeUrls = [];
                  break;
              }
              const newNode = node.addChildren({
                title: '',
                type: type,
                dbData: data
              });
              newNode.setActive();
              break;
            case 'delete':
              this.deleteIntroCourse(node);
              break;
          }
        }
      },
      dnd: {
        preventRecursiveMoves: true, // 禁止拖曳到自己的子代中
        preventVoidMoves: true, // 防止丟在自己的前面
        dragStart: (node, data) => {
          if (node.data.type === 'root') {
            return false;
          }
          return true;
        },
        dragEnter: (node, data) => {
          // 拖曳中的
          const otherNodeType: string = data.otherNode.data.type;
          // 拖曳到的
          const nodeType: string = node.data.type;

          // Prevent dropping a parent below another parent (only sort nodes under the same parent)
          if (node.parent === data.otherNode.parent) {
            return ['before', 'after'];
          }
          return false;
        },
        dragDrop: (node, data) => {
          // 節點移動
          data.otherNode.moveTo(node, data.hitMode);

          // 小孩子們的資料
          const nodesData: any[] = [];

          // 長幼有序
          let displayOrder = 1;

          let patchUrl = '';
          if (node.data.type === 'article') {
            patchUrl = 'api/Products/VIVOCloud/Intro/ArticleDisplayOrder';
          } else {
            patchUrl = 'api/Products/VIVOCloud/Intro/CategoryDisplayOrder';
          }

          data.otherNode.parent.children.forEach(item => {

            item.data.dbData.DisplayOrder = displayOrder;
            displayOrder++;

            nodesData.push({
              Id: item.data.dbData.Id,
              Lang: this.selectedLanguage,
              DisplayOrder: item.data.dbData.DisplayOrder
            });
          });
          this.patchIntroCourseDisplayOrder(nodesData, patchUrl);
        }
      },
      beforeActivate: (event, data) => {
        const oldNode = this.tree.fancytree('getActiveNode');
        if (oldNode && oldNode.data.dbData && oldNode.data.dbData.Id === 0) {
          oldNode.remove();
        }
      },
      activate: (event, data) => {
        this.selectedNode = data.node;
        this.selectedType = this.selectedNode.data.type;

        if (this.selectedType !== 'root') {
          this.editIntroCoure.setNode(this.selectedNode);
        }
      }
    });
  }

  deleteIntroCourse(node: any) {
    let deletePath = '';
    const id = node.data.dbData.Id;
    switch (node.data.type) {
      case 'mainCategory':
        deletePath = `api/Products/VIVOCloud/Intro/MainCategory/${id}`;
        break;
      case 'subCategory':
        deletePath = `api/Products/VIVOCloud/Intro/SubCategory/${id}`;
        break;
      case 'article':
        deletePath = `api/Products/VIVOCloud/Intro/Article/${id}`;
        break;
    }
    this.vvtkService.delete(
      {
        path: deletePath
      },
      {
        next: resp => {
          node.remove();
          this.selectedType = 'root';
        }
      }
    );
  }

  patchIntroCourseDisplayOrder(data, patchUrl) {
    this.vvtkService.patch(
      {
        path: patchUrl,
        disableLanguage: true
      },
      data,
      {}
    );
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
