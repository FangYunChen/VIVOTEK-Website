import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SupportBreadcrumbService } from '../support-breadcrumb.service';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'vvtk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  rootPath: string;
  contentPageTitle: string;
  destroy$ = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private supportBreadcrumbService: SupportBreadcrumbService
  ) { }

  ngOnInit() {
    this.supportBreadcrumbService.rootPath$.pipe(
      // debounce後才不會噴錯，應該有更好的方法可以處理。
      debounceTime(1),
      takeUntil(this.destroy$)
    ).subscribe(r => this.rootPath = r);
    this.supportBreadcrumbService.contentPageTitle$.pipe(
      // debounce後才不會噴錯，應該有更好的方法可以處理。
      debounceTime(1),
      takeUntil(this.destroy$)
    ).subscribe(p => this.contentPageTitle = p);
  }

  search(value) {
    if (value) {
      this.router.navigate(['knowledge'], { relativeTo: this.route });
    }
  }

  ngOnDestroy() {
    this.supportBreadcrumbService.clearBreadcrumbValue();
    this.destroy$.next('');
    this.destroy$.complete();
  }

}
