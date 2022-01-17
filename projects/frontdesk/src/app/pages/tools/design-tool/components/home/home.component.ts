import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { DesignToolProductService } from '../../design-tool-product.service';
import { DesignToolService } from '../../design-tool.service';

@Component({
  selector: 'vvtk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private destroy$ = new Subject();
  routerUrl: string;
  canExport = true;

  get canNext(): boolean {
    return (
      this.designToolProductService.productList.length ===
      this.designToolProductService.filterProductHasValue().length
    );
  }

  constructor(
    private router: Router,
    public designToolService: DesignToolService,
    private designToolProductService: DesignToolProductService
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.routerUrl = event.url.split('#')[0];
      });
  }

  ngOnInit() {}
}
