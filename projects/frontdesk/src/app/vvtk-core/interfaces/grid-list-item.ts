export interface GridListItem {
  title: string;
  subtitle?: string;
  src: string;
  alt?: string;
  url?: string;
  labels?: GridListItemLabel[];
}

export interface GridListItemLabel {
  text: string;
  color?: string;
  bgColor?: string;
}
