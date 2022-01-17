import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import * as Clipboard from 'clipboard';

@Directive({
  selector: '[vvtkClipboard]'
})
export class ClipboardDirective implements OnInit, OnDestroy {
  clipboard: Clipboard;

  @Input() vvtkClipboard: ElementRef;

  @Output() clipboardSuccess: EventEmitter<any> = new EventEmitter();

  @Output() clipboardError: EventEmitter<any> = new EventEmitter();

  constructor(private eltRef: ElementRef) {}

  ngOnInit() {
    this.clipboard = new Clipboard(this.eltRef.nativeElement, {
      target: () => {
        return this.vvtkClipboard.nativeElement;
      }
    });

    this.clipboard.on('success', e => {
      this.clipboardSuccess.emit();
    });

    this.clipboard.on('error', e => {
      this.clipboardError.emit();
    });
  }

  ngOnDestroy() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }
}
