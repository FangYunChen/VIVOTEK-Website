import { DesignToolCodecInfo } from './design-tool-codec-info';
import { DesignToolRecordingCodecInfo } from './design-tool-recording-codec-info';

export class DesignToolProductInfo {
  typeName?: string;
  modelName?: string;
  qty?: number;
  lensqty?: number;
  q?: number;
  scenario?: string;
  continuousRecordingBandwidth?: number;
  eventRecordingBandwidth?: number;
  hybridRecordingBandwidth?: number;
  liveviewBandwidth?: number;
  storage?: number;
  isRecording?: boolean;
  isLiveview?: boolean;
  recordingStreamType?: number;
  continuousRecordingCodecInfo?: DesignToolRecordingCodecInfo;
  eventRecordingCodecInfo?: DesignToolRecordingCodecInfo;
  hybridRecordingCodecInfo?: DesignToolRecordingCodecInfo;
  liveviewCodecInfo?: DesignToolCodecInfo;

  get recordingBandwidth() {
    return (
      +this.continuousRecordingBandwidth +
      +this.eventRecordingBandwidth +
      +this.hybridRecordingBandwidth
    );
  }
}
