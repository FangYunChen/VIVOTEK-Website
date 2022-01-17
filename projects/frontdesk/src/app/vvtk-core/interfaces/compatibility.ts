export interface Product {
  name: string;
  id: number;
}
export interface Category {
  name: string;
  id: number;
}
export interface Feature {
  id: number;
  name: string;
  isEnabled: boolean;
  description: string | null;
  descriptionUrl: string | null;
  displayOrder: number;
}
export interface Model {
  model: string;
  modelWebsiteUrl: string | null;
  brand: string;
  brandWebsiteUrl: string;
  features: Feature[];
}

export interface FormData {
  ContactPerson: string;
  OtherMessage:  string;
  Email: string;
  CountryId: string;
  CompatibilitySuggestionProductModels: SuggestModel[];
}

export interface SuggestModel {
  ProductId: string;
  BrandName: string;
  ModelName: string;
}
export interface Continent {
  countries: any[];
  buyPoints: any[];
  id: number;
  name: string;
  displayOrder: number;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
export interface Country {
  language: {
    code: string;
    name: string;
    backendName: string;
    displayOrder: number;
    isEnabled: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
  states: any[];
  cases: any[];
  contactForms: any[];
  buyPoints: any[];
  careersResumes: any[];
  officeBranchs: any[];
  careerVacanciesContents: any[];
  supportCLSuggestions: any[];
  id: number;
  continentId: number;
  name: string;
  lang: string;
  isReal: boolean;
  displayOrder: number;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  code: string;
  isLanguage: boolean;
}
