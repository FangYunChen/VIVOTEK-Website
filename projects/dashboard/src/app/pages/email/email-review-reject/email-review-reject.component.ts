import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vvtk-email-review-reject',
    templateUrl: './email-review-reject.component.html',
    styleUrls: ['./email-review-reject.component.scss']
})
export class EmailReviewRejectComponent implements OnInit {
    parameter: { key: string, value: string, preview: string }[];
    name: string;
    title: string;

    constructor() {
        this.name = 'review-reject';
        this.title = 'Submission Rejected';
        this.parameter = [{
            key: 'page',
            value: 'Review page',
            preview: 'Director'
        }, {
            key: 'link',
            value: 'Review link',
            preview: 'http://www.google.com'
        }, {
            key: 'note',
            value: 'Rejected reason',
            preview: 'Rejected reason.'
        }];
    }

    ngOnInit() {
    }
}
