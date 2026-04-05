export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  tag?: "interior" | "exterior" | "pool" | "garden" | "kitchen" | "bedroom";
}
const image ={
    id : "4",
    src : "/assets/villa.jpg",
    alt : "lol" , 
    width :1080 , 
    height: 720 , 
    caption :"LLOL"
}
export interface PropertyGalleryProps {
  propertyId: string;
  propertyName: string;
  images?: GalleryImage[];
}

export interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export interface GalleryCarouselProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export interface GalleryLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export type GalleryTag = GalleryImage["tag"];