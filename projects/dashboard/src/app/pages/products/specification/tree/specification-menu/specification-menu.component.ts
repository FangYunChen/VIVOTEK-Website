import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { timer, Subject } from 'rxjs';
import { FancyTreeNode } from '../../../../../vvtk-core/interface/fancy-tree-node';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { VvtkApiService } from '../../../../../vvtk-core/services/vvtk-api.service';
import { CommonSelectOption, CommonDisplayOrder } from '../../../../../vvtk-core/interface/common-model';
import { ProductSpecification } from '../../../../../vvtk-core/interface/product-specification';
import { DeleteConfirmComponent, DeleteConfirmResult } from '../../../../../shared/components/delete-confirm/delete-confirm.component';
import { DropdownListService } from 'projects/dashboard/src/app/vvtk-core/services/dropdown-list.service';
import { finalize, takeUntil } from 'rxjs/operators';

declare var $: any;
@Component({
  selector: 'vvtk-specification-menu',
  templateUrl: './specification-menu.component.html',
  styleUrls: ['./specification-menu.component.scss']
})
export class SpecificationMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  get pageIsEditable() {
    return this.sharedService.pageIsEditable;
  }

  productCategoryId: number;
  productCategoryOptions: CommonSelectOption[] = [];

  tree: any;
  treeSource: FancyTreeNode<ProductSpecification>[];
  selectedNode: any;
  get selectedType(): string {
    return (
      this.selectedNode &&
      this.selectedNode.data &&
      this.selectedNode.data.type
    );
  }

  headerMaxLevel = 5;
  isLoading = false;

  private destroy$ = new Subject();

  constructor(
    private sharedService: SharedService,
    private vvtkApiService: VvtkApiService,
    public dialog: MatDialog,
    private dropdownListService: DropdownListService
  ) {
    this.initData();
  }

  ngOnInit() {
    this.dropdownListService.getProductCategoryOptions().subscribe(
      categories => (this.productCategoryOptions = categories)
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.getSelectedLanguage();
    }, 10);
  }

  private initData() {
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

  private getSelectedLanguage() {
    this.sharedService.selectedLanguage$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        selectedLanguage => {
          this.getProductSpecificationAndSetTree();
        }
      );
  }

  changeCategory($event: CommonSelectOption) {
    timer(0).subscribe(() => {
      this.getProductSpecificationAndSetTree();
    });
  }

  getProductSpecificationAndSetTree() {
    this.initData();
    this.resetTree();
    if (!this.productCategoryId) {
      return;
    }
    this.isLoading = true;
    this.vvtkApiService
      .get<ProductSpecification[]>({
        path: `api/Product/Specification`,
        query: { categoryId: this.productCategoryId }
      })
      .pipe(
        finalize(() => { this.isLoading = false; })
      )
      .subscribe(
        data => {
          this.treeSource[0].children = this.mapDataToTreeNode(data);
          $('#tree').fancytree('option', 'source', this.treeSource);
          this.setActiveNode();
        }
      );
  }

  private mapDataToTreeNode(productSpec: ProductSpecification[]): FancyTreeNode<ProductSpecification>[] {
    return (productSpec || []).map(spec => <FancyTreeNode<ProductSpecification>>{
      key: spec.id,
      title: spec.name,
      expanded: false,
      folder: true,
      type: spec.isAttribute ? 'attribute' : 'group',
      lazy: false,
      dbData: {
        id: spec.id,
        parentId: spec.parentId,
        name: spec.name,
        categoryId: spec.categoryId,
        isAttribute: spec.isAttribute,
        displayOrder: spec.displayOrder
      },
      children: this.mapDataToTreeNode(spec.children)
    });
  }

  private setActiveNode() {
    const selectedNode = $('#tree').fancytree('getTree').getNodeByKey(this.selectedNode && this.selectedNode.key);
    if (selectedNode) {
      selectedNode.setActive();
    } else {
      this.selectedNode = undefined;
      $('#tree').fancytree('getTree').activateKey(false);
    }
  }

  resetTree() {
    this.tree = $('#tree').fancytree({
      debugLevel: 0,
      selectMode: 1,
      source: this.treeSource,
      extensions: this.pageIsEditable ? ['contextMenu'] : [],
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
              if (!node.data.dbData.id) {
                return;
              }
              const menuObj: { [key: string]: any } = {};
              if (node.data.type === 'group' && node.getLevel() < this.headerMaxLevel) {
                menuObj.add = { name: 'Add', icon: 'add' };
              }
              menuObj.delete = { name: 'Delete', icon: 'delete' };
              return menuObj;
          }
        },
        actions: (node, action: string, options) => {
          switch (action) {
            case 'add':
              let data: ProductSpecification;
              if (node.data.type === 'root') {
                data = {
                  id: null,
                  parentId: null,
                  name: '',
                  categoryId: this.productCategoryId,
                  isAttribute: false,
                  children: []
                };
              } else {
                const parentData: ProductSpecification = node.data.dbData;
                data = {
                  id: null,
                  parentId: parentData.id,
                  name: '',
                  categoryId: this.productCategoryId,
                  isAttribute: false,
                  children: []
                };
              }
              const newNode = node.addChildren({
                title: '',
                type: 'group',
                dbData: data
              });
              newNode.setActive();
              break;
            case 'delete':
              this.deleteProductSpecification(node);
              break;
          }
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
      }
    });
  }

  updateSelectedNode($event: ProductSpecification) {
    if (!this.selectedNode) {
      return;
    }
    const id = (
      this.selectedNode.data &&
      this.selectedNode.data.dbData &&
      this.selectedNode.data.dbData.id
    );
    if (!id) {
      this.selectedNode.key = $event.id;
      this.selectedNode.data.type = $event.isAttribute ? 'attribute' : 'group';
    }
    this.selectedNode.setTitle($event.name);
    this.selectedNode.data.dbData = $event;
    this.selectedNode.render();
  }

  private getSelfAndChildrenSpecIds(node: any) {
    const ids = [];
    if (node) {
      if (node.data && node.data.dbData) {
        ids.push(node.data.dbData.id);
      }
      (node.children || []).forEach(child => {
        const childIds = this.getSelfAndChildrenSpecIds(child);
        ids.push(...childIds);
      });
    }
    return ids;
  }

  private deleteProductSpecification(node: any) {
    const data: ProductSpecification = node.data.dbData;
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      disableClose: false,
      data: {
        title: `Delete ${data.name}?`,
        placeholder: 'Product Specification'
      }
    });
    dialogRef.afterClosed().subscribe((result: DeleteConfirmResult) => {
      if (result) {
        this.isLoading = true;
        this.vvtkApiService
          .delete({
            path: `api/Product/Specification/${data.id}`,
            disableLanguage: true
          })
          .subscribe(
            () => {
              node.remove();
              this.selectedNode = null;
              this.getProductSpecificationAndSetTree();
            },
            error => {
              this.isLoading = false;
            }
          );
      }
    });
  }

  private mapTreeDataToArray(node: FancyTreeNode<ProductSpecification>): ProductSpecification[] {
    const nodeList = [];

    if (node) {
      if (node.data && node.data.dbData && !node.data.dbData.isAttribute) {
        nodeList.push(node.data.dbData);
      }

      (node.children || []).forEach(child => {
        nodeList.push(...this.mapTreeDataToArray(child));
      });
    }

    return nodeList;
  }

}
