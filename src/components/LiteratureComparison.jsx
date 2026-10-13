import React from 'react';
import { ShieldCheck, Check, X, AlertTriangle, Layers, BookOpen } from 'lucide-react';
import { literatureComparison } from '../data/reviewData';

export function LiteratureComparison() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Literature Survey & Comparative Gap Analysis
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Systematic benchmarking of existing disaster warning technologies vs KAVAL's bidirectional voice paradigm.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            RESEARCH GAP IDENTIFIED
          </span>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="glass-panel border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/90 text-slate-300 font-mono border-b border-white/10">
                <th className="p-3.5 pl-5">Evaluation Metric</th>
                <th className="p-3.5">Standard SMS Gateway</th>
                <th className="p-3.5">Mobile Disaster Apps (NDMA)</th>
                <th className="p-3.5">Acoustic Sirens / Megaphones</th>
                <th className="p-3.5 bg-amber-500/10 text-amber-300 font-bold border-l border-amber-500/30">
                  KAVAL (Proposed System)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {literatureComparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-3.5 pl-5 font-bold text-slate-200 font-mono text-[11px]">
                    {row.feature}
                  </td>
                  <td className="p-3.5 text-slate-400">
                    <div className="flex items-start gap-1.5">
                      <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{row.sms}</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-400">
                    <div className="flex items-start gap-1.5">
                      <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{row.app}</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-400">
                    <div className="flex items-start gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{row.siren}</span>
                    </div>
                  </td>
                  <td className="p-3.5 bg-amber-500/[0.04] text-slate-100 font-semibold border-l border-amber-500/30">
                    <div className="flex items-start gap-1.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{row.kaval}</span>
                    </div>
                    <div className="text-[10px] text-amber-400 font-mono mt-1 pl-5.5">
                      → {row.verdict}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Research Gaps Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
          <div className="text-xs font-mono font-bold text-red-400 uppercase">
            Gap 1: The Verification Void
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Existing alerts are strictly one-way broadcasts. Disaster management authorities have no feedback on whether warnings were received or how many residents remain trapped.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
          <div className="text-xs font-mono font-bold text-amber-400 uppercase">
            Gap 2: The Data Network Fragility
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            High-frequency 4G/5G mobile packet data networks require intact fiber backhauls. In severe cyclones and floods, power blackouts collapse IP data, while 2G voice channels survive.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
          <div className="text-xs font-mono font-bold text-emerald-400 uppercase">
            Gap 3: The Illiteracy Trap
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Over 287 million citizens in India cannot read textual disaster bulletins. Voice audio in the local vernacular breaks all literacy and accessibility barriers universally.
          </p>
        </div>
      </div>
    </div>
  );
}
