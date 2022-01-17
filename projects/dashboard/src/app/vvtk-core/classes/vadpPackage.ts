export class VADPPackageCompany {
  companyId?: number;
  companyName: string;
  logoSrc: string;
  logoAlt: string;
  logoTitle: string;
  logoLink: string;
  reference: string;
  packages: VADPPackage[];
}

export class VADPPackage {
  packageId?: number;
  packageName: string;
  content: string;
  supportedModel: string;
  downloadUrl: string;
  userManualUrl: string;
  packageSrc: string;
  packageAlt: string;
  packageTitle: string;
  packageLink?: string;
}
