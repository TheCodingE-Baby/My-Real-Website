import React, { useState } from 'react';
import { Mail, Send, Check, Copy, Shield, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [subjectTag, setSubjectTag] = useState('Project Idea');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const PGP_FINGERPRINT = '4A9F 12C8 98B2 E4D1 092F 77A3 CC19 88E0 2B54 99FF';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) return;

    setSubmitted(true);
    setTimeout(() => {
      setSenderName('');
      setSenderEmail('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  const copyPGP = () => {
    navigator.clipboard.writeText(PGP_FINGERPRINT);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Direct Info & Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                Get In Touch
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-display">
                Let's Connect & Build Together
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                Whether you have an interesting project idea, an internship opportunity, feedback on my repos, or just want to chat about tech, feel free to drop a message or say hi on Telegram!
              </p>

              {/* Direct Channels List */}
              <div className="mt-8 space-y-3">
                <a
                  href={PERSONAL_INFO.socials.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 hover:border-blue-300 dark:hover:border-blue-800 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Send className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        Chat on Telegram (Fastest)
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-mono">
                        {PERSONAL_INFO.telegramHandle} (t.me/E_BabMan95)
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        Direct Email
                      </div>
                      <div className="text-xs text-zinc-500 font-mono">
                        {PERSONAL_INFO.email}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={PERSONAL_INFO.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2 text-xs font-medium text-zinc-800 dark:text-zinc-200">
                      <Github className="w-4 h-4 text-zinc-500" />
                      <span>GitHub</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />
                  </a>

                  <a
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2 text-xs font-medium text-zinc-800 dark:text-zinc-200">
                      <Linkedin className="w-4 h-4 text-zinc-500" />
                      <span>LinkedIn</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />
                  </a>
                </div>
              </div>
            </div>

            {/* PGP Security Fingerprint Box */}
            <div className="mt-8 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-blue-500" />
                  <span>PGP Key Fingerprint</span>
                </span>
                <button
                  onClick={copyPGP}
                  type="button"
                  className="text-[10px] font-mono text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 flex items-center gap-1"
                >
                  {copiedKey ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 break-all select-all">
                {PGP_FINGERPRINT}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 font-display mb-4">
              Drop Me a Message
            </h3>

            {/* Subject Selector Buttons */}
            <div className="mb-5">
              <label className="block text-xs font-medium text-zinc-500 mb-2">
                What's this about?
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Project Idea',
                  'Internship / Opportunity',
                  'AAiT / Study Chat',
                  'Just Saying Hi',
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSubjectTag(tag)}
                    className={`px-2.5 py-1 text-xs rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                      subjectTag === tag
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium'
                        : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                  <span>Message *</span>
                  <span className="font-mono tabular-nums">{message.length} chars</span>
                </div>
                <textarea
                  required
                  rows={4}
                  placeholder="Hey Eyob, I saw your projects and wanted to ask about..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full py-2.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                {submitted ? <Check className="w-3.5 h-3.5 text-white" /> : <Send className="w-3.5 h-3.5" />}
                <span>{submitted ? 'Message sent! Thanks for reaching out.' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
