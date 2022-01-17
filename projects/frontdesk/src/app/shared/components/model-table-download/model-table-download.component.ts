import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { DownloadCenterProperty } from '@frontdesk/core/interfaces/download-center';
import { filter, first, tap, takeUntil, skip } from 'rxjs/operators';
import { Subject } from 'rxjs';

export interface ModelTableDownloadData {
  title: string;
  dataSource: any[];
  dynamicColumns: DownloadCenterProperty[];
}

@Component({
  selector: 'vvtk-model-table-download',
  templateUrl: './model-table-download.component.html',
  styleUrls: ['./model-table-download.component.scss']
})
export class ModelTableDownloadComponent implements OnInit, OnDestroy {

  @Input() data: ModelTableDownloadData;
  @Output() selectedLangChange = new EventEmitter<string>();
  selectedLang$ = new Subject<string>();
  destroy$ = new Subject();

  constructor() { }

  ngOnInit() {
    this.selectedLang$.pipe(
      skip(1),
      tap(lang => this.selectedLangChange.emit(lang)),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }

}
