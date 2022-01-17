import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'vvtk-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  env: string;

  constructor() {}

  ngOnInit() {
    // 測試一下目前使用的 environment 變數是開發中還是 prod 的
    this.env = environment.production ? 'production' : 'developmennt';
  }

  ngOnDestroy() {}
}
