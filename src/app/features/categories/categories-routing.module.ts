import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoryComponent } from './pages/list-category/list-category.component';
import { CategoryFormComponent } from './pages/category-form/category-form.component';

const routes: Routes = [
  {
    path: '',
    component: ListCategoryComponent,
  },
  {
    path: 'create',
    component: CategoryFormComponent,
  },
  {
    path: ':id/edit',
    component: CategoryFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
