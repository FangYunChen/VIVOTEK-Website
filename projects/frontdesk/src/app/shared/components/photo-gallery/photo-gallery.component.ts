import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vvtk-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {

  @Input()
  set images(value: string[]) {
    this._images = value;
    this.currentImg = this.images && this.images[0];
  }
  get images() {
    return this._images;
  }

  currentImg: string;

  private _images: string[];

  constructor() { }

  ngOnInit() {
  }

  selectImg(img: string, scrollContainer: HTMLElement, itemEle: HTMLElement) {
    this.currentImg = img;
    $(scrollContainer).animate({
      scrollLeft: itemEle.offsetLeft + (itemEle.offsetWidth / 2) - (scrollContainer.offsetWidth / 2)
    }, 250, 'swing');
  }

  scrollLeft(element: HTMLElement) {
    const children = element.querySelectorAll('.photo-gallery__thumbnail');
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
    const children = element.querySelectorAll('.photo-gallery__thumbnail');
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
