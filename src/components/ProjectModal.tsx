import React from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, CheckCircle2, Cpu, BarChart3 } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-900 dark:text-zinc-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-10 mb-6">
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-2">
            <span className="capitalize">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>Completed {project.year}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">Production Grade</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight font-display">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1">
            {project.tagline}
          </p>
        </div>

        {/* Image Frame */}
        <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 mb-6 bg-zinc-100 dark:bg-zinc-950">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 mb-6">
          {project.metrics.map((m, i) => (
            <div key={i} className="text-center sm:text-left">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">{m.label}</div>
              <div className="text-lg sm:text-xl font-semibold font-display tabular-nums text-zinc-900 dark:text-zinc-100 mt-0.5">
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Overview */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 font-mono">
              System Overview
            </h3>
            <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Architecture Highlights */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3 font-mono flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Architectural Invariants</span>
            </h3>
            <ul className="space-y-2">
              {project.architecture.map((item, i) => (
                <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">▪</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Outcomes */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3 font-mono flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Measured Production Impact</span>
            </h3>
            <ul className="space-y-2">
              {project.keyOutcomes.map((item, i) => (
                <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack & Links */}
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Technologies:</span>
              {project.stack.map((tech, i) => (
                <span key={i} className="font-mono bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded text-zinc-700 dark:text-zinc-300">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500 rounded-md transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Interactive Preview</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
