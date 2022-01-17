import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-model-list-item',
  templateUrl: './model-list-item.component.html',
  styleUrls: ['./model-list-item.component.scss']
})
export class ModelListItemComponent implements OnInit {

  @Input() template;
  ListContentRowFlexBasisStyle = '31%';
  constructor() { }

  ngOnInit() {
    if (this.template.rowColumn) {
      this.ListContentRowFlexBasisStyle = `${String(Math.floor(100 / this.template.rowColumn) - 2)}%`;
    }
  }

}
