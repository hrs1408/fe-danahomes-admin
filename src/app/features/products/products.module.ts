import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QuillModule } from 'ngx-quill';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { EditorModule } from '@tinymce/tinymce-angular';

import { ProductsRoutingModule } from './products-routing.module';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { SharedModule } from '../../shared/shared.module';
import { PageBuilderComponent } from './components/page-builder/page-builder.component';
import { SliderBlockComponent } from './components/page-builder/blocks/slider-block/slider-block.component';
import { ParagraphBlockComponent } from './components/page-builder/blocks/paragraph-block/paragraph-block.component';
import { ListBlockComponent } from './components/page-builder/blocks/list-block/list-block.component';
import { ImageListBlockComponent } from './components/page-builder/blocks/image-list-block/image-list-block.component';
import { VideoBlockComponent } from './components/page-builder/blocks/video-block/video-block.component';
import { GalleryBlockComponent } from './components/page-builder/blocks/gallery-block/gallery-block.component';
import { PagePreviewComponent } from './components/page-builder/preview/page-preview.component';
import { LayoutSectionComponent } from './components/page-builder/blocks/layout-section/layout-section.component';
import { HeadingBlockComponent } from './components/page-builder/blocks/heading-block/heading-block.component';
import { ButtonBlockComponent } from './components/page-builder/blocks/button-block/button-block.component';
import { ImageBoxBlockComponent } from './components/page-builder/blocks/image-box-block/image-box-block.component';

@NgModule({
  declarations: [
    ListProductComponent,
    ProductFormComponent,
    PageBuilderComponent,
    SliderBlockComponent,
    ParagraphBlockComponent,
    ListBlockComponent,
    ImageListBlockComponent,
    VideoBlockComponent,
    GalleryBlockComponent,
    PagePreviewComponent,
    LayoutSectionComponent,
    HeadingBlockComponent,
    ButtonBlockComponent,
    ImageBoxBlockComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DragDropModule,
    QuillModule.forRoot(),
    NzButtonModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzRadioModule,
    NzIconModule,
    NzSelectModule,
    NzInputNumberModule,
    NzUploadModule,
    NzMessageModule,
    NzDividerModule,
    NzModalModule,
    NzCheckboxModule,
    NzCarouselModule,
    EditorModule
  ],
  exports: [
    PageBuilderComponent
  ]
})
export class ProductsModule { }
