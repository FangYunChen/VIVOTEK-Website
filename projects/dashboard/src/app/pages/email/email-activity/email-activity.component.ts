import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vvtk-email-activity',
    templateUrl: './email-activity.component.html',
    styleUrls: ['./email-activity.component.scss']
})
export class EmailActivityComponent implements OnInit {
    parameter: { key: string, value: string, preview: string }[];
    name: string;
    title: string;

    constructor() {
        this.name = 'activity';
        this.title = 'Event Registration';
        this.parameter = [{
            key: 'title',
            value: 'Event Title',
            preview: '活動名稱'
        }, {
            key: 'date',
            value: 'Date',
            preview: '8/8/2017'
        }, {
            key: 'location',
            value: 'Location',
            preview: '新北市中和區連城路192號6樓'
        }, {
            key: 'link',
            value: 'Event link',
            preview: 'http://www.google.com'
        }, {
            key: 'content',
            value: 'Event Content',
            preview: '本活動獎品將在8/8寄出'
        }];
    }

    ngOnInit() {
    }
}
