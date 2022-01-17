import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-three-cards',
  templateUrl: './three-cards.component.html',
  styleUrls: ['./three-cards.component.scss']
})
export class ThreeCardsComponent implements OnInit {
  @Input() sectionBgColor;

  constructor() {}

  ngOnInit() {}
}
