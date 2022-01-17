export interface DynamicTableColumn {
  id: string | null;
  name: string;
  type: string;
}

export interface DynamicTableRow {
  id: number;
  propertyContents: DynamicTablePropertyContent[];
}

export interface DynamicTablePropertyContent {
  id: number;
  content: string;
}
