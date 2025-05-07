import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTagComponent } from './pages/list-tag/list-tag.component';
import { TagFormComponent } from './pages/tag-form/tag-form.component';

const routes: Routes = [
  {
    path: '',
    component: ListTagComponent,
  },
  {
    path: 'create',
    component: TagFormComponent,
  },
  {
    path: ':id/edit',
    component: TagFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagsRoutingModule {}
