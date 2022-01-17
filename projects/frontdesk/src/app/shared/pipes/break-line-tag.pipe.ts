import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'breakLineTag'
})
export class BreakLineTagPipe implements PipeTransform {
  // to br tag
  /**Transform \r\n or \n to html tag <br>*/
  transform(value: string, args?: any): any {
    return value.split(/\r?\n/).join('<br/>');
  }

}
