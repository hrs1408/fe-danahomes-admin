import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListBlock } from '../../../../models/page-builder.model';

@Component({
  selector: 'app-list-block',
  standalone: false,
  templateUrl: './list-block.component.html',
  styleUrls: ['./list-block.component.scss']
})
export class ListBlockComponent implements OnInit {
  @Input() block!: ListBlock;
  @Output() blockChange = new EventEmitter<ListBlock>();

  listStyles = [
    { label: 'Dấu chấm', value: 'bullet' },
    { label: 'Số thứ tự', value: 'number' },
    { label: 'Icon', value: 'icon' }
  ];

  constructor() {}

  ngOnInit(): void {}

  addItem(): void {
    this.block.items.push({
      title: '',
      description: '',
      icon: ''
    });
    this.emitChange();
  }

  removeItem(index: number): void {
    this.block.items.splice(index, 1);
    this.emitChange();
  }

  onStyleChange(style: 'bullet' | 'number' | 'icon'): void {
    this.block.style = style;
    this.emitChange();
  }

  emitChange(): void {
    this.blockChange.emit({...this.block});
  }
}
