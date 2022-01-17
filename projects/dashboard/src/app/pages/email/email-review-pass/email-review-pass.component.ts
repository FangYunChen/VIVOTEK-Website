import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vvtk-email-review-pass',
    templateUrl: './email-review-pass.component.html',
    styleUrls: ['./email-review-pass.component.scss']
})
export class EmailReviewPassComponent implements OnInit {
    parameter: { key: string, value: string, preview: string }[];
    name: string;
    title: string;

    constructor() {
        this.name = 'review-pass';
        this.title = 'Review Passed';
        this.parameter = [{
            key: 'page',
            value: 'Review page',
            preview: 'Director'
        }];
    }

    ngOnInit() {
    }
}
