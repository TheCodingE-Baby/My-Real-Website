import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface DigitalClockProps {
  showSeconds?: boolean;
  compact?: boolean;
  showLocation?: boolean;
}

export const DigitalClock: React.FC<DigitalClockProps> = ({
  showSeconds = true,
  compact = false,
  showLocation = true,
}) => {
  const [time, setTime] = useState<string>('12:00');
  const [seconds, setSeconds] = useState<string>('00');
  const [period, setPeriod] = useState<string>('PM');
  const [dateStr, setDateStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Addis Ababa timezone (EAT / UTC+3) using 12-hr format
      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Addis_Ababa',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      const parts = timeFormatter.formatToParts(now);
      const h = parts.find((p) => p.type === 'hour')?.value || '12';
      const m = parts.find((p) => p.type === 'minute')?.value || '00';
      const s = parts.find((p) => p.type === 'second')?.value || '00';
      const dayPeriod = parts.find((p) => p.type === 'dayPeriod')?.value?.toUpperCase() || 'AM';

      setTime(`${h.padStart(2, '0')}:${m}`);
      setSeconds(s);
      setPeriod(dayPeriod);

      const dateFormatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Addis_Ababa',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      setDateStr(dateFormatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 font-mono text-xs tabular-nums text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-1 rounded-md border border-zinc-200/80 dark:border-zinc-700/60 shadow-2xs">
        <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
        <span className="font-semibold">{time}</span>
        {showSeconds && (
          <span className="text-blue-600 dark:text-blue-400 font-bold">:{seconds}</span>
        )}
        <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 font-mono ml-0.5">
          {period}
        </span>
        <span className="text-[10px] text-zinc-400 font-sans ml-0.5">EAT</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
        <Clock className="w-4 h-4" />
      </div>
      <div>
        <div className="flex items-baseline gap-1 font-mono tabular-nums leading-none">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
            {time}
          </span>
          {showSeconds && (
            <span className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">
              :{seconds}
            </span>
          )}
          <span className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 font-mono ml-1">
            {period}
          </span>
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 font-mono ml-1">
            EAT (UTC+3)
          </span>
        </div>
        {showLocation && (
          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5">
            <span>Addis Ababa, Ethiopia</span>
            <span aria-hidden="true">·</span>
            <span>{dateStr}</span>
          </div>
        )}
      </div>
    </div>
  );
};
