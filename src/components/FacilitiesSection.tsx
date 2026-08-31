import React, { useState, useEffect } from 'react';
import { 
  FlaskConical, 
  Monitor, 
  BookOpen, 
  Trophy, 
  Utensils, 
  Droplet, 
  Sun, 
  ShieldCheck,
  Building,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { 
  scienceLabImg, 
  computerLabImg, 
  libraryImg, 
  sportsFieldImg 
} from '../assets/images';
import { 
  AlpanaDivider, 
  CornerFlourish, 
  MandalaEmblem 
} from './IndianArtDecorations';
import { fetchSchoolPhotos, getStoredMedia } from '../services/api';
import { FacilityPhotosData, SchoolMediaData } from '../types';

export const FacilitiesSection: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState<number | null>(null);
  const [customFacilities, setCustomFacilities] = useState<FacilityPhotosData>(() => {
    try {
      const stored = getStoredMedia();
      return stored?.facilityPhotos || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    fetchSchoolPhotos()
      .then((data) => {
        if (data && data.facilityPhotos) {
          setCustomFacilities(data.facilityPhotos);
        }
      })
      .catch(() => {
        // Fallback safely to default facility illustrations
      });

    const handleMediaUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<SchoolMediaData>;
      if (customEvent.detail?.facilityPhotos) {
        setCustomFacilities(customEvent.detail.facilityPhotos);
      }
    };

    window.addEventListener('dpss_media_updated', handleMediaUpdated);
    return () => window.removeEventListener('dpss_media_updated', handleMediaUpdated);
  }, []);

  const facilities = [
    {
      icon: FlaskConical,
      title: 'Advanced Science Laboratories',
      subtitle: 'Physics, Chemistry & Life Sciences',
      image: customFacilities.scienceLab?.url || scienceLabImg,
      badge: 'Upgraded Labs',
      description: 'Fully equipped modern experimental apparatus, optical microscopes, chemical reagents, and demonstration charts enabling hands-on practical inquiry.',
      features: ['Optical & Compound Microscopes', 'Titration & Chemical Stations', 'Anatomical Models & Botanical Herbarium', 'Safety Eyewash & Fire Safety Systems'],
      color: 'bg-blue-50 text-blue-900 border-blue-200',
    },
    {
      icon: Monitor,
      title: 'Computer Science & ICT Lab',
      subtitle: 'Digital Education & Programming',
      image: customFacilities.computerLab?.url || computerLabImg,
      badge: 'High Speed LAN',
      description: 'Modern networked desktop workstations with broadband internet, projection screen, and digital literacy tools for Classes VI to XII.',
      features: ['30+ High-Performance Workstations', 'Scratch, Python & C++ Compilers', 'Multimedia Interactive Smart Projector', 'Solar & Inverter Power Backup'],
      color: 'bg-blue-50 text-blue-900 border-blue-200',
    },
    {
      icon: BookOpen,
      title: 'Central Library & Reading Sanctuary',
      subtitle: '6,000+ Books & Reference Archive',
      image: customFacilities.library?.url || libraryImg,
      badge: 'Digital Catalog',
      description: 'Extensive repository of textbooks, academic journals, national dailies, literary classics, reference encyclopedias, and quiet study alcoves.',
      features: ['Classic Literary Collections', 'NCERT & WBBSE Reference Books', 'Competitive Exam Preparation Corner', 'Automated Barcode Book Lending'],
      color: 'bg-blue-50 text-blue-900 border-blue-200',
    },
    {
      icon: Trophy,
      title: 'Vast Sports Field & Athletic Ground',
      subtitle: 'Football, Cricket & Yoga Pavilions',
      image: customFacilities.sportsField?.url || sportsFieldImg,
      badge: 'Athletic Arena',
      description: 'Sprawling lush green outfield for track and field events, football tournaments, morning yoga, and athletic training.',
      features: ['Full-Size Football & Cricket Pitch', '200m Grass Running Track', 'Volleyball & Badminton Courts', 'Annual Athletic Championship Arena'],
      color: 'bg-blue-50 text-blue-900 border-blue-200',
    },
    {
      icon: Utensils,
      title: 'Hygienic Mid-Day Meal Kitchen & Dining',
      subtitle: 'Nutritious & Wholesome Cooked Meals',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop',
      badge: '100% Quality Checked',
      description: 'Dedicated clean kitchen and covered dining hall serving daily hot, balanced, nutritious mid-day meals in accordance with Govt. health guidelines.',
      features: ['Filtered Potable Cooking Water', 'Nutritional Menu with Eggs & Pulses', 'Stainless Steel Dining Utensils', 'Regular Public Health Inspections'],
      color: 'bg-blue-50 text-blue-900 border-blue-200',
    },
    {
      icon: Droplet,
      title: 'Multi-Stage RO Drinking Water & Sanitation',
      subtitle: 'Clean Vidyalaya Standard',
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?q=80&w=600&auto=format&fit=crop',
      badge: 'Pure Mineral Aqua',
      description: 'Multi-stage RO water filtration systems installed across academic wings, with modern separated washrooms for boys, girls, and differently abled students.',
      features: ['4-Stage UV+RO Water Coolers', 'Separate High-Hygiene Restrooms', 'Incinerator & Sanitary Napkin Dispensers', 'Periodic Microbial Water Testing'],
      color: 'bg-blue-50 text-blue-900 border-blue-200',
    },
    {
      icon: Sun,
      title: 'Solar Powered Green Eco-Campus',
      subtitle: 'Renewable Energy & Botanical Groves',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=600&auto=format&fit=crop',
      badge: 'Green Energy',
      description: 'Solar panel installation providing uninterrupted power backup for laboratories and classrooms while instilling ecological responsibility in students.',
      features: ['10 kW Grid-Connected Solar Rooftop', 'Rainwater Harvesting Recharge Pit', 'Medicinal Herbal Garden (Neem, Tulsi, Amla)', 'Zero Plastic Campus Protocol'],
      color: 'bg-blue-50 text-blue-900 border-blue-200',
    },
    {
      icon: ShieldCheck,
      title: 'Safety, CCTV & First Aid Room',
      subtitle: '24/7 Student Welfare & Emergency Care',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop',
      badge: '24/7 Security',
      description: '24/7 security surveillance, emergency first-aid station with trained attendants, emergency oxygen, and strict anti-ragging institutional policies.',
      features: ['Campus-Wide High-Definition CCTV', 'First-Aid Room with Emergency Stretcher', 'Trained Faculty First Responders', 'Fire Extinguishers on Every Floor'],
      color: 'bg-blue-50 text-blue-900 border-blue-200',
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen relative overflow-hidden">
      
      {/* Background Motif Watermarks */}
      <div className="absolute left-4 top-24 pointer-events-none opacity-5 hidden lg:block">
        <MandalaEmblem size={280} color="#1d4ed8" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header in Royal Blue & White */}
        <div className="text-center max-w-4xl mx-auto space-y-3">

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/10 text-blue-950 text-xs font-bold uppercase tracking-wider border border-blue-200">
            <Building className="w-3.5 h-3.5 text-blue-800" />
            <span>Infrastructure of Academic Excellence</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-950 tracking-tight font-serif uppercase">
            DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN
          </h1>
          <p className="text-blue-900 font-semibold text-sm sm:text-base font-sans">
            Campus Infrastructure, Modern Laboratories & Sports Facilities
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            Combining serene institutional architecture with modern laboratory instruments, ICT smart classrooms, and sprawling sports grounds.
          </p>

          <AlpanaDivider />
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-700 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Facility Card Image Banner */}
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img 
                      src={fac.image} 
                      alt={fac.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 right-3 text-[10px] font-black uppercase tracking-wider bg-blue-900 text-white px-2.5 py-0.5 rounded-full shadow border border-blue-400">
                      {fac.badge}
                    </span>

                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold shadow">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-white drop-shadow">
                        {fac.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-black text-slate-900 group-hover:text-blue-900 transition-colors font-serif">
                      {fac.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {fac.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {fac.features.slice(0, 2).map((feat, fidx) => (
                        <div key={fidx} className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                          <CheckCircle2 className="w-3 h-3 text-blue-700 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => setSelectedFacility(idx)}
                    className="w-full py-2 bg-blue-50 hover:bg-blue-900 text-blue-950 hover:text-white border border-blue-200 hover:border-blue-900 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View Specifications</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Detailed Facility Specification */}
        {selectedFacility !== null && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border-2 border-blue-900 shadow-2xl relative animate-scale-in">
              <CornerFlourish position="top-left" color="#1d4ed8" />
              <CornerFlourish position="bottom-right" color="#1d4ed8" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 font-serif">
                      {facilities[selectedFacility].title}
                    </h3>
                    <p className="text-xs text-blue-900 font-bold">
                      {facilities[selectedFacility].subtitle}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-4">
                <div className="rounded-2xl overflow-hidden h-48 border border-slate-200">
                  <img
                    src={facilities[selectedFacility].image}
                    alt={facilities[selectedFacility].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {facilities[selectedFacility].description}
                </p>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Key Infrastructure Capabilities:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {facilities[selectedFacility].features.map((f, fidx) => (
                      <div key={fidx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-800 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="px-5 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};


