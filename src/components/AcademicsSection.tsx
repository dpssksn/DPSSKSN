import React, { useState } from 'react';
import { 
  GraduationCap, 
  Clock, 
  Calendar, 
  FileCheck, 
  CheckCircle2, 
  Download,
  Layers,
  ShieldCheck,
  Star,
  BookMarked
} from 'lucide-react';
import { 
  AlpanaDivider, 
  CornerFlourish,
  MandalaEmblem 
} from './IndianArtDecorations';

export const AcademicsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'streams' | 'routine' | 'evaluations' | 'calendar' | 'rules'>('streams');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const triggerDownload = (fileName: string) => {
    setDownloadSuccess(fileName);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const holidays = [
    { date: 'Jan 23, 2026', occasion: 'Netaji Subhas Chandra Bose Jayanti', type: 'National Observance' },
    { date: 'Jan 26, 2026', occasion: 'Republic Day Celebration & Flag Hoisting', type: 'National Festival' },
    { date: 'Feb 13, 2026', occasion: 'Saraswati Puja & Cultural Ceremony', type: 'School Festival' },
    { date: 'May 09, 2026', occasion: 'Rabindra Jayanti Observance', type: 'Cultural Celebration' },
    { date: 'Aug 15, 2026', occasion: 'Independence Day & Parade Ceremony', type: 'National Festival' },
    { date: 'Oct 08 - Oct 20, 2026', occasion: 'Durga Puja, Lakshmi Puja & Autumn Break', type: 'State Vacation' },
    { date: 'Nov 10, 2026', occasion: 'Diwali Festival of Lights', type: 'Festival' },
  ];

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen relative overflow-hidden">
      
      {/* Background Motif Watermarks */}
      <div className="absolute right-4 top-24 pointer-events-none opacity-5 hidden lg:block">
        <MandalaEmblem size={280} color="#1d4ed8" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header Intro in Royal Blue & White */}
        <div className="text-center max-w-4xl mx-auto space-y-3">

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/10 text-blue-950 text-xs font-bold uppercase tracking-wider border border-blue-200">
            <GraduationCap className="w-3.5 h-3.5 text-blue-800" />
            <span>WBBSE & WBCHSE Approved Curriculum</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-950 tracking-tight font-serif uppercase">
            DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN
          </h1>
          <p className="text-blue-900 font-semibold text-sm sm:text-base font-sans">
            Academics, Curricular Rigor & Holistic Evaluation
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            Blending time-tested institutional discipline with modern STEM laboratories, digital pedagogical methods, and comprehensive student mentoring.
          </p>

          <AlpanaDivider />
        </div>

        {downloadSuccess && (
          <div className="max-w-md mx-auto p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-bold flex items-center justify-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Syllabus copy for {downloadSuccess} downloaded successfully!</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="bg-white p-1.5 rounded-2xl shadow-md border border-blue-200 flex flex-wrap justify-center gap-1.5">
            {[
              { id: 'streams', label: 'Curriculum & Streams', icon: Layers },
              { id: 'routine', label: 'Daily Timetable', icon: Clock },
              { id: 'evaluations', label: 'Evaluation System', icon: FileCheck },
              { id: 'calendar', label: 'Academic Calendar', icon: Calendar },
              { id: 'rules', label: 'Student Discipline Code', icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`academic-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'text-slate-700 hover:bg-blue-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-700'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Classes & Streams */}
        {activeTab === 'streams' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Upper Primary (Classes V - VIII) */}
              <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-md flex flex-col justify-between hover:border-blue-400 transition-all">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    Foundation Stage (CCE)
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-3 mb-2 font-serif">
                    Upper Primary (Class V - VIII)
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    Rooted in holistic comprehension, linguistic foundation, environmental awareness, mathematical reasoning, and hands-on art.
                  </p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <p className="font-bold text-slate-900">Key Subjects:</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-800" /> First Language: Bengali Literature
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-800" /> Second Language: English (Grammar & Prose)
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-800" /> Mathematics & Environmental Science
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-800" /> History, Geography & Civics
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-800" /> Physical Education & Work Education
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">Govt. Textbooks Free</span>
                  <button 
                    onClick={() => triggerDownload('Class V-VIII Syllabus')}
                    className="text-xs text-blue-900 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Syllabus PDF
                  </button>
                </div>
              </div>

              {/* Secondary (Classes IX & X - Madhyamik) */}
              <div className="bg-white rounded-3xl p-7 border-2 border-blue-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
                <CornerFlourish position="top-right" color="#1d4ed8" />
                <div className="absolute top-0 right-0 bg-blue-900 text-white font-black text-[10px] uppercase px-3 py-1 rounded-bl-xl shadow">
                  Board Section
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-blue-900 bg-blue-100 px-2.5 py-1 rounded-md border border-blue-300">
                    WBBSE Affiliated
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-3 mb-2 font-serif">
                    Secondary (Class IX & X)
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    Intensive academic preparation for West Bengal Madhyamik Pariksha with unit tests, laboratory experiments, and remedial clinics.
                  </p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <p className="font-bold text-slate-900">7 Compulsory Papers:</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-800" /> First Language & Second Language English
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-800" /> Mathematics (Algebra, Geometry, Trig)
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-800" /> Physical Science & Life Science
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-800" /> History & Geography (Map Pointing)
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-blue-900 font-bold">100% Pass Record</span>
                  <button 
                    onClick={() => triggerDownload('Madhyamik 2026 Syllabus')}
                    className="text-xs text-blue-900 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Board Blueprint
                  </button>
                </div>
              </div>

              {/* Higher Secondary (Class XI & XII - WBCHSE) */}
              <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-md flex flex-col justify-between hover:border-blue-400 transition-all">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    WBCHSE Higher Secondary
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-3 mb-2 font-serif">
                    Higher Secondary (XI & XII)
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    Specialized streams enabling seamless entry into Engineering, Medicine, Pure Sciences, Law, and Civil Services.
                  </p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <p className="font-bold text-slate-900">Available Combinations:</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-800" /> <strong>Science:</strong> Physics, Chemistry, Math, Biology, Comp App
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-800" /> <strong>Arts:</strong> History, Pol Sci, Philosophy, Geography
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-800" /> Environmental Studies (ENVS)
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">Dedicated Lab Wing</span>
                  <button 
                    onClick={() => triggerDownload('HS WBCHSE Syllabus')}
                    className="text-xs text-blue-900 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Stream Guide
                  </button>
                </div>
              </div>

            </div>

            {/* Academic Excellence Department Banner */}
            <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-700 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-300 text-xs font-black uppercase">
                  <Star className="w-4 h-4" />
                  <span>Academic Excellence & Heritage</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold font-serif text-white uppercase">
                  Nurturing Scientific Curiosity & Moral Fortitude
                </h4>
                <p className="text-xs sm:text-sm text-slate-200">
                  Every student receives deep grounding in critical thinking, laboratory experimentation, literature, and Indian scientific heritage from Aryabhata to Jagadish Chandra Bose.
                </p>
              </div>
              <button 
                onClick={() => triggerDownload('Curriculum Overview PDF')}
                className="shrink-0 px-5 py-3 rounded-xl bg-blue-800 text-white font-bold text-xs shadow-lg hover:bg-blue-700 flex items-center gap-2 cursor-pointer border border-blue-500"
              >
                <BookMarked className="w-4 h-4" />
                <span>Curriculum Guide</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Daily Routine & Timetable */}
        {activeTab === 'routine' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6 animate-fade-in relative">
            <CornerFlourish position="top-right" color="#1d4ed8" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-black text-slate-900 font-serif">Daily Academic Schedule & Timetable</h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Operates Monday through Friday (Full Day) and Saturday (Co-Curricular / Remedial).
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold bg-blue-50 text-blue-900 px-3 py-1.5 rounded-lg border border-blue-200">
                <Clock className="w-4 h-4 text-blue-800" /> Morning Assembly at 10:30 AM Strict
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-blue-950 text-white border-b border-blue-800">
                    <th className="p-3.5 font-bold">Time Slot</th>
                    <th className="p-3.5 font-bold">Activity / Period</th>
                    <th className="p-3.5 font-bold">Pedagogical Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono font-bold text-blue-900">10:30 AM - 10:45 AM</td>
                    <td className="p-3.5 font-bold text-slate-900">Morning Assembly & National Anthem</td>
                    <td className="p-3.5 text-slate-600">National Anthem (Jana Gana Mana), Institutional Pledge, News Reading & Discipline Oath</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono text-slate-700">10:45 AM - 11:30 AM</td>
                    <td className="p-3.5 font-semibold text-slate-900">1st Period</td>
                    <td className="p-3.5 text-slate-600">First Language: Literature & Grammar / Physics (HS)</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono text-slate-700">11:30 AM - 12:15 PM</td>
                    <td className="p-3.5 font-semibold text-slate-900">2nd Period</td>
                    <td className="p-3.5 text-slate-600">Second Language: English Core & Comprehension / Chemistry (HS)</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono text-slate-700">12:15 PM - 01:00 PM</td>
                    <td className="p-3.5 font-semibold text-slate-900">3rd Period</td>
                    <td className="p-3.5 text-slate-600">Mathematics & Quantitative Geometry / Biological Sciences</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono text-slate-700">01:00 PM - 01:40 PM</td>
                    <td className="p-3.5 font-semibold text-slate-900">4th Period</td>
                    <td className="p-3.5 text-slate-600">Physical Science / History & Social Studies</td>
                  </tr>
                  <tr className="bg-blue-50 font-semibold text-blue-950">
                    <td className="p-3.5 font-mono font-bold">01:40 PM - 02:20 PM</td>
                    <td className="p-3.5 font-bold">Nutritious Mid-Day Meal & Recess</td>
                    <td className="p-3.5">Hygienic hot cooked Mid-Day Meal, hydration break & student relaxation</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono text-slate-700">02:20 PM - 03:00 PM</td>
                    <td className="p-3.5 font-semibold text-slate-900">5th Period</td>
                    <td className="p-3.5 text-slate-600">Geography & Environmental Studies / Political Science</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono text-slate-700">03:00 PM - 03:40 PM</td>
                    <td className="p-3.5 font-semibold text-slate-900">6th Period</td>
                    <td className="p-3.5 text-slate-600">Science Practical Laboratories / Computer Literacy Laboratory</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono text-slate-700">03:40 PM - 04:20 PM</td>
                    <td className="p-3.5 font-semibold text-slate-900">7th Period</td>
                    <td className="p-3.5 text-slate-600">Library Reading, Physical Education, Yoga, Football & Athletics Practice</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono font-bold text-blue-900">04:20 PM - 04:30 PM</td>
                    <td className="p-3.5 font-bold text-slate-900">Dispersal & National Song</td>
                    <td className="p-3.5 text-slate-600">Daily attendance audit, orderly bell and disciplined departure</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Evaluation & Exam Pattern */}
        {activeTab === 'evaluations' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Continuous & Comprehensive Evaluation
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-serif">
                3-Tier Summative Assessment Framework
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 rounded-3xl bg-blue-50 border border-blue-200 space-y-3">
                <span className="text-xs font-bold text-blue-900 bg-white px-2.5 py-1 rounded-md shadow-sm">1st Summative</span>
                <h4 className="font-bold text-slate-900 text-base">April - May Term</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Assessing conceptual understanding and foundation units across all registered subjects.</p>
                <div className="pt-2 border-t border-blue-200 text-xs font-bold text-blue-900">
                  Weightage: 40 Marks Written + 10 Marks Formative Project
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-blue-200 space-y-3">
                <span className="text-xs font-bold text-blue-900 bg-white px-2.5 py-1 rounded-md shadow-sm">2nd Summative</span>
                <h4 className="font-bold text-slate-900 text-base">August - September Mid-Term</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Comprehensive mid-session progress audit, lab performance tests, and diagnostic review.</p>
                <div className="pt-2 border-t border-slate-200 text-xs font-bold text-blue-900">
                  Weightage: 50 Marks Written + 10 Marks Formative Project
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-blue-100 border border-blue-300 space-y-3">
                <span className="text-xs font-bold text-blue-950 bg-white px-2.5 py-1 rounded-md shadow-sm">3rd Summative / Test</span>
                <h4 className="font-bold text-slate-900 text-base">November - December Final</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Full syllabus annual examination and board selection mock tests for Class X & XII candidates.</p>
                <div className="pt-2 border-t border-blue-300 text-xs font-bold text-blue-950">
                  Weightage: 90 Marks Written + 10 Marks Project / Viva
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Academic Calendar */}
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-black text-slate-900 font-serif">Academic Calendar & Festival Observances</h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Academic Year 2025–2026 as notified by the Directorate of School Education.
                </p>
              </div>
              <button
                onClick={() => triggerDownload('Academic Calendar 2025-26 PDF')}
                className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-blue-800 cursor-pointer shadow"
              >
                <Download className="w-4 h-4" /> Download Complete Calendar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {holidays.map((h, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-all flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                      {h.type}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{h.occasion}</h4>
                  </div>
                  <div className="text-right shrink-0 font-mono text-xs font-bold text-blue-900">
                    {h.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Student Discipline Code */}
        {activeTab === 'rules' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Ethical Conduct
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-serif">
                Institutional Code of Student Discipline & Values
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Upholding the sacred dignity of learning, mutual reverence, and school pride.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                <h4 className="font-bold text-blue-950 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-800" /> Punctuality & 75% Mandatory Attendance
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Students must report inside school premises by 10:25 AM. A minimum of 75% annual attendance is statutory for board registration and scholarship eligibility.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                <h4 className="font-bold text-blue-950 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-800" /> Prescribed School Uniform & Neatness
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Wearing clean, pressed school uniform with official school badge and black shoes is mandatory on all working days and national functions.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                <h4 className="font-bold text-blue-950 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-800" /> Reverence for Teachers & Faculty Mentors
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Students are expected to treat teachers, staff members, and classmates with politeness, humility, and respectful language at all times.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                <h4 className="font-bold text-blue-950 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-800" /> Campus Cleanliness & Eco-Stewardship
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  DPSS SKSN is a plastic-free green sanctuary. Desecration of benches, walls, laboratories, or garden flora is strictly prohibited.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};


