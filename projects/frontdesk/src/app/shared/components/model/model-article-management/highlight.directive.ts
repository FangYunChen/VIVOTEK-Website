import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[vvtkHighlight]'
})
export class HighlightDirective {
  @HostListener('click', ['$event.target'])
  HighlightTarget(target) {
    const itemList = Array.from(
      document.querySelectorAll('.list-layer-2nd li > a')
    );
    itemList.forEach(ele => {
      ele.classList.remove('anchor-highlight');
    });
    target.classList.add('anchor-highlight');
  }
  constructor() {}
}
