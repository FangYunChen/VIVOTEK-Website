import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[vvtkGoBack]'
})
export class GoBackDirective {
  @HostBinding('disabled')
  get disabled() {
    return history.length <= 1;
  }
  @HostListener('click') onClick() {
    history.back();
  }
}
