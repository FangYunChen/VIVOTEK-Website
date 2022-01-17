import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-model-three-cards',
  templateUrl: './model-three-cards.component.html',
  styleUrls: ['./model-three-cards.component.scss']
})
export class ModelThreeCardsComponent implements OnInit {

  @Input() title;

  @Input() items;

  constructor() { }

  ngOnInit() { }
}
