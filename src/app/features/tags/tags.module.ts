import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { ListTagComponent } from './pages/list-tag/list-tag.component';
import { TagFormComponent } from './pages/tag-form/tag-form.component';


@NgModule({
  declarations: [
    ListTagComponent,
    TagFormComponent
  ],
  imports: [
    CommonModule,
    TagsRoutingModule
  ]
})
export class TagsModule { }
