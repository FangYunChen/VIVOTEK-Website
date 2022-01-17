import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { VvtkService } from '@frontdesk/core/services/vvtk.service';
import { SIAPartner } from '@frontdesk/core/interfaces/sia-partner';

@Component({
  selector: 'vvtk-sia-partner-content',
  templateUrl: './sia-partner-content.component.html',
  styleUrls: ['./sia-partner-content.component.scss']
})
export class SIAPartnerContentComponent implements OnInit {

  rootPath;
  title;

  partnerContent: SIAPartner;
  partnerProfile;

  mapMask = false;
  mapUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private vvtkService: VvtkService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.vvtkService.get(
        {
          path: `api/SIAPartner/${param.id}`,
          disableLanguage: true
        },
        {
          next: resp => {
            this.partnerContent = resp.json();
            this.partnerProfile = { title: `About ${this.partnerContent.companyName}`, htmlContent: this.partnerContent.companyProfile };
            this.title = this.partnerContent.brandName;
            const routes = this.router.url.split('/');
            this.rootPath = `/${routes[1]}/${routes[2]}`;
          }
        }
      );
    });
  }

  mapOpen(url) {
    const mapTemp = 'https://maps.google.com.tw/maps?f=q&hl=&geocode=&q=' + url + '&z=16&output=embed&t=';
    this.mapMask = true;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mapTemp);
  }

  mapPopup($event) {
    this.mapMask = $event;
  }
}

