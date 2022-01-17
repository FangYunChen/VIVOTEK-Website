export class Page {
    path: string;
    referPathList: string[];
    settingList?: PageSetting[];
}

export class PageSetting {
    id: number;
    referPath: string;
    path: string;
    show?: PageSettingShow;
    imgPcSrc?: string;
    imgTabletSrc?: string;
    imgMobileSrc?: string;
    i18n?: PageSettingI18n[];
    pageSettingI18n?: PageSettingI18n[];
}
interface PageSettingShow {
    referPath: string;
    customPath: string;
    title: string;
}
export class PageSettingI18n {
    lang?: string;
    customPath: string;
    title: string;
    meta: string;
    jsonLd: string;
    imgPcAlt: string;
    imgPcTitle: string;
    imgTabletAlt: string;
    imgTabletTitle: string;
    imgMobileAlt: string;
    imgMobileTitle: string;
}

export class PageSettingMeta {
    tagName: string;
    attr: {
        name: string;
        value: string;
    }[];
}
