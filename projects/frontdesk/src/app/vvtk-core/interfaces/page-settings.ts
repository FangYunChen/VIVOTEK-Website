import { PageSettingI18n } from './page-settings-i18n';

export interface PageSettings {
  pageSettingI18n: PageSettingI18n[];
  id: number;
  referPath: string;
  path: string;
  imgPcSrc: string;
  imgTabletSrc: string;
  imgMobileSrc: string;
}

export interface PageSetting {
  referPath: string;
  path: string;
  title: string;
  meta: string;
  jsonLd: string;
}
