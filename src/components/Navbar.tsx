import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Lock, 
  Bell, 
  GraduationCap, 
  ChevronRight,
  BookOpen,
  Image as ImageIcon,
  Building,
  Home,
  Info,
  MapPin,
  Sparkles
} from 'lucide-react';
import { AdminUser } from '../types';
import { MandalaEmblem } from './IndianArtDecorations';
import { SchoolLogo } from './SchoolLogo';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  adminUser: AdminUser | null;
  onAdminClick: () => void;
  unreadNoticesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  adminUser,
  onAdminClick,
  unreadNoticesCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About & Heritage', icon: Info },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { 
      id: 'notices', 
      label: 'Notice Board', 
      icon: Bell, 
      badge: unreadNoticesCount > 0 ? unreadNoticesCount : null 
    },
    { id: 'facilities', label: 'Campus & Facilities', icon: Building },
    { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
    { id: 'contact', label: 'Admissions & Contact', icon: MapPin },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-md transition-all border-b border-blue-200">
      {/* Top Institutional Utility Bar with Clean Light Aesthetic */}
      <div className="bg-slate-100 text-slate-700 text-xs py-1.5 px-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Official Contact & Timing */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5 text-blue-900 hover:text-blue-950 transition-colors font-semibold">
              <Mail className="w-3.5 h-3.5 text-blue-700" />
              <a href="mailto:dpssksn@gmail.com" className="font-mono text-xs">dpssksn@gmail.com</a>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-slate-600 font-medium">
              <Clock className="w-3.5 h-3.5 text-blue-700" />
              <span>Office: 10:30 AM - 4:30 PM (Mon - Sat)</span>
            </div>
          </div>

          {/* Affiliation Badges & Administrative Portal */}
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1 bg-blue-50 text-blue-950 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-blue-200">
              <Sparkles className="w-3 h-3 text-blue-700" />
              Govt. Sponsored • WBBSE & WBCHSE Affiliated
            </span>
            
            {/* Discreet Admin Link */}
            <button
              id="top-admin-login-link"
              onClick={onAdminClick}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-all font-medium border ${
                adminUser
                  ? 'bg-emerald-700 border-emerald-500 text-white hover:bg-emerald-600'
                  : 'bg-white text-blue-950 border-slate-300 hover:bg-slate-50 font-bold shadow-xs'
              }`}
              title={adminUser ? 'Open Admin Control Panel' : 'School Admin Portal'}
            >
              {adminUser ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Admin ({adminUser.name.split(' ')[0]})</span>
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3 text-blue-900" />
                  <span>Admin Portal</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Royal Blue & Crisp White Brand Header */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 text-white py-3.5 px-4 overflow-hidden border-b-2 border-blue-600 shadow-md">
        {/* Subtle Background Indian Mandala Watermark */}
        <div className="absolute right-4 -top-8 pointer-events-none opacity-10 hidden md:block">
          <MandalaEmblem size={180} color="#ffffff" />
        </div>

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 relative z-10">
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group flex-1 min-w-0"
          >
            {/* Official School Emblem Seal Logo */}
            <div className="relative shrink-0 group-hover:scale-105 transition-transform drop-shadow-md">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white p-0.5 shadow-xl border-2 border-white ring-2 ring-blue-300 flex items-center justify-center">
                <SchoolLogo size="100%" />
              </div>
            </div>

            {/* School Full Name in ALL CAPITAL LETTERS on a Single Horizontal Line */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xs sm:text-base md:text-lg lg:text-xl font-black text-white tracking-wide uppercase font-serif leading-tight truncate">
                DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN
              </h1>
              <p className="text-[10px] sm:text-xs text-blue-100 mt-1 flex items-center gap-2 font-medium">
                <span>Govt. Sponsored Higher Secondary (10+2) Co-Educational Institution</span>
                <span className="hidden sm:inline text-blue-300">•</span>
                <span className="hidden sm:inline text-white font-semibold">ESTD. 1968</span>
              </p>
            </div>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white text-blue-950 hover:bg-blue-50 transition-colors shadow-md font-bold"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-blue-950" /> : <Menu className="w-6 h-6 text-blue-950" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Main Navigation Bar in Royal Blue and Crisp White */}
      <nav className="hidden md:block bg-blue-900 text-white px-4 border-b border-blue-800 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <ul className="flex items-center space-x-1 py-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs lg:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-blue-950 font-bold shadow-md'
                        : 'text-blue-100 hover:text-white hover:bg-blue-800'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-900' : 'text-blue-200'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-1 px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[10px] font-extrabold animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 py-1">
            <button
              id="quick-admission-btn"
              onClick={() => handleNavClick('contact')}
              className="px-4 py-1.5 bg-white hover:bg-blue-50 text-blue-950 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 border border-blue-200 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-800" />
              <span>Admissions 2026</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-drawer-menu"
          className="md:hidden bg-blue-900 text-white px-4 py-4 border-b border-blue-800 shadow-2xl space-y-1"
        >
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-white text-blue-950 font-bold'
                        : 'text-slate-100 hover:bg-blue-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-900' : 'text-blue-200'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-xs font-bold animate-pulse">
                        {item.badge} New
                      </span>
                    )}
                  </button>
                </li>
              );
            })}

            <li className="pt-3 border-t border-blue-900">
              <button
                id="mobile-admin-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onAdminClick();
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium bg-white text-blue-950 hover:bg-blue-50 transition-colors font-bold shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-blue-900" />
                  <span>{adminUser ? 'Authorized Admin Panel' : 'Admin Portal'}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-900" />
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};


