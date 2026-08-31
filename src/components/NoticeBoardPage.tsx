import React, { useState, useMemo } from 'react';
import { 
  Bell, 
  Search, 
  Filter, 
  Calendar, 
  Paperclip, 
  Sparkles, 
  Pin, 
  FileText, 
  Eye, 
  ChevronRight, 
  Download,
  RotateCcw
} from 'lucide-react';
import { Notice, NoticeCategory } from '../types';
import { SchoolLogo } from './SchoolLogo';

interface NoticeBoardPageProps {
  notices: Notice[];
  isLoading: boolean;
  onSelectNotice: (notice: Notice) => void;
  onRefresh: () => void;
}

const CATEGORIES: ('All' | NoticeCategory)[] = [
  'All',
  'Academic',
  'Examination',
  'Holiday',
  'Sports & Culture',
  'Admission',
  'Administrative',
  'General',
];

export const NoticeBoardPage: React.FC<NoticeBoardPageProps> = ({
  notices,
  isLoading,
  onSelectNotice,
  onRefresh,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | NoticeCategory>('All');
  const [selectedAudience, setSelectedAudience] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'views'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const isRecent = (dateStr: string) => {
    const pubDate = new Date(dateStr).getTime();
    const now = Date.now();
    return (now - pubDate) < 14 * 24 * 60 * 60 * 1000;
  };

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'Examination':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Academic':
        return 'bg-sky-100 text-sky-900 border-sky-300';
      case 'Holiday':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Sports & Culture':
        return 'bg-indigo-100 text-indigo-900 border-indigo-300';
      case 'Admission':
        return 'bg-cyan-100 text-cyan-900 border-cyan-300';
      case 'Administrative':
        return 'bg-slate-100 text-slate-900 border-slate-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const filteredNotices = useMemo(() => {
    return notices
      .filter((n) => {
        const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory;
        const matchesAudience = selectedAudience === 'All' || n.targetAudience === selectedAudience || n.targetAudience === 'All';
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          (n.refNumber && n.refNumber.toLowerCase().includes(q)) ||
          n.category.toLowerCase().includes(q);

        return matchesCategory && matchesAudience && matchesSearch;
      })
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;

        if (sortBy === 'newest') {
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        } else if (sortBy === 'oldest') {
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        } else if (sortBy === 'views') {
          return (b.views || 0) - (a.views || 0);
        }
        return 0;
      });
  }, [notices, selectedCategory, selectedAudience, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage) || 1;
  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner in Royal Blue and Crisp White */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-8 border border-blue-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-3xl flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-3 border border-white/20">
              <Bell className="w-3.5 h-3.5 text-blue-300" />
              <span>Public Institutional Notice Board</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              School Circulars & Announcements
            </h1>
            <p className="mt-2 text-sm sm:text-base text-blue-100 leading-relaxed">
              Official notifications, examination schedules, academic calendar updates, holiday advisories, and student event notifications published by the administration of <strong className="text-white">DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN</strong>.
            </p>
          </div>
          <div className="shrink-0 hidden sm:flex flex-col items-center justify-center p-2 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20">
            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-2xl flex items-center justify-center ring-2 ring-white">
              <SchoolLogo size="100%" />
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="notice-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by title, keywords, ref number, or content..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Target Audience Dropdown */}
            <div className="md:col-span-3">
              <select
                id="audience-filter-select"
                value={selectedAudience}
                onChange={(e) => {
                  setSelectedAudience(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
              >
                <option value="All">Target: All Audiences</option>
                <option value="Students">Students Only</option>
                <option value="Parents">Parents & Guardians</option>
                <option value="Teachers">Teachers & Faculty</option>
                <option value="Staff">Administrative Staff</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3">
              <select
                id="sort-by-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="views">Sort: Most Viewed</option>
              </select>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-blue-700" /> Categories:
            </span>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  id={`category-pill-${cat}`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-900 text-white shadow-sm font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}

            <button
              id="refresh-notices-btn"
              onClick={onRefresh}
              className="ml-auto p-1.5 rounded-lg text-slate-500 hover:text-blue-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Refresh notice feed"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 mb-4 px-1">
          <span>
            Showing <strong className="text-slate-900 font-semibold">{filteredNotices.length}</strong> published {filteredNotices.length === 1 ? 'notice' : 'notices'}
            {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
          </span>
          <span>Page {currentPage} of {totalPages}</span>
        </div>

        {/* Notices Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm animate-pulse space-y-4">
                <div className="h-4 bg-slate-200 rounded w-1/4" />
                <div className="h-6 bg-slate-200 rounded w-4/5" />
                <div className="h-20 bg-slate-100 rounded w-full" />
              </div>
            ))}
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No notices matched your criteria</h3>
            <p className="text-slate-500 text-sm mt-1">
              Try adjusting your search keywords or switching category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedAudience('All');
              }}
              className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-semibold hover:bg-blue-800 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedNotices.map((notice) => {
              const recent = isRecent(notice.publishedAt);
              return (
                <div
                  key={notice.id}
                  id={`notice-board-card-${notice.id}`}
                  onClick={() => onSelectNotice(notice)}
                  className={`group bg-white rounded-2xl p-6 sm:p-7 border transition-all duration-300 hover:shadow-xl hover:border-blue-400 cursor-pointer flex flex-col justify-between ${
                    notice.isPinned
                      ? 'border-blue-400 bg-gradient-to-br from-blue-50/40 via-white to-white shadow-md'
                      : 'border-slate-200 shadow-sm'
                  }`}
                >
                  <div>
                    {/* Top Meta Line */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${getCategoryClass(notice.category)}`}>
                          {notice.category}
                        </span>

                        {recent && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                            <Sparkles className="w-3 h-3" /> NEW
                          </span>
                        )}

                        {notice.isPinned && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-blue-950 text-white border border-blue-800">
                            <Pin className="w-3 h-3 text-blue-300" /> Pinned
                          </span>
                        )}
                      </div>

                      {notice.refNumber && (
                        <span className="text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                          {notice.refNumber}
                        </span>
                      )}
                    </div>

                    {/* Notice Title */}
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug mb-3">
                      {notice.title}
                    </h2>

                    {/* Notice Excerpt */}
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-5">
                      {notice.summary || notice.content}
                    </p>

                    {/* Attachment Highlight Bar */}
                    {notice.attachment && (
                      <div className="mb-4 bg-slate-50 hover:bg-blue-50/60 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-700 transition-colors">
                        <div className="flex items-center gap-2 truncate">
                          <Paperclip className="w-4 h-4 text-blue-700 shrink-0" />
                          <span className="font-semibold truncate">{notice.attachment.name}</span>
                          {notice.attachment.size && (
                            <span className="text-slate-400 text-[11px]">({notice.attachment.size})</span>
                          )}
                        </div>
                        <span className="text-blue-900 font-bold uppercase text-[11px] shrink-0 flex items-center gap-1">
                          <Download className="w-3.5 h-3.5" /> PDF / Attachment
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-700" />
                        <span>
                          {new Date(notice.publishedAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      {notice.views !== undefined && (
                        <div className="flex items-center gap-1 text-slate-400">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{notice.views} views</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-blue-900 font-bold group-hover:translate-x-1 transition-transform">
                      <span>Read Notice</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                  currentPage === pageNum
                    ? 'bg-blue-900 text-white shadow font-bold'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

