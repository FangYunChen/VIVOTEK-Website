export class Continent {
    id?: number;
    name?: string;
    displayOrder?: number;
    isEnabled?: boolean;
}

export class Country {
    id?: number;
    continentId?: number;
    name?: string;
    lang?: string;
    isReal?: boolean;
    displayOrder?: number;
    isEnabled?: boolean;
    isLanguage?: boolean;
}

export class States {
    id?: number;
    countryId?: number;
    name?: string;
    displayOrder?: number;
    isEnabled?: boolean;
}
