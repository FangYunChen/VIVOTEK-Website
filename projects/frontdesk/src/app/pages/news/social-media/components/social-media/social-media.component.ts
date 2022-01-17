import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements OnInit {

  // TODO:確認功能OK之後要把假資料刪掉
  items = [];

  constructor(private vvtkService: VvtkService) { }

  ngOnInit() {
    this.vvtkService.get(
      {
        path: 'api/Community/List',
        disableLanguage: true
      },
      {
        next: resp => {
          this.items = resp.json();
        }
      }
    );
  }
}
