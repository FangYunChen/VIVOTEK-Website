import { Component, OnInit } from '@angular/core';
import { LayoutMenuNode } from '@frontdesk/core/interfaces';
import { PageMetaService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss']
})
export class SitemapComponent implements OnInit {

  headerNodes: LayoutMenuNode[] = [];
  footerNodes: LayoutMenuNode[] = [];

  constructor(
    private pageMetaService: PageMetaService
  ) { }

  ngOnInit() {
    this.pageMetaService.headerMenuNode$.subscribe(h => this.headerNodes = h);
    this.pageMetaService.footerMenuNode$.subscribe(f => this.footerNodes = f);
  }

}
