import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vvtk-email-review',
    templateUrl: './email-review.component.html',
    styleUrls: ['./email-review.component.scss']
})
export class EmailReviewComponent implements OnInit {
    parameter: { key: string, value: string, preview: string }[];
    name: string;
    title: string;

    constructor() {
        this.name = 'review';
        this.title = 'Review Notice';
        this.parameter = [{
            key: 'page',
            value: 'Review page',
            preview: 'Director'
        }, {
            key: 'link',
            value: 'Review link',
            preview: 'http://www.google.com'
        }];
    }

    ngOnInit() {
    }
}
