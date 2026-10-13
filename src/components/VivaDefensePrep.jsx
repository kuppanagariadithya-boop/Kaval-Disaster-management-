import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { vivaDefenseQuestions } from '../data/reviewData';

export function VivaDefensePrep() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Viva Voce Defense & Examiner Q&A Guide
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Anticipated critical inquiries from university review committees and external evaluators with model technical answers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30">
            DEFENSE CHEAT SHEET
          </span>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {vivaDefenseQuestions.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`glass-panel border transition-all overflow-hidden ${
                isOpen ? 'border-amber-500/40 bg-slate-900/80 shadow-md' : 'border-white/5 bg-slate-900/40'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-white/10">
                      Q{idx + 1}
                    </span>
                    <span className="text-xs font-mono text-cyan-300 font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-100 font-heading">
                    {item.q}
                  </h3>
                </div>

                <div className="p-1 rounded-lg bg-slate-800/80 text-slate-400 shrink-0 mt-1">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 border-t border-white/5 space-y-3 font-sans leading-relaxed bg-black/20">
                  <div className="flex items-start gap-2 pt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-emerald-400 font-mono text-xs uppercase tracking-wider block mb-1">
                        Technical Defense & Architecture Answer:
                      </strong>
                      <p className="text-slate-200">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Evaluator Rubric Tips */}
      <div className="p-4 rounded-xl bg-slate-950 border border-white/10 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <span className="font-bold text-slate-200 font-mono">
            College Review Presentation Tip:
          </span>
          <p className="text-slate-400 leading-relaxed">
            When demonstrating to internal and external examiners, initiate the live broadcast in the Simulator tab and let the smartphone ring aloud. Invite the external examiner to press key <strong>[2]</strong> or <strong>[3]</strong> on the simulated handset to witness the live pin plotting on the GIS rescue triage map in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
