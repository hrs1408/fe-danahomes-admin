import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WebsiteSettingsComponent } from './website-settings.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { WebsiteSettingsRoutingModule } from './website-settings-routing.module';
import { IntroductManagerComponent } from './pages/introduct-manager/introduct-manager.component';
import { InformationManagerComponent } from './pages/information-manager/information-manager.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';

@NgModule({
  declarations: [
    WebsiteSettingsComponent,
    IntroductManagerComponent,
    InformationManagerComponent,
    SanitizeHtmlPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzTabsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzRadioModule,
    NzUploadModule,
    NzMessageModule,
    NzIconModule,
    NzDescriptionsModule,
    NzTagModule,
    EditorModule,
    WebsiteSettingsRoutingModule
  ]
})
export class WebsiteSettingsModule { }
