import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

export interface LinkGalleryItem {
  linkText: string;
  linkUrl: string;
  imageUrl: string;
  imageAlt: string;
  imageTitle: string;
}

@Component({
  selector: 'vvtk-link-gallery',
  templateUrl: './link-gallery.component.html',
  styleUrls: ['./link-gallery.component.scss']
})
export class LinkGalleryComponent implements OnInit {

  @Input() data: LinkGalleryItem[];

  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  constructor() { }

  ngOnInit() { }

  isTabOverflow(element: HTMLElement) {
    return element.offsetWidth !== element.scrollWidth;
  }

  scrollLeft(element: HTMLElement) {
    const children = element.querySelectorAll('.link-gallery__item-outer');
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      if (child.offsetLeft >= element.scrollLeft) {
        const prevChild = children[i > 0 ? i - 1 : 0] as HTMLElement;
        $(element).animate({ scrollLeft: prevChild.offsetLeft }, 250, 'swing');
        return;
      }
    }
  }

  scrollRight(element: HTMLElement) {
    const children = element.querySelectorAll('.link-gallery__item-outer');
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      if (child.offsetLeft >= element.scrollLeft) {
        const nextChild = children[(i + 1) < children.length ? (i + 1) : i] as HTMLElement;
        $(element).animate({ scrollLeft: nextChild.offsetLeft }, 250, 'swing');
        return;
      }
    }
  }

}
