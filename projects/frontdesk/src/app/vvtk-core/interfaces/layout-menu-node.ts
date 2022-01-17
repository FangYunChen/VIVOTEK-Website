export class LayoutMenuNode {
  title: string;
  url?: string;
  subMenu?: LayoutMenuNode[];
  image?: string;
}


export class LanguageMenu {
  title: string;
  countries?: Countries[];
}

export class Countries {
  code: string;
  language: string;
  name: string;
}
