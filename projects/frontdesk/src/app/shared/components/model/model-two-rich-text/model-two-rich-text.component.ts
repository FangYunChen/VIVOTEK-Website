import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-model-two-rich-text',
  templateUrl: './model-two-rich-text.component.html',
  styleUrls: ['./model-two-rich-text.component.scss']
})
export class ModelTwoRichTextComponent implements OnInit {

  @Input()
  title;

  @Input()
  items;

  constructor() { }

  ngOnInit() { }

  adjustColumns() {
    if (this.items.rowColumn) {
      const num = Math.floor(12 / this.items.rowColumn);
      return 'list-col list-col' + String(num);
    } else {
      return 'list-col list-col6';
    }
  }
}
