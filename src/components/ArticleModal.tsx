import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { X, Bookmark, Share2, Check, ZoomIn, ZoomOut, Clock } from 'lucide-react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = (e: any) => {
      const el = e.target;
      if (el) {
        const total = el.scrollHeight - el.clientHeight;
        if (total > 0) {
          setScrollProgress((el.scrollTop / total) * 100);
        }
      }
    };
    return () => {};
  }, []);

  if (!article) return null;

  const fontClasses = {
    normal: 'text-sm sm:text-base leading-relaxed',
    large: 'text-base sm:text-lg leading-relaxed',
    xlarge: 'text-lg sm:text-xl leading-relaxed',
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}#article-${article.slug}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl flex flex-col text-zinc-900 dark:text-zinc-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Reading progress line */}
        <div
          className="h-1 bg-blue-600 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Top Controls Bar */}
        <div className="p-4 sm:px-6 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(article.id)}
              type="button"
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md border transition-colors ${
                isBookmarked
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-medium'
                  : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Save for later'}</span>
            </button>

            {/* Font size toggles */}
            <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-md overflow-hidden text-xs">
              <button
                type="button"
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 ${fontSize === 'normal' ? 'bg-zinc-100 dark:bg-zinc-800 font-semibold' : 'hover:bg-zinc-50 dark:hover:bg-zinc-850'}`}
                title="Normal text size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 ${fontSize === 'large' ? 'bg-zinc-100 dark:bg-zinc-800 font-semibold' : 'hover:bg-zinc-50 dark:hover:bg-zinc-850'}`}
                title="Larger text size"
              >
                A+
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              type="button"
              className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-md border border-zinc-200 dark:border-zinc-800 transition-colors"
              title="Copy article link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              type="button"
              className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div
          onScroll={(e) => {
            const el = e.currentTarget;
            const total = el.scrollHeight - el.clientHeight;
            if (total > 0) {
              setScrollProgress((el.scrollTop / total) * 100);
            }
          }}
          className="overflow-y-auto p-6 sm:p-10 space-y-6"
        >
          {/* Metadata */}
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              <span>{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.date}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight font-display mb-3">
              {article.title}
            </h1>

            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 italic border-b border-zinc-100 dark:border-zinc-800 pb-4">
              {article.excerpt}
            </p>
          </div>

          {/* Paragraphs */}
          <div className={`space-y-5 text-zinc-700 dark:text-zinc-300 ${fontClasses[fontSize]}`}>
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Article Footer */}
          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 flex items-center justify-between">
            <span>Written by Eyob Fikre</span>
            <span>Addis Ababa, Ethiopia · AAiT Alum</span>
          </div>
        </div>
      </div>
    </div>
  );
};
