import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vvtk-email-template',
    templateUrl: './email-template.component.html',
    styleUrls: ['./email-template.component.scss']
})
export class EmailTemplateComponent implements OnInit {
    parameter: { key: string, value: string, preview: string }[];
    name: string;
    title: string;

    constructor() {
        this.name = 'template';
        this.title = 'Main Template';
        this.parameter = [{
            key: 'content',
            value: 'Content',
            preview: 'preview content: <br>Lorem Ipsum is simply dummy text <br>of the printing and <br>typesetting industry.'
        }];
    }

    ngOnInit() {
    }
}
