import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'vvtk-home-section',
  templateUrl: './home-section.component.html',
  styleUrls: ['./home-section.component.scss']
})
export class HomeSectionComponent implements OnInit {
  @Input() sectionTitle;
  @Input() sectionBgColor;
  @Input() more;
  @Input() type;
  @Input() items;
  openPopup = false;
  dangerousVideoUrl: string;
  videoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.items.forEach(item => {
      if (item.video) {
        const youtubeImg = `//img.youtube.com/vi/${item.video}/maxresdefault.jpg`;
        if (item.image) {
          item.image.src = youtubeImg;
        }
        if (item.img) {
          item.img.src = youtubeImg;
        }
      }
    });
  }

  openVideo(id: string) {
    if (id) {
      this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + id;
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
      this.openPopup = true;
    } else {
      this.openPopup = false;
    }
  }

  windowPopup($event) {
    this.openPopup = $event;
  }
}
