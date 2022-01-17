export class StakeholderFAQ {
    id?: number;
    question?: string;
    answer?: string;
    categoryId?: number;
    displayOrder?: number;
}

export class StakeholderFAQCategory {
    id?: number;
    name: string;
    parentId?: number;
    sub?: StakeholderFAQCategory[];
    items?: StakeholderFAQ[];
    displayOrder?: number;
}
