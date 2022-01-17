import { Component, OnInit, Input } from '@angular/core';
import { DesignToolNvrModelInfo } from '../../interface/design-tool-nvr-model-info';

@Component({
  selector: 'vvtk-nvr-model',
  templateUrl: './nvr-model.component.html',
  styleUrls: ['./nvr-model.component.scss']
})
export class NvrModelComponent implements OnInit {
  @Input() nvr: DesignToolNvrModelInfo;

  constructor() {}

  ngOnInit() {}
}
