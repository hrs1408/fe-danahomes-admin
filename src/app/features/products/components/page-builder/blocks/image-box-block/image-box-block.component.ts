import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageBoxBlock } from '../../../../models/page-builder.model';

@Component({
  selector: 'app-image-box-block',
  templateUrl: './image-box-block.component.html',
  styleUrls: ['./image-box-block.component.scss'],
  standalone: false,
})
export class ImageBoxBlockComponent {
  @Input() block!: ImageBoxBlock;
  @Output() blockChange = new EventEmitter<ImageBoxBlock>();

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
    this.updateBlock({ layout });
  }

  onTitleTagChange(titleTag: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'): void {
    this.updateBlock({ titleTag });
  }

  onImageRoundedChange(imageRounded: boolean): void {
    this.updateBlock({ imageRounded });
  }

  onImageShadowChange(imageShadow: boolean): void {
    this.updateBlock({ imageShadow });
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

  private updateBlock(changes: Partial<ImageBoxBlock>): void {
    this.blockChange.emit({
      ...this.block,
      ...changes
    });
  }
}
