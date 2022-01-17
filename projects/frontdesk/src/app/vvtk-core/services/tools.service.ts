import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { MatDialog, MatSnackBar } from '@angular/material';
import { saveAs } from 'file-saver/FileSaver';
import * as XLSX from 'xlsx';
import { AuthService } from './auth.service';
import { CommonTreeNode } from '../interfaces/common-model';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  /**
   * Alert
   * @param message
   * @param duration
   */
  showSnackBar(message: string, duration: number = 20000) {
    this.snackBar.open(message, 'Close', {
      duration: duration
    });
  }

  /**
   * 防止 scroll 亂跳用
   * @param ms
   */
  lockScrollTop(ms: number = 1) {
    const top = $('.main-container').scrollTop();
    setTimeout(() => {
      $('.main-container').scrollTop(top);
    }, 1);
  }

  apiError(resp: Response) {
    if (resp.status === 401) {
      this.authService.logout(); // api 回覆 User 沒有登入
    } else if (resp.status === 403) {
      // api 回覆 User 沒有權限
    }

    this.apiErrorMessage(resp.json());
  }

  apiErrorMessage(body) {
    if (body.message) {
      this.showSnackBar(`API error: ${body.message}`);
    } else {
      this.showSnackBar(`${body.error}:${body.error_description}`);
    }
  }

  /**
   * 下載excel
   *
   * @param {{ sheetName: string, dataArray: string[][] }[]} dataLists {sheet名字+資料}[]
   * @param {string} [fileName='file']
   * @memberof ToolsService
   */
  downloadExcel(
    dataLists: { sheetName: string; dataArray: string[][] }[],
    fileName: string = 'file'
  ) {
    // generate workbook
    const wb = XLSX.utils.book_new();
    dataLists.forEach(dataList => {
      // generate and add the worksheet
      const ws = XLSX.utils.aoa_to_sheet(dataList.dataArray);
      XLSX.utils.book_append_sheet(wb, ws, dataList.sheetName);
    });

    /* save to file */
    const wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'binary' };
    const wbout = XLSX.write(wb, wopts);
    saveAs(new Blob([this.s2ab(wbout)]), `${fileName}.xlsx`);
  }

  /**
   * String to ArrayBuffer
   *
   * @private
   * @param {string} s
   * @returns {ArrayBuffer}
   * @memberof ToolsService
   */
  private s2ab(s: string): ArrayBuffer {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      // tslint:disable-next-line:no-bitwise
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }

  copyObject(input: any): any {
    return JSON.parse(JSON.stringify(input));
  }

  mapTreeToArray<T extends CommonTreeNode>(items: T[]): T[] {
    if (items) {
      let result: T[] = [];
      items.forEach(item => {
        result.push(item);
        if (item.children && item.children.length > 0) {
          const children = this.mapTreeToArray<T>(item.children as T[]);
          result = [...result, ...children];
        }
      });
      return result;
    }
  }

}
