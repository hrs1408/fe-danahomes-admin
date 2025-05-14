import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { ImageBoxBlock } from '../../../../models/page-builder.model';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-image-box-block',
  templateUrl: './image-box-block.component.html',
  styleUrls: ['./image-box-block.component.scss'],
  standalone: false,
})
export class ImageBoxBlockComponent implements OnDestroy, OnInit {
  @Input() block!: ImageBoxBlock;
  @Output() blockChange = new EventEmitter<ImageBoxBlock>();

  private destroy$ = new Subject<void>();
  private updateSubject = new Subject<Partial<ImageBoxBlock>>();

  layoutOptions = [
    { label: 'Ảnh bên trái', value: 'left' },
    { label: 'Ảnh bên phải', value: 'right' },
    { label: 'Ảnh bên trên', value: 'top' },
    { label: 'Ảnh bên dưới', value: 'bottom' },
    { label: 'Chồng lên nhau', value: 'overlay' }
  ];

  titleTagOptions = [
    { label: 'H2', value: 'h2' },
    { label: 'H3', value: 'h3' },
    { label: 'H4', value: 'h4' },
    { label: 'H5', value: 'h5' },
    { label: 'H6', value: 'h6' }
  ];

  constructor() {
    this.updateSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged((prev, curr) => {
          return JSON.stringify(prev) === JSON.stringify(curr);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(changes => {
        this.blockChange.emit({
          ...this.block,
          ...changes
        });
      });
  }

  ngOnInit() {
    // Khởi tạo giá trị mặc định nếu block chưa có đầy đủ thuộc tính
    if (!this.block.image) {
      this.block.image = {
        url: '',
        alt: '',
      };
    }
    if (!this.block.layout) {
      this.block.layout = 'left';
    }
    if (!this.block.titleTag) {
      this.block.titleTag = 'h2';
    }
    if (this.block.imageRounded === undefined) {
      this.block.imageRounded = false;
    }
    if (this.block.imageShadow === undefined) {
      this.block.imageShadow = false;
    }
    if (!this.block.padding) {
      this.block.padding = 24;
    }
    if (!this.block.spacing) {
      this.block.spacing = 16;
    }
    if (!this.block.title) {
      this.block.title = 'Tiêu đề mẫu';
    }
    if (!this.block.description) {
      this.block.description = 'Mô tả mẫu';
    }

    // Emit block đã được khởi tạo
    this.blockChange.emit(this.block);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onImageUrlChange(url: string): void {
    this.updateBlock({ image: { ...this.block.image, url } });
  }

  onImageAltChange(alt: string): void {
    this.updateBlock({ image: { ...this.block.image, alt } });
  }

  onImageWidthChange(width: number): void {
    this.updateBlock({ image: { ...this.block.image, width } });
  }

  onImageHeightChange(height: number): void {
    this.updateBlock({ image: { ...this.block.image, height } });
  }

  onTitleChange(title: string): void {
    this.updateBlock({ title });
  }

  onDescriptionChange(description: string): void {
    this.updateBlock({ description });
  }

  onLayoutChange(layout: 'left' | 'right' | 'top' | 'bottom' | 'overlay'): void {
    this.blockChange.emit({
      ...this.block,
      layout
    });
  }

  onTitleTagChange(titleTag: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'): void {
    this.blockChange.emit({
      ...this.block,
      titleTag
    });
  }

  onImageRoundedChange(imageRounded: boolean): void {
    this.blockChange.emit({
      ...this.block,
      imageRounded
    });
  }

  onImageShadowChange(imageShadow: boolean): void {
    this.blockChange.emit({
      ...this.block,
      imageShadow
    });
  }

  onBackgroundColorChange(backgroundColor: string): void {
    this.updateBlock({ backgroundColor });
  }

  onTextColorChange(textColor: string): void {
    this.updateBlock({ textColor });
  }

  onPaddingChange(padding: number): void {
    this.updateBlock({ padding });
  }

  onSpacingChange(spacing: number): void {
    this.updateBlock({ spacing });
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = 'assets/images/placeholder.png';
    }
  }

  private updateBlock(changes: Partial<ImageBoxBlock>): void {
    this.updateSubject.next(changes);
  }
}
