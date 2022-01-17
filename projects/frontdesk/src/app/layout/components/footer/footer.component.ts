import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LayoutMenuNode } from '../../../vvtk-core/interfaces';
import { VvtkService } from '../../../vvtk-core/services';

@Component({
  selector: 'vvtk-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  _MenuNode: LayoutMenuNode[] = [];
  _layout_href: any = [];

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private vvtkService: VvtkService
  ) {}

  ngOnInit() {
    this.vvtkService.getLayoutMenuNode('footer', resp => {
      if (resp.ok) {
        this.setLayoutMenuNode(resp.json());
      }
    });

    this.vvtkService.get(
      {
        path: 'api/Community/List',
        disableLanguage: true
      },
      {
        next: resp => {
          const Hrefs = resp.json();
          this._layout_href = Hrefs.filter(link => link.footerEnabled);
        }
      }
    );
  }

  setLayoutMenuNode(MenuNode: LayoutMenuNode[]) {
    this._MenuNode = MenuNode;
  }
}
