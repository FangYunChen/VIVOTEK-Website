import { Component, OnInit, Input, EventEmitter } from '@angular/core';


  @Component({
  selector: 'vvtk-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() loading = false;
  constructor() { }

  ngOnInit() {
  }
}
