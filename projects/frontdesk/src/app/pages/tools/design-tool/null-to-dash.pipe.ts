import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullToDash'
})
export class NullToDashPipe implements PipeTransform {
  transform(value: any, suffix?: string): string {
    if (!value) {
      return '-';
    }
    if (suffix) {
      return value + suffix;
    }
    return value;
  }
}
