import { Component, OnInit } from '@angular/core';
import { DesignToolService } from '../../design-tool.service';

@Component({
  selector: 'vvtk-vms',
  templateUrl: './vms.component.html',
  styleUrls: ['./vms.component.scss']
})
export class VmsComponent implements OnInit {
  constructor(public designToolService: DesignToolService) {}

  ngOnInit() {}
}
