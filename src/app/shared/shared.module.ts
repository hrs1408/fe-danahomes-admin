import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { SafePipe } from './pipes/safe.pipe';

const ANT_DESIGN_MODULES = [
  NzLayoutModule,
  NzDropDownModule,
  NzIconModule,
  NzAvatarModule,
  NzInputModule,
  NzButtonModule,
  NzCardModule,
  NzFormModule,
  NzTableModule,
  NzModalModule,
  NzMessageModule,
  NzNotificationModule,
  NzSpinModule,
  NzGridModule,
  NzSelectModule,
  NzDatePickerModule,
  NzTimePickerModule,
  NzSwitchModule,
  NzCheckboxModule,
  NzRadioModule,
  NzSliderModule,
  NzTreeModule,
  NzCascaderModule,
  NzTransferModule,
  NzPaginationModule,
  NzStepsModule,
  NzTagModule,
  NzBadgeModule,
  NzCollapseModule,
  NzCarouselModule,
  NzTimelineModule,
  NzDividerModule,
  NzBackTopModule,
  NzAffixModule,
  NzAnchorModule,
  NzBackTopModule,
  NzAffixModule,
  NzAnchorModule,
  NzDrawerModule,
  NzResultModule,
  NzSkeletonModule,
  NzSpaceModule,
  NzGridModule,
  NzTagModule,
  NzUploadModule,
  NzDescriptionsModule,
  NzInputModule,
  NzStatisticModule
];

@NgModule({
  declarations: [
    SafePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...ANT_DESIGN_MODULES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...ANT_DESIGN_MODULES,
    SafePipe
  ]
})
export class SharedModule { }
