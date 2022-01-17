import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { FancyTreeNode } from '../../../../../vvtk-core/interface/fancy-tree-node';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';
import { CategoryEditorComponent } from '../category-editor/category-editor.component';
import { ProductCategory } from '../../../../../vvtk-core/interface/product-category';
import { CommonDisplayOrder, CommonSelectOption } from '../../../../../vvtk-core/interface/common-model';
import { DeleteConfirmComponent, DeleteConfirmResult } from '../../../../../shared/components/delete-confirm/delete-confirm.component';

declare var $: any;
@Component({
  selector: 'vvtk-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  treeSource: FancyTreeNode<ProductCategory>[];
  tree;
  selectedNode: any;
  selectedType: string;
  productCategoryOptions: CommonSelectOption[] = [];

  headerMaxLevel = 4;
  isLoading = false;
  @ViewChild('editCategory') editCategory: CategoryEditorComponent;


  constructor(
    private sharedService: SharedService,
    private vvtkService: VvtkService,
    public dialog: MatDialog
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
        this.getProductCategoryAndSetTree();
      }
    );
  }

  getProductCategoryAndSetTree() {
    this.resetTree();
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `api/Product/Categories`
      },
      {
        next: resp => {
          const body = resp.json();
          const data: ProductCategory[] = body;

          this.productCategoryOptions = this.mapDataToArray(data).map(category => <CommonSelectOption>{
            value: category.id,
            optionText: category.name
          });
          const result = this.mapDataToTreeNode(data);
          this.treeSource[0].children = result;
          $('#tree').fancytree('option', 'source', this.treeSource);
          this.setActiveNode();
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  mapDataToArray(productCategory: ProductCategory[]): ProductCategory[] {
    if (productCategory) {
      let result: ProductCategory[] = [];
      productCategory.forEach(category => {
        result.push(category);
        if (category.children && category.children.length > 0) {
          const children = this.mapDataToArray(category.children);
          result = [...result, ...children];
        }
      });
      return result;
    }
  }

  mapDataToTreeNode(productCategory: ProductCategory[]): FancyTreeNode<ProductCategory>[] {
    if (productCategory && productCategory.length > 0) {
      return productCategory.map(category => <FancyTreeNode<ProductCategory>>{
        key: category.id,
        title: category.name,
        expanded: false,
        folder: true,
        type: 'category',
        lazy: false,
        dbData: {
          id: category.id,
          parentId: category.parentId,
          name: category.name,
          subRoute: category.subRoute,
          imageId: category.imageId,
          imageName: category.imageName,
          imagePath: category.imagePath,
          displayOrder: category.displayOrder
        },
        children: this.mapDataToTreeNode(category.children)
      });
    }
    return [];
  }

  setActiveNode() {
    if (this.selectedNode) {
      $('#tree').fancytree('getTree').getNodeByKey(this.selectedNode.key).setActive();
    } else {
      $('#tree').fancytree('getTree').activateKey(false);
    }
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
              let data: ProductCategory;
              if (node.data.type === 'root') {
                data = {
                  id: null,
                  parentId: null,
                  name: '',
                  subRoute: '',
                  imageId: null,
                  imageName: '',
                  imagePath: '',
                  displayOrder: node.children && node.children.length > 0 ?
                    node.children[node.children.length - 1].data.dbData.displayOrder + 1
                    : 1,
                  isDisplayOnSelector: false
                };
              } else {
                const parentData: ProductCategory = node.data.dbData;
                data = {
                  id: null,
                  parentId: parentData.id,
                  name: '',
                  subRoute: '',
                  imageId: null,
                  imageName: '',
                  imagePath: '',
                  displayOrder: parentData.children && parentData.children.length > 0 ?
                    parentData.children[parentData.children.length - 1].displayOrder + 1
                    : 1,
                  isDisplayOnSelector: false
                };
              }
              const newNode = node.addChildren({
                title: '',
                type: 'category',
                dbData: data
              });
              newNode.setActive();
              break;
            case 'delete':
              this.deleteProductCategory(node);
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
          const nodesData: CommonDisplayOrder[] = [];

          // 長幼有序
          let displayOrder = 1;

          data.otherNode.parent.children.forEach(item => {
            const dbData: ProductCategory = item.data.dbData;
            dbData.displayOrder = displayOrder;
            displayOrder++;

            nodesData.push({
              id: dbData.id,
              displayOrder: dbData.displayOrder
            });
          });
          this.patchProductCategoryDisplayOrder(nodesData);
        }
      },
      beforeActivate: (event, data) => {
        const oldNode = this.tree.fancytree('getActiveNode');
        if (oldNode && oldNode.data.dbData && !oldNode.data.dbData.id) {
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

  deleteProductCategory(node: any) {
    const data: ProductCategory = node.data.dbData;
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      disableClose: false,
      data: {
        title: `Delete ${data.name}`,
        options: this.productCategoryOptions,
        placeholder: 'Product Category'
      }
    });
    dialogRef.afterClosed().subscribe((result: DeleteConfirmResult) => {
      if (result && result.value) {
        this.isLoading = true;
        this.vvtkService.delete(
          {
            path: `api/Product/Categories/${data.id}`,
            disableLanguage: true,
            query: {
              alternativeId: result.value
            }
          },
          {
            next: resp => {
              node.remove();
              this.selectedType = 'root';
              this.selectedNode = null;
              this.getProductCategoryAndSetTree();
            },
            finally: () => {
              this.isLoading = false;
            }
          }
        );
      }
    });
  }

  patchProductCategoryDisplayOrder(data: CommonDisplayOrder[]) {
    this.isLoading = true;
    this.vvtkService.patch(
      {
        path: 'api/Product/Categories/ChangeDisplayOrder',
        disableLanguage: true
      },
      data,
      { finally: () => { this.isLoading = false; } }
    );
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
