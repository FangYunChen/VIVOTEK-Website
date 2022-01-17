import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[vvtkGoTop]'
})
export class GoTopDirective {
  @HostListener('click') onClick() {
    document.body.scrollTop = 0;
  }
}
