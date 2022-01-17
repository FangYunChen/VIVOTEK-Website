import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { PropertyType } from '../../../vvtk-core/constants/dynamic-table-constant';
import { DynamicTableColumn, DynamicTableRow } from '@frontdesk/core/interfaces/dynamic-table-models';
import { convertToYoutubeEmbedUrl } from '@frontdesk/core/utils/youtube-url-convert-utils';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver/FileSaver';
import { finalize } from 'rxjs/operators';
import { VvtkService } from '@frontdesk/core/services/vvtk.service';
import { VvtkApiService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit, OnChanges {

  @Input()
  dataSource: any[];

  @Input()
  dynamicColumns: DynamicTableColumn[];

  DynamicTableColumns: DynamicTableColumn[];
  columnList: string[];
  propertyType = PropertyType;
  id: Array<string> = [];

  openPopup = false;
  videoUrl = '';
  isLoading = false;

  constructor(private http: HttpClient,
    private vvtkService: VvtkService,
    private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // get dynamic cloumn from parent
    if (changes.dynamicColumns && changes.dynamicColumns.previousValue !== changes.dynamicColumns.currentValue) {
      this.DynamicTableColumns = changes.dynamicColumns.currentValue;
      this.columnList = this.dynamicColumns.map(x => x.name);
    }
  }

  getRowColumnContent(columnId: number, row: DynamicTableRow) {
    return row.propertyContents.find(x => x.id === columnId);
  }

  downloadFile(url: string) {
    this.isLoading = true;
    this.http.get(url, {
      observe: 'response',
      responseType: 'blob',
      withCredentials: true
    }).pipe(finalize(() => {
      this.isLoading = false;
    })).subscribe(resp => {
      const fileName = resp.headers.get('Content-Disposition').split('filename=')[1].trim();
      saveAs(resp.body, fileName);
    });
  }

  dowloadURLFile(url: string) {
    window.open(url, '_blank');
  }

  openVideo(videoUrl: string) {
    this.videoUrl = convertToYoutubeEmbedUrl(videoUrl);
    this.openPopup = true;
  }

  windowPopup(isPopup: boolean) {
    this.openPopup = isPopup;
  }

  selectedIdChange(id: string, input: HTMLInputElement) {
    if (input.checked && this.id.indexOf(id) === -1) {
      this.id.push(id);
    } else {
      const index: number = this.id.indexOf(id);
      if (index >= 0) {
        this.id.splice(index, 1);
      }
    }
  }

  mulDownloadFile() {
    this.vvtkApiService.get<string>({
      path: `api/DownloadCenter/EncryptCompress/${this.id.toString()}`,
      disableLanguage: true
    }).subscribe(
      resp => {
        const url = this.vvtkService.toUrl({
          path: `api/DownloadCenter/Product/Mul/`,
          query: `p=${resp}`,
          language: 'queryString'
        });
        this.dowloadURLFile(url);
      });
  }
}
