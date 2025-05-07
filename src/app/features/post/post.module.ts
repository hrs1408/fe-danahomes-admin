import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { ListPostComponent } from './pages/list-post/list-post.component';
import { PostFormComponent } from './pages/post-form/post-form.component';


@NgModule({
  declarations: [
    ListPostComponent,
    PostFormComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule
  ]
})
export class PostModule { }
