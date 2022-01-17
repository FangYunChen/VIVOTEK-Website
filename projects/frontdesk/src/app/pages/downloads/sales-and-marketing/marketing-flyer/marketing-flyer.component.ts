import { Component, OnInit } from '@angular/core';
import { GeneralDownloadOption } from '@frontdesk/core/interfaces/download-center';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-marketing-flyer',
  templateUrl: './marketing-flyer.component.html',
  styleUrls: ['./marketing-flyer.component.scss']
})
export class MarketingFlyerComponent implements OnInit {

  option: GeneralDownloadOption = {
    title: 'Flyer',
    filters: ['Title', 'Model Name'],
    documentTypeForData: ['Sales & Marketing', 'Marketing Flyer'],
    documentTypeForProperty: ['Sales & Marketing', 'Marketing Flyer']
  };

  constructor(private route: Router) { }

  ngOnInit() {
    this.route.navigateByUrl('/404?q=Marketing%20Flyer');
  }
}
