import { Component, OnInit, Input } from '@angular/core';
import { NestedSpecificationCompareData } from './nested-specification-compare-model';

@Component({
  selector: 'vvtk-nested-specification-compare',
  templateUrl: './nested-specification-compare.component.html',
  styleUrls: ['./nested-specification-compare.component.scss']
})
export class NestedSpecificationCompareComponent implements OnInit {

  @Input() layer = 1;
  @Input() data: NestedSpecificationCompareData[];

  constructor() { }

  ngOnInit() {
  }

}
