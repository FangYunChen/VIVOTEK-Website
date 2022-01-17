import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vvtk-nvr-footer',
  templateUrl: './nvr-footer.component.html',
  styleUrls: ['./nvr-footer.component.scss']
})
export class NvrFooterComponent implements OnInit {
  @Input() nvrRecommendations: Array<string>;

  constructor() { }

  ngOnInit() {
  }

}
