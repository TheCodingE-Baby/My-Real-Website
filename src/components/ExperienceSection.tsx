import React, { useState } from 'react';
import { EXPERIENCES, EDUCATION, PERSONAL_INFO } from '../data/portfolioData';
import { Download, Printer, Copy, Check, FileText, CheckCircle2, GraduationCap } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [resumeMode, setResumeMode] = useState<boolean>(false);
  const [copiedResume, setCopiedResume] = useState<boolean>(false);

  const filteredExperiences = EXPERIENCES.filter(
    (exp) => filter === 'all' || exp.type === filter
  );

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdownResume = () => {
    const resumeText = `# ${PERSONAL_INFO.name}
${PERSONAL_INFO.title}
Location: ${PERSONAL_INFO.location}
Email: ${PERSONAL_INFO.email}

## Executive Summary
${PERSONAL_INFO.bio}

## Core Competencies & Metrics
${PERSONAL_INFO.stats.map((s) => `- ${s.label}: ${s.value}`).join('\n')}

## Professional Experience
${EXPERIENCES.map(
  (e) => `### ${e.role} — ${e.organization}
${e.period} | ${e.location}
${e.summary}
Key Achievements:
${e.achievements.map((a) => `- ${a}`).join('\n')}
Technologies: ${e.technologies.join(', ')}
`
).join('\n')}

## Academic Foundation
${EDUCATION.map(
  (ed) => `### ${ed.degree} — ${ed.institution}
${ed.period} | ${ed.location}
${ed.summary}
${ed.achievements.map((a) => `- ${a}`).join('\n')}
`
).join('\n')}
`;

    const blob = new Blob([resumeText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Eyob_Fikre_Resume_2026.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyResume = () => {
    const text = `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title} (${PERSONAL_INFO.email})\n\n${EXPERIENCES.map((e) => `${e.role} at ${e.organization} (${e.period})\n${e.summary}\n${e.achievements.join('\n')}`).join('\n\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 2000);
  };

  return (
    <section id="experience" className="py-16 md:py-24 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              Journey & Background
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-display">
              Experience & AAiT Journey
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl leading-relaxed">
              Software engineering coursework at AAiT, practical Android & web projects, and open-source contributions.
            </p>
          </div>

          {/* Controls: Resume view toggle & Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setResumeMode(!resumeMode)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 ${
                resumeMode
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                  : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{resumeMode ? 'Back to Interactive Timeline' : 'Formatted Resume Mode'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="p-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-850 transition-colors"
              title="Print / Save PDF"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleDownloadMarkdownResume}
              className="p-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-850 transition-colors"
              title="Download Markdown Resume"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleCopyResume}
              className="p-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-850 transition-colors"
              title="Copy Resume Plaintext"
            >
              {copiedResume ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* View Mode 1: Formatted Document / Resume Mode */}
        {resumeMode ? (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 sm:p-12 shadow-sm font-sans max-w-4xl mx-auto">
            {/* Header info */}
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-8 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
              <div>
                <h1 className="text-3xl font-bold font-display text-zinc-900 dark:text-zinc-100">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-base text-zinc-600 dark:text-zinc-400 mt-1 font-medium">
                  {PERSONAL_INFO.title}
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  {PERSONAL_INFO.location} · {PERSONAL_INFO.email}
                </p>
              </div>
              <div className="text-xs text-zinc-400 font-mono">
                Updated Q2 2026
              </div>
            </div>

            {/* Experience list */}
            <div className="space-y-8">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 font-display">
                      {exp.role} <span className="text-zinc-500 font-normal">at {exp.organization}</span>
                    </h3>
                    <span className="text-xs font-mono text-zinc-500 whitespace-nowrap">
                      {exp.period} · {exp.location}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
                    {exp.summary}
                  </p>
                  <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 pl-4 list-disc marker:text-blue-600">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-mono text-zinc-500">
                    <span>Stack:</span>
                    {exp.technologies.join(' · ')}
                  </div>
                </div>
              ))}
            </div>

            {/* Academic Foundation in Resume Mode */}
            <div className="pt-8 mt-8 border-t border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4 font-mono">
                Academic Foundation
              </h2>
              {EDUCATION.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 font-display">
                      {edu.degree} — <span className="font-normal text-zinc-600 dark:text-zinc-400">{edu.institution}</span>
                    </h3>
                    <span className="text-xs font-mono text-zinc-500 whitespace-nowrap">
                      {edu.period} · {edu.location}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-2 leading-relaxed">
                    {edu.summary}
                  </p>
                  <ul className="space-y-1 text-xs text-zinc-700 dark:text-zinc-300 pl-4 list-disc marker:text-blue-600">
                    {edu.achievements.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* View Mode 2: Interactive Filterable Timeline */
          <div className="space-y-6">
            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg w-fit">
              {[
                { id: 'all', label: 'All Roles' },
                { id: 'architecture', label: 'Architecture' },
                { id: 'engineering', label: 'Engineering' },
                { id: 'oss', label: 'Open Source' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  type="button"
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    filter === tab.id
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Timeline Cards */}
            <div className="space-y-4">
              {filteredExperiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-6 sm:p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                        <span>{exp.organization}</span>
                        <span aria-hidden="true">·</span>
                        <span>{exp.location}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{exp.type}</span>
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-display">
                        {exp.role}
                      </h3>
                    </div>

                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded whitespace-nowrap self-start sm:self-auto">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                    {exp.summary}
                  </p>

                  <div className="space-y-2 mb-6">
                    {exp.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center gap-1.5 text-xs text-zinc-500">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Technologies:</span>
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="font-mono bg-zinc-50 dark:bg-zinc-800/60 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Academic Foundation in Timeline Mode */}
            <div className="pt-4">
              <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Foundation · Addis Ababa University</span>
              </div>
              {EDUCATION.map((edu) => (
                <div
                  key={edu.id}
                  className="p-6 sm:p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                    <div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                        {edu.institution} · {edu.location}
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-display">
                        {edu.degree}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded whitespace-nowrap self-start sm:self-auto">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                    {edu.summary}
                  </p>
                  <div className="space-y-2">
                    {edu.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
