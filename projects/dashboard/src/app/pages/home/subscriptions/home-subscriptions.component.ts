import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver/FileSaver';
import { environment } from '../../../../environments/environment';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-home-subscriptions',
  templateUrl: './home-subscriptions.component.html',
  styleUrls: ['./home-subscriptions.component.scss']
})
export class HomeSubscriptionsComponent implements OnInit {
  isLoading = false;

  name: string;
  title: string;

  downloadLink = `${environment.apiUrl}/api/E-News/Subscriptions/Export`;

  constructor(private vvtkService: VvtkService) {}

  ngOnInit() {}

  download() {
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `api/E-News/Subscriptions/Export`,
        disableLanguage: true
      },
      {
        next: resp => {
          // 參考 Implementing file save functionality with Angular 4
          // https://shekhargulati.com/2017/07/16/implementing-file-save-functionality-with-angular-4/
          const csv = new Blob([resp.text()], {
            type: 'application/octet-stream'
          });
          saveAs(csv, 'Subscriptions.csv'); // resp.headers.get('Content-Disposition') 取不到值只好隨便給個檔名
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }
}
