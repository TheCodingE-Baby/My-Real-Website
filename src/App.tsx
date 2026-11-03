/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { RepoModal } from './components/RepoModal';
import { InteractiveTools } from './components/InteractiveTools';
import { EducationSection } from './components/EducationSection';
import { InterestsSection } from './components/InterestsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ArticlesSection } from './components/ArticlesSection';
import { ArticleModal } from './components/ArticleModal';
import { GuestbookSection } from './components/GuestbookSection';
import { BookingModal } from './components/BookingModal';
import { CommandPalette } from './components/CommandPalette';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { GithubRepo, Article } from './types';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('eyob_portfolio_theme');
      if (saved !== null) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Modal states
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [preselectedSlot, setPreselectedSlot] = useState<string>('');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  // Bookmarks state
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('eyob_saved_articles');
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['art-1'];
  });

  // Active section for navbar
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Synchronize HTML element dark class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('eyob_portfolio_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('eyob_portfolio_theme', 'light');
    }
  }, [darkMode]);

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('eyob_saved_articles', JSON.stringify(bookmarkedIds));
    } catch {}
  }, [bookmarkedIds]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenBookingWithSlot = (slotString: string) => {
    setPreselectedSlot(slotString);
    setBookingOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard shortcut listener for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* Top Bar */}
      <Navbar
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
        onOpenBooking={() => {
          setPreselectedSlot('');
          setBookingOpen(true);
        }}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        activeSection={activeSection}
      />

      <main>
        {/* Split-screen Hero Section */}
        <Hero
          onOpenBooking={() => {
            setPreselectedSlot('');
            setBookingOpen(true);
          }}
          onOpenResume={() => scrollToSection('experience')}
          onScrollToTools={() => scrollToSection('tools')}
        />

        {/* GitHub Repositories & Telegram Hub */}
        <ProjectsSection onSelectRepo={setSelectedRepo} />

        {/* Interactive Functional Utilities & Sandboxes */}
        <InteractiveTools
          onScheduleSlot={handleOpenBookingWithSlot}
          onOpenBooking={() => {
            setPreselectedSlot('');
            setBookingOpen(true);
          }}
        />

        {/* Education, Matriculation Scores & Diplomas */}
        <EducationSection />

        {/* Interests (Gaming, Shelby Cobra, Sunset) & Family Tribute (Dad & Mom) */}
        <InterestsSection />

        {/* Career & Experience Timeline / Printable Resume */}
        <ExperienceSection />

        {/* Writing & Architecture Essays */}
        <ArticlesSection
          onSelectArticle={setSelectedArticle}
          bookmarkedIds={bookmarkedIds}
        />

        {/* Community Guestbook & Kudos */}
        <GuestbookSection />

        {/* Direct Inquiry & Contact */}
        <ContactSection />
      </main>

      {/* Clean Footer */}
      <Footer onOpenBooking={() => setBookingOpen(true)} />

      {/* Modals & Dialogs */}
      <RepoModal
        repo={selectedRepo}
        onClose={() => setSelectedRepo(null)}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        isBookmarked={selectedArticle ? bookmarkedIds.includes(selectedArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedSlot={preselectedSlot}
      />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onToggleTheme={toggleTheme}
        onOpenBooking={() => setBookingOpen(true)}
        onOpenResume={() => scrollToSection('experience')}
        onNavigate={scrollToSection}
        darkMode={darkMode}
      />
    </div>
  );
}
