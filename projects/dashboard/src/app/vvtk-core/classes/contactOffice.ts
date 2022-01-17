import { Country } from './continent';
import { Web } from './buyWhere';
export class ContactOfficeHeadquarters {
  vivotekInc: ContactOfficeHeadquarterInfo;
  technicalCenter: ContactOfficeHeadquarterInfo;
}

interface ContactOfficeHeadquarterInfo {
  title: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  fax: string;
  map: string;
}

export class ContactOfficeBranch {
  id?: number;
  country?: Country;
  title?: string;
  name?: string;
  address?: string;
  contentText?: string;
  phones?: string[];
  faxes?: string[];
  webs?: Web[];
  emails?: string[];
  map?: string;
  displayOrder?: number;
}

export class ContactCountrySqeuence {
  id?: number;
  countryDisplayOrder?: number;
}
