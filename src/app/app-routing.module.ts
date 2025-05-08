import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./features/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'tags',
        loadChildren: () => import('./features/tags/tags.module').then(m => m.TagsModule)
      },
      {
        path: 'post',
        loadChildren: () => import('./features/post/post.module').then(m => m.PostModule)
      },
      {
        path: 'website-settings',
        loadChildren: () => import('./features/website-settings/website-settings.module').then(m => m.WebsiteSettingsModule)
      },
      {
        path: 'contacts',
        loadChildren: () => import('./features/contacts/contacts.module').then(m => m.ContactsModule)
      }
    ]
  },
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
