import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Building2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Award,
  Navigation,
  Copy,
  Check
} from 'lucide-react';
import { submitContactForm } from '../services/api';
import { 
  AlpanaDivider, 
  CornerFlourish, 
  MandalaEmblem 
} from './IndianArtDecorations';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedCoords, setCopiedCoords] = useState(false);

  const latitude = 22.446926513062408;
  const longitude = 88.14963759773805;
  const coordsString = `${latitude}, ${longitude}`;

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(coordsString);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await submitContactForm(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen relative overflow-hidden">
      
      {/* Background Motif Watermarks */}
      <div className="absolute left-4 top-32 pointer-events-none opacity-5 hidden lg:block">
        <MandalaEmblem size={280} color="#1d4ed8" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header in Royal Blue & White */}
        <div className="text-center max-w-4xl mx-auto space-y-3">

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/10 text-blue-950 text-xs font-bold uppercase tracking-wider border border-blue-200">
            <Mail className="w-3.5 h-3.5 text-blue-800" />
            <span>Administrative Secretariat & Campus Directory</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-950 tracking-tight font-serif uppercase">
            DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN
          </h1>
          <p className="text-blue-900 font-semibold text-sm sm:text-base font-sans">
            Official School Contact & Administrative Desk
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            Reach out to our administrative cell, academic coordinators, or Headmaster office for student admissions, official certificates, and institutional inquiries.
          </p>

          <AlpanaDivider />
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Main Info Card */}
            <div className="bg-white rounded-3xl p-7 border-2 border-blue-900 shadow-xl space-y-6 relative overflow-hidden">
              <CornerFlourish position="top-right" color="#1d4ed8" />

              <h2 className="text-lg font-black text-slate-900 border-b border-blue-100 pb-3 font-serif flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-700" />
                Institutional Directory
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-950 border border-blue-200 shrink-0 mt-0.5">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Official Registered Name</p>
                    <p className="text-xs text-slate-700 font-serif leading-snug">
                      DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN
                    </p>
                    <p className="text-[11px] text-blue-900 font-bold mt-0.5">
                      Govt. Sponsored Co-Educational Higher Secondary Institution
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-950 border border-blue-200 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-blue-800" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Campus Address & Location</p>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      Palli Seva Sangha Campus, Post Office: Palli Seva Sangha, <br />
                      District: South 24 Parganas, West Bengal, Pin - 700000, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-950 border border-blue-200 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5 text-blue-800" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Official Electronic Mail</p>
                    <a
                      href="mailto:dpssksn@gmail.com"
                      className="text-xs text-blue-900 hover:underline font-bold block font-mono"
                    >
                      dpssksn@gmail.com
                    </a>
                    <p className="text-[11px] text-slate-400">Response turnaround: 24 to 48 working hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-950 border border-blue-200 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-blue-800" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Telephone Helpline & Office</p>
                    <p className="text-xs text-slate-700 font-mono font-bold">+91 94340 00000 / 033-24000000</p>
                    <p className="text-[11px] text-slate-400">Available during school administrative hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-950 border border-blue-200 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-blue-800" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Office Working Hours</p>
                    <p className="text-xs text-slate-600">
                      Monday to Friday: 10:30 AM - 04:30 PM <br />
                      Saturday: 10:30 AM - 02:00 PM (Half Day Session)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Principal Visiting Hours Notice */}
            <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 shadow-xl border border-blue-700 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2 text-blue-300 font-bold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Headmaster & Guardian Consultation</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1 font-serif">
                Parent & Guardian Visiting Hours
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Parents may meet the Headmaster and Subject Teachers on working Saturdays between 12:30 PM and 2:00 PM with prior desk appointment.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form & Map */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Form Box */}
            <div className="bg-white rounded-3xl p-7 sm:p-9 border-2 border-blue-900 shadow-xl relative overflow-hidden">
              <CornerFlourish position="top-right" color="#1d4ed8" />
              <CornerFlourish position="bottom-left" color="#1d4ed8" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center shadow">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 font-serif">Send an Official Inquiry</h2>
                  <p className="text-xs text-slate-500">Your communication will be forwarded directly to the school administrative desk.</p>
                </div>
              </div>

              {submitted ? (
                <div className="bg-blue-50 border-2 border-blue-300 rounded-3xl p-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mx-auto shadow">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black text-blue-950 font-serif">Inquiry Submitted Successfully!</h3>
                  <p className="text-xs text-blue-900 leading-relaxed max-w-md mx-auto">
                    Thank you for writing to DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN. Our administrative desk will review your inquiry promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-5 py-2.5 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-colors cursor-pointer shadow"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Guardian / Student Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Chandra Das"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. parent@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Contact Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Subject / Inquiry Department
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                      >
                        <option value="General Inquiry">General Administrative Inquiry</option>
                        <option value="Admission Question">New Admission & Registration (Class V - XI)</option>
                        <option value="Marksheet / Certificate Request">Marksheet, Character & Transfer Certificate</option>
                        <option value="Examination Query">Madhyamik / Higher Secondary Board Exam</option>
                        <option value="Scholarship Welfare">Student Scholarship Query</option>
                        <option value="Feedback / Grievance">Parent Feedback & Suggestions</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Inquiry Details / Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please state your inquiry clearly, including student roll number or class if applicable..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <span>Dispatching message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Official Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Google Map / Location Card with Exact Coordinates */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-blue-900 shadow-xl overflow-hidden space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-blue-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-950 border border-blue-200">
                    <MapPin className="w-5 h-5 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 font-serif">
                      Official Campus Location
                    </h3>
                    <p className="text-[11px] text-slate-500 font-mono">
                      GPS: {latitude.toFixed(6)}, {longitude.toFixed(6)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCoords}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-300 cursor-pointer"
                    title="Copy exact GPS coordinates"
                  >
                    {copiedCoords ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>Copy Coords</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>

              {/* Embedded Live Google Map */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-blue-200 shadow-inner bg-slate-100 aspect-video sm:h-72 w-full">
                <iframe
                  title="Deshbandhu Palli Seva Sangha SKSN Google Map"
                  src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=16&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Direct Links and Quick Info */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-blue-50/70 p-3 rounded-2xl border border-blue-200">
                <div className="space-y-0.5">
                  <p className="font-bold text-blue-950 font-serif">
                    Deshbandhu Palli Seva Sangha Santosh Kumari Siksha Niketan
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Coordinates: {latitude}° N, {longitude}° E
                  </p>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 shrink-0 underline"
                >
                  Open in Google Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};


