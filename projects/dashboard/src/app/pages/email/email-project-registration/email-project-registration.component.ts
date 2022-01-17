import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vvtk-email-project-registeration',
    templateUrl: './email-project-registration.component.html',
    styleUrls: ['./email-project-registration.component.scss']
})
export class EmailProjectRegistrationComponent implements OnInit {
    parameter: { key: string, value: string, preview: string }[];
    name: string;
    title: string;

    constructor() {
        this.name = 'project-registration';
        this.title = 'Project Registeration';
        this.parameter = [{
            key: 'date',
            value: 'Date',
            preview: '2020/03/02'
        }, {
            key: 'quotationNumber',
            value: 'VIVOTEK Quotation Number',
            preview: ''
        }, {
            key: 'discount',
            value: 'Discount',
            preview: '30'
        }, {
            key: 'approvedBy',
            value: 'Approved by',
            preview: ''
        }, {
            key: 'youName',
            value: 'Name',
            preview: 'Tim'
        }, {
            key: 'youLocation',
            value: 'Location',
            preview: ''
        }, {
            key: 'youTypeofBusiness',
            value: 'Type of Business',
            preview: ''
        }, {
            key: 'youContactName',
            value: 'Contact Name',
            preview: ''
        }, {
            key: 'youContactPhone',
            value: 'Contact Phone',
            preview: ''
        }, {
            key: 'youContactEmail',
            value: 'Contact Email',
            preview: ''
        }, {
            key: 'name1',
            value: 'Company Name',
            preview: ''
        }, {
            key: 'location1',
            value: 'Company Location',
            preview: ''
        }, {
            key: 'typeofBusiness1',
            value: 'Company Type of Business',
            preview: ''
        }, {
            key: 'name2',
            value: 'End User Name',
            preview: ''
        }, {
            key: 'location2',
            value: 'End User Location',
            preview: ''
        }, {
            key: 'typeofBusiness2',
            value: 'End User Type of Business',
            preview: ''
        }, {
            key: 'projectForecast',
            value: 'VIVOTEK Network Camera Models Requested &amp; Esitimated Order Quantity/Forecast',
            preview: ''
        }, {
            key: 'projectOpportunity',
            value: 'opportunity and current status of communication with the customer',
            preview: ''
        }, {
            key: 'softwarePartners',
            value: 'Software partners',
            preview: ''
        }, {
            key: 'probability',
            value: 'Probability of win',
            preview: ''
        }, {
            key: 'decision',
            value: 'Decision Timeframe',
            preview: ''
        }, {
            key: 'productDelivery',
            value: 'Product Delivery Timeframe',
            preview: ''
        }, {
            key: 'markupMargin',
            value: 'Markup Margin to Customer',
            preview: ''
        }, {
            key: 'quotations',
            value: 'Describe models',
            preview: ''
        }];
    }

    ngOnInit() {
    }
}
