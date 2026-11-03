import React, { useState, useEffect } from 'react';
import { Search, Sun, Moon, Calendar, Download, Mail, ArrowRight, Layers, FileText, X, Send, Github, GraduationCap, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  onOpenBooking: () => void;
  onOpenResume: () => void;
  onNavigate: (sectionId: string) => void;
  darkMode: boolean;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onToggleTheme,
  onOpenBooking,
  onOpenResume,
  onNavigate,
  darkMode,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'book',
      name: 'Say Hello / Schedule a Quick Chat',
      category: 'Actions',
      icon: Calendar,
      run: () => {
        onClose();
        onOpenBooking();
      },
    },
    {
      id: 'theme',
      name: `Switch to ${darkMode ? 'Light' : 'Dark'} Mode`,
      category: 'Actions',
      icon: darkMode ? Sun : Moon,
      run: () => {
        onToggleTheme();
        onClose();
      },
    },
    {
      id: 'resume',
      name: 'View / Download Resume',
      category: 'Actions',
      icon: Download,
      run: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'telegram',
      name: `Open Telegram Chat (${PERSONAL_INFO.telegramHandle})`,
      category: 'Actions',
      icon: Send,
      run: () => {
        window.open(PERSONAL_INFO.socials.telegram, '_blank');
        onClose();
      },
    },
    {
      id: 'copy-email',
      name: `Copy Email (${PERSONAL_INFO.email})`,
      category: 'Actions',
      icon: Mail,
      run: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        onClose();
      },
    },
    {
      id: 'nav-projects',
      name: 'Jump to GitHub Repos & Telegram',
      category: 'Navigation',
      icon: Github,
      run: () => {
        onClose();
        onNavigate('projects');
      },
    },
    {
      id: 'nav-tools',
      name: 'Jump to Mini-Tools & Utilities',
      category: 'Navigation',
      icon: Layers,
      run: () => {
        onClose();
        onNavigate('tools');
      },
    },
    {
      id: 'nav-education',
      name: 'Jump to Education & Matriculation',
      category: 'Navigation',
      icon: GraduationCap,
      run: () => {
        onClose();
        onNavigate('education');
      },
    },
    {
      id: 'nav-interests',
      name: 'Jump to Interests & Family',
      category: 'Navigation',
      icon: Heart,
      run: () => {
        onClose();
        onNavigate('interests');
      },
    },
    {
      id: 'nav-experience',
      name: 'Jump to Experience & Timeline',
      category: 'Navigation',
      icon: FileText,
      run: () => {
        onClose();
        onNavigate('experience');
      },
    },
    {
      id: 'nav-writing',
      name: 'Jump to Articles & Notes',
      category: 'Navigation',
      icon: FileText,
      run: () => {
        onClose();
        onNavigate('writing');
      },
    },
    {
      id: 'nav-guestbook',
      name: 'Jump to Guestbook',
      category: 'Navigation',
      icon: ArrowRight,
      run: () => {
        onClose();
        onNavigate('guestbook');
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-zinc-950/70 backdrop-blur-xs animate-in fade-in duration-100">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-zinc-900 dark:text-zinc-100"
        role="dialog"
      >
        {/* Search header */}
        <div className="flex items-center px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 gap-3">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or jump to section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm bg-transparent border-none outline-hidden placeholder:text-zinc-400 text-zinc-900 dark:text-zinc-100"
          />
          <button
            onClick={onClose}
            type="button"
            className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.run}
                type="button"
                className="w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  <span>{item.name}</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  {item.category}
                </span>
              </button>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-8 text-center text-xs text-zinc-400">
              No matching commands or actions found.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
          <span>Navigate with arrow keys or click</span>
          <span>ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
