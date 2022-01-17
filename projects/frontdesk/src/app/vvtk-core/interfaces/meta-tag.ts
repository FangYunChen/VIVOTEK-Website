import { MetaTagAttr } from './meta-tag-attr';

export interface MetaTag {
  tagName: string;
  attr: MetaTagAttr[];
}
