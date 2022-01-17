export class BuyWhere {
  id?: number;
  sequence?: number;
  continent?: number;
  country?: number;
  title: string;
  states?: number;
  logo?: Logo;
  image?: Logo;
  phone?: string[];
  fax?: string[];
  web?: Web[];
  email?: string[];
  tag: number | string;
  location?: string; // 列表用的，組合洲國區
  address?: string;
  addressUrl?: string;
}

export class Web {
  url: string;
  urlName: string;
}

export class Logo {
  src: string;
  alt: string;
  title: string;
}
