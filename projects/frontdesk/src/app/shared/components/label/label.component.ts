import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vvtk-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  @Input() color: string;
  @Input() bgColor: string;

  constructor() { }

  ngOnInit() {
  }

}
