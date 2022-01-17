import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vvtk-email-subscription',
    templateUrl: './email-subscription.component.html',
    styleUrls: ['./email-subscription.component.scss']
})
export class EmailSubscriptionComponent implements OnInit {
    parameter: { key: string, value: string, preview: string }[];
    name: string;
    title: string;

    constructor() {
        this.name = 'subscription';
        this.title = 'Subscription Verification';
        this.parameter = [{
            key: 'email',
            value: 'Email',
            preview: 'demo@vivotek.com'
        }, {
            key: 'link',
            value: 'Verification link',
            preview: 'http://www.google.com'
        }];
    }

    ngOnInit() {
    }
}
