export class Sheet {
    title: string;
    colsWidth: number[];
    rowsHeight: number[];
    table: Table[][];
}

export class Table {
    value: string;
    isbold: boolean;
    valign: string;
    align?: null | string | string;
    colspan: number;
    rowspan: number;
}
