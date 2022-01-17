import { DesignToolModelSettingCodecInfo } from './design-tool-model-setting-codec-info';

export interface DesignToolModelSettingInfo {
  ModelName: string;
  RecordingCodecList: Array<DesignToolModelSettingCodecInfo>;
  LiveviewCodecList: Array<DesignToolModelSettingCodecInfo>;
}
