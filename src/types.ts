export interface NoticeAttachment {
  name: string;
  url: string;
  size?: string;
  type: 'pdf' | 'image' | 'doc' | 'other';
}

export type NoticeCategory = 
  | 'Academic'
  | 'Examination'
  | 'Holiday'
  | 'Admission'
  | 'Sports & Culture'
  | 'Administrative'
  | 'General';

export type NoticeStatus = 'draft' | 'published';

export interface Notice {
  id: string;
  title: string;
  refNumber?: string;
  category: NoticeCategory;
  content: string;
  summary?: string;
  attachment?: NoticeAttachment | null;
  status: NoticeStatus;
  isPinned?: boolean;
  isSample?: boolean;
  targetAudience?: 'All' | 'Students' | 'Parents' | 'Teachers' | 'Staff';
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  views?: number;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'superadmin';
  lastLogin?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface NoticeStats {
  total: number;
  published: number;
  drafts: number;
  pinned: number;
  sampleCount: number;
}

export interface HeroPhotoData {
  url: string;
  caption?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface GalleryPhotoData {
  id: string;
  title: string;
  category: 'Campus' | 'Sports' | 'Cultural' | 'Science & Events' | 'General';
  imageUrl: string;
  caption: string;
  date: string;
  createdAt?: string;
}

export interface LogoPhotoData {
  url: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface AboutPhotoData {
  url: string;
  caption?: string;
  updatedAt?: string;
}

export interface FacilityPhotosData {
  scienceLab?: string;
  computerLab?: string;
  library?: string;
  sportsField?: string;
}

export interface SchoolMediaData {
  logoPhoto: LogoPhotoData | null;
  heroPhoto: HeroPhotoData | null;
  aboutPhoto: AboutPhotoData | null;
  facilityPhotos: FacilityPhotosData | null;
  galleryPhotos: GalleryPhotoData[];
}
