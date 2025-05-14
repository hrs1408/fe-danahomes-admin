import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ContentBlock, PageContent, SliderBlock, ParagraphBlock, ListBlock, ImageListBlock, VideoBlock, GalleryBlock, LayoutSection, HeadingBlock, ButtonBlock, ImageBoxBlock } from '../../models/page-builder.model';
import { v4 as uuidv4 } from 'uuid';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-page-builder',
  standalone: false,
  templateUrl: './page-builder.component.html',
  styleUrls: ['./page-builder.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PageBuilderComponent),
      multi: true,
    },
  ]
})
export class PageBuilderComponent implements ControlValueAccessor, OnInit {
  content: PageContent = { blocks: [] };
  isPreview = false;
  blockTemplates = [
    { type: 'heading', label: 'Tiêu đề' },
    { type: 'button', label: 'Nút' },
    { type: 'slider', label: 'Slider' },
    { type: 'paragraph', label: 'Đoạn văn bản' },
    { type: 'list', label: 'Danh sách' },
    { type: 'image-list', label: 'Danh sách ảnh' },
    { type: 'video', label: 'Video' },
    { type: 'gallery', label: 'Thư viện ảnh' },
    { type: 'image-box', label: 'Hộp ảnh' }
  ];
  onChange: any = () => {};
  onTouch: any = () => {};

  constructor() {}

  ngOnInit(): void {}

  writeValue(value: PageContent): void {
    if (value) {
      this.content = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  togglePreview(): void {
    this.isPreview = !this.isPreview;
  }

  getLayoutColumnIds(): string[] {
    const ids: string[] = [];
    this.content.blocks.forEach((block, blockIndex) => {
      if (this.isLayoutSection(block)) {
        for (let i = 0; i < block.columns; i++) {
          ids.push(`column-${blockIndex}-${i}`);
        }
      }
    });
    return ids;
  }

  addBlock(type: string): void {
    const newBlock: ContentBlock = {
      id: uuidv4(),
      type,
      order: this.content.blocks.length,
    } as ContentBlock;

    switch (type) {
      case 'slider':
        (newBlock as SliderBlock).images = [];
        break;
      case 'paragraph':
        (newBlock as ParagraphBlock).content = '';
        break;
      case 'list':
        (newBlock as ListBlock).items = [];
        (newBlock as ListBlock).style = 'bullet';
        break;
      case 'image-list':
        (newBlock as ImageListBlock).items = [];
        (newBlock as ImageListBlock).layout = 'grid';
        (newBlock as ImageListBlock).columns = 3;
        break;
      case 'video':
        (newBlock as VideoBlock).url = '';
        (newBlock as VideoBlock).controls = true;
        (newBlock as VideoBlock).autoplay = false;
        break;
      case 'gallery':
        (newBlock as GalleryBlock).images = [];
        (newBlock as GalleryBlock).layout = 'grid';
        (newBlock as GalleryBlock).columns = 3;
        (newBlock as GalleryBlock).spacing = 16;
        break;
    }

    this.content.blocks.push(newBlock);
    this.onChange(this.content);
  }

  addLayoutSection(): void {
    const newSection: LayoutSection = {
      id: uuidv4(),
      columns: 2,
      columnGap: 24,
      blocks: []
    };
    this.content.blocks.push(newSection);
    this.onChange(this.content);
  }

  removeBlock(index: number): void {
    this.content.blocks.splice(index, 1);
    this.reorderBlocks();
    this.onChange(this.content);
  }

  moveBlock(index: number, direction: 'up' | 'down'): void {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < this.content.blocks.length) {
      const block = this.content.blocks[index];
      this.content.blocks.splice(index, 1);
      this.content.blocks.splice(newIndex, 0, block);
      this.reorderBlocks();
      this.onChange(this.content);
    }
  }

  drop(event: CdkDragDrop<any[]>): void {
    console.log('Main container drop:', event);

    if (event.previousContainer === event.container) {
      moveItemInArray(this.content.blocks, event.previousIndex, event.currentIndex);
      this.reorderBlocks();
    } else if (event.previousContainer.id === 'block-templates') {
      const template = event.previousContainer.data[event.previousIndex];
      const newBlock = this.createNewBlock(template.type);
      this.content.blocks.splice(event.currentIndex, 0, newBlock);
      this.reorderBlocks();
    }

    this.onChange(this.content);
  }

  private reorderBlocks(): void {
    this.content.blocks.forEach((block, index) => {
      if (!this.isLayoutSection(block)) {
        (block as ContentBlock).order = index;
      }
    });
  }

  updateBlock(index: number, updatedBlock: ContentBlock | LayoutSection): void {
    this.content.blocks[index] = updatedBlock;
    this.onChange(this.content);
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

  isLayoutSection(block: ContentBlock | LayoutSection): block is LayoutSection {
    return 'columns' in block;
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
      gallery: 'appstore',
      'image-box': 'picture',
    };
    return icons[type] || 'block';
  }

  getBlockLabel(type: string): string {
    const template = this.blockTemplates.find(t => t.type === type);
    return template ? template.label : type;
  }

  createNewBlock(type: string): ContentBlock {
    const block: any = {
      id: uuidv4(),
      type,
      order: this.content.blocks.length
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
        block.size = 'medium';
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
        block.items = [];
        block.layout = 'grid';
        block.columns = 3;
        break;
      case 'video':
        block.url = '';
        block.controls = true;
        block.autoplay = false;
        break;
      case 'gallery':
        block.images = [];
        block.layout = 'grid';
        block.columns = 3;
        block.spacing = 16;
        break;
      case 'image-box':
        (block as ImageBoxBlock).image = {
          url: 'assets/images/placeholder.png',
          alt: 'Preview image'
        };
        (block as ImageBoxBlock).layout = 'left';
        (block as ImageBoxBlock).titleTag = 'h2';
        (block as ImageBoxBlock).title = 'Tiêu đề mẫu';
        (block as ImageBoxBlock).description = 'Mô tả mẫu';
        (block as ImageBoxBlock).imageRounded = false;
        (block as ImageBoxBlock).imageShadow = false;
        (block as ImageBoxBlock).backgroundColor = '#ffffff';
        (block as ImageBoxBlock).textColor = '#000000';
        (block as ImageBoxBlock).padding = 24;
        (block as ImageBoxBlock).spacing = 16;
        break;
    }

    return block;
  }

  isHeadingBlock(block: ContentBlock): block is HeadingBlock {
    return block.type === 'heading';
  }

  isButtonBlock(block: ContentBlock): block is ButtonBlock {
    return block.type === 'button';
  }

  isImageBoxBlock(block: ContentBlock): block is ImageBoxBlock {
    return block.type === 'image-box';
  }
}
