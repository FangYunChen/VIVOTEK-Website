import { Template } from './template';
export class InvestorsServiceCategory {
    id?: number;
    name?: string;
    displayOrder?: number;
    pages?: InvestorsServicePage[];
}

export class InvestorsServicePage {
    id?: number;
    title?: string;
    categoryId?: number;
    content?: string;
    templates?: Template[];
    displayOrder?: number;
}
