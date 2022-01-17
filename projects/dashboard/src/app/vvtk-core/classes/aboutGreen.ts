import { Template } from './template';
export class AboutGreenCategory {
    id?: number;
    name?: string;
    displayOrder?: number;
    pages?: AboutGreenPage[];
}

export class AboutGreenPage {
    id?: number;
    title?: string;
    categoryId?: number;
    content?: string;
    templates?: Template[];
    displayOrder?: number;
}
