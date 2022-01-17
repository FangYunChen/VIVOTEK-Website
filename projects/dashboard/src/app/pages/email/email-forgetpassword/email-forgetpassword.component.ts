import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vvtk-email-forgetpassword',
    templateUrl: './email-forgetpassword.component.html',
    styleUrls: ['./email-forgetpassword.component.scss']
})
export class EmailForgetpasswordComponent implements OnInit {
    parameter: { key: string, value: string, preview: string }[];
    name: string;
    title: string;

    constructor() {
        this.name = 'forgetpassword';
        this.title = 'Forget Password';
        this.parameter = [{
            key: 'name',
            value: 'User name',
            preview: 'Lorem Ipsum'
        }, {
            key: 'link',
            value: 'Forget link',
            preview: 'http://www.google.com'
        }];
    }

    ngOnInit() {
    }
}
