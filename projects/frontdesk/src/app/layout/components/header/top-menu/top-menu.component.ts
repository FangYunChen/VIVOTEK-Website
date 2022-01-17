import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { LayoutMenuNode } from '@frontdesk/core/interfaces';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  @Input() styleHeader: string;
  _MenuNode: LayoutMenuNode[] = [];
  menuImg = false;
  firstIndex: number;
  secondIndex: number;
  openIndex = -1;
  openSubMenu = false;
  timer: any;

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private vvtkService: VvtkService
  ) {}

  ngOnInit() {
    this.vvtkService.getLayoutMenuNode('header', resp => {
      if (resp.ok) {
        this.setLayoutMenuNode(resp.json());
      }
    });
  }

  setLayoutMenuNode(MenuNode: LayoutMenuNode[]) {
    this._MenuNode = MenuNode;
  }

  openMenu(idx1, idx2) {
    this.firstIndex = idx2;
    this.openSubMenu = true;
    clearTimeout(this.timer);
    if (idx2 === 0) {
      if (this.openIndex === -1) {
        this.secondIndex = idx2;
        this.openIndex = idx1;
      } else {
        this.timer = setTimeout(() => {
          this.secondIndex = idx2;
          this.openIndex = idx1;
        }, 300);
      }
    } else {
      this.timer = setTimeout(() => {
        this.secondIndex = idx2;
      }, 300);
    }
  }
  closeMenu() {
    this.firstIndex = null;
    this.openSubMenu = false;
    this.openIndex = -1;
  }
  closeMainMenu($event) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.firstIndex = null;
      this.openSubMenu = false;
      this.openIndex = -1;
    }, 300);
  }
}
