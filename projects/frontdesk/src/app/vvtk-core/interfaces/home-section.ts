import { CardsItems } from '../classes';
import { LearnMore } from './learn-more';
export class HomeSection {
  type: string;
  learnMore: LearnMore;
  title: string;
  items?: CardsItems[];
  more: any;
}
