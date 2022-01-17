import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[vvtkDynamicComponentHost]'
})
export class DynamicComponentHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
