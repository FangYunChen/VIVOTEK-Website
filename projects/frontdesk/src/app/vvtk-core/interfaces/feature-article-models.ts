export class Banner {
  type: string;
  imageName: string;
  imageAlt: string;
  imageUrl: string;
  hideContent?: boolean;
}

export class Banners {
  PC: Banner;
  Tablet: Banner;
  Mobile: Banner;
}
