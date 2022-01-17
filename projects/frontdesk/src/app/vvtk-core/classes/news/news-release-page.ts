import { NewsPage } from './news-page';
import { Tag } from './tag';
import { CardsItemsNewsReleases } from '../cards/cards-items-news-releases';

export class NewsReleasePage extends NewsPage {
  publishAt: Date;
  tags: Tag[];
  related: CardsItemsNewsReleases[];
}
