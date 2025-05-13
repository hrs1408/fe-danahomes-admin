import { Component, Input } from '@angular/core';
import { PageContent, ContentBlock, SliderBlock, ParagraphBlock, ListBlock, ImageListBlock, VideoBlock, GalleryBlock, LayoutSection, HeadingBlock, ButtonBlock, ImageBoxBlock } from '../../../models/page-builder.model';

@Component({
  selector: 'app-page-preview',
  standalone: false,
  templateUrl: './page-preview.component.html',
  styleUrls: ['./page-preview.component.scss']
})
export class PagePreviewComponent {
  @Input() content!: PageContent;

  isHeadingBlock(block: ContentBlock | LayoutSection): block is HeadingBlock {
    return 'type' in block && block.type === 'heading';
  }

  isButtonBlock(block: ContentBlock | LayoutSection): block is ButtonBlock {
    return 'type' in block && block.type === 'button';
  }

  isSliderBlock(block: ContentBlock | LayoutSection): block is SliderBlock {
    return 'type' in block && block.type === 'slider';
  }

  isParagraphBlock(block: ContentBlock | LayoutSection): block is ParagraphBlock {
    return 'type' in block && block.type === 'paragraph';
  }

  isListBlock(block: ContentBlock | LayoutSection): block is ListBlock {
    return 'type' in block && block.type === 'list';
  }

  isImageListBlock(block: ContentBlock | LayoutSection): block is ImageListBlock {
    return 'type' in block && block.type === 'image-list';
  }

  isVideoBlock(block: ContentBlock | LayoutSection): block is VideoBlock {
    return 'type' in block && block.type === 'video';
  }

  isGalleryBlock(block: ContentBlock | LayoutSection): block is GalleryBlock {
    return 'type' in block && block.type === 'gallery';
  }

  isLayoutSection(block: ContentBlock | LayoutSection): block is LayoutSection {
    return !('type' in block) && 'columns' in block;
  }

  isImageBoxBlock(block: ContentBlock | LayoutSection): block is ImageBoxBlock {
    return 'type' in block && block.type === 'image-box';
  }

  getLayoutBlocks(section: LayoutSection): ContentBlock[] {
    return section.blocks
      .sort((a, b) => {
        // Ưu tiên sắp xếp theo columnIndex
        if (a.columnIndex !== b.columnIndex) {
          return a.columnIndex - b.columnIndex;
        }
        // Sau đó sắp xếp theo order trong cùng một column
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

  getColumnBlocks(section: LayoutSection, columnIndex: number): ContentBlock[] {
    return section.blocks
      .filter(item => item.columnIndex === columnIndex)
      .sort((a, b) => {
        const orderA = a.block.order || 0;
        const orderB = b.block.order || 0;
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        return (a.block.id || '').localeCompare(b.block.id || '');
      })
      .map(item => item.block);
  }
}
