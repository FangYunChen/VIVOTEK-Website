import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vvtk-model-download',
  templateUrl: './model-download.component.html',
  styleUrls: ['./model-download.component.scss']
})
export class ModelDownloadComponent implements OnInit {
  @Input() template;
  constructor() { }

  ngOnInit() {
  }

}
