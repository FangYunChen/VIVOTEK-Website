import { Template } from './template';
export class AboutCSRCategory {
    id?: number;
    name?: string;
    displayOrder?: number;
    pages?: AboutCSRPage[];
}

export class AboutCSRPage {
    id?: number;
    title?: string;
    categoryId?: number;
    content?: string;
    templates?: Template[];
    displayOrder?: number;
}
