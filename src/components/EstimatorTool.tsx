import React, { useState, useMemo } from 'react';
import { Calculator, Copy, Check, FileText, ArrowRight } from 'lucide-react';

interface EstimatorToolProps {
  onOpenBooking: () => void;
}

export const EstimatorTool: React.FC<EstimatorToolProps> = ({ onOpenBooking }) => {
  const [projectType, setProjectType] = useState<'backend' | 'fullstack' | 'audit' | 'design_system'>('fullstack');
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'accelerated'>('standard');
  const [multiRegion, setMultiRegion] = useState(false);
  const [realtime, setRealtime] = useState(true);
  const [enterpriseAuth, setEnterpriseAuth] = useState(false);
  const [copiedProposal, setCopiedProposal] = useState(false);

  const estimate = useMemo(() => {
    let baseWeeks = 4;
    let baseSprints = 2;
    let title = 'Full-Stack Modern Web Application';

    if (projectType === 'backend') {
      baseWeeks = 3;
      baseSprints = 2;
      title = 'Distributed Backend Services & Resilient APIs';
    } else if (projectType === 'audit') {
      baseWeeks = 1.5;
      baseSprints = 1;
      title = 'Architecture Review & Latency Bottleneck Audit';
    } else if (projectType === 'design_system') {
      baseWeeks = 3;
      baseSprints = 2;
      title = 'Zero-Slop Design System & UI Library';
    }

    if (multiRegion) baseWeeks += 1.5;
    if (realtime) baseWeeks += 1.0;
    if (enterpriseAuth) baseWeeks += 0.5;
    if (timelineSpeed === 'accelerated') baseWeeks = Math.max(1, baseWeeks * 0.7);

    const deliverables = [
      'Comprehensive system architecture diagram & technical design document',
      'Production-grade implementation with 100% TypeScript / typed invariants',
      'Automated integration test suites & CI/CD pipeline automation',
      'Zero-downtime deployment setup & staging verification environment',
    ];

    if (multiRegion) deliverables.push('Multi-region replication telemetry & failover testing');
    if (realtime) deliverables.push('Real-time streaming pipeline / WebSocket resilience layer');
    if (enterpriseAuth) deliverables.push('Enterprise SSO, RBAC, and audit log generation');

    return {
      title,
      weeks: Math.round(baseWeeks * 10) / 10,
      sprints: Math.ceil(baseWeeks / 2),
      deliverables,
    };
  }, [projectType, timelineSpeed, multiRegion, realtime, enterpriseAuth]);

  const proposalMarkdown = useMemo(() => {
    return `# Project Scope Proposal
**Engagement:** ${estimate.title}
**Estimated Duration:** ${estimate.weeks} Weeks (${estimate.sprints} Sprints)
**Pacing:** ${timelineSpeed === 'accelerated' ? 'Accelerated Dedicated Sprint' : 'Standard Agile Milestones'}

### Core Deliverables:
${estimate.deliverables.map((d) => `- ${d}`).join('\n')}

### Engineering Principles:
- Single-line controls, zero-pill typography, and WCAG AA contrast.
- Sub-50ms TTFB and resilient distributed error boundaries.
- Full code ownership transferred upon project milestone sign-off.
`;
  }, [estimate, timelineSpeed]);

  const handleCopyProposal = () => {
    navigator.clipboard.writeText(proposalMarkdown);
    setCopiedProposal(true);
    setTimeout(() => setCopiedProposal(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-display flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Interactive Project Scope & Timeline Estimator</span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Configure technical parameters to preview estimated sprint durations and generate a draft proposal.
          </p>
        </div>

        <button
          onClick={handleCopyProposal}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
        >
          {copiedProposal ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedProposal ? 'Scope Copied!' : 'Copy Proposal Markdown'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Scope Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Project Type */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 font-mono">
              1. Engagement Domain
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'fullstack', label: 'Full-Stack Web App', sub: 'React 19 + Node/Go + DB' },
                { id: 'backend', label: 'Distributed Backend / API', sub: 'High QPS, Go, gRPC' },
                { id: 'audit', label: 'Performance & Latency Audit', sub: 'Codebase profiling & fixes' },
                { id: 'design_system', label: 'Design System & UI Library', sub: 'Modular accessible components' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setProjectType(item.id as any)}
                  className={`p-3 text-left rounded-xl border transition-all ${
                    projectType === item.id
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 text-zinc-900 dark:text-zinc-100 shadow-xs'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  <div className="text-xs font-semibold">{item.label}</div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Speed */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 font-mono">
              2. Delivery Pace
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTimelineSpeed('standard')}
                className={`py-2 px-3 text-xs font-medium rounded-lg border text-left transition-colors ${
                  timelineSpeed === 'standard'
                    ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 text-zinc-900 dark:text-zinc-100'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                Standard Milestones (Bi-weekly demo)
              </button>
              <button
                type="button"
                onClick={() => setTimelineSpeed('accelerated')}
                className={`py-2 px-3 text-xs font-medium rounded-lg border text-left transition-colors ${
                  timelineSpeed === 'accelerated'
                    ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 text-zinc-900 dark:text-zinc-100'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                Accelerated Sprint (Dedicated pod)
              </button>
            </div>
          </div>

          {/* Technical Complexity Toggles */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 font-mono">
              3. Architectural Specifications
            </label>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850 cursor-pointer">
                <div>
                  <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                    Real-time WebSocket / SSE Streaming
                  </div>
                  <div className="text-[11px] text-zinc-500">Live data synchronization and presence</div>
                </div>
                <input
                  type="checkbox"
                  checked={realtime}
                  onChange={(e) => setRealtime(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850 cursor-pointer">
                <div>
                  <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                    Multi-Region Edge Consensus
                  </div>
                  <div className="text-[11px] text-zinc-500">Sub-10ms global failover and distributed routing</div>
                </div>
                <input
                  type="checkbox"
                  checked={multiRegion}
                  onChange={(e) => setMultiRegion(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850 cursor-pointer">
                <div>
                  <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                    Enterprise SSO & Strict RBAC
                  </div>
                  <div className="text-[11px] text-zinc-500">SAML, OIDC, audit logging & granular permissions</div>
                </div>
                <input
                  type="checkbox"
                  checked={enterpriseAuth}
                  onChange={(e) => setEnterpriseAuth(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Live Calculated Estimate Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
              Estimated Duration
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-semibold font-display tabular-nums text-zinc-900 dark:text-zinc-100">
                {estimate.weeks}
              </span>
              <span className="text-sm text-zinc-500">Weeks ({estimate.sprints} Sprints)</span>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 font-mono flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Scope Deliverables</span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                {estimate.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">✔</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800">
            <button
              onClick={onOpenBooking}
              type="button"
              className="w-full py-2.5 px-4 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Schedule Architecture Discussion</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
