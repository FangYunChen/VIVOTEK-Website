import { DesignToolModelSettingResolutionInfo } from './design-tool-model-setting-resolution-info';

export interface DesignToolModelSettingCodecInfo {
  CodecName: string;
  ResolutionList: Array<DesignToolModelSettingResolutionInfo>;
  SmartStreamList: Array<string>;
  QualityList: Array<string>;
}
