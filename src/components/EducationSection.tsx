import React, { useState } from 'react';
import { EDUCATION } from '../data/portfolioData';
import { CertificateModal } from './CertificateModal';
import { GraduationCap, Award, CheckCircle2, Eye, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { Education } from '../types';

export const EducationSection: React.FC = () => {
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
    imageUrl: string;
    badge?: string;
  }>({
    isOpen: false,
    title: '',
    imageUrl: '',
  });

  const handleOpenCertificate = (edu: Education) => {
    if (edu.image) {
      setModalData({
        isOpen: true,
        title: edu.degree,
        subtitle: `${edu.institution} · ${edu.period}`,
        imageUrl: edu.image,
        badge: edu.badge,
      });
    }
  };

  return (
    <section id="education" className="py-16 md:py-24 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Credentials & Foundation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-display">
              Education, Matriculation & Certificates
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Software engineering training at AAiT, national matriculation examination results, and high school honors from Lideta Catholic Cathedral School.
            </p>
          </div>
        </div>

        {/* Education Cards Grid */}
        <div className="space-y-8">
          {EDUCATION.map((edu) => {
            const hasImage = Boolean(edu.image);
            const hasLogo = Boolean(edu.logo);

            return (
              <div
                key={edu.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-2xs"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Details & Scores */}
                  <div className={hasImage ? 'lg:col-span-8' : 'lg:col-span-12'}>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {edu.badge && (
                        <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
                          {edu.badge}
                        </span>
                      )}
                      {edu.certNumber && (
                        <span className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                          Cert No. {edu.certNumber}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-3 mb-3">
                      {hasLogo && (
                        <img
                          src={edu.logo}
                          alt={edu.institution}
                          className="w-12 h-12 object-contain rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white p-1 shrink-0"
                        />
                      )}
                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-display">
                          {edu.degree}
                        </h3>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                          {edu.institution}
                        </p>
                      </div>
                    </div>

                    {/* Metadata line */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{edu.period}</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{edu.location}</span>
                      </span>
                    </div>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-5 leading-relaxed">
                      {edu.summary}
                    </p>

                    {/* Subject scores strip for Matric */}
                    {edu.scores && (
                      <div className="mb-6 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850/60 border border-zinc-200/80 dark:border-zinc-800">
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                            ESSLCE Subject Mark Breakdown (Total: 480)
                          </span>
                          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            Natural Science Stream
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                          {edu.scores.map((sc) => (
                            <div
                              key={sc.subject}
                              className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-750 text-center"
                            >
                              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                                {sc.subject}
                              </div>
                              <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-mono mt-0.5">
                                {sc.score}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key Highlights */}
                    <div className="space-y-2 mb-4">
                      {edu.achievements.map((ach, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Certificate / Diploma Preview Card */}
                  {hasImage && (
                    <div className="lg:col-span-4 flex flex-col">
                      <div
                        onClick={() => handleOpenCertificate(edu)}
                        className="group relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/80 shadow-xs cursor-pointer hover:border-blue-500/60 transition-all"
                      >
                        <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                          <img
                            src={edu.image}
                            alt={`${edu.degree} document`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <span className="px-3 py-1.5 rounded-lg bg-zinc-900/90 text-white text-xs font-medium flex items-center gap-1.5 shadow-md">
                            <Eye className="w-3.5 h-3.5" />
                            <span>Click to Inspect Full Document</span>
                          </span>
                        </div>

                        <div className="p-3 bg-zinc-50 dark:bg-zinc-850 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs">
                          <span className="text-zinc-600 dark:text-zinc-400 font-medium">
                            {edu.credentialType === 'diploma'
                              ? 'Official High School Diploma'
                              : 'National Exam Certificate'}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenCertificate(edu);
                            }}
                            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
                          >
                            <span>Inspect</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <CertificateModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData((prev) => ({ ...prev, isOpen: false }))}
        title={modalData.title}
        subtitle={modalData.subtitle}
        imageUrl={modalData.imageUrl}
        badge={modalData.badge}
      />
    </section>
  );
};
