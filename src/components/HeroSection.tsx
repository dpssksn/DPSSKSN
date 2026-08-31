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
import { Notice, HeroPhotoData } from '../types';
import { fetchSchoolPhotos } from '../services/api';
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
  const [heroPhoto, setHeroPhoto] = useState<HeroPhotoData | null>(null);

  useEffect(() => {
    fetchSchoolPhotos()
      .then((data) => {
        if (data && data.heroPhoto) {
          setHeroPhoto(data.heroPhoto);
        }
      })
      .catch(() => {
        // Safe graceful fallback to default campus visual
      });
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Live Breaking News Ticker Strip in Deep Charcoal & Gilded Gold */}
      <div className="bg-slate-900/95 text-white px-4 py-2 text-xs sm:text-sm font-semibold flex items-center shadow-lg border-b border-amber-500/20 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto w-full flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shrink-0 shadow-md border border-amber-300">
            <Bell className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
            <span>LATEST NOTICE</span>
          </div>

          <div className="overflow-hidden relative flex-1">
            {breakingNotice ? (
              <button
                id="breaking-notice-ticker"
                onClick={() => onSelectNotice(breakingNotice)}
                className="text-left font-semibold hover:underline truncate block w-full text-amber-100 hover:text-white transition-all text-xs sm:text-sm cursor-pointer"
              >
                <span className="font-black bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded text-[11px] mr-2 border border-amber-500/40">
                  {breakingNotice.category}
                </span>
                {breakingNotice.title}
                <span className="ml-2 text-slate-300 text-xs font-normal">
                  ({new Date(breakingNotice.publishedAt).toLocaleDateString('en-IN')})
                </span>
              </button>
            ) : (
              <p className="truncate text-slate-300 font-medium">
                Welcome to Deshbandhu Palli Seva Sangha Santosh Kumari Siksha Niketan official portal.
              </p>
            )}
          </div>

          <button
            id="ticker-view-all-btn"
            onClick={onViewNotices}
            className="hidden sm:flex items-center gap-1 text-xs font-extrabold text-slate-950 hover:bg-white bg-amber-400 hover:bg-amber-300 px-3 py-1 rounded-full transition-all shrink-0 cursor-pointer shadow-sm"
          >
            All Notices <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Hero Cinematic Presentation */}
      <div className="relative min-h-[620px] lg:min-h-[700px] flex items-center py-12 lg:py-20">
        {/* Desktop / Monitor Cinematic Background (hidden on smartphone screens) */}
        <div 
          className="hidden sm:block absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transform transition-transform duration-1000 scale-[1.01]"
          style={{
            backgroundImage: `url(${heroPhoto?.url || schoolBuildingImg})`,
          }}
        />

        {/* Smartphone Portrait Only 9:16 Custom Background (hidden on desktop/monitors) */}
        <div 
          className="block sm:hidden absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transform transition-transform duration-1000 scale-[1.01]"
          style={{
            backgroundImage: `url(${mobileHeroBgImg})`,
          }}
        />

        {/* Sophisticated Cinematic Lighting & Vignette Overlay */}
        {/* Desktop Overlay */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/90 z-0" />
        {/* Mobile Overlay specifically balanced to highlight the portrait background art */}
        <div className="block sm:hidden absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/75 to-slate-950/95 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-slate-950/90 z-0 pointer-events-none" />
        
        {/* Subtle Decorative Aged Gold Watermarks */}
        <div className="absolute left-8 top-12 pointer-events-none opacity-10 hidden lg:block">
          <MandalaEmblem size={340} color="#d97706" />
        </div>
        <div className="absolute right-12 bottom-12 pointer-events-none opacity-10 hidden lg:block">
          <MandalaEmblem size={300} color="#d97706" />
        </div>

        {/* Safe-area Central Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Motto / Coat & Establishment Badges */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center lg:items-start justify-center lg:justify-start gap-2.5">
                <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-950/90 to-slate-900 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-black tracking-wider uppercase backdrop-blur-md shadow-lg">
                  <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>A LEGACY OF EXPERIENCE, A FUTURE OF INSPIRATION</span>
                </div>

                <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 text-xs font-semibold backdrop-blur-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Estd. 1968 • Govt. Sponsored</span>
                </div>
              </div>

              {/* Grand School Name Showcase */}
              <div className="relative">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-black text-white tracking-tight leading-[1.2] uppercase font-serif drop-shadow-2xl text-center lg:text-left">
                  DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN
                </h1>

                {/* Prominent Motto Banner Callout */}
                <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-transparent border-t-2 sm:border-t-0 sm:border-l-4 border-amber-500 backdrop-blur-sm text-center lg:text-left">
                  <p className="text-xs sm:text-sm font-semibold tracking-wide text-amber-200 uppercase font-serif flex items-center justify-center lg:justify-start gap-2">
                    <Quote className="w-4 h-4 text-amber-400 shrink-0" />
                    &ldquo;A Legacy of Experience, A Future of Inspiration&rdquo;
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    A venerable institution of scholastic excellence, moral character, and scientific inquiry. Dedicated to quality higher secondary education, holistic student development, and community welfare since 1968.
                  </p>
                </div>
              </div>

              {/* Action Buttons with Center-Aligned Mobile Layout */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-2 max-w-md sm:max-w-none mx-auto lg:mx-0 w-full">
                <button
                  id="hero-notice-board-btn"
                  onClick={onViewNotices}
                  className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl shadow-2xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer border border-amber-200 active:scale-95 text-center w-full sm:w-auto"
                >
                  <Bell className="w-4 h-4 text-slate-950" />
                  <span>Official Notice Board</span>
                  {latestNotices.length > 0 && (
                    <span className="ml-1 px-2 py-0.5 bg-slate-950 text-amber-300 text-xs rounded-full font-black">
                      {latestNotices.length}
                    </span>
                  )}
                </button>

                <button
                  id="hero-academics-btn"
                  onClick={onExploreAcademics}
                  className="px-5 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-white font-bold rounded-xl border border-amber-500/30 hover:border-amber-400/60 backdrop-blur-md transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer shadow-md text-center w-full sm:w-auto"
                >
                  <BookCheck className="w-4 h-4 text-amber-400" />
                  <span>Curriculum & Streams</span>
                </button>

                <button
                  id="hero-contact-btn"
                  onClick={onContactClick}
                  className="px-4 py-3.5 bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white font-medium rounded-xl border border-slate-800 transition-all flex items-center justify-center gap-1.5 text-sm cursor-pointer text-center w-full sm:w-auto"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Admissions & Contact</span>
                </button>
              </div>

              {/* Verified Institutional Features */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-5 text-xs text-slate-300 text-center lg:text-left">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20 animate-pulse" />
                  <span className="font-semibold text-white">WBBSE & WBCHSE Recognized</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-amber-400/20" />
                  <span>Co-Educational V-XII</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-400 ring-4 ring-blue-400/20" />
                  <span>Modern Science & ICT Labs</span>
                </div>
              </div>
            </div>

            {/* Right Column - Prominently Showcasing the Antique Engraved School Seal & Campus Media */}
            <div className="lg:col-span-5">
              <TerracottaArchFrame className="max-w-lg mx-auto">
                <div className="relative p-3.5 bg-slate-950/95 space-y-4 rounded-2xl border border-amber-500/30 shadow-2xl backdrop-blur-xl">
                  <CornerFlourish position="top-left" color="#d97706" />
                  <CornerFlourish position="top-right" color="#d97706" />
                  <CornerFlourish position="bottom-left" color="#d97706" />
                  <CornerFlourish position="bottom-right" color="#d97706" />

                  {/* Photo Display: Shows Owner Attached Photo or Official Building Visual with Antique Embossed Seal */}
                  <div className="relative rounded-xl overflow-hidden border-2 border-amber-500/40 bg-slate-950 aspect-[4/3] group shadow-2xl">
                    <img
                      src={heroPhoto?.url || schoolBuildingImg}
                      alt="Official School Campus Photograph - Deshbandhu Palli Seva Sangha Santosh Kumari Siksha Niketan"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark Gilded Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-between p-4">
                      {/* Top Gilded Badge */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 px-2.5 py-0.5 rounded-full shadow-md">
                          Official Campus
                        </span>
                        <div className="w-8 h-8 rounded-full bg-slate-950/80 p-0.5 border border-amber-500/50 backdrop-blur-sm flex items-center justify-center">
                          <SchoolLogo size={28} />
                        </div>
                      </div>

                      {/* Bottom Caption */}
                      <div>
                        <p className="text-xs sm:text-sm text-white font-bold drop-shadow">
                          {heroPhoto?.caption || 'Deshbandhu Palli Seva Sangha Santosh Kumari Siksha Niketan'}
                        </p>
                        <p className="text-[10px] text-amber-300 font-medium tracking-wide">
                          A Legacy of Experience, A Future of Inspiration
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stat Tiles with Golden Accents */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-slate-900/90 p-3 rounded-xl border border-amber-500/20 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-950/60 text-amber-400 shrink-0 border border-amber-500/30">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-lg font-black text-white leading-tight">1,200+</p>
                        <p className="text-[10px] text-amber-200/80 uppercase tracking-wider">Active Students</p>
                      </div>
                    </div>

                    <div className="bg-slate-900/90 p-3 rounded-xl border border-amber-500/20 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-950/60 text-amber-400 shrink-0 border border-amber-500/30">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-lg font-black text-white leading-tight">100%</p>
                        <p className="text-[10px] text-amber-200/80 uppercase tracking-wider">Board Success</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Announcements Strip */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Recent Circulars
                      </span>
                      <button
                        id="hero-quick-notices-link"
                        onClick={onViewNotices}
                        className="text-[11px] text-amber-400 hover:text-amber-300 underline font-semibold cursor-pointer"
                      >
                        All ({latestNotices.length})
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {latestNotices.slice(0, 2).map((n) => (
                        <div
                          key={n.id}
                          onClick={() => onSelectNotice(n)}
                          className="p-2 rounded-lg bg-slate-950/90 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-colors"
                        >
                          <p className="text-xs font-medium text-slate-200 line-clamp-1">
                            {n.title}
                          </p>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
                            <span className="text-amber-400 font-bold">{n.category}</span>
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

      {/* Institutional Heritage Stats Banner with 38+ Teachers */}
      <div className="bg-slate-950 border-t border-b border-amber-500/20 py-6 px-4 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-3 border-r border-slate-800/80 last:border-r-0">
            <p className="text-2xl sm:text-3xl font-black text-amber-300 font-serif">58+ Years</p>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Foundational Legacy (1968)</p>
          </div>
          <div className="p-3 border-r border-slate-800/80 last:border-r-0">
            <p className="text-2xl sm:text-3xl font-black text-amber-300 font-serif">38+ Teachers</p>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Dedicated Faculty & Staff</p>
          </div>
          <div className="p-3 border-r border-slate-800/80 last:border-r-0">
            <p className="text-2xl sm:text-3xl font-black text-amber-300 font-serif">Class V - XII</p>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Science & Humanities Streams</p>
          </div>
          <div className="p-3">
            <p className="text-2xl sm:text-3xl font-black text-amber-300 font-serif">100% Free</p>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Govt. Books & Mid-Day Meal</p>
          </div>
        </div>
      </div>
    </section>
  );
};



