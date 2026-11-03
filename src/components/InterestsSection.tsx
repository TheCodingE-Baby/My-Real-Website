import React, { useState } from 'react';
import { INTERESTS, FAMILY_MEMBERS } from '../data/portfolioData';
import { Heart, Sparkles, Gamepad2, Compass, Sun, Eye, Users } from 'lucide-react';
import { CertificateModal } from './CertificateModal';

export const InterestsSection: React.FC = () => {
  const [modalImage, setModalImage] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
    imageUrl: string;
  }>({
    isOpen: false,
    title: '',
    imageUrl: '',
  });

  const getInterestIcon = (id: string) => {
    switch (id) {
      case 'interest-game':
        return <Gamepad2 className="w-4 h-4 text-rose-500" />;
      case 'interest-car':
        return <Compass className="w-4 h-4 text-blue-500" />;
      case 'interest-sunset':
        return <Sun className="w-4 h-4 text-amber-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <section id="interests" className="py-16 md:py-24 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Passions & Life Outside The Terminal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-display">
            Interests, Inspirations & Family
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            The games that sparked my curiosity in computer graphics, the machines whose designs I admire, the sunsets where I reset, and the family that grounds everything I do.
          </p>
        </div>

        {/* Part 1: Interests Grid (3 Cards: Game, Car, Sunset) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {INTERESTS.map((interest) => (
            <div
              key={interest.id}
              className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-2xs flex flex-col"
            >
              {/* Image Frame with click to zoom */}
              <div
                className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950 cursor-pointer"
                onClick={() =>
                  setModalImage({
                    isOpen: true,
                    title: interest.title,
                    subtitle: interest.tagline,
                    imageUrl: interest.image,
                  })
                }
              >
                <img
                  src={interest.image}
                  alt={interest.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-zinc-900/80 backdrop-blur-md border border-zinc-700/60 text-[11px] font-medium text-white flex items-center gap-1.5">
                  {getInterestIcon(interest.id)}
                  <span>{interest.category}</span>
                </div>

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-1.5 rounded-lg bg-zinc-900/90 text-white text-xs flex items-center gap-1 shadow">
                    <Eye className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight font-display mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {interest.title}
                  </h3>
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-3">
                    {interest.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    {interest.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap gap-1.5">
                  {interest.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Part 2: Heartfelt Family & Roots Showcase */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-500 mb-2">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Roots, Gratitude & Family</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 font-display mb-2">
            The People Behind The Journey
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl mb-8 leading-relaxed">
            Behind every late-night coding session and academic milestone at AAiT are the two people who made it all possible: my father and mother.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {FAMILY_MEMBERS.map((member) => (
              <div
                key={member.id}
                onClick={() =>
                  setModalImage({
                    isOpen: true,
                    title: member.name,
                    subtitle: member.caption,
                    imageUrl: member.image,
                  })
                }
                className="group relative flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-50 dark:bg-zinc-850/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer"
              >
                {/* Photo Frame */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-950 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity" />
                  <span className="absolute bottom-2.5 left-3 text-[11px] font-mono font-medium text-white px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-700/60">
                    {member.role}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 font-display">
                      {member.name}
                    </h4>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5 mb-2.5">
                      {member.caption}
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {member.note}
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500">
                    <span>Click to view photo</span>
                    <Eye className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <CertificateModal
        isOpen={modalImage.isOpen}
        onClose={() => setModalImage((prev) => ({ ...prev, isOpen: false }))}
        title={modalImage.title}
        subtitle={modalImage.subtitle}
        imageUrl={modalImage.imageUrl}
      />
    </section>
  );
};
