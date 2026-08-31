import React from 'react';
import { 
  Bell, 
  ChevronRight, 
  Calendar, 
  FileText, 
  Sparkles, 
  Paperclip, 
  ArrowRight,
  Pin,
  Users
} from 'lucide-react';
import { Notice } from '../types';

interface LatestNoticesHomeProps {
  notices: Notice[];
  isLoading: boolean;
  onSelectNotice: (notice: Notice) => void;
  onViewAllNotices: () => void;
}

export const LatestNoticesHome: React.FC<LatestNoticesHomeProps> = ({
  notices,
  isLoading,
  onSelectNotice,
  onViewAllNotices,
}) => {
  const isRecent = (dateStr: string) => {
    const pubDate = new Date(dateStr).getTime();
    const now = Date.now();
    return (now - pubDate) < 14 * 24 * 60 * 60 * 1000;
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Examination':
        return 'bg-blue-100 text-blue-950 border-blue-300';
      case 'Academic':
        return 'bg-blue-50 text-blue-900 border-blue-200';
      case 'Holiday':
        return 'bg-slate-100 text-slate-900 border-slate-300';
      case 'Sports & Culture':
        return 'bg-indigo-100 text-indigo-900 border-indigo-300';
      case 'Admission':
        return 'bg-blue-200 text-blue-950 border-blue-400';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <section className="py-14 sm:py-16 bg-gradient-to-b from-slate-50 to-blue-50/40 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <div className="inline-flex items-center gap-2 text-blue-900 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
              <span className="p-1.5 rounded-lg bg-blue-100 text-blue-950">
                <Bell className="w-4 h-4" />
              </span>
              <span>Official Institutional Circulars</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-950 tracking-tight font-serif text-center sm:text-left">
              Latest Notices & Circulars
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl text-center sm:text-left">
              Stay updated with academic schedules, examination notifications, holiday lists, and events at DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN.
            </p>
          </div>

          <button
            id="view-all-notices-top-btn"
            onClick={onViewAllNotices}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shrink-0 cursor-pointer self-center sm:self-auto"
          >
            <span>View All Notices</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Notices Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm animate-pulse space-y-4">
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-6 bg-slate-200 rounded w-3/4" />
                <div className="h-16 bg-slate-100 rounded w-full" />
                <div className="h-8 bg-slate-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : notices.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
            <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Published Notices at Present</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
              There are currently no active public notices. Please check back shortly or contact the administrative office.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.slice(0, 5).map((notice) => {
              const recent = isRecent(notice.publishedAt);

              return (
                <div
                  key={notice.id}
                  id={`home-notice-card-${notice.id}`}
                  onClick={() => onSelectNotice(notice)}
                  className={`group relative bg-white rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between ${
                    notice.isPinned
                      ? 'border-blue-500 bg-gradient-to-b from-blue-50/40 to-white shadow-md'
                      : 'border-slate-200/90 shadow-sm hover:border-blue-300'
                  }`}
                >
                  {/* Pinned Marker */}
                  {notice.isPinned && (
                    <div className="absolute -top-3 right-5 bg-blue-900 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow flex items-center gap-1">
                      <Pin className="w-3 h-3 fill-white" /> Pinned Notice
                    </div>
                  )}

                  <div>
                    {/* Category & Status Bar */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${getCategoryBadgeClass(notice.category)}`}>
                        {notice.category}
                      </span>

                      {recent && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-blue-700 text-white shadow-sm animate-pulse">
                          <Sparkles className="w-3 h-3" /> NEW
                        </span>
                      )}

                      {notice.targetAudience && notice.targetAudience !== 'All' && (
                        <span className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1">
                          <Users className="w-3 h-3 text-slate-500" /> {notice.targetAudience}
                        </span>
                      )}
                    </div>

                    {/* Notice Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug line-clamp-2 mb-2.5 font-serif">
                      {notice.title}
                    </h3>

                    {/* Notice Summary */}
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {notice.summary || notice.content}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-blue-700" />
                      <span>
                        {new Date(notice.publishedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {notice.attachment && (
                        <span className="p-1 rounded bg-blue-50 text-blue-900 border border-blue-200" title={`Attached: ${notice.attachment.name}`}>
                          <Paperclip className="w-3.5 h-3.5" />
                        </span>
                      )}
                      
                      <span className="text-blue-900 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Read Notice <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Sixth Call-to-Action Card */}
            <div 
              onClick={onViewAllNotices}
              className="rounded-2xl p-6 bg-gradient-to-br from-blue-950 to-blue-900 text-white flex flex-col justify-between shadow-lg border border-blue-800 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-blue-300 mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-serif">
                  Official Notice Board Archive
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                  Search through all past circulars, filter by category (Examinations, Holidays, Sports, Admissions), and download official circular PDF copies.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-blue-800/60 flex items-center justify-between text-xs font-bold text-white">
                <span>Browse Full Notice Board</span>
                <span className="p-2 rounded-lg bg-white text-blue-950 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

          </div>
        )}

        {/* Bottom Link */}
        <div className="mt-10 text-center">
          <button
            id="view-all-notices-bottom-btn"
            onClick={onViewAllNotices}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-slate-50 text-blue-950 font-bold rounded-xl border border-blue-200 shadow-sm transition-all text-sm cursor-pointer"
          >
            <span>Open Complete School Notice Board</span>
            <ChevronRight className="w-4 h-4 text-blue-700" />
          </button>
        </div>

      </div>
    </section>
  );
};

