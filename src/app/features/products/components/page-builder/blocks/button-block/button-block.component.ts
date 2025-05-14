import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonBlock } from '../../../../models/page-builder.model';

@Component({
  selector: 'app-button-block',
  standalone: false,
  templateUrl: './button-block.component.html',
  styleUrls: ['./button-block.component.scss']
})
export class ButtonBlockComponent {
  @Input() block!: ButtonBlock;
  @Output() blockChange = new EventEmitter<ButtonBlock>();

  styleOptions = [
    { label: 'Primary', value: 'primary' },
    { label: 'Default', value: 'default' },
    { label: 'Dashed', value: 'dashed' },
    { label: 'Link', value: 'link' },
    { label: 'Text', value: 'text' }
  ];

  sizeOptions = [
    { label: 'Nhỏ', value: 'small' },
    { label: 'Lớn', value: 'large' }
  ];

  alignmentOptions = [
    { label: 'Trái', value: 'left', icon: 'align-left' },
    { label: 'Giữa', value: 'center', icon: 'align-center' },
    { label: 'Phải', value: 'right', icon: 'align-right' }
  ];

  onTextChange(text: string): void {
    this.block.text = text;
    this.blockChange.emit(this.block);
  }

  onUrlChange(url: string): void {
    this.block.url = url;
    this.blockChange.emit(this.block);
  }

  onTargetChange(target: '_self' | '_blank'): void {
    this.block.target = target;
    this.blockChange.emit(this.block);
  }

  onStyleChange(style: 'primary' | 'default' | 'dashed' | 'link' | 'text'): void {
    this.block.style = style;
    this.blockChange.emit(this.block);
  }

  onSizeChange(size: 'small' | 'large'): void {
    this.block.size = size;
    this.blockChange.emit(this.block);
  }

  onFullWidthChange(fullWidth: boolean): void {
    this.block.fullWidth = fullWidth;
    this.blockChange.emit(this.block);
  }

  onAlignmentChange(alignment: 'left' | 'center' | 'right'): void {
    this.block.alignment = alignment;
    this.blockChange.emit(this.block);
  }
}
