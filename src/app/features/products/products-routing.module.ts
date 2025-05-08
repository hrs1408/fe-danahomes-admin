import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
const routes: Routes = [
  {
    path: '',
    component: ListProductComponent,
  },
  {
    path: 'create',
    component: ProductFormComponent,
  },
  {
    path: ':id/edit',
    component: ProductFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
