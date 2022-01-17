import { Injectable } from '@angular/core';
import { I18nService } from '@frontdesk/core/services';
import { MatPaginatorIntl } from '@angular/material';
import { I18nPipe } from '../pipes/i18n.pipe';

@Injectable({
  providedIn: 'root'
})
export class MatPaginatorIntlService {
  i18n = new I18nPipe(this.i18nService);
  constructor(private i18nService: I18nService) { }

  getPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = this.i18n.transform('Items per page:');
    return paginatorIntl;
  }
}
