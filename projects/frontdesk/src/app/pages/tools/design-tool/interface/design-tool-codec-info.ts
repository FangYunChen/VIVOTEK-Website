import { DesignToolModelSettingResolutionInfo } from './design-tool-model-setting-resolution-info';

export interface DesignToolCodecInfo {
  codec?: string;
  resolution?: string;
  fps?: string;
  quality?: string;
  smartStream?: string;
  bitRate?: number;
  resolutionList?: Array<DesignToolModelSettingResolutionInfo>;
  fpsList?: Array<string>;
  qualityList?: Array<string>;
  smartStreamList?: Array<string>;
}
