import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GalleryBlock } from '../../../../models/page-builder.model';

@Component({
  selector: 'app-gallery-block',
  standalone: false,
  templateUrl: './gallery-block.component.html',
  styleUrls: ['./gallery-block.component.scss']
})
export class GalleryBlockComponent implements OnInit {
  @Input() block!: GalleryBlock;
  @Output() blockChange = new EventEmitter<GalleryBlock>();

  layouts = [
    { label: 'Lưới', value: 'grid' },
    { label: 'Masonry', value: 'masonry' }
  ];

  columns = [
    { label: '2 cột', value: 2 },
    { label: '3 cột', value: 3 },
    { label: '4 cột', value: 4 }
  ];

  constructor() {}

  ngOnInit(): void {
    if (!this.block.images) {
      this.block.images = [];
    }
    if (!this.block.spacing) {
      this.block.spacing = 16;
    }
  }

  addImage(): void {
    this.block.images.push({
      url: '',
      thumbnail: '',
      title: '',
      description: ''
    });
    this.emitChange();
  }

  removeImage(index: number): void {
    this.block.images.splice(index, 1);
    this.emitChange();
  }

  onLayoutChange(layout: 'grid' | 'masonry'): void {
    this.block.layout = layout;
    this.emitChange();
  }

  onColumnsChange(columns: 2 | 3 | 4): void {
    this.block.columns = columns;
    this.emitChange();
  }

  onSpacingChange(spacing: number): void {
    this.block.spacing = spacing;
    this.emitChange();
  }

  onImageChange(index: number, field: string, value: string): void {
    this.block.images[index] = {
      ...this.block.images[index],
      [field]: value
    };
    this.emitChange();
  }

  private emitChange(): void {
    this.blockChange.emit({...this.block});
  }
}
