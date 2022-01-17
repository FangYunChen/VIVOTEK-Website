import { Pipe, PipeTransform } from '@angular/core';
import { PageMetaService } from '../../vvtk-core/services';

@Pipe({ name: 'customPath' })
export class CustomPathPipe implements PipeTransform {
  constructor(private pageMetaService: PageMetaService) {}

  transform(value: string): string {
    return this.pageMetaService.getCustomPath(value);
  }
}
