import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Ant Design Modules
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

// Components
import { TagFormComponent } from './pages/tag-form/tag-form.component';
import { ListTagComponent } from './pages/list-tag/list-tag.component';
import { TagsRoutingModule } from './tags-routing.module';

@NgModule({
  declarations: [
    TagFormComponent,
    ListTagComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TagsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzGridModule,
    NzCardModule,
    NzTableModule,
    NzModalModule,
    NzMessageModule,
    NzToolTipModule
  ]
})
export class TagsModule { }
