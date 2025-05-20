import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { ConsignmentSaleListComponent } from './pages/consignment-sale-list/consignment-sale-list.component';

const routes: Routes = [
  {
    path: '',
    component: ConsignmentSaleListComponent
  }
];

@NgModule({
  declarations: [
    ConsignmentSaleListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzCardModule,
    NzIconModule,
    NzTableModule,
    NzButtonModule
  ]
})
export class ConsignmentSaleModule { }
