import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID
} from '@angular/core';
import { LayoutMenuNode } from '@frontdesk/core/interfaces';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  subMenu: string; // sub-menu
  subMenuIndex: number; // sub-menu
  _MenuNode: LayoutMenuNode[] = [];
  languageMask = false; // language

  @Input() sidemenuMask; // side-menu
  @Output() sidemenuWindow = new EventEmitter<any>(); // side-menu
  @Input() signMask; // sign
  @Output() signWindow = new EventEmitter<any>(); // sign
  @Input() authService;
  @Input() showAdminPanelLink;
  @Input() adminPanelLink;

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

  // sidemenu close
  closeSidemenu($event) {
    this.sidemenuMask = false;
    this.sidemenuWindow.emit(this.sidemenuMask);
  }

  menuControl(subMenu: string) {
    if (this.subMenu === subMenu) {
      this.subMenu = '';
    } else {
      this.subMenu = subMenu;
    }
  }

  subControl(subMenuIndex: number) {
    if (this.subMenuIndex === subMenuIndex) {
      this.subMenuIndex = 0;
    } else {
      this.subMenuIndex = subMenuIndex;
    }
  }

  // Language open
  openLanguage($event) {
    this.languageMask = true;
    this.sidemenuMask = false;
    this.sidemenuWindow.emit(this.sidemenuMask);
  }

  languageWindow(languageMask) {
    this.languageMask = languageMask;
  }
}
