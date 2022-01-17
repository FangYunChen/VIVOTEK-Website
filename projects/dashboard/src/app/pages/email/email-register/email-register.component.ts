import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vvtk-email-register',
    templateUrl: './email-register.component.html',
    styleUrls: ['./email-register.component.scss']
})
export class EmailRegisterComponent implements OnInit {
    parameter: { key: string, value: string, preview: string }[];
    name: string;
    title: string;

    constructor() {
        this.name = 'register';
        this.title = 'Membership Verification';
        this.parameter = [{
            key: 'name',
            value: 'User name',
            preview: 'Lorem Ipsum'
        }, {
            key: 'link',
            value: 'Verification link',
            preview: 'http://www.google.com'
        }];
    }

    ngOnInit() {
    }
}
