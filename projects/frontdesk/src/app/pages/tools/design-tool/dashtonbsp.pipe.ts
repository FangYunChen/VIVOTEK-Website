import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashtonbsp'
})
export class dashtonbsp implements PipeTransform {
  transform(value: any): string {
    if(value)
      return value.replace('_',' ');
    else
      return value;
  }
}
