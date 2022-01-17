export interface CommonSelectOption {
  value: number | string | boolean | null;
  optionText: string;
  disabled?: boolean;
  parent?: CommonSelectOption;
  children?: CommonSelectOption[];
}

export interface CommonCheckSelectOption extends CommonSelectOption {
  checked: boolean;
}

export interface CommonDisplayOrder {
  id: number;
  displayOrder: number;
}

export interface CommonLazyLoadTableResponse<T> {
  filterTotal: number;
  list: T[];
}

export interface BackendSelectedItem {
  id: number;
  name: string;
}

export interface CommonTreeNode {
  children: CommonTreeNode[];
}
