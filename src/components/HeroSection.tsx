import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  ChevronRight, 
  Award, 
  Users, 
  BookCheck, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  GraduationCap, 
  Building,
  Quote,
  Flame
} from 'lucide-react';
import { Notice, HeroPhotoData, SchoolMediaData } from '../types';
import { fetchSchoolPhotos, getStoredMedia } from '../services/api';
import { SchoolLogo } from './SchoolLogo';
import { schoolBuildingImg, schoolEmblemImg, mobileHeroBgImg } from '../assets/images';
import { 
  CornerFlourish, 
  MandalaEmblem, 
  TerracottaArchFrame 
} from './IndianArtDecorations';

interface HeroSectionProps {
  latestNotices: Notice[];
  onViewNotices: () => void;
  onSelectNotice: (notice: Notice) => void;
  onExploreAcademics: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  latestNotices,
  onViewNotices,
  onSelectNotice,
  onExploreAcademics,
  onContactClick,
}) => {
  const breakingNotice = latestNotices[0] || null;
  const [heroPhoto, setHeroPhoto] = useState<HeroPhotoData | null>(() => {
    try {
      const stored = getStoredMedia();
      return stored?.heroPhoto || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // Sync with persistent database/backend on every load
    fetchSchoolPhotos()
      .then((data) => {
        setHeroPhoto(data?.heroPhoto || null);
      })
      .catch(() => {
        // Safe graceful fallback to persistent storage
      });

    const handleMediaUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<SchoolMediaData>;
      if (customEvent.detail !== undefined) {
        setHeroPhoto(customEvent.detail?.heroPhoto || null);
      }
    };

    window.addEventListener('dpss_media_updated', handleMediaUpdated);
    return () => window.removeEventListener('dpss_media_updated', handleMediaUpdated);
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-50 text-slate-900 border-b border-slate-200">
      {/* Live Breaking News Ticker Strip in Refined Warm Light Gold & Slate */}
      <div className="bg-amber-50/95 text-slate-800 px-4 py-2 text-xs sm:text-sm font-semibold flex items-center shadow-xs border-b border-amber-200/80 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto w-full flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shrink-0 shadow-sm border border-amber-400">
            <Bell className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
            <span>LATEST NOTICE</span>
          </div>

          <div className="overflow-hidden relative flex-1">
            {breakingNotice ? (
              <button
                id="breaking-notice-ticker"
                onClick={() => onSelectNotice(breakingNotice)}
                className="text-left font-semibold hover:underline truncate block w-full text-slate-900 hover:text-blue-950 transition-all text-xs sm:text-sm cursor-pointer"
              >
                <span className="font-bold bg-amber-100 text-amber-950 px-2 py-0.5 rounded text-[11px] mr-2 border border-amber-300">
                  {breakingNotice.category}
                </span>
                {breakingNotice.title}
                <span className="ml-2 text-slate-500 text-xs font-normal">
                  ({new Date(breakingNotice.publishedAt).toLocaleDateString('en-IN')})
                </span>
              </button>
            ) : (
              <p className="truncate text-slate-600 font-medium">
                Welcome to Deshbandhu Palli Seva Sangha Santosh Kumari Siksha Niketan official portal.
              </p>
            )}
          </div>

          <button
            id="ticker-view-all-btn"
            onClick={onViewNotices}
            className="hidden sm:flex items-center gap-1 text-xs font-extrabold text-slate-950 hover:bg-amber-400 bg-amber-300 px-3 py-1 rounded-full transition-all shrink-0 cursor-pointer shadow-xs border border-amber-400"
          >
            All Notices <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Hero Presentation with Clean Luminous Light Backdrop */}
      <div className="relative min-h-[620px] lg:min-h-[700px] flex items-center py-12 lg:py-20">
        {/* Desktop / Monitor Campus Background (hidden on smartphone screens) */}
        <div 
          className="hidden sm:block absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transform transition-transform duration-1000 scale-[1.01]"
          style={{
            backgroundImage: `url(${schoolBuildingImg})`,
          }}
        />

        {/* Smartphone Portrait Only 9:16 Custom Background (hidden on desktop/monitors) */}
        <div 
          className="block sm:hidden absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transform transition-transform duration-1000 scale-[1.01]"
          style={{
            backgroundImage: `url(${mobileHeroBgImg})`,
          }}
        />

        {/* 75% White Opacity Daytime Overlay: Perfectly balances campus photograph visibility with light scholastic elegance */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-white/80 via-white/75 to-white/70 z-0" />
        <div className="block sm:hidden absolute inset-0 bg-gradient-to-b from-white/80 via-white/75 to-white/70 z-0" />
        
        {/* Subtle Decorative Royal Navy Watermarks */}
        <div className="absolute left-8 top-12 pointer-events-none opacity-5 hidden lg:block">
          <MandalaEmblem size={340} color="#1e3a8a" />
        </div>
        <div className="absolute right-12 bottom-12 pointer-events-none opacity-5 hidden lg:block">
          <MandalaEmblem size={300} color="#1e3a8a" />
        </div>

        {/* Safe-area Central Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Motto / Coat & Establishment Badges */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center lg:items-start justify-center lg:justify-start gap-2.5">
                <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-950 text-xs sm:text-sm font-black tracking-wider uppercase shadow-xs">
                  <Flame className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>A LEGACY OF EXPERIENCE, A FUTURE OF INSPIRATION</span>
                </div>

                <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-slate-800 text-xs font-semibold shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-800" />
                  <span>Estd. 1968 • Govt. Sponsored</span>
                </div>
              </div>

              {/* Grand School Name Showcase */}
              <div className="relative">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-black text-blue-950 tracking-tight leading-[1.2] uppercase font-serif drop-shadow-xs text-center lg:text-left">
                  DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN
                </h1>

                {/* Prominent Motto Banner Callout */}
                <div className="mt-4 p-4 rounded-xl bg-white/85 backdrop-blur-sm border-t-2 sm:border-t-0 sm:border-l-4 border-amber-500 border border-slate-200/80 shadow-xs text-center lg:text-left">
                  <p className="text-xs sm:text-sm font-bold tracking-wide text-amber-900 uppercase font-serif flex items-center justify-center lg:justify-start gap-2">
                    <Quote className="w-4 h-4 text-amber-600 shrink-0" />
                    &ldquo;A Legacy of Experience, A Future of Inspiration&rdquo;
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    A venerable institution of scholastic excellence, moral character, and scientific inquiry. Dedicated to quality higher secondary education, holistic student development, and community welfare since 1968.
                  </p>
                </div>
              </div>

              {/* Action Buttons with Center-Aligned Mobile Layout */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-2 max-w-md sm:max-w-none mx-auto lg:mx-0 w-full">
                <button
                  id="hero-notice-board-btn"
                  onClick={onViewNotices}
                  className="px-6 py-3.5 bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-800 hover:to-blue-900 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer border border-blue-900 active:scale-95 text-center w-full sm:w-auto"
                >
                  <Bell className="w-4 h-4 text-amber-300" />
                  <span>Official Notice Board</span>
                  {latestNotices.length > 0 && (
                    <span className="ml-1 px-2 py-0.5 bg-amber-400 text-blue-950 text-xs rounded-full font-black">
                      {latestNotices.length}
                    </span>
                  )}
                </button>

                <button
                  id="hero-academics-btn"
                  onClick={onExploreAcademics}
                  className="px-5 py-3.5 bg-white/95 hover:bg-white text-blue-950 font-bold rounded-xl border-2 border-blue-900/40 hover:border-blue-900 transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer shadow-xs text-center w-full sm:w-auto"
                >
                  <BookCheck className="w-4 h-4 text-blue-800" />
                  <span>Curriculum & Streams</span>
                </button>

                <button
                  id="hero-contact-btn"
                  onClick={onContactClick}
                  className="px-4 py-3.5 bg-amber-50/95 hover:bg-amber-100 text-amber-950 font-bold rounded-xl border border-amber-300 transition-all flex items-center justify-center gap-1.5 text-sm cursor-pointer shadow-xs text-center w-full sm:w-auto"
                >
                  <MapPin className="w-4 h-4 text-amber-700" />
                  <span>Admissions & Contact</span>
                </button>
              </div>

              {/* Verified Institutional Features */}
              <div className="pt-3 border-t border-slate-300/80">
                <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs text-slate-700 text-center lg:text-left bg-white/80 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 animate-pulse" />
                    <span className="font-bold text-slate-900">WBBSE & WBCHSE Recognized</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
                    <span className="font-semibold text-slate-800">Co-Educational V-XII</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-600/20" />
                    <span className="font-semibold text-slate-800">Modern Science & ICT Labs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Prominently Showcasing the Antique Engraved School Seal & Campus Media */}
            <div className="lg:col-span-5">
              <TerracottaArchFrame className="max-w-lg mx-auto" innerClassName="bg-white">
                <div className="relative p-4 sm:p-5 bg-white space-y-4 rounded-2xl border border-blue-100 shadow-xl">
                  <CornerFlourish position="top-left" color="#b45309" />
                  <CornerFlourish position="top-right" color="#b45309" />
                  <CornerFlourish position="bottom-left" color="#b45309" />
                  <CornerFlourish position="bottom-right" color="#b45309" />

                  {/* Photo Display: Shows Verified Campus Visual with Antique Embossed Seal */}
                  <div className="relative rounded-xl overflow-hidden border-2 border-amber-400/60 bg-slate-100 aspect-[4/3] group shadow-md">
                    <img
                      src={schoolBuildingImg}
                      alt="Official School Campus Photograph - Deshbandhu Palli Seva Sangha Santosh Kumari Siksha Niketan"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark Bottom Vignette Overlay to make caption crisp */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-between p-4">
                      {/* Top Gilded Badge */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 px-2.5 py-0.5 rounded-full shadow-md">
                          Official Campus
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/90 p-0.5 border border-amber-400/60 backdrop-blur-sm flex items-center justify-center shadow">
                          <SchoolLogo size={28} />
                        </div>
                      </div>

                      {/* Bottom Caption */}
                      <div>
                        <p className="text-xs sm:text-sm text-white font-bold drop-shadow">
                          {heroPhoto?.caption || 'Deshbandhu Palli Seva Sangha Santosh Kumari Siksha Niketan'}
                        </p>
                        <p className="text-[10px] text-amber-300 font-medium tracking-wide drop-shadow-sm">
                          A Legacy of Experience, A Future of Inspiration
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stat Tiles with Light Blue & Amber Accents */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-200/80 flex items-center gap-3 shadow-xs">
                      <div className="p-2 rounded-lg bg-blue-100 text-blue-900 shrink-0 border border-blue-200">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-lg font-black text-blue-950 leading-tight">1,200+</p>
                        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Active Students</p>
                      </div>
                    </div>

                    <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200/80 flex items-center gap-3 shadow-xs">
                      <div className="p-2 rounded-lg bg-amber-100 text-amber-900 shrink-0 border border-amber-300">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-lg font-black text-amber-950 leading-tight">100%</p>
                        <p className="text-[10px] text-amber-800/90 font-bold uppercase tracking-wider">Board Success</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Announcements Strip */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Recent Circulars
                      </span>
                      <button
                        id="hero-quick-notices-link"
                        onClick={onViewNotices}
                        className="text-[11px] text-blue-800 hover:text-blue-950 font-bold underline cursor-pointer"
                      >
                        All ({latestNotices.length})
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {latestNotices.slice(0, 2).map((n) => (
                        <div
                          key={n.id}
                          onClick={() => onSelectNotice(n)}
                          className="p-2 rounded-lg bg-white hover:bg-blue-50/80 border border-slate-200 hover:border-blue-300 cursor-pointer transition-colors shadow-xs"
                        >
                          <p className="text-xs font-medium text-slate-800 line-clamp-1">
                            {n.title}
                          </p>
                          <div className="flex items-center justify-between text-[10px] text-slate-500 mt-0.5">
                            <span className="text-amber-800 font-bold">{n.category}</span>
                            <span>{new Date(n.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </TerracottaArchFrame>
            </div>

          </div>
        </div>
      </div>

      {/* Institutional Heritage Stats Banner with 38+ Teachers in Light Aesthetic */}
      <div className="bg-white border-t border-b border-slate-200 py-6 px-4 relative z-10 shadow-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-3 border-r border-slate-200 last:border-r-0">
            <p className="text-2xl sm:text-3xl font-black text-blue-950 font-serif">58+ Years</p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">Foundational Legacy (1968)</p>
          </div>
          <div className="p-3 border-r border-slate-200 last:border-r-0">
            <p className="text-2xl sm:text-3xl font-black text-blue-950 font-serif">38+ Teachers</p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">Dedicated Faculty & Staff</p>
          </div>
          <div className="p-3 border-r border-slate-200 last:border-r-0">
            <p className="text-2xl sm:text-3xl font-black text-blue-950 font-serif">Class V - XII</p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">Science & Humanities Streams</p>
          </div>
          <div className="p-3">
            <p className="text-2xl sm:text-3xl font-black text-blue-950 font-serif">100% Free</p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">Govt. Books & Mid-Day Meal</p>
          </div>
        </div>
      </div>
    </section>
  );
};



