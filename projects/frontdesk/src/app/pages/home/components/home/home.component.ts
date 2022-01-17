import { Component, OnInit } from '@angular/core';
import { HomeSection } from '@frontdesk/core/interfaces';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sectionTitle: string;
  sectionBgColor = false;

  sectionList: HomeSection[] = [];

  constructor(private vvtkService: VvtkService) {}

  ngOnInit() {
    this.vvtkService.get(
      {
        path: 'api/Home/Section',
        disableLanguage: false
      },
      {
        next: resp => {
          if (resp.ok) {
            this.sectionList = resp.json();
          }
        }
      }
    );
  }
}
