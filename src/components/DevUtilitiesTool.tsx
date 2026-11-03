import React, { useState, useMemo } from 'react';
import { Palette, Braces, Search, Copy, Check, Sparkles } from 'lucide-react';

export const DevUtilitiesTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contrast' | 'json' | 'regex'>('contrast');

  // --- Contrast State ---
  const [bgColor, setBgColor] = useState('#09090b');
  const [textColor, setTextColor] = useState('#fafafa');

  // Relative luminance calculation based on WCAG standard
  const contrastRatio = useMemo(() => {
    const getLuminance = (hex: string) => {
      const cleanHex = hex.replace('#', '');
      if (cleanHex.length !== 6) return 0;
      const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
      const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
      const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

      const a = [r, g, b].map((v) =>
        v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
      );
      return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    };

    const l1 = getLuminance(bgColor);
    const l2 = getLuminance(textColor);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    const ratio = (lighter + 0.05) / (darker + 0.05);
    return Math.round(ratio * 100) / 100;
  }, [bgColor, textColor]);

  // --- JSON State ---
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        project: 'StrataMesh',
        cluster: 'us-east-1',
        nodes: 12,
        healthy: true,
        metrics: { latencyMs: 7.2, qps: 18400 },
      },
      null,
      2
    )
  );
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);

  const formatJson = (minify = false) => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, minify ? 0 : 2));
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message || 'Invalid JSON syntax');
    }
  };

  const copyJson = () => {
    navigator.clipboard.writeText(jsonInput);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // --- RegEx State ---
  const [regexPattern, setRegexPattern] = useState('([A-Z][a-z]+)');
  const [regexFlags, setRegexFlags] = useState('g');
  const [regexTestText, setRegexTestText] = useState(
    'Distributed systems engineering with React and Go in London.'
  );

  const regexResults = useMemo(() => {
    if (!regexPattern) return { valid: true, matches: [] };
    try {
      const re = new RegExp(regexPattern, regexFlags);
      const matches = Array.from(regexTestText.matchAll(re)).map((m) => m[0]);
      return { valid: true, matches };
    } catch (e: any) {
      return { valid: false, error: e.message, matches: [] };
    }
  }, [regexPattern, regexFlags, regexTestText]);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
      {/* Header and Tool Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-display flex items-center gap-2">
            <Braces className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Developer Micro-Utility Suite</span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Zero-tracker, offline-ready tools for accessibility, JSON formatting, and pattern matching.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-lg border border-zinc-200 dark:border-zinc-700/60 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('contrast')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'contrast'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>WCAG Contrast</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('json')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'json'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Braces className="w-3.5 h-3.5" />
            <span>JSON Formatter</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('regex')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'regex'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>RegEx Tester</span>
          </button>
        </div>
      </div>

      {/* --- Tab 1: Contrast Inspector --- */}
      {activeTab === 'contrast' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Background Hex Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 rounded border border-zinc-300 dark:border-zinc-700 cursor-pointer p-0.5 bg-transparent"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-36 px-3 py-2 text-xs font-mono bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Text / Foreground Hex Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-10 h-10 rounded border border-zinc-300 dark:border-zinc-700 cursor-pointer p-0.5 bg-transparent"
                />
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-36 px-3 py-2 text-xs font-mono bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100"
                />
              </div>
            </div>

            {/* Presets */}
            <div className="pt-2">
              <span className="text-xs text-zinc-500">Quick Presets:</span>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {[
                  { name: 'Dark Slate', bg: '#09090b', text: '#fafafa' },
                  { name: 'Pure Paper', bg: '#ffffff', text: '#18181b' },
                  { name: 'Cobalt Navy', bg: '#0f172a', text: '#38bdf8' },
                  { name: 'Warm Cream', bg: '#fdfbf7', text: '#27272a' },
                ].map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      setBgColor(preset.bg);
                      setTextColor(preset.text);
                    }}
                    className="px-2.5 py-1 text-[11px] rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Result & Compliance */}
          <div className="lg:col-span-6 space-y-4">
            <div
              className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-colors"
              style={{ backgroundColor: bgColor, color: textColor }}
            >
              <div className="text-xs uppercase tracking-wider opacity-70 font-mono mb-1">
                Preview Sample Text
              </div>
              <h4 className="text-xl font-bold font-display mb-2">
                Resilient Systems & Clear Interfaces
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                Evaluating luminance contrast ensures accessibility for low-vision readers and varied ambient lighting.
              </p>
            </div>

            {/* WCAG Compliance Badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 text-center">
                <div className="text-xs text-zinc-500">Contrast Ratio</div>
                <div className="text-lg font-bold font-display tabular-nums text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {contrastRatio}:1
                </div>
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 text-center">
                <div className="text-xs text-zinc-500">WCAG AA (4.5:1)</div>
                <div
                  className={`text-sm font-semibold font-mono mt-1 ${
                    contrastRatio >= 4.5 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'
                  }`}
                >
                  {contrastRatio >= 4.5 ? 'Pass' : 'Fail'}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 text-center">
                <div className="text-xs text-zinc-500">WCAG AAA (7.0:1)</div>
                <div
                  className={`text-sm font-semibold font-mono mt-1 ${
                    contrastRatio >= 7.0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'
                  }`}
                >
                  {contrastRatio >= 7.0 ? 'Pass' : 'Incomplete'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Tab 2: JSON Formatter --- */}
      {activeTab === 'json' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => formatJson(false)}
                className="px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-md transition-colors"
              >
                Prettify (2 Spaces)
              </button>
              <button
                type="button"
                onClick={() => formatJson(true)}
                className="px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-md transition-colors"
              >
                Minify
              </button>
            </div>

            <button
              type="button"
              onClick={copyJson}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedJson ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <textarea
            value={jsonInput}
            onChange={(e) => {
              setJsonInput(e.target.value);
              setJsonError(null);
            }}
            rows={10}
            className="w-full p-4 font-mono text-xs bg-zinc-950 text-zinc-100 rounded-xl border border-zinc-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            placeholder="Paste your JSON here..."
          />

          {jsonError ? (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono">
              Syntax Error: {jsonError}
            </div>
          ) : (
            <div className="text-xs text-zinc-500 font-mono">
              JSON syntax valid · {jsonInput.length} characters
            </div>
          )}
        </div>
      )}

      {/* --- Tab 3: RegEx Tester --- */}
      {activeTab === 'regex' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-8">
              <label className="block text-xs font-medium text-zinc-500 mb-1">Pattern</label>
              <input
                type="text"
                value={regexPattern}
                onChange={(e) => setRegexPattern(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100"
                placeholder="e.g. ([A-Z][a-z]+)"
              />
            </div>
            <div className="sm:col-span-4">
              <label className="block text-xs font-medium text-zinc-500 mb-1">Flags</label>
              <input
                type="text"
                value={regexFlags}
                onChange={(e) => setRegexFlags(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100"
                placeholder="g, i, m"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">Test String</label>
            <textarea
              value={regexTestText}
              onChange={(e) => setRegexTestText(e.target.value)}
              rows={4}
              className="w-full p-3 font-mono text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2">
              <span>Matched Tokens ({regexResults.matches.length})</span>
            </div>
            {regexResults.matches.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {regexResults.matches.map((m, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-xs font-mono bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded"
                  >
                    {m}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-xs text-zinc-500 italic">No matches found with current expression.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
