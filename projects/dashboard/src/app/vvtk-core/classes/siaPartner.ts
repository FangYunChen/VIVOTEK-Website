import { Template } from './template';

/**
 * For list.
 */
export class SIAPartner {
  id?: number;
  companyName?: string;
  partnerCountry?: string;
  partnerCategoriesText?: string;
  partnerTypesText?: string[];
  partnerCategories?: PartnerCategory[];
  partnerTypes?: PartnerType[];
}

export class SIAPartnerContent extends SIAPartner {
  brandName?: string;
  address?: string;
  address_TC?: string;
  telephone?: string;
  fax?: string;
  webSite?: string;
  email?: string;
  supportEmail?: string;
  templates?: Template[];
  companyProfile?: string;
  cameraIntegration?: string;
  reference?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoTitle?: string;
  countryAreaIDs?: number[];
  categoryIDs?: number[];
  typeIDs?: number[];
}

export class PartnerCountry {
  id?: number;
  countryArea?: string;
}

export class PartnerCategory {
  id?: number;
  partnerCategory?: string;
}

export class PartnerType {
  id?: number;
  typeName?: string;
}

