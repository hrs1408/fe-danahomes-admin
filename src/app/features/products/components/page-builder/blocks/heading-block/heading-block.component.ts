import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeadingBlock } from '../../../../models/page-builder.model';

@Component({
  selector: 'app-heading-block',
  standalone: false,
  templateUrl: './heading-block.component.html',
  styleUrls: ['./heading-block.component.scss']
})
export class HeadingBlockComponent {
  @Input() block!: HeadingBlock;
  @Output() blockChange = new EventEmitter<HeadingBlock>();

  levelOptions = [
    { label: 'H1', value: 'h1' },
    { label: 'H2', value: 'h2' },
    { label: 'H3', value: 'h3' },
    { label: 'H4', value: 'h4' },
    { label: 'H5', value: 'h5' },
    { label: 'H6', value: 'h6' }
  ];

  alignmentOptions = [
    { label: 'Trái', value: 'left', icon: 'align-left' },
    { label: 'Giữa', value: 'center', icon: 'align-center' },
    { label: 'Phải', value: 'right', icon: 'align-right' }
  ];

  onContentChange(content: string): void {
    this.block.content = content;
    this.blockChange.emit(this.block);
  }

  onLevelChange(level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'): void {
    this.block.level = level;
    this.blockChange.emit(this.block);
  }

  onAlignmentChange(alignment: 'left' | 'center' | 'right'): void {
    this.block.alignment = alignment;
    this.blockChange.emit(this.block);
  }

  onColorChange(color: string): void {
    this.block.color = color;
    this.blockChange.emit(this.block);
  }

  onFontSizeChange(fontSize: number): void {
    this.block.fontSize = fontSize;
    this.blockChange.emit(this.block);
  }
}
