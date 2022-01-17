import { DesignToolCodecInfo } from './design-tool-codec-info';

export interface DesignToolRecordingCodecInfo extends DesignToolCodecInfo {
  recordingDays?: string;
  recordingHours?: string;
  eventPercentage?: string;
  storageSize?: number;
}
