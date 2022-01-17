import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sitemap } from '../../../vvtk-core/classes/sitemap';
import { TreeNode } from '../../../vvtk-core/classes/tree';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';
import { SitemapEditorComponent } from '../sitemap-editor/sitemap-editor.component';

declare var $: any;

@Component({
  selector: 'vvtk-sitemap-footer',
  templateUrl: './sitemap-footer.component.html',
  styleUrls: ['./sitemap-footer.component.scss']
})
export class SitemapFooterComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  treeSource: TreeNode[];
  tree;
  selectedNode: any;
  selectedType: string;

  @ViewChild('editSitemap') editSitemap: SitemapEditorComponent;

  constructor(
    private sharedService: SharedService,
    private vvtkService: VvtkService
  ) {
    this.selectedType = 'root';
    this.treeSource = [
      {
        title: 'footer',
        expanded: true,
        folder: true,
        type: 'root',
        children: []
      }
    ];
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    this.resetTree();
    this.getSitemaps(2);
    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.selectedLanguage = selectedLanguage;
        this.filterI18n();
      }
    );
  }

  filterI18n() {
    $('#tree')
      .fancytree('getTree')
      .findAll('')
      .forEach(node => {
        if (node.data.type !== 'root') {
          const i18n = node.data.dbData.i18n.filter(lang => {
            return lang.lang === this.selectedLanguage;
          });
          if (i18n.length > 0) {
            node.setTitle(i18n[0].title);
          } else {
            node.setTitle(node.data.dbData.title);
          }
          node.render();
        }
      });
  }

  resetTree() {
    this.tree = $('#tree').fancytree({
      debugLevel: 0,
      selectMode: 1,
      source: this.treeSource,
      extensions: this.pageIsEditable ? ['contextMenu', 'dnd'] : [],
      renderNode: (event, data) => {
        const node = data.node;
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
              return {
                delete: { name: 'Delete', icon: 'delete' }
              };
          }
        },
        actions: (node, action: string, options) => {
          switch (action) {
            case 'add':
              const newNode = node.addChildren({
                title: '',
                type: 'footer',
                dbData: {
                  id: 0,
                  parentId: 2,
                  title: '',
                  url: '',
                  image: '',
                  description: '',
                  displayOrder: 999,
                  isEnabled: true,
                  i18n: []
                }
              });
              newNode.setActive();
              break;
            case 'delete':
              this.deleteSitmap(node);
              break;
          }
        }
      },
      dnd: {
        autoExpandMS: 1, // 停留幾毫秒展開節點
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
          if (nodeType === 'root') {
            return false;
          }
          return ['before', 'after'];
        },
        dragDrop: (node, data) => {
          // 節點移動
          data.otherNode.moveTo(node, data.hitMode);

          // 小孩子們的資料
          const nodesData: any[] = [];

          // 長幼有序
          let displayOrder = 1;

          data.otherNode.parent.children.forEach(item => {
            item.data.dbData.displayOrder = displayOrder;
            displayOrder++;

            nodesData.push({
              id: item.data.dbData.id,
              parentId: 2,
              displayOrder: item.data.dbData.displayOrder
            });
          });
          this.patchSitemapDisplayOrder(nodesData);
        }
      },
      beforeActivate: (event, data) => {
        const oldNode = this.tree.fancytree('getActiveNode');
        if (oldNode && oldNode.data.dbData && oldNode.data.dbData.id === 0) {
          oldNode.remove();
        }
      },
      activate: (event, data) => {
        if (!data.node.children && data.node.lazy) {
          data.node.lazyLoad();
        }
        this.selectedNode = data.node;
        this.selectedType = this.selectedNode.data.type;

        if (this.selectedType !== 'root') {
          this.editSitemap.setNode(this.selectedNode, 'footer');
        }
      }
    });
  }

  getSitemaps(id: number) {
    this.vvtkService.get(
      {
        path: `api/Sitemaps/${id}/Children`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          body.forEach((item: Sitemap) => {
            this.tree.fancytree('getRootNode').children[0].addChildren({
              title: item.title,
              type: 'footer',
              dbData: item
            });
          });
          this.filterI18n();
        }
      }
    );
  }

  deleteSitmap(node: any) {
    const id: number = node.data.dbData.id;

    this.vvtkService.delete(
      {
        path: `api/Sitemaps/${id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          node.remove();
          this.selectedType = 'root';
        }
      }
    );
  }

  patchSitemapDisplayOrder(data: Sitemap[]) {
    this.vvtkService.patch(
      {
        path: `api/Sitemap/DisplayOrder`,
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
