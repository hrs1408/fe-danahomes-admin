import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { ListCategoryComponent } from './pages/list-category/list-category.component';
import { CategoryFormComponent } from './pages/category-form/category-form.component';


@NgModule({
  declarations: [
    ListCategoryComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
