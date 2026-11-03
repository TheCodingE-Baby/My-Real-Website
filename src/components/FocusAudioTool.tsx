import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Headphones, Bell } from 'lucide-react';

export const FocusAudioTool: React.FC = () => {
  // --- Pomodoro State ---
  const [secondsRemaining, setSecondsRemaining] = useState<number>(25 * 60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<'work' | 'break'>('work');

  // --- Soundscape State ---
  const [soundPlaying, setSoundPlaying] = useState<boolean>(false);
  const [soundType, setSoundType] = useState<'brown' | 'rain' | 'white'>('brown');
  const [volume, setVolume] = useState<number>(0.25);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioNode | null>(null);

  // Initialize or resume audio context
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Generate buffer for selected sound
  const startSound = (type: 'brown' | 'rain' | 'white') => {
    stopSound();
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * 2; // 2 seconds loop
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    if (type === 'white') {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    } else if (type === 'brown') {
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Gain compensation
      }
    } else if (type === 'rain') {
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.2;
      }
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Filter to soften the harsh frequencies
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = type === 'brown' ? 380 : type === 'rain' ? 800 : 1200;

    const gain = ctx.createGain();
    gain.gain.value = volume;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noiseSourceRef.current = noise;
    gainNodeRef.current = gain;
    setSoundPlaying(true);
  };

  const stopSound = () => {
    if (noiseSourceRef.current) {
      try {
        (noiseSourceRef.current as any).stop();
      } catch (e) {}
      noiseSourceRef.current = null;
    }
    setSoundPlaying(false);
  };

  const playChime = () => {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.2);
  };

  // Timer Tick
  useEffect(() => {
    let interval: any = null;
    if (timerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timerRunning && secondsRemaining === 0) {
      setTimerRunning(false);
      playChime();
      if (timerMode === 'work') {
        setTimerMode('break');
        setSecondsRemaining(5 * 60);
      } else {
        setTimerMode('work');
        setSecondsRemaining(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [timerRunning, secondsRemaining, timerMode]);

  // Volume adjustment
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopSound();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-display flex items-center gap-2">
            <Headphones className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Focus Ambiance & Pomodoro Workstation</span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Web Audio API generative soundscapes combined with a focused interval timer.
          </p>
        </div>

        {/* Work vs Break Mode */}
        <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-lg border border-zinc-200 dark:border-zinc-700/60 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              setTimerMode('work');
              setSecondsRemaining(25 * 60);
              setTimerRunning(false);
            }}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              timerMode === 'work'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            25m Focus Block
          </button>
          <button
            type="button"
            onClick={() => {
              setTimerMode('break');
              setSecondsRemaining(5 * 60);
              setTimerRunning(false);
            }}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              timerMode === 'break'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            5m Recovery Break
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Timer Display */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl text-center">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
            {timerMode === 'work' ? 'Deep Work Interval' : 'Resting Interval'}
          </div>

          <div className="text-5xl sm:text-6xl font-bold font-mono tracking-tight tabular-nums text-zinc-900 dark:text-zinc-100 mb-6">
            {formatTime(secondsRemaining)}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTimerRunning(!timerRunning)}
              className="flex items-center gap-2 px-5 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-xs"
            >
              {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{timerRunning ? 'Pause' : 'Start Focus'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setTimerRunning(false);
                setSecondsRemaining(timerMode === 'work' ? 25 * 60 : 5 * 60);
              }}
              className="p-2 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Audio Synthesizer */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 font-mono">
              Ambient Acoustic Texture
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'brown', label: 'Brown Noise', desc: 'Deep warm rumble' },
                { id: 'rain', label: 'Rainfall', desc: 'Soft organic drops' },
                { id: 'white', label: 'White Noise', desc: 'Crisp static hum' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSoundType(s.id as any);
                    if (soundPlaying) {
                      startSound(s.id as any);
                    }
                  }}
                  className={`p-3 text-left rounded-xl border transition-all ${
                    soundType === s.id
                      ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 text-zinc-900 dark:text-zinc-100'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
                  }`}
                >
                  <div className="text-xs font-medium">{s.label}</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Audio Controls */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                Audio Stream: {soundPlaying ? 'Active' : 'Muted'}
              </span>

              <button
                type="button"
                onClick={() => {
                  if (soundPlaying) {
                    stopSound();
                  } else {
                    startSound(soundType);
                  }
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                  soundPlaying
                    ? 'bg-amber-600 text-white hover:bg-amber-700'
                    : 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90'
                }`}
              >
                {soundPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{soundPlaying ? 'Mute Ambiance' : 'Synthesize Ambiance'}</span>
              </button>
            </div>

            {/* Volume slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                <span className="flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Output Volume</span>
                </span>
                <span className="font-mono tabular-nums">{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.8"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
