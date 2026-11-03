import React, { useState, useEffect } from 'react';
import { Sun, Moon, Command, Calendar } from 'lucide-react';
import { DigitalClock } from './DigitalClock';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenBooking: () => void;
  onOpenCommandPalette: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleTheme,
  onOpenBooking,
  onOpenCommandPalette,
  activeSection,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand wordmark with EF Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 font-display group"
        >
          <img
            src="/assets/aistudio/Combine_E_and_F_d6889eaf.png"
            alt="EF Logo"
            className="w-7 h-7 rounded-md object-contain border border-zinc-200/80 dark:border-zinc-800 shadow-2xs group-hover:scale-105 transition-transform"
          />
          <span>Eyob Fikre</span>
        </a>

        {/* Zone 2: Concise nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <a
            href="#projects"
            className={`hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'projects' ? 'text-zinc-900 dark:text-zinc-100 font-semibold' : ''
            }`}
          >
            Repos
          </a>
          <a
            href="#tools"
            className={`hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'tools' ? 'text-zinc-900 dark:text-zinc-100 font-semibold' : ''
            }`}
          >
            Tools
          </a>
          <a
            href="#education"
            className={`hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'education' ? 'text-zinc-900 dark:text-zinc-100 font-semibold' : ''
            }`}
          >
            Education & Matric
          </a>
          <a
            href="#interests"
            className={`hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'interests' ? 'text-zinc-900 dark:text-zinc-100 font-semibold' : ''
            }`}
          >
            Interests & Family
          </a>
          <a
            href="#experience"
            className={`hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'experience' ? 'text-zinc-900 dark:text-zinc-100 font-semibold' : ''
            }`}
          >
            Experience
          </a>
          <a
            href="#writing"
            className={`hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'writing' ? 'text-zinc-900 dark:text-zinc-100 font-semibold' : ''
            }`}
          >
            Writing
          </a>
          <a
            href="#guestbook"
            className={`hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'guestbook' ? 'text-zinc-900 dark:text-zinc-100 font-semibold' : ''
            }`}
          >
            Guestbook
          </a>
        </nav>

        {/* Zone 3: 1 primary action cluster */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Live digital clock in navbar */}
          <div className="hidden lg:block">
            <DigitalClock compact showSeconds />
          </div>

          <button
            onClick={onOpenCommandPalette}
            type="button"
            title="Command Palette (Cmd+K)"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0"
          >
            <Command className="w-3.5 h-3.5" />
            <span>Cmd+K</span>
          </button>

          {/* Theme Mode Switcher */}
          <button
            onClick={onToggleTheme}
            type="button"
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0"
          >
            {darkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenBooking}
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-xs active:scale-[0.98]"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Intro</span>
          </button>
        </div>
      </div>
    </header>
  );
};
