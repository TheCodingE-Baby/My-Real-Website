import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-200/60 dark:border-zinc-800/60">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/Combine_E_and_F_d6889eaf.png"
              alt="EF"
              className="w-8 h-8 rounded-lg object-contain border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-0.5"
            />
            <div className="flex flex-col items-center md:items-start">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm font-display">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-zinc-500">
                Software Engineering Student & Builder · AAiT · Addis Ababa, Ethiopia
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
            <a href="#projects" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Code & Repos
            </a>
            <a href="#tools" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Mini-Tools
            </a>
            <a href="#education" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Education & Matric
            </a>
            <a href="#interests" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Interests & Family
            </a>
            <a href="#experience" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Experience
            </a>
            <a href="#writing" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Writing
            </a>
            <a href="#guestbook" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Guestbook
            </a>
            <button
              onClick={onOpenBooking}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Say Hello
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500">
          <div className="flex items-center gap-2">
            <span>© 2026 {PERSONAL_INFO.name}. Built with React, Tailwind CSS & TypeScript.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
              aria-label="Telegram"
              title={`Telegram: ${PERSONAL_INFO.telegramHandle}`}
            >
              <Send className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              aria-label="GitHub"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              aria-label="LinkedIn"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              aria-label="Email"
              title="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              type="button"
              className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors ml-2"
              title="Return to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
