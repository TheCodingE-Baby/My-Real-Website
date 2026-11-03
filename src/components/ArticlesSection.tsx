import React, { useState, useMemo } from 'react';
import { Article } from '../types';
import { ARTICLES } from '../data/portfolioData';
import { Search, ArrowUpRight, Bookmark, Clock } from 'lucide-react';

interface ArticlesSectionProps {
  onSelectArticle: (article: Article) => void;
  bookmarkedIds: string[];
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  onSelectArticle,
  bookmarkedIds,
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((art) => {
      if (filter === 'saved') {
        if (!bookmarkedIds.includes(art.id)) return false;
      } else if (filter !== 'all') {
        if (art.category.toLowerCase() !== filter.toLowerCase()) return false;
      }

      if (search.trim() !== '') {
        const q = search.toLowerCase();
        return (
          art.title.toLowerCase().includes(q) ||
          art.excerpt.toLowerCase().includes(q) ||
          art.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [filter, search, bookmarkedIds]);

  return (
    <section id="writing" className="py-16 md:py-24 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              Writing & Notes
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-display">
              Articles & Study Notes
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl leading-relaxed">
              Reflections on mastering data structures at AAiT, building Android apps with Jetpack Compose, and why minimal UI design always wins.
            </p>
          </div>

          {/* Filter and Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search essays..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-48 pl-9 pr-3 py-1.5 text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  filter === 'all'
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilter('architecture')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  filter === 'architecture'
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                Architecture
              </button>
              <button
                type="button"
                onClick={() => setFilter('saved')}
                className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  filter === 'saved'
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                <Bookmark className="w-3 h-3" />
                <span>Saved ({bookmarkedIds.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Articles List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const isSaved = bookmarkedIds.includes(article.id);
            return (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="group cursor-pointer flex flex-col justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-2xl transition-all hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span>{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.date}</span>
                    </div>

                    {isSaved && (
                      <Bookmark className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                    )}
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-display">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>

                  <span className="font-medium text-blue-600 dark:text-blue-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    <span>Read Note</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <p className="text-sm text-zinc-500">No articles found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};
