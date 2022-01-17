export class InsiderWebinars {
  id?: number;
  lang?: string;
  displayouder?: number;
  date?: string;
  time?: string;
  topic?: string;
  series?: number;
  seriesName?: string;
  language?: number;
  languageName?: string;
  register?: string;
  title?: string;
  image?: string;
  watch?: string;
}

export class WebinarsSeries {
  id?: number;
  seriesName?: string;
}

export class WebinarsLanguage {
  lName?: string;
  id?: number;
  languageName?: string;
}

export class WebinarsLanguageManage extends WebinarsLanguage {
  displayOrder?: number;
}

export class WebinarsSeriesManage extends WebinarsSeries {
  displayOrder?: number;
}
