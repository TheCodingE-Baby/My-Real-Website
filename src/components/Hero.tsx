import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { DigitalClock } from './DigitalClock';
import { ArrowUpRight, Copy, Check, Download, Layers, GraduationCap, Send, MessageCircle } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenResume: () => void;
  onScrollToTools: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenResume,
  onScrollToTools,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [viewMode, setViewMode] = useState<'portrait' | 'workspace'>('portrait');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="pt-8 pb-16 md:pt-14 md:pb-20 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6">
        {/* Split Screen 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch mb-14">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Unboxed natural kicker & AAiT credential */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-4 tracking-wide">
                <span>Addis Ababa, Ethiopia</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 font-semibold">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>AAiT Software Eng</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-blue-600 dark:text-blue-400">EAT (UTC+3)</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">Open for Projects</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.14] mb-5 font-display text-balance">
                {PERSONAL_INFO.heroHeadline}
              </h1>

              {/* Lead Body */}
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mb-6">
                {PERSONAL_INFO.bio}
              </p>

              {/* Live Digital Clock Badge with ticking seconds in 12-hr format */}
              <div className="mb-8 max-w-md">
                <DigitalClock showSeconds showLocation />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={PERSONAL_INFO.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-md transition-all shadow-xs active:scale-[0.98] whitespace-nowrap shrink-0 flex items-center gap-2"
                title="Chat with me on Telegram"
              >
                <Send className="w-4 h-4" />
                <span>Chat on Telegram ({PERSONAL_INFO.telegramHandle})</span>
              </a>

              <button
                onClick={onOpenBooking}
                type="button"
                className="px-4 py-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-zinc-500" />
                <span>Say Hello / Intro</span>
              </button>

              <button
                onClick={onScrollToTools}
                type="button"
                className="px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-zinc-400" />
                <span>Try Mini-Tools</span>
              </button>

              <button
                onClick={onOpenResume}
                type="button"
                className="px-3.5 py-2.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-zinc-400" />
                <span>Resume</span>
              </button>

              <button
                onClick={handleCopyEmail}
                type="button"
                title="Copy email to clipboard"
                className="px-3.5 py-2.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied!' : 'eyobfik5@gmail.com'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Frame featuring Eyob (Me and Me2) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative w-full h-[400px] sm:h-[460px] lg:h-full min-h-[400px] rounded-2xl overflow-hidden border border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-100 dark:bg-zinc-900 shadow-sm group">
              <img
                src={viewMode === 'portrait' ? '/assets/aistudio/Me_f700750c.jpg' : '/assets/aistudio/Me2_1371af72.jpg'}
                alt={viewMode === 'portrait' ? 'Eyob Fikre smiling outdoors' : 'Eyob Fikre coding at desk at night'}
                className="w-full h-full object-cover object-top transition-all duration-300 group-hover:scale-[1.02]"
              />

              {/* Gradient scrim with active status */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-zinc-950/90 via-zinc-950/50 to-transparent flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <p className="text-white text-sm font-semibold tracking-tight">
                      {viewMode === 'portrait' ? 'Eyob Fikre' : 'Eyob in Coding Flow'}
                    </p>
                  </div>
                  <p className="text-zinc-300 text-xs">
                    {viewMode === 'portrait'
                      ? 'Outdoors · AAiT Software Engineering'
                      : 'Late-night hack sessions & assignments'}
                  </p>
                </div>

                {/* Photo switcher toggles between Me and Me2 */}
                <div className="flex items-center gap-1.5 bg-zinc-900/90 backdrop-blur-md p-1.5 rounded-lg border border-zinc-700/60 self-start sm:self-auto">
                  <button
                    onClick={() => setViewMode('portrait')}
                    type="button"
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                      viewMode === 'portrait'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                    }`}
                  >
                    <img
                      src="/assets/aistudio/Me_f700750c.jpg"
                      alt="Me thumb"
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    <span>Me</span>
                  </button>
                  <button
                    onClick={() => setViewMode('workspace')}
                    type="button"
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                      viewMode === 'workspace'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                    }`}
                  >
                    <img
                      src="/assets/aistudio/Me2_1371af72.jpg"
                      alt="Me2 thumb"
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    <span>Me (Coding)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column KPI strip below the hero split */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
          {PERSONAL_INFO.stats.map((stat, i) => (
            <div key={i} className="py-2">
              <div className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight font-display tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
