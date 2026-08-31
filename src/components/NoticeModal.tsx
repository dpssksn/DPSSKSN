import React from 'react';
import { Notice } from '../types';
import { 
  X, 
  Calendar, 
  FileText, 
  Download, 
  Printer, 
  Tag, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  Building2,
  ExternalLink
} from 'lucide-react';
import { SchoolLogo } from './SchoolLogo';

interface NoticeModalProps {
  notice: Notice | null;
  onClose: () => void;
}

export const NoticeModal: React.FC<NoticeModalProps> = ({ notice, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!notice) return null;

  const isRecent = (dateStr: string) => {
    const pubDate = new Date(dateStr).getTime();
    const now = Date.now();
    return (now - pubDate) < 14 * 24 * 60 * 60 * 1000;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Examination': return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Academic': return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Holiday': return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Sports & Culture': return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Admission': return 'bg-rose-100 text-rose-900 border-rose-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div 
      id="notice-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="notice-modal-card"
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
      >
        {/* Top Institutional Header Band */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white px-6 py-5 flex items-start justify-between border-b-4 border-blue-600">
          <div className="flex items-center gap-3">
            <div className="w-13 h-13 rounded-full bg-white p-0.5 shadow-xl border-2 border-white ring-2 ring-blue-400 flex items-center justify-center shrink-0">
              <SchoolLogo size={46} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-blue-200 tracking-wider uppercase">
                Official Institutional Circular
              </p>
              <h2 className="text-xs sm:text-sm md:text-base font-black text-white leading-tight uppercase font-serif">
                DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN
              </h2>
              <p className="text-[11px] text-blue-200 font-medium">ESTD. 1968 • Govt. Sponsored Higher Secondary School</p>
            </div>
          </div>
          <button
            id="close-notice-modal-btn"
            onClick={onClose}
            aria-label="Close Notice"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Meta Strip */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-1 rounded-md font-semibold border ${getCategoryColor(notice.category)}`}>
              {notice.category}
            </span>
            {isRecent(notice.publishedAt) && (
              <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[11px] font-bold flex items-center gap-1 animate-pulse">
                <Sparkles className="w-3 h-3" /> NEW
              </span>
            )}
            {notice.refNumber && (
              <span className="font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-700">
                Ref: {notice.refNumber}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-slate-500">
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
            {notice.targetAudience && (
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span>Audience: {notice.targetAudience}</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-4">
            {notice.title}
          </h1>

          {/* Notice Content with proper linebreaks */}
          <div className="prose max-w-none text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-slate-50/70 p-5 rounded-xl border border-slate-200/80 mb-6">
            {notice.content}
          </div>

          {/* Attachment Box if available */}
          {notice.attachment && (
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
                    Official Attached Document ({notice.attachment.type.toUpperCase()})
                  </p>
                  <p className="text-sm font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
                    {notice.attachment.name}
                  </p>
                  {notice.attachment.size && (
                    <p className="text-xs text-slate-500">File size: {notice.attachment.size}</p>
                  )}
                </div>
              </div>

              <a
                id="download-attachment-btn"
                href={notice.attachment.url}
                target="_blank"
                rel="noreferrer"
                download={notice.attachment.name}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors shadow-sm shrink-0"
              >
                <Download className="w-4 h-4" /> Download / View File
              </a>
            </div>
          )}

          {/* Official Sign-off Stamp */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              <p className="font-semibold text-slate-700">Issued by: {notice.createdBy || 'Office of the Headmaster'}</p>
              <p className="text-[11px] text-slate-400">Deshbandhu Palli Seva Sangha Santosh Kumari Siksha Niketan</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-800 font-medium">Officially Verified Circular</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            id="share-notice-btn"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied ? 'Link Copied!' : 'Share'}
          </button>

          <div className="flex items-center gap-2">
            <button
              id="print-notice-btn"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              id="close-notice-btn"
              onClick={onClose}
              className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
