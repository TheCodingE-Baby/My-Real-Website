import React, { useState, useEffect } from 'react';
import { GuestbookEntry } from '../types';
import { INITIAL_GUESTBOOK } from '../data/portfolioData';
import { Heart, Send, MessageSquare, Check, Sparkles } from 'lucide-react';

export const GuestbookSection: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>(() => {
    try {
      const saved = localStorage.getItem('eyob_portfolio_guestbook');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_GUESTBOOK;
  });

  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [role, setRole] = useState<'Developer' | 'Designer' | 'Founder' | 'Recruiter' | 'Friend'>('Developer');
  const [message, setMessage] = useState('');
  const [avatarColor, setAvatarColor] = useState('bg-blue-600');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('eyob_portfolio_guestbook', JSON.stringify(entries));
    } catch (e) {}
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry: GuestbookEntry = {
      id: `gb-${Date.now()}`,
      name: name.trim(),
      handle: handle.trim() ? (handle.startsWith('@') ? handle.trim() : `@${handle.trim()}`) : undefined,
      role,
      message: message.trim(),
      createdAt: 'Just now',
      avatarColor,
      likes: 1,
    };

    setEntries([newEntry, ...entries]);
    setName('');
    setHandle('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleLike = (id: string) => {
    setEntries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  const filteredEntries = entries.filter(
    (e) => roleFilter === 'all' || e.role === roleFilter
  );

  return (
    <section id="guestbook" className="py-16 md:py-24 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              Community & Greetings
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-display">
              Public Guestbook
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl leading-relaxed">
              Drop a quick hello, leave feedback on any of my projects, or just say hi!
            </p>
          </div>

          {/* Role Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-x-auto">
            {['all', 'Developer', 'Designer', 'Founder', 'Recruiter'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  roleFilter === r
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {r === 'all' ? 'All Kudos' : r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sign Form */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 font-display mb-1 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Sign the Guestbook</span>
            </h3>
            <p className="text-xs text-zinc-500 mb-6">
              Share a quick note, greeting, or project feedback.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Your Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Founder">Founder</option>
                    <option value="Recruiter">Recruiter</option>
                    <option value="Friend">Friend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Handle (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="@alex_dev"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Drop a few sentences..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Avatar Accent Color Picker */}
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5">
                  Badge Color
                </label>
                <div className="flex items-center gap-2">
                  {[
                    'bg-blue-600',
                    'bg-emerald-600',
                    'bg-violet-600',
                    'bg-amber-600',
                    'bg-rose-600',
                    'bg-zinc-700',
                  ].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setAvatarColor(color)}
                      className={`w-6 h-6 rounded-full ${color} transition-transform ${
                        avatarColor === color ? 'ring-2 ring-offset-2 ring-zinc-900 dark:ring-white scale-110' : 'hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                {submitted ? <Check className="w-3.5 h-3.5 text-white" /> : <Send className="w-3.5 h-3.5" />}
                <span>{submitted ? 'Note Posted to Guestbook!' : 'Publish Guestbook Note'}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Wall of Notes */}
          <div className="lg:col-span-7 space-y-4">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${entry.avatarColor} text-white flex items-center justify-center text-xs font-bold font-display shrink-0`}
                    >
                      {entry.name.slice(0, 1)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <span>{entry.name}</span>
                        {entry.handle && (
                          <span className="text-xs text-zinc-400 font-mono font-normal">
                            {entry.handle}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        <span>{entry.role}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{entry.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Like button */}
                  <button
                    type="button"
                    onClick={() => handleLike(entry.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-zinc-500 hover:text-red-500 dark:hover:text-red-400 border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500/20" />
                    <span className="tabular-nums">{entry.likes}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 pl-11 leading-relaxed">
                  {entry.message}
                </p>
              </div>
            ))}

            {filteredEntries.length === 0 && (
              <div className="p-8 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <p className="text-xs text-zinc-500">No notes found for this role filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
