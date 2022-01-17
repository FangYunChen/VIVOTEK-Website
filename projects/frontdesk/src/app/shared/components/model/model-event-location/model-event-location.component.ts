import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'vvtk-model-event-location',
  templateUrl: './model-event-location.component.html',
  styleUrls: ['./model-event-location.component.scss']
})
export class ModelEventLocationComponent implements OnInit {
  @Input()
  template;
  mapMask = false;
  mapUrl;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  mapOpen(url) {
    const mapTemp =
      'https://maps.google.com.tw/maps?f=q&hl=&geocode=&q=' +
      url +
      '&z=16&output=embed&t=';
    this.mapMask = true;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mapTemp);
  }

  mapPopup($event) {
    this.mapMask = $event;
  }
}
