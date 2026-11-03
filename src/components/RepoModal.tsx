import React, { useState } from 'react';
import { GithubRepo } from '../types';
import { X, ExternalLink, GitFork, Star, Copy, Check, Terminal, Code2, BookOpen } from 'lucide-react';

interface RepoModalProps {
  repo: GithubRepo | null;
  onClose: () => void;
}

export const RepoModal: React.FC<RepoModalProps> = ({ repo, onClose }) => {
  const [copiedClone, setCopiedClone] = useState(false);

  if (!repo) return null;

  const handleCopyClone = () => {
    navigator.clipboard.writeText(`git clone ${repo.cloneUrl}`);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-900 dark:text-zinc-100"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pr-10 mb-6">
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-2 font-mono">
            <span>Public Repository</span>
            <span aria-hidden="true">·</span>
            <span>{repo.language}</span>
            {repo.license && (
              <>
                <span aria-hidden="true">·</span>
                <span>{repo.license}</span>
              </>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight font-display break-all">
            {repo.fullName}
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
            {repo.description}
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 mb-6 font-mono text-center sm:text-left">
          <div>
            <div className="text-xs text-zinc-500 flex items-center justify-center sm:justify-start gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500" />
              <span>Stars</span>
            </div>
            <div className="text-lg font-bold tabular-nums mt-0.5">{repo.stars}</div>
          </div>
          <div>
            <div className="text-xs text-zinc-500 flex items-center justify-center sm:justify-start gap-1">
              <GitFork className="w-3.5 h-3.5" />
              <span>Forks</span>
            </div>
            <div className="text-lg font-bold tabular-nums mt-0.5">{repo.forks}</div>
          </div>
          <div>
            <div className="text-xs text-zinc-500">Updated</div>
            <div className="text-sm font-semibold mt-1">{repo.updatedAt}</div>
          </div>
        </div>

        {/* Git Clone Box */}
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1.5 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>Clone Repository</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 text-zinc-100 font-mono text-xs border border-zinc-800">
            <span className="truncate mr-3">git clone {repo.cloneUrl}</span>
            <button
              onClick={handleCopyClone}
              type="button"
              className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors shrink-0"
              title="Copy git clone"
            >
              {copiedClone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* README Preview if available */}
        {repo.readmePreview && (
          <div className="mb-6">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>README.md Abstract</span>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 text-xs font-mono whitespace-pre-wrap leading-relaxed text-zinc-700 dark:text-zinc-300">
              {repo.readmePreview}
            </div>
          </div>
        )}

        {/* Topics */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="mb-6">
            <div className="text-xs font-semibold text-zinc-500 mb-2">Topics & Tags:</div>
            <div className="flex flex-wrap gap-1.5">
              {repo.topics.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs font-mono bg-zinc-100 dark:bg-zinc-800/80 rounded-md text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/60"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 text-xs font-medium border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
          >
            Close
          </button>

          <a
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Open on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
