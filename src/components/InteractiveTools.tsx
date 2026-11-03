import React, { useState } from 'react';
import { TimezoneTool } from './TimezoneTool';
import { EstimatorTool } from './EstimatorTool';
import { DevUtilitiesTool } from './DevUtilitiesTool';
import { FocusAudioTool } from './FocusAudioTool';
import { Globe, Calculator, Braces, Headphones } from 'lucide-react';

interface InteractiveToolsProps {
  onScheduleSlot: (slotString: string) => void;
  onOpenBooking: () => void;
}

export const InteractiveTools: React.FC<InteractiveToolsProps> = ({
  onScheduleSlot,
  onOpenBooking,
}) => {
  const [activeTool, setActiveTool] = useState<'timezone' | 'estimator' | 'utilities' | 'focus'>('timezone');

  return (
    <section id="tools" className="py-16 md:py-24 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            Playground & Tools
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-display">
                Handy Mini-Tools
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl leading-relaxed">
                A few fun and useful tools I built: check timezone overlap with me in Addis Ababa, estimate project schedules, test color contrast, or put on rain sounds while you code.
              </p>
            </div>

            {/* Segmented Control for Tools */}
            <div className="flex items-center gap-1 p-1 bg-zinc-200/80 dark:bg-zinc-850 rounded-xl overflow-x-auto max-w-full">
              {[
                { id: 'timezone', label: 'Timezone Check', icon: Globe },
                { id: 'estimator', label: 'Timeline Estimator', icon: Calculator },
                { id: 'utilities', label: 'Dev Utilities', icon: Braces },
                { id: 'focus', label: 'Focus & Rain Audio', icon: Headphones },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTool === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTool(tab.id as any)}
                    type="button"
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Tool Viewport */}
        <div>
          {activeTool === 'timezone' && <TimezoneTool onScheduleSlot={onScheduleSlot} />}
          {activeTool === 'estimator' && <EstimatorTool onOpenBooking={onOpenBooking} />}
          {activeTool === 'utilities' && <DevUtilitiesTool />}
          {activeTool === 'focus' && <FocusAudioTool />}
        </div>
      </div>
    </section>
  );
};
