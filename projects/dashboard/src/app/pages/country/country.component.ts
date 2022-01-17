import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { Continent, Country, States } from '../../vvtk-core/classes/continent';
import { TreeNode } from '../../vvtk-core/classes/tree';
import { SharedService } from '../../vvtk-core/services/shared.service';
import { VvtkService } from '../../vvtk-core/services/vvtk.service';
import { CountryContinentEditorComponent } from './country-continent-editor/country-continent-editor.component';
import { CountryCountryEditorComponent } from './country-country-editor/country-country-editor.component';
import { CountryStateEditorComponent } from './country-state-editor/country-state-editor.component';

declare var $: any;

@Component({
  selector: 'vvtk-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, AfterViewInit {
  pageIsEditable: boolean;

  treeSource: TreeNode[];
  tree;
  selectedNode: any;
  selectedType: string;

  @ViewChild('editContinent') editContinent: CountryContinentEditorComponent;
  @ViewChild('editCountry') editCountry: CountryCountryEditorComponent;
  @ViewChild('editState') editState: CountryStateEditorComponent;
  @ViewChild('treeElement') treeElement: ElementRef;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService
  ) {
    this.selectedType = '';
    this.treeSource = [
      {
        title: 'Earth',
        expanded: true,
        folder: true,
        type: 'globe',
        children: []
      }
    ];
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
  }

  ngAfterViewInit() {
    this.resetTree();
    this.getContinents();
  }

  resetTree() {
    this.tree = $(this.treeElement.nativeElement).fancytree({
      debugLevel: 0,
      selectMode: 1,
      source: this.treeSource,
      extensions: this.pageIsEditable ? ['contextMenu'] : [],
      lazyLoad: (event, ctx) => {
        ctx.result = [];
        switch (ctx.node.data.type) {
          case 'continent':
            this.getContinentsCountries(ctx.node.data.dbData.id, ctx.node);
            break;
          case 'country':
            this.getCountriesStates(ctx.node.data.dbData.id, ctx.node);
            break;
        }
      },
      renderNode: (event, data) => {
        const node = data.node;
        const $span = $(node.span);
        switch (node.data.type) {
          case 'globe':
            $span
              .find('> span.fancytree-icon')
              .css({
                'background-image': 'none'
              })
              .attr('class', 'fancytree-icon fa fa-globe');
            break;
          case 'continent':
            $span
              .find('> span.fancytree-icon')
              .css({
                'background-image': 'none'
              })
              .attr('class', 'fancytree-icon fa fa-map');
            break;
          case 'country':
            $span
              .find('> span.fancytree-icon')
              .css({
                'background-image': 'none'
              })
              .attr('class', 'fancytree-icon fa fa-flag-o');
            break;
          case 'state':
            $span
              .find('> span.fancytree-icon')
              .css({
                'background-image': 'none'
              })
              .attr('class', 'fancytree-icon fa fa-plane');
            break;
        }
      },
      contextMenu: {
        menu: node => {
          switch (node.data.type) {
            case 'globe':
              return {
                addContinent: { name: 'Add Continent', icon: 'add' }
              };
            case 'continent':
              return {
                deleteContinent: { name: 'Delete Continent', icon: 'delete' },
                sep1: '---------',
                addCountry: { name: 'Add Country', icon: 'add' }
              };
            case 'country':
              return {
                deleteCountry: { name: 'Delete Country', icon: 'delete' },
                sep1: '---------',
                addState: { name: 'Add State', icon: 'add' }
              };
            case 'state':
              return {
                deleteState: { name: 'Delete State', icon: 'delete' }
              };
          }
        },
        actions: (node, action: string, options) => {
          switch (action) {
            case 'addContinent':
              const newContinent = node.addChildren({
                title: '',
                folder: true,
                type: 'continent',
                dbData: {
                  id: 0,
                  name: '',
                  displayOrder: 999,
                  isEnabled: true
                }
              });
              newContinent.setActive();
              break;
            case 'deleteContinent':
              this.deleteContinent(node);
              break;
            case 'addCountry':
              const newCountry = node.addChildren({
                title: '',
                folder: true,
                type: 'country',
                dbData: {
                  id: 0,
                  continentId: node.data.dbData.id,
                  name: '',
                  lang: 'global',
                  isReal: true,
                  displayOrder: 999,
                  isEnabled: true,
                  isLanguage: false
                }
              });
              newCountry.setActive();
              break;
            case 'deleteCountry':
              this.deleteCountries(node);
              break;
            case 'addState':
              const newState = node.addChildren({
                title: '',
                type: 'state',
                dbData: {
                  id: 0,
                  countryId: node.data.dbData.id,
                  name: '',
                  displayOrder: 999,
                  isEnabled: true
                }
              });
              newState.setActive();
              break;
            case 'deleteState':
              this.deleteState(node);
              break;
          }
        }
      },
      dnd: {
        autoExpandMS: 1, // 停留幾毫秒展開節點
        preventRecursiveMoves: true, // 禁止拖曳到自己的子代中
        preventVoidMoves: true, // 防止丟在自己的前面
        dragStart: (node, data) => {
          if (node.data.type === 'globe') {
            return false;
          }
          return true;
        },
        dragEnter: (node, data) => {
          // 拖曳中的
          const otherNodeType: string = data.otherNode.data.type;
          // 拖曳到的
          const nodeType: string = node.data.type;

          switch (otherNodeType) {
            case 'continent':
              if (nodeType === 'continent') {
                return ['before', 'after'];
              } else if (nodeType === 'global') {
                return ['over'];
              } else {
                return false;
              }
            case 'country':
              if (nodeType === 'country') {
                return ['before', 'after'];
              } else if (nodeType === 'continent') {
                return ['over'];
              } else {
                return false;
              }
            case 'state':
              if (nodeType === 'state') {
                return ['before', 'after'];
              } else if (nodeType === 'country') {
                return ['over'];
              } else {
                return false;
              }
          }
          return false;
        },
        dragExpand: (node, data) => {
          // 拖曳中的
          const otherNodeType: string = data.otherNode.data.type;
          // 拖曳到的
          const nodeType: string = node.data.type;
          switch (otherNodeType) {
            case 'continent':
              return false;
            case 'country':
              if (nodeType === 'continent') {
                return true;
              }
              return false;
            case 'state':
              return true;
          }
          return true;
        },
        dragDrop: (node, data) => {
          // 節點移動
          data.otherNode.moveTo(node, data.hitMode);

          // 小孩子們的型態
          const nodesType: string = data.otherNode.data.type;

          // 小孩子們的資料
          const nodesData: any[] = [];

          // 長幼有序
          let displayOrder = 1;

          // 整理小孩子們的資料
          switch (nodesType) {
            case 'continent':
              data.otherNode.parent.children.forEach(item => {
                item.data.dbData.displayOrder = displayOrder;
                displayOrder++;

                nodesData.push({
                  id: item.data.dbData.id,
                  displayOrder: item.data.dbData.displayOrder
                });
              });
              this.patchContinentsDisplayOrder(nodesData);
              break;
            case 'country':
              // 爸爸的ID
              const continentId = data.otherNode.parent.data.dbData.id;
              data.otherNode.parent.children.forEach(item => {
                item.data.dbData.displayOrder = displayOrder;
                displayOrder++;

                nodesData.push({
                  id: item.data.dbData.id,
                  continentId: continentId,
                  displayOrder: item.data.dbData.displayOrder
                });
              });
              this.patchCountriesDisplayOrder(nodesData);
              break;
            case 'state':
              // 爸爸的ID
              const countryId = data.otherNode.parent.data.dbData.id;
              data.otherNode.parent.children.forEach(item => {
                item.data.dbData.displayOrder = displayOrder;
                displayOrder++;

                nodesData.push({
                  id: item.data.dbData.id,
                  countryId: countryId,
                  displayOrder: item.data.dbData.displayOrder
                });
              });
              this.patchStatesDisplayOrder(nodesData);
              break;
          }
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
        switch (this.selectedType) {
          case 'continent':
            this.editContinent.setNode(this.selectedNode);
            break;
          case 'country':
            this.editCountry.setNode(this.selectedNode);
            break;
          case 'state':
            this.editState.setNode(this.selectedNode);
            break;
        }
      }
    });
  }

  getContinents() {
    this.vvtkService.get(
      {
        path: 'api/Continents',
        disableLanguage: true,
        query: {
          scope: 'all'
        }
      },
      {
        next: resp => {
          const body = resp.json();
          body.forEach((item: Continent) => {
            this.tree.fancytree('getRootNode').children[0].addChildren({
              title: item.name,
              folder: true,
              type: 'continent',
              lazy: true,
              dbData: item
            });
          });
        }
      }
    );
  }

  getContinentsCountries(id: number, node: any) {
    this.vvtkService.get(
      {
        path: `api/Continents/${id}/Countries`,
        disableLanguage: true,
        query: {
          scope: 'all'
        }
      },
      {
        next: resp => {
          const body = resp.json();
          body.forEach((item: Continent) => {
            node.addChildren({
              title: item.name,
              folder: true,
              type: 'country',
              lazy: true,
              dbData: item
            });
          });
          node.setExpanded(true);
        }
      }
    );
  }

  getCountriesStates(id: number, node: any) {
    this.vvtkService.get(
      {
        path: `api/Countries/${id}/States`,
        disableLanguage: true,
        query: {
          scope: 'all'
        }
      },
      {
        next: resp => {
          const body = resp.json();
          body.forEach((item: Continent) => {
            node.addChildren({
              title: item.name,
              type: 'state',
              dbData: item
            });
            node.setExpanded();
          });
        }
      }
    );
  }

  deleteContinent(node: any) {
    const id: number = node.data.dbData.id;

    this.vvtkService.delete(
      {
        path: `api/Continents/${id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          node.remove();
          this.selectedType = 'global';
        }
      }
    );
  }

  deleteCountries(node: any) {
    const id: number = node.data.dbData.id;

    this.vvtkService.delete(
      {
        path: `api/Countries/${id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          node.remove();
          this.selectedType = 'global';
        }
      }
    );
  }

  deleteState(node: any) {
    const id: number = node.data.dbData.id;

    this.vvtkService.delete(
      {
        path: `api/States/${id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          node.remove();
          this.selectedType = 'global';
        }
      }
    );
  }

  patchContinentsDisplayOrder(data: Continent[]) {
    this.vvtkService.patch(
      {
        path: `api/Continents/DisplayOrder`,
        disableLanguage: true
      },
      data,
      {}
    );
  }

  patchCountriesDisplayOrder(data: Country[]) {
    this.vvtkService.patch(
      {
        path: `api/Countries/DisplayOrder`,
        disableLanguage: true
      },
      data,
      {}
    );
  }

  patchStatesDisplayOrder(data: States[]) {
    this.vvtkService.patch(
      {
        path: `api/States/DisplayOrder`,
        disableLanguage: true
      },
      data,
      {}
    );
  }
}
