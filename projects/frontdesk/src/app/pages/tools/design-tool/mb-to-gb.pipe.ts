import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mbToGb'
})
export class MbToGbPipe implements PipeTransform {
  transform(value: number): number {
    return value / 1024;
  }
}
