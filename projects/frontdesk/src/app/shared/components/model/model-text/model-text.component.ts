import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vvtk-model-text',
  templateUrl: './model-text.component.html',
  styleUrls: ['./model-text.component.scss']
})
export class ModelTextComponent implements OnInit {

  @Input() templateIndex;
  @Input() content;
  constructor() { }

  ngOnInit() {
  }

}
