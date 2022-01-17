import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vvtk-email-contact',
    templateUrl: './email-contact.component.html',
    styleUrls: ['./email-contact.component.scss']
})
export class EmailContactComponent implements OnInit {
    parameter: { key: string, value: string, preview: string }[];
    name: string;
    title: string;

    constructor() {
        this.name = 'contact';
        this.title = 'Contact Us (Administrator)';
        this.parameter = [{
            key: 'title',
            value: 'Subject title',
            preview: '主旨'
        }, {
            key: 'description',
            value: 'Description',
            preview: '描述'
        }, {
            key: 'link',
            value: 'Management link',
            preview: 'http://www.google.com'
        }];
    }

    ngOnInit() {
    }
}
