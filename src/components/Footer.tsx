import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Lock, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { AdminUser } from '../types';
import { MandalaEmblem } from './IndianArtDecorations';
import { SchoolLogo } from './SchoolLogo';

interface FooterProps {
  onNavigate: (tab: string) => void;
  adminUser: AdminUser | null;
  onAdminClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  adminUser,
  onAdminClick,
}) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (tab: string) => {
    onNavigate(tab);
  };

  return (
    <footer className="bg-blue-950 text-slate-200 border-t-4 border-blue-600 relative overflow-hidden">
      
      {/* Background Mandala Watermark */}
      <div className="absolute right-6 top-10 pointer-events-none opacity-5">
        <MandalaEmblem size={260} color="#60a5fa" />
      </div>

      {/* Upper Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: School Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-14 h-14 rounded-full bg-white p-0.5 shadow-xl shrink-0 mt-0.5 border-2 border-white ring-2 ring-blue-400 flex items-center justify-center">
                <SchoolLogo size="100%" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-tight font-serif leading-snug">
                  DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN
                </h3>
                <p className="text-[11px] text-blue-300 font-medium mt-0.5">Estd. 1968 • Govt. Sponsored Higher Secondary Institution</p>
              </div>
            </div>

            <p className="text-xs text-blue-100/80 leading-relaxed font-sans">
              Dedicated to awakening human potential through rigorous academic curricula, moral ethos rooted in institutional discipline, science laboratory research, and active social service.
            </p>

            <div className="pt-2 text-xs space-y-1.5 text-blue-100">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>WBBSE Index: <strong className="text-white font-mono">S2-108</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>WBCHSE Code: <strong className="text-white font-mono">10245</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-300" />
                <span>UDISE Plus: <strong className="text-cyan-200 font-mono">19181200000</strong></span>
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-blue-800 pb-2 font-serif flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              Website Sections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white text-blue-200 transition-colors text-left font-medium cursor-pointer"
                >
                  › Home & Campus Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white text-blue-200 transition-colors text-left font-medium cursor-pointer"
                >
                  › Institutional History & Ethos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('academics')}
                  className="hover:text-white text-blue-200 transition-colors text-left font-medium cursor-pointer"
                >
                  › Academic Streams & Routine
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('notices')}
                  className="hover:text-white text-blue-100 transition-colors text-left font-bold cursor-pointer"
                >
                  › Official Notice Board
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-white text-blue-200 transition-colors text-left font-medium cursor-pointer"
                >
                  › Photo Gallery & Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('facilities')}
                  className="hover:text-white text-blue-200 transition-colors text-left font-medium cursor-pointer"
                >
                  › Laboratories & Sports Field
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white text-blue-200 transition-colors text-left font-medium cursor-pointer"
                >
                  › School Administrative Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Portals */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-blue-800 pb-2 font-serif">
              Govt. Portals
            </h4>
            <ul className="space-y-2 text-xs text-blue-200">
              <li>
                <a
                  href="https://wbbse.wb.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  WBBSE Official <ExternalLink className="w-3 h-3 text-blue-300" />
                </a>
              </li>
              <li>
                <a
                  href="https://wbchse.wb.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  WBCHSE Official <ExternalLink className="w-3 h-3 text-blue-300" />
                </a>
              </li>
              <li>
                <a
                  href="https://banglarsiksha.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Banglar Shiksha <ExternalLink className="w-3 h-3 text-blue-300" />
                </a>
              </li>
              <li>
                <a
                  href="https://wbsed.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Dept. of Education <ExternalLink className="w-3 h-3 text-blue-300" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Address & Helpline */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-blue-800 pb-2 font-serif">
              Campus Desk
            </h4>
            <div className="space-y-2.5 text-xs text-blue-200">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                <span>Palli Seva Sangha, South 24 Parganas, WB</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-300 shrink-0" />
                <a href="mailto:dpssksn@gmail.com" className="text-blue-100 hover:text-white hover:underline font-mono">
                  dpssksn@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-300 shrink-0" />
                <span className="font-mono text-white">+91 94340 00000</span>
              </p>
            </div>

            {/* Anti-Ragging & Child Helpline */}
            <div className="pt-2">
              <div className="bg-blue-900/60 p-3 rounded-xl border border-blue-800 text-[11px] text-blue-200 space-y-1">
                <p className="font-bold text-white">National Helplines:</p>
                <p>Childline: <span className="text-white font-mono font-bold">1098</span></p>
                <p>Anti-Ragging: <span className="text-white font-mono font-bold">1800-180-5522</span></p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Sub-Footer Bar with Discreet Admin Access */}
      <div className="bg-blue-950/95 py-4 px-4 border-t border-blue-900 text-xs text-blue-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="font-serif">
            © {currentYear} <strong className="text-white">DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN</strong>. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-[11px] text-blue-300 hidden sm:inline">
              Co-Educational Govt. Sponsored Institution
            </span>

            {/* Discreet Admin Login Link in Footer */}
            <button
              id="footer-admin-login-link"
              onClick={onAdminClick}
              className="inline-flex items-center gap-1.5 text-[11px] text-blue-200 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-blue-900 border border-blue-800 hover:border-blue-400 cursor-pointer"
              title="Official Staff and Administration Login"
            >
              <Lock className="w-3 h-3 text-blue-300" />
              <span className="font-medium">{adminUser ? 'Admin Portal Active' : 'Staff Portal'}</span>
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};


