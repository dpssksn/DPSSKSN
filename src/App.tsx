/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LatestNoticesHome } from './components/LatestNoticesHome';
import { NoticeModal } from './components/NoticeModal';
import { NoticeBoardPage } from './components/NoticeBoardPage';
import { AboutSection } from './components/AboutSection';
import { AcademicsSection } from './components/AcademicsSection';
import { GallerySection } from './components/GallerySection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { Notice, AdminUser } from './types';
import { fetchPublicNotices, verifyAdminSession } from './services/api';
import confetti from 'canvas-confetti';

export default function App() {
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loadingNotices, setLoadingNotices] = useState<boolean>(true);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  // Load public notices
  const loadNotices = useCallback(async () => {
    try {
      setLoadingNotices(true);
      const data = await fetchPublicNotices();
      if (data && data.notices) {
        setNotices(data.notices);
      }
    } catch {
      // Safe fallback handled by service layer
    } finally {
      setLoadingNotices(false);
    }
  }, []);

  // Check auth session & load initial data on mount
  useEffect(() => {
    loadNotices();
    verifyAdminSession().then((user) => {
      if (user) setAdminUser(user);
    });
  }, [loadNotices]);

  // Scrollspy effect to update active section in navbar during scroll
  useEffect(() => {
    if (isAdminView) return;

    const sections = ['home', 'about', 'academics', 'notices', 'facilities', 'gallery', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // 120px offset for sticky header

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setCurrentSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdminView]);

  // Smooth scroll to a specific section
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentSection('home');
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -70; // Header height compensation
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setCurrentSection(sectionId);
    }
  };

  // Handle Tab Navigation from Navbar / Footer
  const handleNavigate = (tab: string) => {
    if (tab === 'admin') {
      setIsAdminView(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (isAdminView) {
      setIsAdminView(false);
      setTimeout(() => {
        scrollToSection(tab);
      }, 50);
    } else {
      scrollToSection(tab);
    }
  };

  // Handle Notice Selection
  const handleSelectNotice = (notice: Notice) => {
    setSelectedNotice(notice);
  };

  // Handle Admin Login Success
  const handleLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    setIsAdminView(true);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (e) {
      // ignore
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setAdminUser(null);
    setIsAdminView(false);
    handleNavigate('home');
  };

  // When notices are modified in admin panel
  const handleNoticeChanged = () => {
    loadNotices();
  };

  // Calculate unread/new notices count (published within last 14 days)
  const newNoticesCount = notices.filter((n) => {
    const pub = new Date(n.publishedAt).getTime();
    return (Date.now() - pub) < 14 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-500 selection:text-white scroll-smooth">
      
      {/* If inside Admin View */}
      {isAdminView ? (
        <AdminDashboard
          adminUser={adminUser}
          onLoginSuccess={handleLoginSuccess}
          onLogout={handleLogout}
          onExitAdmin={() => handleNavigate('home')}
          onNoticeChanged={handleNoticeChanged}
        />
      ) : (
        <>
          {/* Public Navbar */}
          <Navbar
            currentTab={currentSection}
            onNavigate={handleNavigate}
            adminUser={adminUser}
            onAdminClick={() => handleNavigate('admin')}
            unreadNoticesCount={newNoticesCount}
          />

          {/* All Public Sections In Continuous Scroll */}
          <main className="flex-1">
            
            {/* Section 1: Home & Hero */}
            <section id="home" className="scroll-mt-20">
              <HeroSection
                latestNotices={notices}
                onViewNotices={() => handleNavigate('notices')}
                onSelectNotice={handleSelectNotice}
                onExploreAcademics={() => handleNavigate('academics')}
                onContactClick={() => handleNavigate('contact')}
              />
              
              <LatestNoticesHome
                notices={notices}
                isLoading={loadingNotices}
                onSelectNotice={handleSelectNotice}
                onViewAllNotices={() => handleNavigate('notices')}
              />

              {/* Brief School Highlight Preview */}
              <div className="py-12 sm:py-14 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <span className="text-xs font-bold text-blue-900 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                        Educational Legacy Since 1968
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 leading-tight font-serif">
                        DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        Empowering students through comprehensive curricula, well-equipped science laboratories, physical education, and community values in rural and semi-urban Bengal.
                      </p>
                      <div className="pt-2 flex flex-wrap gap-3">
                        <button
                          onClick={() => handleNavigate('about')}
                          className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                        >
                          Read Full School History
                        </button>
                        <button
                          onClick={() => handleNavigate('facilities')}
                          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                        >
                          Explore Campus Facilities
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-5">
                      <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-video">
                        <img
                          src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1200&auto=format&fit=crop"
                          alt="School Grounds"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: About & Institutional History */}
            <section id="about" className="scroll-mt-20 border-b border-blue-100">
              <AboutSection />
            </section>

            {/* Section 3: Academics & Curriculum */}
            <section id="academics" className="scroll-mt-20 border-b border-blue-100">
              <AcademicsSection />
            </section>

            {/* Section 4: Notice Board & Circulars */}
            <section id="notices" className="scroll-mt-20 border-b border-blue-100">
              <NoticeBoardPage
                notices={notices}
                isLoading={loadingNotices}
                onSelectNotice={handleSelectNotice}
                onRefresh={loadNotices}
              />
            </section>

            {/* Section 5: Campus Facilities & Labs */}
            <section id="facilities" className="scroll-mt-20 border-b border-blue-100">
              <FacilitiesSection />
            </section>

            {/* Section 6: Photo Gallery */}
            <section id="gallery" className="scroll-mt-20 border-b border-blue-100">
              <GallerySection />
            </section>

            {/* Section 7: Admissions, Contact & Google Map */}
            <section id="contact" className="scroll-mt-20">
              <ContactSection />
            </section>

          </main>

          {/* Public Footer */}
          <Footer
            onNavigate={handleNavigate}
            adminUser={adminUser}
            onAdminClick={() => handleNavigate('admin')}
          />
        </>
      )}

      {/* Global Official Notice Reader Modal */}
      <NoticeModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />

    </div>
  );
}
