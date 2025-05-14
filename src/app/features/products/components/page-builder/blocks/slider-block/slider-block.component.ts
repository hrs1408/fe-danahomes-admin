import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SliderBlock } from '../../../../models/page-builder.model';

@Component({
  selector: 'app-slider-block',
  standalone: false,
  templateUrl: './slider-block.component.html',
  styleUrls: ['./slider-block.component.scss']
})
export class SliderBlockComponent implements OnInit {
  @Input() block!: SliderBlock;
  @Output() blockChange = new EventEmitter<SliderBlock>();

  constructor() {}

  ngOnInit(): void {
    if (!this.block.images) {
      this.block.images = [];
    }
  }

  addImage(): void {
    const newImage = {
      url: '',
      title: '',
      description: ''
    };
    this.block.images.push(newImage);
    this.emitChange();
  }

  removeImage(index: number): void {
    this.block.images.splice(index, 1);
    this.emitChange();
  }

  emitChange(): void {
    this.blockChange.emit({...this.block});
  }
}
