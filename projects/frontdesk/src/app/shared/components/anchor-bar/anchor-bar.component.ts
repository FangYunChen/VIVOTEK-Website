import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, NgZone, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { timer, animationFrameScheduler } from 'rxjs';

export interface AnchorBarItem {
  name: string;
  anchor?: string;
}

@Component({
  selector: 'vvtk-anchor-bar',
  templateUrl: './anchor-bar.component.html',
  styleUrls: ['./anchor-bar.component.scss']
})
export class AnchorBarComponent implements OnInit, AfterViewInit {

  @Input() data: AnchorBarItem[];

  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  @ViewChild('inkBar') inkBar: ElementRef;

  routerUrl;
  selectedItem: AnchorBarItem;

  @HostListener('window:resize')
  onresize() {
    this.updateInkBar();
  }

  constructor(
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.routerUrl = this.router.url.split('#')[0];
    const fragment = this.router.url.split('#')[1];
    this.selectedItem = this.data && this.data.find(x => x.anchor === fragment);
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      timer(0, animationFrameScheduler).subscribe(() => this.updateInkBar());
      const observer = new MutationObserver(mutations => {
        if (mutations.some(mutation => mutation.type === 'attributes' && mutation.attributeName === 'class')) {
          this.updateInkBar();
        }
      });
      observer.observe(this.scrollContainer.nativeElement, { attributes: true, attributeFilter: ['class'], subtree: true });
    });
  }

  selectItem(item: AnchorBarItem, scrollContainer: HTMLElement, itemEle: HTMLElement) {
    this.selectedItem = item;
    $(scrollContainer).animate({
      scrollLeft: itemEle.offsetLeft + (itemEle.offsetWidth / 2) - (scrollContainer.offsetWidth / 2)
    }, 250, 'swing');
  }

  isTabOverflow(element: HTMLElement) {
    return element.offsetWidth !== element.scrollWidth;
  }

  scrollLeft(element: HTMLElement) {
    const children = element.querySelectorAll('.anchor-bar__item-outer');
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
    const children = element.querySelectorAll('.anchor-bar__item-outer');
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      if (child.offsetLeft >= element.scrollLeft) {
        const nextChild = children[(i + 1) < children.length ? (i + 1) : i] as HTMLElement;
        $(element).animate({ scrollLeft: nextChild.offsetLeft }, 250, 'swing');
        return;
      }
    }
  }

  private updateInkBar() {
    const activeEle: HTMLElement = this.scrollContainer.nativeElement.querySelector('.anchor-bar__item.active');
    this.inkBar.nativeElement.style.width = activeEle ? `${activeEle.clientWidth}px` : '';
    this.inkBar.nativeElement.style.left = activeEle ? `${activeEle.offsetLeft}px` : '';
  }

}
