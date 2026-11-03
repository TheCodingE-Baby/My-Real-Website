import React, { useState, useMemo } from 'react';
import { Globe, Clock, Calendar } from 'lucide-react';
import { DigitalClock } from './DigitalClock';

interface TimezoneToolProps {
  onScheduleSlot: (timeString: string) => void;
}

const COMMON_CITIES = [
  { city: 'San Francisco', offset: -8, label: 'PST / PDT (UTC-8)' },
  { city: 'New York', offset: -5, label: 'EST / EDT (UTC-5)' },
  { city: 'London', offset: 0, label: 'GMT / BST (UTC+0)' },
  { city: 'Berlin / Paris', offset: 1, label: 'CET / CEST (UTC+1)' },
  { city: 'Lagos / Abuja', offset: 1, label: 'WAT (UTC+1)' },
  { city: 'Dubai', offset: 4, label: 'GST (UTC+4)' },
  { city: 'Singapore', offset: 8, label: 'SGT (UTC+8)' },
  { city: 'Tokyo', offset: 9, label: 'JST (UTC+9)' },
  { city: 'Sydney', offset: 11, label: 'AEST / AEDT (UTC+11)' },
];

const EYOB_OFFSET = 3; // Addis Ababa, Ethiopia (EAT / UTC+3)

export const TimezoneTool: React.FC<TimezoneToolProps> = ({ onScheduleSlot }) => {
  const [selectedVisitorCity, setSelectedVisitorCity] = useState(COMMON_CITIES[2]); // London default
  const [selectedHour, setSelectedHour] = useState<number>(15); // 3:00 PM Addis Ababa

  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);

  // Calculate visitor hour relative to Addis Ababa (offset delta = visitorOffset - 3)
  const relativeOffset = selectedVisitorCity.offset - EYOB_OFFSET;
  const visitorHour = (selectedHour + relativeOffset + 24) % 24;

  const formatHour = (h: number) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 === 0 ? 12 : h % 12;
    return `${displayHour}:00 ${period}`;
  };

  const getSlotSuitability = (addisH: number, visitorH: number) => {
    const addisWork = addisH >= 9 && addisH <= 18;
    const visitorWork = visitorH >= 9 && visitorH <= 18;
    if (addisWork && visitorWork) return 'optimal';
    if (addisWork || visitorWork) return 'acceptable';
    return 'off-hours';
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-display flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Timezone & Meeting Overlap Coordinator</span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Calculate real-time overlap between Eyob's Addis Ababa hub (EAT / UTC+3) and your local timezone.
          </p>
        </div>

        {/* Visitor Location Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 whitespace-nowrap">Your City:</span>
          <select
            value={selectedVisitorCity.city}
            onChange={(e) => {
              const found = COMMON_CITIES.find((c) => c.city === e.target.value);
              if (found) setSelectedVisitorCity(found);
            }}
            className="text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md px-3 py-1.5 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          >
            {COMMON_CITIES.map((c) => (
              <option key={c.city} value={c.city}>
                {c.city} ({c.label})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clocks Comparison Banner with live digital clock */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
            <span>Eyob's Time (Addis Ababa)</span>
            <DigitalClock compact showSeconds />
          </div>
          <div className="text-2xl sm:text-3xl font-semibold font-display tabular-nums text-zinc-900 dark:text-zinc-100 mt-1">
            {formatHour(selectedHour)}
          </div>
          <div className="text-xs text-zinc-400 mt-1">East Africa Time (EAT) · UTC+3</div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
            <span>Your Time ({selectedVisitorCity.city})</span>
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl sm:text-3xl font-semibold font-display tabular-nums text-blue-600 dark:text-blue-400 mt-1">
            {formatHour(visitorHour)}
          </div>
          <div className="text-xs text-zinc-400 mt-1">
            {relativeOffset >= 0 ? `+${relativeOffset}` : relativeOffset} hours relative to Addis Ababa
          </div>
        </div>
      </div>

      {/* Interactive 24-Hour Timeline */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2">
          <span>Click an hour to inspect overlap:</span>
          <span>
            {formatHour(selectedHour)} Addis Ababa / {formatHour(visitorHour)} {selectedVisitorCity.city}
          </span>
        </div>

        <div className="grid grid-cols-12 sm:grid-cols-24 gap-1 p-2 bg-zinc-100 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-x-auto">
          {hours.map((h) => {
            const vH = (h + relativeOffset + 24) % 24;
            const suitability = getSlotSuitability(h, vH);
            const isSelected = h === selectedHour;

            let colorClass = 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500';
            if (suitability === 'optimal') {
              colorClass =
                'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800';
            } else if (suitability === 'acceptable') {
              colorClass = 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300';
            }

            const formatShort = (hour: number) => {
              const p = hour >= 12 ? 'p' : 'a';
              const dh = hour % 12 === 0 ? 12 : hour % 12;
              return `${dh}${p}`;
            };

            return (
              <button
                key={h}
                type="button"
                onClick={() => setSelectedHour(h)}
                className={`h-12 rounded flex flex-col items-center justify-center text-[10px] font-mono transition-all ${colorClass} ${
                  isSelected
                    ? 'ring-2 ring-blue-600 ring-offset-1 dark:ring-offset-zinc-900 scale-105 z-10'
                    : 'hover:opacity-80'
                }`}
                title={`Addis Ababa ${formatHour(h)} / ${selectedVisitorCity.city} ${formatHour(vH)}`}
              >
                <span className="font-semibold">{formatShort(h)}</span>
                <span className="text-[8px] opacity-70">{formatShort(vH)}</span>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-400 dark:bg-emerald-600"></span>
            <span>Mutually Optimal (9:00 AM - 6:00 PM both)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-amber-400 dark:bg-amber-600"></span>
            <span>Acceptable (Early/Evening)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-zinc-300 dark:bg-zinc-700"></span>
            <span>Off-Hours</span>
          </div>
        </div>
      </div>

      {/* Suggested Slot Action */}
      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400 font-mono">
            Selected Window
          </div>
          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mt-0.5">
            {formatHour(selectedHour)} Addis Ababa ({formatHour(visitorHour)} in {selectedVisitorCity.city})
          </div>
        </div>

        <button
          onClick={() =>
            onScheduleSlot(
              `${formatHour(selectedHour)} EAT (Addis Ababa) / ${formatHour(visitorHour)} ${selectedVisitorCity.city}`
            )
          }
          type="button"
          className="px-4 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-xs"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book This Window</span>
        </button>
      </div>
    </div>
  );
};
