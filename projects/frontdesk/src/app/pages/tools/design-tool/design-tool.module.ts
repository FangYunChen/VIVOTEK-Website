import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignToolRoutingModule } from './design-tool-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { CalculationSettingComponent } from './components/calculation-setting/calculation-setting.component';
import { StorageAndBandwidthComponent } from './components/storage-and-bandwidth/storage-and-bandwidth.component';
import { PcRecommendationComponent } from './components/pc-recommendation/pc-recommendation.component';
import { NvrComponent } from './components/nvr/nvr.component';
import { StreamingItemComponent } from './components/streaming-item/streaming-item.component';
import { RecordingStreamingItemComponent } from './components/recording-streaming-item/recording-streaming-item.component';
import { LiveviewStreamingItemComponent } from './components/liveview-streaming-item/liveview-streaming-item.component';
import { CalculationSettingHeaderComponent } from './components/calculation-setting-header/calculation-setting-header.component';
import { CalculationSettingContentComponent } from './components/calculation-setting-content/calculation-setting-content.component';
import { ProjectComponent } from './components/project/project.component';
import { VmsPerDiskCapacityComponent } from './components/vms-per-disk-capacity/vms-per-disk-capacity.component';
import { VmsTotalStorageCapacityComponent } from './components/vms-total-storage-capacity/vms-total-storage-capacity.component';
import { PcServerComponent } from './components/pc-server/pc-server.component';
import { PcClientComponent } from './components/pc-client/pc-client.component';
import { NvrBasicComponent } from './components/nvr-basic/nvr-basic.component';
import { NvrAdvancedComponent } from './components/nvr-advanced/nvr-advanced.component';
import { NvrFooterComponent } from './components/nvr-footer/nvr-footer.component';
import { NvrModelComponent } from './components/nvr-model/nvr-model.component';
import { NvrAdvancedModelComponent } from './components/nvr-advanced-model/nvr-advanced-model.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NullToDashPipe } from './null-to-dash.pipe';
import { MbToGbPipe } from './mb-to-gb.pipe';
import { dashtonbsp } from './dashtonbsp.pipe';
import { StepBtnComponent } from './components/step-btn/step-btn.component';
import { VmsComponent } from './components/vms/vms.component';
import { SharedMaterialModule } from '@frontdesk/shared/shared-material/shared-material.module';

@NgModule({
  declarations: [
    HomeComponent,
    CalculationSettingComponent,
    StorageAndBandwidthComponent,
    PcRecommendationComponent,
    NvrComponent,
    StreamingItemComponent,
    RecordingStreamingItemComponent,
    LiveviewStreamingItemComponent,
    CalculationSettingHeaderComponent,
    CalculationSettingContentComponent,
    ProjectComponent,
    VmsPerDiskCapacityComponent,
    VmsTotalStorageCapacityComponent,
    PcServerComponent,
    PcClientComponent,
    NvrBasicComponent,
    NvrAdvancedComponent,
    NvrFooterComponent,
    NvrModelComponent,
    NvrAdvancedModelComponent,
    NullToDashPipe,
    dashtonbsp,
    MbToGbPipe,
    StepBtnComponent,
    VmsComponent
  ],
  imports: [CommonModule, DesignToolRoutingModule, SharedModule, FormsModule,SharedMaterialModule, ReactiveFormsModule]
})
export class DesignToolModule {}
