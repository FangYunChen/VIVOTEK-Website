export class Company {
  companyId: number;
  companyName?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoTitle?: string;
  logoLink?: string;
  reference?: string;
  packages?: Package[];
}

export class Package {
  packageId: number;
  packageName?: string;
  content?: string;
  supportedModel?: string;
  downloadUrl?: string;
  userManualUrl?: string;
  packageSrc?: string;
  packageAlt?: string;
  packageTitle?: string;
  packageLink?: string;
}
