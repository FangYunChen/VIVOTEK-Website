import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnChanges, OnInit, PLATFORM_ID } from '@angular/core';

declare var $: any;

@Component({
  selector: 'vvtk-model-table',
  templateUrl: './model-table.component.html',
  styleUrls: ['./model-table.component.scss']
})
export class ModelTableComponent implements OnInit, OnChanges {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);
  tableHtml;
  @Input() tableName = '';
  @Input() table = [];
  @Input()
  sheet = {
    title: '',
    colsWidth: [], // 欄寬
    rowsHeight: [], // 列高
    // dataRowColor的用意是判斷此資料行的顏色，這個是自己加上去的後端不會送這個欄位進來 (欄位合併時，在運算上會有跨行合併導致顏色錯誤的問題)
    table: []
  };
  totalColsWidth = 0;
  constructor(@Inject(PLATFORM_ID) private platform_id) {}
  ngOnInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        $('.CustomScrollbar').mCustomScrollbar({
          scrollbarPosition: 'outside',
          axis: 'x',
          advanced: {
            autoExpandHorizontalScroll: true
          }
        });
      }, 1);
    }
  }

  ngOnChanges() {
    let rowSpan = 1;
    let NextDataRowColor = true;
    if (this.sheet.table && this.sheet.table.length > 0) {
      this.totalColsWidth = 0;
      this.sheet.colsWidth.forEach(col => {
        this.totalColsWidth += col * 11 + 2;
      });
      this.sheet.table.forEach(col => {
        rowSpan -= 1;
        rowSpan = Math.max(col[0].rowspan, rowSpan);
        for (let i = 0; i < col.length; i++) {
          col[i].NextDataRowColor = NextDataRowColor;
        }
        col[col.length - 1].NextDataRowColor = col[col.length - 1].rowspan > rowSpan ? !NextDataRowColor : NextDataRowColor;
        if (rowSpan === 1) {
          NextDataRowColor = !NextDataRowColor;
        }
      });
    }
  }

  tran(value : string){ 
// 　　if (parseFloat(value).toString() != 'NaN') { 
//       return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// 　　} 
　　if (parseFloat(value).toString() != 'NaN') {
        var parts = value.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
　　} 
    return value;
  }
}
