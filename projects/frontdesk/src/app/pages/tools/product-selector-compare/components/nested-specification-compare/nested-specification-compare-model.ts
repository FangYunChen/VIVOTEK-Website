export interface NestedSpecificationCompareData {
  name: string;
  isAttribute?: boolean;
  products: { id: number, content: string }[];
  children?: NestedSpecificationCompareData[];
}
