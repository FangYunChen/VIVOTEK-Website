export interface SIAPartner {
  id: number;
  companyName: string;
  brandName: string;
  address: string;
  address_TC: string;
  telephone: string;
  fax: string;
  webSite: string;
  email: string;
  supportEmail: string;
  partnerCountry: string;
  templates?: any;
  companyProfile: string;
  cameraIntegration: string;
  reference: string;
  logoSrc: string;
  logoAlt: string;
  logoTitle: string;
  countryAreas: SIACountry[];
  partnerTypes: SIAPartnerType[];
}

export interface SIACountry {
  id: number;
  countryArea: string;
}

export interface SIAPartnerType {
  id: number;
  typeName: string;
}
