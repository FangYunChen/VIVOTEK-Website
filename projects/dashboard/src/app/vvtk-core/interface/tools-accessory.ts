export interface ToolsAccessoryList {
  list: ToolsAccessory[];
  filterTotal: number;
}

export interface ToolsAccessory {
  accessoryId?: number;
  modelName?: string;
  subtitle?: string;
  mainImg?: string;
  appendix?: string;
  publishedAt?: Date;
  combinationIndex?: string;
  combinationIndexModels?: CombinationIndex[];
  toolsAccessoryCombination?: ToolsAccessoryCombination[];
}

export interface CombinationIndex {
  name?: string;
  img?: string;
  hideContent?: boolean;
}

export interface ToolsAccessoryCombination {
  combinationId?: number;
  accessoryId?: number;
  combinationName?: string;
  centerImg?: string;
  displayOrder?: number;
  combinationDetails?: CombinationDetail[];
}

export interface CombinationDetail {
  detailName?: string;
  img?: string;
  combinationDetailItems?: CombinationDetailItem[];
  hideContent?: Boolean;
}

export interface CombinationDetailItem {
  itemName?: string;
  description?: string;
}

