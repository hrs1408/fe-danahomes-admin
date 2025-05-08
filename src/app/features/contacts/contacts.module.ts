import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { ContactListComponent } from './pages/contact-list/contact-list.component';

const routes: Routes = [
  {
    path: '',
    component: ContactListComponent
  }
];

@NgModule({
  declarations: [
    ContactListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzCardModule,
    NzIconModule
  ]
})
export class ContactsModule { }
