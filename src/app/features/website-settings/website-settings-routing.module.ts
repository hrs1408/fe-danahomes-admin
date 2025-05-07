import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteSettingsComponent } from './website-settings.component';
import { IntroductManagerComponent } from './pages/introduct-manager/introduct-manager.component';
import { InformationManagerComponent } from './pages/information-manager/information-manager.component';

const routes: Routes = [
  {
    path: '',
    component: WebsiteSettingsComponent,
    children: [
      {
        path: '',
        redirectTo: 'introduct-manager',
        pathMatch: 'full'
      },
      {
        path: 'introduct-manager',
        component: IntroductManagerComponent
      },
      {
        path: 'information-manager',
        component: InformationManagerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteSettingsRoutingModule { }
