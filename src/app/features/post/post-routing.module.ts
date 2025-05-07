import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPostComponent } from './pages/list-post/list-post.component';
import { PostFormComponent } from './pages/post-form/post-form.component';
const routes: Routes = [
  {
    path: '',
    component: ListPostComponent,
  },
  {
    path: 'create',
    component: PostFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
