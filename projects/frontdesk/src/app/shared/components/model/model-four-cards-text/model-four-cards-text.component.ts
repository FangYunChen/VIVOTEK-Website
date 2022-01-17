import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-model-four-cards-text',
  templateUrl: './model-four-cards-text.component.html',
  styleUrls: ['./model-four-cards-text.component.scss']
})
export class ModelFourCardsTextComponent implements OnInit {

  @Input() title;
  @Input() items;

  constructor() { }

  ngOnInit() { }
}
