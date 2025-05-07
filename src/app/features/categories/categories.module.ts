import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { CategoryFormComponent } from './pages/category-form/category-form.component';
import { ListCategoryComponent } from './pages/list-category/list-category.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CategoryFormComponent,
    ListCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzGridModule,
    NzCardModule,
    NzTableModule,
    NzPaginationModule,
    NzToolTipModule,
    MatIconModule,
    SharedModule
  ]
})
export class CategoriesModule { }
