import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { saveAs } from 'file-saver/FileSaver';
import { Subscription } from 'rxjs';
import { SharedService } from 'projects/dashboard/src/app/vvtk-core/services/shared.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-export-pdf',
  templateUrl: './export-pdf.component.html',
  styleUrls: ['./export-pdf.component.scss']
})
export class ExportPDFComponent implements OnInit {

  isLoading = false;
  version = '';
  selectedLanguage$: Subscription;
  lang: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ExportPDFComponent>,
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(res => {
      this.lang = res;
    });
  }

  export(type: string) {
    this.isLoading = true;
    this.vvtkApiService.downloadFile({
      path: `api/ExportPDF/product/${this.data.id}`,
      disableLanguage: false,
      query: {type: type, version: this.version}
    }).pipe(finalize(() => {
      this.isLoading = false;
      this.dialogRef.close();
    })).subscribe( response => {
      const pdf = new Blob([response.body], {
        type: 'application/pdf'
      });
      saveAs(pdf, (this.data.productName + 'datasheet_' + this.lang).toLowerCase() + '.pdf');
    });
  }

  Cancel() {
    this.dialogRef.close();
  }
}
