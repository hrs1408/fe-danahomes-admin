import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { ListUserComponent } from './pages/list-user/list-user.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ListUserComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    NzTableModule,
    NzButtonModule,
    NzCardModule,
    NzIconModule,
    NzTagModule,
    NzBadgeModule,
    NzMessageModule,
    SharedModule
  ]
})
export class UsersModule { }
