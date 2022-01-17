import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { StakeholderFAQCategory } from '../../../../../vvtk-core/classes/stakeholderFaq';
import { TreeNode } from '../../../../../vvtk-core/classes/tree';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';
// tslint:disable-next-line:max-line-length
import { InvestorsStakeholderFaqCategoryEditorComponent } from '../investors-stakeholder-faq-category-editor/investors-stakeholder-faq-category-editor.component';

declare let $: any;
@Component({
  selector: 'vvtk-investors-stakeholder-faq-category',
  templateUrl: './investors-stakeholder-faq-category.component.html',
  styleUrls: ['./investors-stakeholder-faq-category.component.scss']
})
export class InvestorsStakeholderFaqCategoryComponent
  implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;

  treeSource: TreeNode[];
  tree;
  selectedNode: any;
  selectedType: string;

  @ViewChild('editCategory')
  editCategory: InvestorsStakeholderFaqCategoryEditorComponent;

  constructor(
    private sharedService: SharedService,
    private vvtkService: VvtkService
  ) {
    this.selectedType = 'root';
    this.treeSource = [
      {
        title: 'FAQ Category',
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
    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.getData();
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
              if (node.getLevel() <= 2) {
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
              const newNode = node.addChildren({
                id: 0,
                title: '',
                type: 'sub',
                dbData: {
                  id: 0,
                  parentId:
                    node.data.type === 'root' ? null : node.data.dbData.id,
                  name: '',
                  sub: []
                }
              });
              newNode.setActive();
              break;
            case 'delete':
              this.deleteNode(node);
              break;
          }
        }
      },
      dnd: {
        autoExpandMS: 1, // 停留幾毫秒展開節點
        preventRecursiveMoves: true, // 禁止拖曳到自己的子代中
        preventVoidMoves: true, // 防止丟在自己的前面
        preventForeignNodes: true,
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

          if (data.otherNode.getLevel() === node.getLevel()) {
            return ['before', 'after'];
          }
          return false;
        },
        dragExpand: (node, data) => {
          // 拖曳到的要不要打開
          return false;
        },
        dragDrop: (node, data) => {
          // 節點移動
          data.otherNode.moveTo(node, data.hitMode);

          // 小孩子們的資料
          const nodesData: any[] = [];

          // 長幼有序
          let displayOrder = data.otherNode.parent.children.length;

          const parentId = data.otherNode.parent.data.dbData
            ? data.otherNode.parent.data.dbData.id
            : null;

          data.otherNode.parent.children.forEach(item => {
            item.data.dbData.displayOrder = displayOrder;
            displayOrder--;

            nodesData.push({
              id: item.data.dbData.id,
              parentId: parentId,
              displayOrder: item.data.dbData.displayOrder
            });
          });
          this.patchNodeDisplayOrder(nodesData);
        }
      },
      beforeActivate: (event, data) => {
        const oldNode = this.tree.fancytree('getActiveNode');
        if (oldNode && oldNode.data.dbData && oldNode.data.dbData.id === 0) {
          oldNode.remove();
        }
      },
      activate: (event, data) => {
        this.selectedNode = data.node;
        this.selectedType = this.selectedNode.data.type;

        if (this.selectedType !== 'root') {
          this.editCategory.setNode(this.selectedNode);
        }
      }
    });
  }

  getData() {
    this.selectedType = 'root';
    this.vvtkService.get(
      {
        path: `api/StakeholderFAQ/Category/List`
      },
      {
        next: resp => {
          const body = resp.json();
          this.setTree(this.tree.fancytree('getRootNode').children[0], body);
          this.tree.fancytree('getRootNode').children[0].setExpanded(true);
        }
      }
    );
  }

  setTree(node, data: StakeholderFAQCategory[]) {
    while (node.hasChildren()) {
      node.getFirstChild().remove();
    }
    data.forEach((item: StakeholderFAQCategory) => {
      const newNode = node.addChildren({
        title: item.name,
        folder: !(node.getLevel() >= 2),
        type: 'sub',
        dbData: item
      });
      if (item.sub && item.sub.length > 0) {
        this.setTree(newNode, item.sub);
      }
    });
  }

  deleteNode(node: any) {
    const id: number = node.data.dbData.id;

    this.vvtkService.delete(
      {
        path: `api/StakeholderFAQ/Category/${id}`,
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

  patchNodeDisplayOrder(data: StakeholderFAQCategory[]) {
    this.vvtkService.patch(
      {
        path: `api/StakeholderFAQ/Category/DisplayOrder`,
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
