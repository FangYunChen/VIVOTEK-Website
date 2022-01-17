import { Component, OnInit, Input } from '@angular/core';
import { DesignToolAdvancedNvrInfo } from '../../interface/design-tool-advanced-nvr-info';
import { DesignToolService } from '../../design-tool.service';

@Component({
  selector: 'vvtk-nvr-advanced-model',
  templateUrl: './nvr-advanced-model.component.html',
  styleUrls: ['./nvr-advanced-model.component.scss']
})
export class NvrAdvancedModelComponent implements OnInit {
  @Input() items: Array<DesignToolAdvancedNvrInfo>;

  constructor(public designToolService: DesignToolService) {}

  ngOnInit() {}
}
