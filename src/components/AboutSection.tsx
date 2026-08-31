import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  History, 
  Target, 
  Eye, 
  Award, 
  CheckCircle2, 
  HeartHandshake, 
  Quote,
  GraduationCap,
  Users,
  Calendar,
  Compass,
  Image as ImageIcon
} from 'lucide-react';
import { fetchSchoolPhotos, getStoredMedia } from '../services/api';
import { HeroPhotoData, SchoolMediaData } from '../types';
import { SchoolLogo } from './SchoolLogo';
import { schoolBuildingImg, somnathPalImg } from '../assets/images';
import { 
  AlpanaDivider, 
  MandalaEmblem, 
  CornerFlourish 
} from './IndianArtDecorations';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'history' | 'ethos' | 'committee' | 'faculty'>('history');
  const [schoolPhoto, setSchoolPhoto] = useState<HeroPhotoData | null>(() => {
    try {
      const stored = getStoredMedia();
      return stored?.aboutPhoto || stored?.heroPhoto || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    fetchSchoolPhotos()
      .then((data) => {
        if (data) {
          setSchoolPhoto(data.aboutPhoto || data.heroPhoto || null);
        }
      })
      .catch(() => {
        // Fallback safely to default building visual
      });

    const handleMediaUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<SchoolMediaData>;
      if (customEvent.detail !== undefined) {
        setSchoolPhoto(customEvent.detail?.aboutPhoto || customEvent.detail?.heroPhoto || null);
      }
    };

    window.addEventListener('dpss_media_updated', handleMediaUpdated);
    return () => window.removeEventListener('dpss_media_updated', handleMediaUpdated);
  }, []);

  const facultyMembers = [
    { name: 'Somnath Pal', role: 'Headmaster & Secretary', qualification: 'Head of Institution', exp: '26+ Yrs', dept: 'Administration' },
    { name: 'Smt. Ananya Banerjee', role: 'Assistant Headmistress', qualification: 'M.A. (Literature), B.Ed.', exp: '22 Yrs', dept: 'Languages & Arts' },
    { name: 'Sri Prabir Kumar Das', role: 'Senior Teacher (HS)', qualification: 'M.Sc. (Mathematics), B.Ed.', exp: '20 Yrs', dept: 'Mathematics' },
    { name: 'Sri Debashis Sen', role: 'Senior Teacher', qualification: 'M.Sc. (Chemistry), B.Ed.', exp: '18 Yrs', dept: 'Physical Sciences' },
    { name: 'Smt. Mousumi Chatterjee', role: 'Assistant Teacher', qualification: 'M.Sc. (Botany), B.Ed.', exp: '15 Yrs', dept: 'Life Sciences' },
    { name: 'Sri Tanmoy Mondal', role: 'Assistant Teacher', qualification: 'M.A. (English), B.Ed.', exp: '14 Yrs', dept: 'Languages' },
    { name: 'Sri Subhash Ghosh', role: 'Assistant Teacher', qualification: 'M.A. (History), B.Ed.', exp: '16 Yrs', dept: 'Social Sciences' },
    { name: 'Sri Amitava Dutta', role: 'Physical Education Instructor', qualification: 'B.P.Ed., M.P.Ed.', exp: '12 Yrs', dept: 'Sports & Athletics' },
  ];

  const managingCommittee = [
    { name: 'Sri Bimal Krishna Ghosh', designation: 'President, Managing Committee', background: 'Eminent Educationist & Philanthropist' },
    { name: 'Somnath Pal', designation: 'Secretary & Headmaster (Ex-Officio)', background: 'Institution Administrator' },
    { name: 'Sri Mihir Kumar Naskar', designation: 'Panchayat / Govt. Nominee', background: 'Local Administration Representative' },
    { name: 'Smt. Rina Sarkar', designation: 'Medical Officer / Health Nominee', background: 'Community Health Liaison' },
    { name: 'Sri Subhasish Paul', designation: 'Teacher Representative (TR)', background: 'Faculty Coordinator' },
    { name: 'Smt. Kakali Majumdar', designation: 'Guardian Representative (GR)', background: 'Parent-Teacher Association Lead' },
  ];

  const milestones = [
    { year: '1968', title: 'Sacred Genesis', desc: 'Deshbandhu Palli Seva Sangha establishes the school with dedication to rural child education under Smt. Santosh Kumari Devi.' },
    { year: '1975', title: 'WBBSE Formal Recognition', desc: 'Granted permanent recognition as a 4-class Junior High School, serving children across surrounding villages.' },
    { year: '1988', title: 'Upgradation to 10-Class High School', desc: 'Expanded into a full secondary institution with dedicated Madhyamik Examination center affiliation.' },
    { year: '2004', title: 'Higher Secondary (10+2) Recognition', desc: 'Affiliated with WBCHSE offering Science and Humanities streams with modern laboratory facilities.' },
    { year: '2018', title: 'Golden Jubilee Celebration', desc: 'Commemorated 50 glorious years of educational service, inaugurating the Golden Jubilee Science & ICT Block.' },
    { year: '2026', title: 'Smart Institutional Campus', desc: 'Modernized with high-speed internet, solar panels, digitized library, and state-of-the-art laboratory infrastructure.' },
  ];

  return (
    <div className="py-12 sm:py-16 bg-slate-50 relative overflow-hidden">
      
      {/* Background Motif Watermarks */}
      <div className="absolute left-4 top-20 pointer-events-none opacity-5 hidden lg:block">
        <MandalaEmblem size={260} color="#1e40af" />
      </div>
      <div className="absolute right-4 bottom-20 pointer-events-none opacity-5 hidden lg:block">
        <MandalaEmblem size={300} color="#1e40af" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        
        {/* Header Intro in Royal Blue & White */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/10 text-blue-950 text-xs font-bold uppercase tracking-wider border border-blue-200">
            <Building2 className="w-3.5 h-3.5 text-blue-800" />
            <span>Legacy of Rural Upliftment & Character Building Since 1968</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-950 tracking-tight font-serif uppercase">
            DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            Founded on the patriotic ideals of Deshbandhu Chittaranjan Das and the noble devotion of Smt. Santosh Kumari Devi, our institution bridges timeless values with contemporary scientific rigor.
          </p>

          <AlpanaDivider />
        </div>

        {/* Interactive Page Navigation Tabs in Royal Blue and White */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-blue-200 pb-4">
          {[
            { id: 'history', label: 'Institutional Heritage & Genesis', icon: History },
            { id: 'ethos', label: 'Educational Ethos & Values', icon: Compass },
            { id: 'committee', label: 'Managing Committee', icon: Users },
            { id: 'faculty', label: 'Faculty & Mentors', icon: GraduationCap },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-700'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: History & Genesis */}
        {activeTab === 'history' && (
          <div className="space-y-12">
            {/* Genesis Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-blue-200 shadow-xl relative overflow-hidden">
              <CornerFlourish position="top-left" color="#1d4ed8" />
              <CornerFlourish position="bottom-right" color="#1d4ed8" />

              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2 text-blue-900 text-xs font-black uppercase tracking-wider">
                  <History className="w-4 h-4 text-blue-800" />
                  <span>The Story of 1968</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight font-serif">
                  A Tapestry of Rural Dedication & Selfless Sacrifices
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  In 1968, the visionary leaders of <em>Deshbandhu Palli Seva Sangha</em> recognized that the children of surrounding farming communities lacked access to higher secondary education. Inspired by patriotic devotion, and through the gracious patronage of benevolent patron Smt. Santosh Kumari Devi, this educational institution was born.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Starting with modest classrooms and unwavering determination, teachers dedicated themselves to educating every student. Today, the school stands proudly with modern science laboratories, an extensive library, and thousands of alumni serving across India.
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-center">
                    <p className="text-xl font-black text-blue-950">1968</p>
                    <p className="text-[10px] text-slate-600 font-bold uppercase">Inception</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-xl border border-blue-300 text-center">
                    <p className="text-xl font-black text-blue-900">58+ Yrs</p>
                    <p className="text-[10px] text-slate-600 font-bold uppercase">Glorious Run</p>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-center">
                    <p className="text-xl font-black text-emerald-800">100%</p>
                    <p className="text-[10px] text-slate-600 font-bold uppercase">Govt Aided</p>
                  </div>
                </div>
              </div>

              {/* School Photo Showcase */}
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-blue-300 aspect-[4/3] group bg-blue-950">
                  <img
                    src={schoolBuildingImg}
                    alt="School Building of Deshbandhu Palli Seva Sangha Santosh Kumari Siksha Niketan"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-5">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-950 bg-white px-2.5 py-0.5 rounded-full shadow">
                        Official Campus
                      </span>
                      <p className="text-white text-xs sm:text-sm font-bold mt-1">
                        DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Historical Milestones Timeline */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Chronicle of Growth
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-serif">
                  Milestones That Shaped Our Legacy
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {milestones.map((m, idx) => (
                  <div 
                    key={idx} 
                    className="relative bg-slate-50 hover:bg-blue-50/50 p-5 rounded-2xl border border-slate-200 hover:border-blue-400 transition-all space-y-2 group shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black text-blue-900 font-serif">
                        {m.year}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-blue-100 group-hover:bg-blue-900 text-blue-800 group-hover:text-white flex items-center justify-center transition-colors">
                        <Calendar className="w-4 h-4" />
                      </div>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base group-hover:text-blue-900">
                      {m.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Ethos & Philosophy */}
        {activeTab === 'ethos' && (
          <div className="space-y-10">
            {/* Ethos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 text-white rounded-3xl p-7 shadow-xl space-y-4 border border-blue-700 relative overflow-hidden">
                <CornerFlourish position="top-left" color="#3b82f6" />
                <div className="w-12 h-12 rounded-2xl bg-blue-800/40 text-blue-200 border border-blue-500/40 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-white font-serif">Our Noble Mission</h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  To offer equitable, holistic, and value-anchored education that equips every student with scientific temper, ethical strength, physical vitality, and deep civic responsibility.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-7 shadow-xl border border-slate-200 space-y-4 relative overflow-hidden">
                <CornerFlourish position="top-right" color="#1d4ed8" />
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-900" />
                </div>
                <h3 className="text-xl font-black text-slate-900 font-serif">Our Vision</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To be an exemplary rural higher secondary institution in West Bengal, synthesising character building with 21st-century technological competence and environmental stewardship.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-7 shadow-xl border border-slate-200 space-y-4 relative overflow-hidden">
                <CornerFlourish position="bottom-right" color="#1d4ed8" />
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6 text-blue-800" />
                </div>
                <h3 className="text-xl font-black text-slate-900 font-serif">Core Pillars</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-800 shrink-0" />
                    <span><strong>Academic Integrity:</strong> Scientific inquiry & curiosity</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-800 shrink-0" />
                    <span><strong>Community Duty:</strong> Civic & social responsibility</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-800 shrink-0" />
                    <span><strong>Discipline & Respect:</strong> Character formation</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Guiding Philosophy Banner */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-blue-800 shadow-2xl bg-blue-950 p-8 sm:p-12 text-white">
              <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
                <h3 className="text-2xl sm:text-3xl font-black text-white font-serif uppercase">
                  "Knowledge, Character & Community Service"
                </h3>
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
                  True education empowers students to excel intellectually while upholding compassion, social conscience, and universal brotherhood.
                </p>
                <p className="text-[11px] text-blue-300 uppercase tracking-widest font-bold">
                  The Guiding Philosophy of Deshbandhu Palli Seva Sangha Santosh Kumari Siksha Niketan
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Managing Committee */}
        {activeTab === 'committee' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Statutory Administration
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-serif">
                Managing Committee of DPSS SKSN
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Constituted as per the guidelines of the West Bengal Board of Secondary Education.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {managingCommittee.map((member, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-blue-400 transition-all space-y-2 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-900 text-white font-black flex items-center justify-center text-sm border border-blue-400">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{member.name}</h4>
                      <p className="text-[11px] text-blue-800 font-semibold">{member.designation}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 pt-2 border-t border-slate-200">
                    {member.background}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Faculty & Mentors */}
        {activeTab === 'faculty' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Academic Faculty
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-serif">
                Distinguished Teaching Faculty
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                A cadre of highly qualified, government-appointed subject specialists devoted to mentorship.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {facultyMembers.map((fac, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50 hover:bg-blue-50/50 p-5 rounded-2xl border border-slate-200 hover:border-blue-400 transition-all space-y-3 shadow-sm text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-900 to-slate-800 text-white mx-auto flex items-center justify-center font-bold text-lg border-2 border-blue-300 shadow-md">
                    {fac.name.split(' ')[1]?.charAt(0) || fac.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{fac.name}</h4>
                    <p className="text-xs text-blue-800 font-semibold">{fac.role}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{fac.qualification}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                    <span>{fac.dept}</span>
                    <span className="text-blue-900 font-bold">{fac.exp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Headmaster's Desk Message in Royal Blue & White */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-blue-600 relative overflow-hidden">
          <CornerFlourish position="top-left" color="#3b82f6" />
          <CornerFlourish position="bottom-right" color="#3b82f6" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-4 text-center sm:text-left space-y-3">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-blue-900 border-2 border-white p-1 shadow-2xl mx-auto sm:mx-0 overflow-hidden">
                <img
                  src={somnathPalImg}
                  alt="Somnath Pal, Headmaster of Deshbandhu Palli Seva Sangha Santosh Kumari Siksha Niketan"
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Somnath Pal</h3>
                <p className="text-xs text-blue-200 font-semibold">Headmaster & Secretary</p>
                <p className="text-[11px] text-slate-300">Head of Institution • 26+ Yrs Leadership</p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <Quote className="w-8 h-8 text-blue-300" />
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed italic font-serif">
                "Welcome to the portals of DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN. Since 1968, our institution has stood as an unwavering pillar of truth, knowledge, and community upliftment. Our mission is to ensure that every child in our region is provided high quality education. With modern STEM laboratories, digital learning tools, dedicated teachers, and rich cultural traditions, we nurture students to achieve both academic mastery and moral strength."
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-blue-900 text-xs text-blue-300">
                <span>Headmaster's Official Chamber</span>
                <span className="text-white font-bold">DPSS SKSN Academic Council</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};


