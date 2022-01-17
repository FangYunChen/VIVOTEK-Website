import { Component, OnInit } from '@angular/core';
import { GeneralDownloadOption } from '@frontdesk/core/interfaces/download-center';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-marketing-posters',
  templateUrl: './marketing-posters.component.html',
  styleUrls: ['./marketing-posters.component.scss']
})
export class MarketingPostersComponent implements OnInit {

  option: GeneralDownloadOption = {
    title: 'Posters',
    filters: ['Title', 'Model Name'],
    documentTypeForData: ['Sales & Marketing', 'Posters'],
    documentTypeForProperty: ['Sales & Marketing', 'Posters']
  };

  constructor(private route: Router) { }

  ngOnInit() {
    this.route.navigateByUrl('/404?q=Marketing%20Posters');
   }
}
