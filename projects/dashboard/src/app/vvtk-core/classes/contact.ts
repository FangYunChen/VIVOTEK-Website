import { Country } from './continent';

export class Contact {
    id?: number;
    status: number;
    createdAt?: string;
    updatedAt?: string;
    subject?: ContactSubject;
    firstName?: string;
    lastName?: string;
    email?: string;
    company?: string;
    phone?: string;
    country?: Country;
    comment?: string;
    handler?: Handler[];
    handledAt?: string;
    note: string;
    updatedUser?: Handler;
}

export class ContactSubject {
    name?: string;
    id?: number;
    subject?: string;
    handler?: Handler[];
    displayOrder?: number;
}

export class Handler {
    id: string;
    name?: string;
    email?: string;
}
