import { Component, OnInit, Input } from '@angular/core';
import { Sheet } from '../../../vvtk-core/classes/table';

@Component({
    selector: 'vvtk-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    @Input() sheet: Sheet;
    constructor() { }

    ngOnInit() {
    }

    get tableWidth(): number {
        let width = 0;
        this.sheet.colsWidth.forEach(w => {
            width += w * 8 + 4;
        });
        return width;
    }
}
