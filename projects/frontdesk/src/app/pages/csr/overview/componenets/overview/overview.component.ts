import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  cardsItems = [
    {
      id: 1,
      video: '',
      image: {
        src: '/assets/img/home/pic01.png',
        alt: 'News & Events',
        title: 'News & Events'
      },
      title: 'News & Events',
      intro:
        // tslint:disable-next-line:max-line-length
        'VIVOTEK Launches Professional Award-winning Outdoor Bullet Network Camera IP8371E VIVOTEK Launches Professional Award-winning Outdoor Bullet Network Camera IP8371E',
      href: '/news-cases-page'
    },
    {
      id: 2,
      video: '',
      image: {
        src: '/assets/img/home/pic02.png',
        alt:
          'News & Events News & Events News & Events News & Events News & Events',
        title:
          'News & Events News & Events News & Events News & Events News & Events'
      },
      title:
        'News & Events News & Events News & Events News & Events News & Events',
      intro:
        // tslint:disable-next-line:max-line-length
        'VIVOTEK Launches Professional Award-winning Outdoor Bullet Network Camera IP8371E VIVOTEK Launches Professional Award-winning Outdoor Bullet Network Camera IP8371E',
      href: '/news-cases-page'
    },
    {
      id: 3,
      video: '',
      image: {
        src: '/assets/img/home/pic03.png',
        alt:
          'News & Events News & Events News & Events News & Events News & Events News & Events News & Events',
        title:
          'News & Events News & Events News & Events News & Events News & Events News & Events News & Events'
      },
      title:
        'News & Events News & Events News & Events News & Events News & Events News & Events News & Events',
      intro:
        // tslint:disable-next-line:max-line-length
        'VIVOTEK Launches Professional Award-winning Outdoor Bullet Network Camera IP8371E VIVOTEK Launches Professional Award-winning Outdoor Bullet Network Camera IP8371E',
      href: '/news-cases-page'
    }
  ];

  constructor(private vvtkService: VvtkService) { }

  ngOnInit() {
    this.vvtkService.getAbout('social_responsibility', resp => {
      this._Content = resp.json() ? resp.json() : this._Content;
    });
  }
}
