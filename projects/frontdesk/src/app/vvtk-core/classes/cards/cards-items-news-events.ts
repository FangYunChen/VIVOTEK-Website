import { CardsItems } from './cards-items';

export class CardsItemsNewsEvents extends CardsItems {
  logo: {
    src: string;
    alt: string;
    title: string;
  };
  startAt: Date;
  endAt: Date;
  boothNumber: string;
  status: number;
  isTop: boolean;
  address: string;
}
