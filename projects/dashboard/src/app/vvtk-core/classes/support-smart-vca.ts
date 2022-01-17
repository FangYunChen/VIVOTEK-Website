export class SmartVcaSupport {
  id?: number;
  modelName?: string;
  url?: string;
  typeId?: number;
  statusId?: number;
  licenseId?:number;
  featureIds?: number[];
  imageUrl?: string;
  imageTitle?: string;
  imageAlt?: string;
}

export class SupportType {
  id?: number;
  typeName?: string;
}

export class SupportLicense {
  id?: number;
  licenseName?: string;
}

// export class SupportStatus {
//   id?: number;
//   statusName?: string;
// }

export class SupportFeature {
  id?: number;
  featureName?: string;
}

export class SupportTypeManage extends SupportType {
  displayOrder?: number;
}

export class SupportLicenseManage extends SupportLicense {
  displayOrder?: number;
}

export class SupportPackage {
  id?: number;
  featureName?: string;
  downloadUrl?: string;
  isDisplay?: Boolean;
}

export class SupportPackageManage extends SupportPackage {
  displayOrder?: number;
}