import React, { useState, useMemo } from 'react';
import { GithubRepo } from '../types';
import { GITHUB_REPOS, PERSONAL_INFO } from '../data/portfolioData';
import {
  Github,
  Star,
  GitFork,
  Search,
  ExternalLink,
  Copy,
  Check,
  Send,
  RefreshCw,
  ArrowUpRight,
  Code2,
} from 'lucide-react';

interface ProjectsSectionProps {
  onSelectRepo: (repo: GithubRepo) => void;
}

const LANGUAGE_COLORS: Record<string, string> = {
  Java: '#b07219',
  JavaScript: '#F7DF1E',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  'C++': '#F34B7D',
  Flutter: '#02569B',
  TypeScript: '#3178C6',
  Design: '#F24E1E',
  Go: '#00ADD8',
  Python: '#3572A5',
  Rust: '#DEA584',
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectRepo }) => {
  const [repos, setRepos] = useState<GithubRepo[]>(GITHUB_REPOS);
  const [filterLang, setFilterLang] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCloneId, setCopiedCloneId] = useState<number | string | null>(null);
  const [copiedTelegram, setCopiedTelegram] = useState<boolean>(false);
  const [githubUser, setGithubUser] = useState<string>('TheCodingE-Baby');
  const [loadingApi, setLoadingApi] = useState<boolean>(false);
  const [apiNotice, setApiNotice] = useState<string | null>(null);

  // Optional: fetch real-time public GitHub repositories for the user
  const fetchLiveRepos = async (username: string) => {
    if (!username.trim()) return;
    setLoadingApi(true);
    setApiNotice(null);
    try {
      const res = await fetch(`https://api.github.com/users/${username.trim()}/repos?sort=updated&per_page=12`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const formatted: GithubRepo[] = data.map((r: any) => ({
            id: r.id,
            name: r.name,
            fullName: r.full_name,
            description: r.description || 'Public repository on GitHub.',
            htmlUrl: r.html_url,
            language: r.language || 'Code',
            stars: r.stargazers_count,
            forks: r.forks_count,
            updatedAt: new Date(r.updated_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
            topics: r.topics || [],
            cloneUrl: r.clone_url,
            license: r.license?.spdx_id || 'Open Source',
          }));
          setRepos(formatted);
          setApiNotice(`Loaded ${formatted.length} live repositories from @${username}!`);
        } else {
          setApiNotice(`No public repositories found for @${username}. Showing standard repos.`);
        }
      } else {
        // Fallback gracefully to curated repositories
        setRepos(GITHUB_REPOS);
        setApiNotice(`GitHub API rate limit reached or user not found. Showing saved repositories for @TheCodingE-Baby.`);
      }
    } catch (e) {
      setRepos(GITHUB_REPOS);
      setApiNotice(`Offline mode: showing saved repositories for @TheCodingE-Baby.`);
    } finally {
      setLoadingApi(false);
    }
  };

  const handleCopyClone = (e: React.MouseEvent, repo: GithubRepo) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`git clone ${repo.cloneUrl}`);
    setCopiedCloneId(repo.id);
    setTimeout(() => setCopiedCloneId(null), 2000);
  };

  const handleCopyTelegram = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.telegramHandle || '@E_BabMan95');
    setCopiedTelegram(true);
    setTimeout(() => setCopiedTelegram(false), 2000);
  };

  const filteredRepos = useMemo(() => {
    return repos.filter((r) => {
      const matchesLang =
        filterLang === 'all' ||
        (r.language && r.language.toLowerCase() === filterLang.toLowerCase());
      const matchesSearch =
        searchQuery.trim() === '' ||
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (r.topics && r.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesLang && matchesSearch;
    });
  }, [repos, filterLang, searchQuery]);

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              Code & Direct Chat
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-display">
              My GitHub Repos & Telegram
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl leading-relaxed">
              Real projects and coursework from AAiT and personal experiments, plus a direct link to chat with me on Telegram.
            </p>
          </div>

          {/* Controls: Search and Language Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search repos or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-52 pl-9 pr-3 py-1.5 text-xs bg-zinc-100/80 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Language filter buttons */}
            <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-x-auto">
              {['all', 'Java', 'JavaScript', 'Kotlin', 'HTML', 'C++'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setFilterLang(lang)}
                  type="button"
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    filterLang.toLowerCase() === lang.toLowerCase()
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  {lang === 'all' ? 'All Languages' : lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Telegram Hub Banner Card */}
        <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-200 mb-2">
                <Send className="w-4 h-4 text-blue-200" />
                <span>Direct Telegram Chat</span>
                <span aria-hidden="true">·</span>
                <span>Addis Ababa (EAT)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
                Hit Me Up on Telegram ({PERSONAL_INFO.telegramHandle})
              </h3>
              <p className="text-sm text-blue-100 mt-2 leading-relaxed">
                Got a question about a project, want to collaborate on something cool, or just say hi? Drop me a message on Telegram — I am online pretty often and happy to talk!
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={PERSONAL_INFO.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-xs font-medium bg-white text-blue-900 hover:bg-blue-50 rounded-lg transition-all shadow-xs flex items-center gap-2 font-display"
              >
                <Send className="w-3.5 h-3.5 text-blue-600" />
                <span>Open in Telegram</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-blue-400" />
              </a>

              <button
                type="button"
                onClick={handleCopyTelegram}
                className="px-3.5 py-2.5 text-xs font-mono bg-blue-800/80 hover:bg-blue-800 text-white border border-blue-400/40 rounded-lg transition-colors flex items-center gap-1.5"
              >
                {copiedTelegram ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTelegram ? 'Copied!' : `Copy ${PERSONAL_INFO.telegramHandle}`}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live GitHub Sync Strip */}
        <div className="mb-6 p-3 bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-mono">
            <Github className="w-4 h-4 text-zinc-800 dark:text-zinc-200 shrink-0" />
            <span>GitHub Profile:</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">github.com/{githubUser}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={githubUser}
              onChange={(e) => setGithubUser(e.target.value)}
              placeholder="github username"
              className="px-2.5 py-1 text-xs font-mono bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-zinc-100 w-36 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={() => fetchLiveRepos(githubUser)}
              disabled={loadingApi}
              type="button"
              className="px-3 py-1 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 rounded-md transition-opacity flex items-center gap-1 font-medium whitespace-nowrap"
            >
              <RefreshCw className={`w-3 h-3 ${loadingApi ? 'animate-spin' : ''}`} />
              <span>{loadingApi ? 'Checking...' : 'Refresh Repos'}</span>
            </button>
          </div>
        </div>

        {apiNotice && (
          <div className="mb-6 p-2.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-lg text-xs font-mono text-blue-700 dark:text-blue-300">
            {apiNotice}
          </div>
        )}

        {/* GitHub Repositories Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => {
            const langColor = LANGUAGE_COLORS[repo.language] || '#3b82f6';
            const isCopied = copiedCloneId === repo.id;

            return (
              <div
                key={repo.id}
                onClick={() => onSelectRepo(repo)}
                className="group cursor-pointer flex flex-col justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-2xl transition-all hover:shadow-md"
              >
                <div>
                  {/* Top Bar with GitHub icon and Stars */}
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-3 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{repo.language}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {repo.stars > 0 && (
                        <span className="flex items-center gap-1 text-amber-500 font-semibold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{repo.stars}</span>
                        </span>
                      )}
                      {repo.forks > 0 && (
                        <span className="flex items-center gap-1 text-zinc-400">
                          <GitFork className="w-3 h-3" />
                          <span>{repo.forks}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Repository Title */}
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-display mb-2 break-all">
                    {repo.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                    {repo.description}
                  </p>

                  {/* Topics Chips */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md"
                        >
                          #{topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && (
                        <span className="text-[10px] text-zinc-400 self-center">
                          +{repo.topics.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer with clone button and external link */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                  <button
                    onClick={(e) => handleCopyClone(e, repo)}
                    type="button"
                    title="Copy git clone command"
                    className="flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 font-mono transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>git clone</span>
                      </>
                    )}
                  </button>

                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
