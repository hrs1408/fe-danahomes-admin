import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { LayoutSection, ContentBlock, SliderBlock, ParagraphBlock, ListBlock, ImageListBlock, VideoBlock, GalleryBlock, HeadingBlock, ButtonBlock, ImageBoxBlock } from '../../../../models/page-builder.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-layout-section',
  standalone: false,
  templateUrl: './layout-section.component.html',
  styleUrls: ['./layout-section.component.scss']
})
export class LayoutSectionComponent {
  @Input() section!: LayoutSection;
  @Input() sectionIndex!: number;
  @Output() sectionChange = new EventEmitter<LayoutSection>();
  @Output() deleteSection = new EventEmitter<void>();

  isCollapsed = false;

  columnOptions = [
    { label: '1 cột', value: 1 },
    { label: '2 cột', value: 2 },
    { label: '3 cột', value: 3 },
    { label: '4 cột', value: 4 }
  ];

  get columnIds(): string[] {
    return Array(this.section.columns)
      .fill(0)
      .map((_, idx) => `column-${this.sectionIndex}-${idx}`);
  }

  get connectedLists(): string[] {
    return ['block-templates', 'main-container'].concat(this.columnIds);
  }

  getColumnBlocks(columnIndex: number): ContentBlock[] {
    return this.section.blocks
      .filter(item => item.columnIndex === columnIndex)
      .sort((a, b) => {
        // Ưu tiên sắp xếp theo order
        const orderA = a.block.order || 0;
        const orderB = b.block.order || 0;
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        // Nếu order bằng nhau, sắp xếp theo id để đảm bảo thứ tự ổn định
        return (a.block.id || '').localeCompare(b.block.id || '');
      })
      .map(item => item.block);
  }

  onColumnsChange(columns: number): void {
    if (columns < this.section.columns) {
      // Move blocks from removed columns to the last remaining column
      const lastColumnIndex = columns - 1;
      this.section.blocks = this.section.blocks.map(item => ({
        ...item,
        columnIndex: Math.min(item.columnIndex, lastColumnIndex)
      }));
    }
    this.section.columns = columns;
    this.emitChange();
  }

  onColumnGapChange(gap: number): void {
    this.section.columnGap = gap;
    this.emitChange();
  }

  onDrop(event: CdkDragDrop<ContentBlock[]>, targetColumnIndex: number): void {
    console.log('Drop event:', {
      previousContainer: event.previousContainer.id,
      container: event.container.id,
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex,
      item: event.item.data
    });

    if (event.previousContainer === event.container) {
      // Reordering within the same column
      const blocks = this.getColumnBlocks(targetColumnIndex);
      moveItemInArray(blocks, event.previousIndex, event.currentIndex);

      // Cập nhật lại order cho tất cả các block trong column
      blocks.forEach((block, index) => {
        const blockIndex = this.section.blocks.findIndex(b => b.block.id === block.id);
        if (blockIndex !== -1) {
          this.section.blocks[blockIndex] = {
            ...this.section.blocks[blockIndex],
            block: {
              ...this.section.blocks[blockIndex].block,
              order: index
            }
          };
        }
      });
    } else {
      // Moving from another container
      const sourceData = event.previousContainer.data[event.previousIndex];
      let newBlock: ContentBlock;

      if (event.previousContainer.id === 'block-templates') {
        // Create new block when dragging from toolbar
        newBlock = this.createNewBlock(sourceData.type);
      } else if (event.previousContainer.id === 'main-container') {
        // Copy block when dragging from main container
        newBlock = {...sourceData, id: uuidv4()};
      } else {
        // Moving between columns
        const sourceColumnMatch = event.previousContainer.id.match(/column-(\d+)-(\d+)/);
        if (sourceColumnMatch) {
          const sourceColumnIndex = parseInt(sourceColumnMatch[2]);
          const blocks = this.getColumnBlocks(sourceColumnIndex);
          const blockToMove = blocks[event.previousIndex];

          // Remove from source column
          this.section.blocks = this.section.blocks.filter(item => item.block.id !== blockToMove.id);

          // Add to target column with new order
          newBlock = {...blockToMove};
        } else {
          console.warn('Unknown source container:', event.previousContainer.id);
          return;
        }
      }

      // Add block to target column with correct order
      const existingBlocks = this.getColumnBlocks(targetColumnIndex);
      const newOrder = event.currentIndex;

      // Shift order of existing blocks if needed
      this.section.blocks
        .filter(item => item.columnIndex === targetColumnIndex)
        .forEach(item => {
          if (item.block.order && item.block.order >= newOrder) {
            item.block.order += 1;
          }
        });

      // Add new block with correct order
      this.section.blocks.push({
        columnIndex: targetColumnIndex,
        block: {
          ...newBlock,
          order: newOrder
        }
      });
    }

    this.emitChange();
  }

  createNewBlock(type: string): ContentBlock {
    const block: any = {
      id: uuidv4(),
      type,
      order: 0
    };

    switch (type) {
      case 'heading':
        block.content = '';
        block.level = 'h2';
        block.alignment = 'left';
        block.color = '#000000';
        block.fontSize = 28;
        break;
      case 'button':
        block.text = 'Click me';
        block.url = '#';
        block.target = '_self';
        block.style = 'primary';
        block.size = 'small';
        block.fullWidth = false;
        block.alignment = 'left';
        break;
      case 'slider':
        block.images = [];
        break;
      case 'paragraph':
        block.content = '';
        break;
      case 'list':
        block.items = [];
        block.style = 'bullet';
        break;
      case 'image-list':
        block.images = [];
        block.layout = 'grid';
        block.columns = 3;
        break;
      case 'video':
        block.url = '';
        block.controls = true;
        break;
      case 'gallery':
        block.images = [];
        block.layout = 'grid';
        block.columns = 3;
        block.spacing = 16;
        break;
      case 'image-box':
        block.image = {
          url: '',
          alt: '',
          width: null,
          height: null
        };
        block.title = '';
        block.description = '';
        block.layout = 'left';
        block.titleTag = 'h3';
        block.imageRounded = false;
        block.imageShadow = false;
        block.backgroundColor = null;
        block.textColor = null;
        block.padding = 24;
        block.spacing = 24;
        break;
    }

    return block;
  }

  updateBlock(columnIndex: number, blockIndex: number, updatedBlock: ContentBlock): void {
    const blocks = this.getColumnBlocks(columnIndex);
    const blockToUpdate = blocks[blockIndex];

    this.section.blocks = this.section.blocks.map(item => {
      if (item.block.id === blockToUpdate.id) {
        return {
          ...item,
          block: updatedBlock
        };
      }
      return item;
    });

    this.emitChange();
  }

  removeBlock(columnIndex: number, blockIndex: number): void {
    const blocks = this.getColumnBlocks(columnIndex);
    const blockToRemove = blocks[blockIndex];
    this.section.blocks = this.section.blocks.filter(item => item.block.id !== blockToRemove.id);
    this.emitChange();
  }

  private emitChange(): void {
    this.sectionChange.emit(this.section);
  }

  isHeadingBlock(block: ContentBlock): block is HeadingBlock {
    return block.type === 'heading';
  }

  isButtonBlock(block: ContentBlock): block is ButtonBlock {
    return block.type === 'button';
  }

  isSliderBlock(block: ContentBlock): block is SliderBlock {
    return block.type === 'slider';
  }

  isParagraphBlock(block: ContentBlock): block is ParagraphBlock {
    return block.type === 'paragraph';
  }

  isListBlock(block: ContentBlock): block is ListBlock {
    return block.type === 'list';
  }

  isImageListBlock(block: ContentBlock): block is ImageListBlock {
    return block.type === 'image-list';
  }

  isVideoBlock(block: ContentBlock): block is VideoBlock {
    return block.type === 'video';
  }

  isGalleryBlock(block: ContentBlock): block is GalleryBlock {
    return block.type === 'gallery';
  }

  isImageBoxBlock(block: ContentBlock): block is ImageBoxBlock {
    return block.type === 'image-box';
  }

  getBlockIcon(type: string): string {
    const icons: { [key: string]: string } = {
      heading: 'font-colors',
      button: 'link',
      slider: 'picture',
      paragraph: 'font-size',
      list: 'ordered-list',
      'image-list': 'table',
      video: 'play-square',
      gallery: 'appstore'
    };
    return icons[type] || 'block';
  }

  getBlockLabel(type: string): string {
    const labels: { [key: string]: string } = {
      heading: 'Tiêu đề',
      button: 'Nút',
      slider: 'Slider',
      paragraph: 'Đoạn văn bản',
      list: 'Danh sách',
      'image-list': 'Danh sách ảnh',
      video: 'Video',
      gallery: 'Thư viện ảnh'
    };
    return labels[type] || type;
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
