import { Directive, OnInit, AfterViewInit, OnDestroy, Input, ElementRef, NgZone } from '@angular/core';
import { Subject, fromEvent, animationFrameScheduler } from 'rxjs';
import { observeOn, debounceTime, map, tap } from 'rxjs/operators';

import { EventSubjectService } from '@frontdesk/core/services/event-subject.service';

@Directive({
  selector: '[vvtkFixedTop]'
})
export class FixedTopDirective implements OnInit, AfterViewInit, OnDestroy {

  @Input() vvtkFixedTop: string; // fixed class

  isFixed = false;
  private scrollContainer: HTMLElement;
  private originParentPaddingTop: number;
  private originOffsetTop: number;
  private destroy$ = new Subject();

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
    private eventSubjectService: EventSubjectService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      const FPS = 60;
      const PERIOD = 1000 / FPS;
      const THRESHOLD = 5;
      const targetElement = this.element.nativeElement;
      this.scrollContainer = document.body;

      if (!this.vvtkFixedTop) {
        // targetElement.parentElement.style.display = 'inline';
        targetElement.style.display = 'block';
        targetElement.style.position = 'sticky';
        targetElement.style.position = '-webkit-sticky';
        targetElement.style.top = '0';
        targetElement.style.zIndex = '6';
      }

      const eventHandler = fromEvent(this.scrollContainer, 'scroll', { passive: true })
        .pipe(
          observeOn(animationFrameScheduler),
          debounceTime(PERIOD)
        );

      const eventSubject = this.eventSubjectService.getEventShare('fixed-top_scroll', eventHandler);

      eventSubject
        .subscribe(event => {
          if (!this.isFixed) {
            this.originParentPaddingTop = this.getElementCSSValue(targetElement.parentElement, 'padding-top');
            this.originOffsetTop = targetElement.offsetTop;
          }
          const isOverflow = this.scrollContainer.scrollTop > this.originOffsetTop;
          if (isOverflow && !this.isFixed) {
            this.setELementToFixed();
          } else if (!isOverflow && this.isFixed) {
            this.setElementToDefault();
          }
        });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setElementToDefault() {
    if (!this.isFixed) {
      return;
    }
    this.isFixed = false;

    const targetElement: HTMLElement = this.element.nativeElement;
    if (this.vvtkFixedTop) {
      targetElement.classList.remove(this.vvtkFixedTop);
    } else {
      targetElement.parentElement.style.paddingTop = `${this.originParentPaddingTop}px`;
      targetElement.style.position = '';
      targetElement.style.top = '';
      targetElement.style.zIndex = '';
    }
  }

  private setELementToFixed() {
    if (this.isFixed) {
      return;
    }
    this.isFixed = true;

    const targetElement: HTMLElement = this.element.nativeElement;
    if (this.vvtkFixedTop) {
      targetElement.classList.add(this.vvtkFixedTop);
    } else {
      targetElement.parentElement.style.paddingTop = `${this.originParentPaddingTop + targetElement.offsetHeight}px`;
      targetElement.style.position = 'fixed';
      targetElement.style.top = '0';
      targetElement.style.zIndex = '6';
    }
  }

  private getElementCSSValue(element: any, cssProperty: string) {
    const stringVal = window.getComputedStyle(element).getPropertyValue(cssProperty);
    let numberVal = 0;
    const matcher = /\d+/;
    if (stringVal.match(matcher)) {
      numberVal = +(stringVal.match(matcher) || [])[0];
    }
    return numberVal;
  }

}
