export interface BaseBlock {
  id: string;
  type: string;
  order: number;
}

export interface HeadingBlock extends BaseBlock {
  content: string;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  alignment: 'left' | 'center' | 'right';
  color: string;
  fontSize: number;
}

export interface ButtonBlock extends BaseBlock {
  text: string;
  url: string;
  target: '_self' | '_blank';
  style: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  size: 'small' | 'large';
  fullWidth: boolean;
  alignment: 'left' | 'center' | 'right';
}

export type ContentBlock = HeadingBlock | ButtonBlock | SliderBlock | ParagraphBlock | ListBlock | ImageListBlock | VideoBlock | GalleryBlock | ImageBoxBlock;

export interface LayoutSection {
  id: string;
  columns: number;
  columnGap: number;
  blocks: {
    columnIndex: number;
    block: ContentBlock;
  }[];
}

export interface SliderBlock extends BaseBlock {
  type: 'slider';
  images: {
    url: string;
    title?: string;
    description?: string;
  }[];
}

export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph';
  content: string;
  title?: string;
}

export interface ListBlock extends BaseBlock {
  type: 'list';
  items: {
    title: string;
    description?: string;
    icon?: string;
  }[];
  style: 'bullet' | 'number' | 'icon';
}

export interface ImageListBlock extends BaseBlock {
  type: 'image-list';
  items: {
    image: string;
    title?: string;
    description?: string;
  }[];
  layout: 'grid' | 'carousel';
  columns: 2 | 3 | 4;
}

export interface VideoBlock extends BaseBlock {
  type: 'video';
  url: string;
  title?: string;
  description?: string;
  autoplay?: boolean;
  controls?: boolean;
  poster?: string;
}

export interface GalleryBlock extends BaseBlock {
  type: 'gallery';
  images: {
    url: string;
    thumbnail?: string;
    title?: string;
    description?: string;
  }[];
  layout: 'masonry' | 'grid';
  columns: 2 | 3 | 4;
  spacing: number;
}

export interface FeatureBlock extends BaseBlock {
  type: 'feature';
  title?: string;
  description?: string;
  features: {
    icon: string;
    title: string;
    description: string;
    highlight?: boolean;
  }[];
  layout: 'grid' | 'list';
  columns?: 2 | 3 | 4;
}

export interface PriceTableBlock extends BaseBlock {
  type: 'price-table';
  title?: string;
  description?: string;
  items: {
    title: string;
    price: number;
    unit?: string;
    period?: string;
    features: string[];
    highlight?: boolean;
    buttonText?: string;
    buttonLink?: string;
  }[];
  columns: 2 | 3 | 4;
}

export interface ContactBlock extends BaseBlock {
  type: 'contact';
  title?: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  workingHours?: string;
  showMap?: boolean;
  mapLocation?: {
    lat: number;
    lng: number;
  };
}

export interface ImageBoxBlock extends BaseBlock {
  type: 'image-box';
  image: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  title: string;
  description: string;
  layout: 'left' | 'right' | 'top' | 'bottom' | 'overlay';
  titleTag: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  imageRounded: boolean;
  imageShadow: boolean;
  backgroundColor?: string;
  textColor?: string;
  padding: number;
  spacing: number;
}

export interface PageContent {
  blocks: (ContentBlock | LayoutSection)[];
}
