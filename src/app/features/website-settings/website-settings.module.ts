import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteSettingsRoutingModule } from './website-settings-routing.module';
import { IntroductManagerComponent } from './pages/introduct-manager/introduct-manager.component';
import { InformationManagerComponent } from './pages/information-manager/information-manager.component';


@NgModule({
  declarations: [
    IntroductManagerComponent,
    InformationManagerComponent
  ],
  imports: [
    CommonModule,
    WebsiteSettingsRoutingModule
  ]
})
export class WebsiteSettingsModule { }
