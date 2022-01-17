import { Component, OnInit, ViewChild } from '@angular/core';
import { FileOrFolder } from '../../vvtk-core/classes/fileOrFolder';
import { TreeNode } from '../../vvtk-core/classes/tree';
import { SharedService } from '../../vvtk-core/services/shared.service';
import { VvtkService } from '../../vvtk-core/services/vvtk.service';
import { FileEditorComponent } from './file-editor/file-editor.component';

declare var $: any;
@Component({
  selector: 'vvtk-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  pageIsEditable: boolean;

  treeSource: TreeNode[];
  tree: any;
  selectedNode: any;
  selectedType: string;

  @ViewChild('editFile') editFile: FileEditorComponent;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService
  ) {
    this.selectedType = 'root';
    this.treeSource = [
      {
        title: 'root',
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
    this.getFiles(this.tree.fancytree('getRootNode').children[0]);
  }

  resetTree() {
    this.tree = $('#tree').fancytree({
      debugLevel: 0,
      selectMode: 1,
      source: this.treeSource,
      // extensions: ["contextMenu", "dnd"],
      extensions: this.pageIsEditable ? ['contextMenu'] : [],
      lazyLoad: (event, ctx) => {
        ctx.result = [];
        if (ctx.node.title === '') {
          return;
        }
        this.getFiles(ctx.node);
      },
      renderNode: (event, data) => {
        const node = data.node;
        const $span = $(node.span);
        if (node.data.type === 'root') {
          $span
            .find('> span.fancytree-icon')
            .css({
              'background-image': 'none'
            })
            .attr('class', 'fancytree-icon fa fa-folder');
        } else if (node.data.type === 'folder') {
          $span
            .find('> span.fancytree-icon')
            .css({
              'background-image': 'none'
            })
            .attr('class', 'fancytree-icon fa fa-folder-o');
        } else if (/^image/.test(node.data.type)) {
          $span
            .find('> span.fancytree-icon')
            .css({
              'background-image': 'none'
            })
            .attr('class', 'fancytree-icon fa fa-file-image-o');
        } else if (/^video/.test(node.data.type)) {
          $span
            .find('> span.fancytree-icon')
            .css({
              'background-image': 'none'
            })
            .attr('class', 'fancytree-icon fa fa-file-video-o');
        } else if (/^audio/.test(node.data.type)) {
          $span
            .find('> span.fancytree-icon')
            .css({
              'background-image': 'none'
            })
            .attr('class', 'fancytree-icon fa fa-file-audio-o');
        } else if (/pdf$/.test(node.data.type)) {
          $span
            .find('> span.fancytree-icon')
            .css({
              'background-image': 'none'
            })
            .attr('class', 'fancytree-icon fa fa-file-video-o');
        } else if (/office/.test(node.data.type)) {
          $span
            .find('> span.fancytree-icon')
            .css({
              'background-image': 'none'
            })
            .attr('class', 'fancytree-icon fa fa-file-word-o');
        } else {
          $span
            .find('> span.fancytree-icon')
            .css({
              'background-image': 'none'
            })
            .attr('class', 'fancytree-icon fa fa-file-o');
        }
      },
      contextMenu: {
        menu: node => {
          switch (node.data.type) {
            case 'root':
              return {
                addFolder: { name: 'Add Folder', icon: 'add' },
                addFile: { name: 'Add File', icon: 'add' }
              };
            case 'folder':
              return {
                addFolder: { name: 'Add Folder', icon: 'add' },
                addFile: { name: 'Add File', icon: 'add' }
                // "sep1": "---------",
                // 'delete': { 'name': 'Delete Folder', 'icon': 'delete' }
              };
            default:
              return {
                // 'delete': { 'name': 'Delete File', 'icon': 'delete' }
              };
          }
        },
        actions: (node, action: string, options) => {
          switch (action) {
            case 'addFolder':
              const newFolder = node.addChildren({
                title: '',
                folder: true,
                type: 'folder',
                children: [],
                dbData: {
                  id: 0,
                  name: '',
                  parentId: node.data.dbData ? node.data.dbData.id : 0,
                  type: 'folder',
                  url: ''
                }
              });
              newFolder.setActive();
              break;
            case 'addFile':
              const newFile = node.addChildren({
                title: '',
                type: 'file',
                dbData: {
                  id: 0,
                  name: '',
                  parentId: node.data.dbData ? node.data.dbData.id : 0,
                  type: 'file',
                  url: ''
                }
              });
              newFile.setActive();
              break;
            case 'delete':
              this.deleteFile(node);
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

          if (data.otherNode.parent === node.parent) {
            if (nodeType === 'folder') {
              return ['over'];
            }
            return false;
          }
          if (nodeType === 'folder') {
            return ['over', 'before', 'after'];
          }
          return ['before', 'after'];
        },
        dragExpand: (node, data) => {
          // 拖曳到的
          const nodeType: string = node.data.type;
          if (nodeType === 'folder') {
            return true;
          }
          return true;
        },
        dragDrop: (node, data) => {
          // 節點移動
          data.otherNode.moveTo(node, data.hitMode);

          if (data.otherNode.parent.data.type === 'root') {
            data.otherNode.data.dbData.parentId = 0;
          } else {
            data.otherNode.data.dbData.parentId =
              data.otherNode.parent.data.dbData.id;
          }
          this.patchFile(data.otherNode);
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
          case 'root':
            break;
          default:
            this.editFile.setNode(this.selectedNode);
            break;
        }
      }
    });
  }

  getFiles(node: any) {
    let id: number;
    if (!node.data.dbData) {
      id = 0;
    } else {
      id = node.data.dbData.id;
    }

    this.vvtkService.get(
      {
        path: `api/Files/${id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          if (body) {
            body.forEach((item: FileOrFolder) => {
              node.addChildren({
                title: item.name,
                folder: item.type === 'folder',
                type: item.type,
                lazy: item.type === 'folder',
                dbData: item
              });
            });
            this.sortNode(node);
            node.setExpanded();
          }
        }
      }
    );
  }

  patchFile(node) {
    const data = node.data.dbData;
    this.vvtkService.patch(
      {
        path: `api/File/${data.id}`,
        disableLanguage: true
      },
      data,
      {
        next: resp => {
          this.sortNode(node.parent);
        }
      }
    );
  }

  deleteFile(node) {
    const id: number = node.data.dbData.id;

    this.vvtkService.delete(
      {
        path: `api/File/${id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          node.remove();
          this.selectedType = 'root';
        }
      }
    );
  }

  sortNode(node: any) {
    node.sortChildren(function(a, b) {
      const x = (a.isFolder() ? '0' : '1') + a.title.toLowerCase(),
        y = (b.isFolder() ? '0' : '1') + b.title.toLowerCase();
      return x === y ? 0 : x > y ? 1 : -1;
    }, true);
  }
}
