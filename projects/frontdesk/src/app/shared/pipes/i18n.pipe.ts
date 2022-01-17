import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '../../vvtk-core/services';

@Pipe({ name: 'i18n' })
export class I18nPipe implements PipeTransform {
  constructor(private i18nService: I18nService) {}

  transform(value: string, ...arg: string[]): string {
    return this.i18nService.getI18n(value, ...arg);
  }
}
