import { Component, OnInit } from '@angular/core';
import { GeneralDownloadOption } from '@frontdesk/core/interfaces/download-center';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-marketing-banner',
  templateUrl: './marketing-banner.component.html',
  styleUrls: ['./marketing-banner.component.scss']
})
export class MarketingBannerComponent implements OnInit {

  option: GeneralDownloadOption = {
    title: 'Banner',
    filters: ['Title', 'Model Name'],
    documentTypeForData: ['Sales & Marketing', 'Banner'],
    documentTypeForProperty: ['Sales & Marketing', 'Banner']
  };

  constructor(private route: Router) { }

  ngOnInit() {
    this.route.navigateByUrl('/404?q=Marketing%20Banner');
  }
}
