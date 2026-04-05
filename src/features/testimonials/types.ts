export interface Testimonial {
  id: string;
  author: AuthorInfo;
  content: string;
  rating: number;
  propertyType: string;
  location: string;
  date: string;
  featured: boolean;
}
 
export interface AuthorInfo {
  name: string;
  avatar: string;
  role: string;
  company?: string;
}
 
export interface TestimonialsResponse {
  data: Testimonial[];
  total: number;
  page: number;
  pageSize: number;
}
 
export interface TestimonialsFilters {
  rating?: number;
  propertyType?: string;
  featured?: boolean;
}
 
export interface TestimonialSliderState {
  activeIndex: number;
  direction: "left" | "right";
  isAutoPlaying: boolean;
}