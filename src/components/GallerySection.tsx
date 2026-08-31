import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2,
  Calendar
} from 'lucide-react';
import { 
  schoolBuildingImg, 
  scienceLabImg, 
  computerLabImg, 
  libraryImg, 
  sportsFieldImg 
} from '../assets/images';
import { 
  AlpanaDivider, 
  MandalaEmblem 
} from './IndianArtDecorations';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Sports' | 'Cultural' | 'Science & Events';
  imageUrl: string;
  caption: string;
  date: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Historic School Building & Open Green Playground',
    category: 'Campus',
    imageUrl: schoolBuildingImg,
    caption: 'The authentic official school building of DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN surrounded by serene green foliage.',
    date: 'Academic Year 2025-26',
  },
  {
    id: 'g-2',
    title: 'Sprawling Sports Field & Athletic Ground',
    category: 'Sports',
    imageUrl: sportsFieldImg,
    caption: 'Vast campus outfield used for inter-school football tournaments, annual athletics championships, and daily physical drill.',
    date: 'January 2026',
  },
  {
    id: 'g-3',
    title: 'Modern Science & Experimental Laboratory Wing',
    category: 'Science & Events',
    imageUrl: scienceLabImg,
    caption: 'Hands-on practical physics, chemistry and biology demonstrations guided by senior science faculty.',
    date: 'February 2026',
  },
  {
    id: 'g-4',
    title: 'Central Library & Reading Sanctuary',
    category: 'Campus',
    imageUrl: libraryImg,
    caption: 'Students studying in the peaceful library archives featuring thousands of academic texts and literary classics.',
    date: 'March 2026',
  },
  {
    id: 'g-5',
    title: 'Computer Science & ICT Smart Classroom',
    category: 'Campus',
    imageUrl: computerLabImg,
    caption: 'Networked digital workstation laboratory enabling coding in Python, C++, and multimedia computing for high school students.',
    date: 'February 2026',
  },
  {
    id: 'g-6',
    title: 'Saraswati Puja & Heritage Art Exhibitions',
    category: 'Cultural',
    imageUrl: 'https://images.unsplash.com/photo-1609137144827-7756f5a34346?q=80&w=1200&auto=format&fit=crop',
    caption: 'Devotional floral decorations, traditional floor art exhibitions, and prayer assemblies on campus.',
    date: 'February 2026',
  },
  {
    id: 'g-7',
    title: 'Annual Cultural Festival & Musical Evening',
    category: 'Cultural',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    caption: 'Students performing classical music, drama productions, and poetic recitations honoring national literary figures.',
    date: 'May 2025',
  },
  {
    id: 'g-8',
    title: 'Annual Winter Sports Meet - Track & Field Finals',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop',
    caption: 'High-voltage track and field sprint competition among Netaji House, Tagore House, Vidyasagar House, and Vivekananda House.',
    date: 'January 2026',
  },
];

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Campus', 'Sports', 'Cultural', 'Science & Events'];

  const filtered = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filtered.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen relative overflow-hidden">
      
      {/* Background Motif Watermarks */}
      <div className="absolute right-4 top-24 pointer-events-none opacity-5 hidden lg:block">
        <MandalaEmblem size={280} color="#1d4ed8" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Header in Royal Blue & White */}
        <div className="text-center max-w-4xl mx-auto space-y-3">

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/10 text-blue-950 text-xs font-bold uppercase tracking-wider border border-blue-200">
            <ImageIcon className="w-3.5 h-3.5 text-blue-800" />
            <span>Visual Chronicle & Heritage Archives</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-950 tracking-tight font-serif uppercase">
            DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN
          </h1>
          <p className="text-blue-900 font-semibold text-sm sm:text-base font-sans">
            Photo Gallery & Life at Campus
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            Capturing timeless memories, athletic victories, scientific discoveries, and vibrant cultural festivals across our campus.
          </p>

          <AlpanaDivider />
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center">
          <div className="bg-white p-1.5 rounded-2xl shadow-md border border-blue-200 flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`gallery-filter-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'text-slate-700 hover:bg-blue-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              id={`gallery-item-${item.id}`}
              onClick={() => handleOpenLightbox(idx)}
              className="group bg-white rounded-3xl overflow-hidden border border-blue-100 hover:border-blue-900 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-blue-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <span className="p-3 rounded-full bg-blue-900 text-white shadow-lg font-bold">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>
                <span className="absolute bottom-2.5 left-2.5 text-[10px] font-black uppercase tracking-wider bg-blue-950/90 text-blue-200 px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-blue-400/30">
                  {item.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-1 font-serif">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-blue-700" />
                    {item.date}
                  </span>
                  <span className="text-blue-900 font-bold">Expand Photo →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-blue-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={handleCloseLightbox}
        >
          <button
            id="close-lightbox-btn"
            onClick={handleCloseLightbox}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            id="prev-lightbox-btn"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50 hidden sm:block"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            id="next-lightbox-btn"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50 hidden sm:block"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border-2 border-blue-500 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={filtered[lightboxIndex].imageUrl}
                alt={filtered[lightboxIndex].title}
                className="max-h-[65vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="p-6 bg-slate-900 text-white space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-black text-blue-300 uppercase tracking-wider">
                  {filtered[lightboxIndex].category} • {filtered[lightboxIndex].date}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {lightboxIndex + 1} of {filtered.length}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-serif">
                {filtered[lightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {filtered[lightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


