import { Component, OnInit } from '@angular/core';
import { GeneralDownloadOption } from '@frontdesk/core/interfaces/download-center';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-marketing-print-ad',
  templateUrl: './marketing-print-ad.component.html',
  styleUrls: ['./marketing-print-ad.component.scss']
})
export class MarketingPrintAdComponent implements OnInit {

  option: GeneralDownloadOption = {
    title: 'Print Ad.',
    filters: ['Title', 'Model Name'],
    documentTypeForData: ['Sales & Marketing', 'Print Ad.'],
    documentTypeForProperty: ['Sales & Marketing', 'Print Ad.']
  };

  constructor(private route: Router) { }

  ngOnInit() {
    this.route.navigateByUrl('/404?q=Marketing%20Print');
  }
}
