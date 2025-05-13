import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageListBlock } from '../../../../models/page-builder.model';

@Component({
  selector: 'app-image-list-block',
  standalone: false,
  templateUrl: './image-list-block.component.html',
  styleUrls: ['./image-list-block.component.scss']
})
export class ImageListBlockComponent implements OnInit {
  @Input() block!: ImageListBlock;
  @Output() blockChange = new EventEmitter<ImageListBlock>();

  layouts = [
    { label: 'Lưới', value: 'grid' },
    { label: 'Carousel', value: 'carousel' }
  ];

  columns = [
    { label: '2 cột', value: 2 },
    { label: '3 cột', value: 3 },
    { label: '4 cột', value: 4 }
  ];

  constructor() {}

  ngOnInit(): void {}

  addItem(): void {
    this.block.items.push({
      image: '',
      title: '',
      description: ''
    });
    this.emitChange();
  }

  removeItem(index: number): void {
    this.block.items.splice(index, 1);
    this.emitChange();
  }

  onLayoutChange(layout: 'grid' | 'carousel'): void {
    this.block.layout = layout;
    this.emitChange();
  }

  onColumnsChange(columns: 2 | 3 | 4): void {
    this.block.columns = columns;
    this.emitChange();
  }

  emitChange(): void {
    this.blockChange.emit({...this.block});
  }
}
