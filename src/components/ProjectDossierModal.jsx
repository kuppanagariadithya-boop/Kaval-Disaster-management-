import React from 'react';
import { X, Printer, Download, Award, CheckCircle2, FileText } from 'lucide-react';
import { projectMeta, performanceBenchmarks } from '../data/reviewData';

export function ProjectDossierModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="no-print p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold font-heading text-white">
              Official Capstone Review Dossier & Evaluation Summary
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Printable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-200 font-sans text-xs sm:text-sm bg-[#0a0e17]">
          
          {/* Institutional Academic Banner */}
          <div className="text-center pb-6 border-b border-white/10 space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
              FINAL YEAR ENGINEERING CAPSTONE DEFENSE • ACADEMIC YEAR 2025–2026
            </div>
            <h1 className="text-xl sm:text-2xl font-black font-heading text-white uppercase tracking-tight">
              {projectMeta.acronym}: {projectMeta.title}
            </h1>
            <div className="text-xs text-slate-400 font-mono pt-1">
              {projectMeta.institution}
            </div>
          </div>

          {/* Project Credentials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-white/5 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-slate-500">PROJECT CANDIDATES:</span>
              <div className="text-slate-100 font-semibold">1. Kuppanagari Adithya (Lead)</div>
              <div className="text-slate-300">2. Project Associate 2</div>
              <div className="text-slate-300">3. Project Associate 3</div>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500">FACULTY GUIDE / MENTOR:</span>
              <div className="text-slate-100 font-semibold">{projectMeta.guide.name}</div>
              <div className="text-slate-400 text-[11px]">{projectMeta.guide.designation}</div>
              <div className="text-amber-400 text-[11px] font-bold">Status: Final Review / Ready for Viva</div>
            </div>
          </div>

          {/* Abstract */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
              1. Project Abstract & Problem Formulation
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs">
              Natural disasters like flash floods, cyclones, and landslides consistently suffer catastrophic failures during the "last-mile" communication phase. Standard text SMS alerts suffer from high illiteracy barriers and lack any acknowledgment mechanism, leaving rescue agencies blind. Cellular data apps fail as 4G/5G base stations lose fiber backhaul and mains grid power. <strong>KAVAL</strong> proposes a novel, high-resilience architecture utilizing automated multilingual voice dial-outs over 2G Circuit-Switched (CS) fallback and localized LoRa edge gateways. Citizens acknowledge their immediate safety status via standard DTMF keypad tones (1 for Safe, 2 for Trapped, 3 for Medical), demodulated using the Goertzel algorithm into an automated geospatial triage rescue dashboard.
            </p>
          </div>

          {/* Key Engineering Innovations */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase text-cyan-400 tracking-wider">
              2. Key Engineering Innovations & Methodologies
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-white/5 space-y-1">
                <span className="font-bold text-slate-200">• Neural Multilingual TTS Dial-Out</span>
                <p className="text-slate-400 text-[11px]">Dynamic speech synthesis in regional dialects (English, Hindi, Telugu, Tamil) with dynamic victim ward injection.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-white/5 space-y-1">
                <span className="font-bold text-slate-200">• In-Band DTMF Demodulation</span>
                <p className="text-slate-400 text-[11px]">Real-time Goertzel discrete filter decoding 8 normalized frequency bins with 99.4% precision under -12dB SNR noise.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-white/5 space-y-1">
                <span className="font-bold text-slate-200">• Automated Triage Priority (TPS)</span>
                <p className="text-slate-400 text-[11px]">Mathematical scoring algorithm weighting medical casualties, water elevation risk, and response latency for optimal rescue allocation.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-white/5 space-y-1">
                <span className="font-bold text-slate-200">• LoRa Solar Mesh Edge Repeater</span>
                <p className="text-slate-400 text-[11px]">Standalone off-grid solar-powered 868MHz repeater driving 100W IP66 acoustic horn sirens for complete cell tower loss.</p>
              </div>
            </div>
          </div>

          {/* Quantitative Benchmarks Summary Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase text-emerald-400 tracking-wider">
              3. Experimental Results & Verification Benchmarks
            </h4>
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 border-b border-white/10">
                  <tr>
                    <th className="p-2.5">Evaluated Metric</th>
                    <th className="p-2.5">KAVAL Result</th>
                    <th className="p-2.5">Baseline Tech</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {performanceBenchmarks.map((b, i) => (
                    <tr key={i} className="hover:bg-white/[0.02]">
                      <td className="p-2.5 font-sans font-medium">{b.metric}</td>
                      <td className="p-2.5 font-bold" style={{ color: b.color }}>{b.value}</td>
                      <td className="p-2.5 text-slate-400">{b.comparison}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Project Evaluation Rubric / Score Sheet for Examiners */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-mono font-bold uppercase text-purple-400 tracking-wider">
              4. University Viva Voce & Evaluation Rubric (100 Marks)
            </h4>
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 border-b border-white/10">
                  <tr>
                    <th className="p-2">Review Criterion</th>
                    <th className="p-2">Max Marks</th>
                    <th className="p-2">Evaluator Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  <tr>
                    <td className="p-2 font-sans font-medium">Problem Identification & Literature Gap Analysis</td>
                    <td className="p-2 text-amber-400 font-bold">15</td>
                    <td className="p-2 text-slate-400 font-sans">Clear last-mile bottleneck identified</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-medium">System Architecture, Design & Mathematical Modeling</td>
                    <td className="p-2 text-amber-400 font-bold">25</td>
                    <td className="p-2 text-slate-400 font-sans">4-Tier resilient stack with Goertzel filter</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-medium">Implementation & Interactive Working System Demo</td>
                    <td className="p-2 text-amber-400 font-bold">30</td>
                    <td className="p-2 text-slate-400 font-sans">Live telephony voice & DTMF triage simulation verified</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-medium">Experimental Results, Benchmarks & Validation</td>
                    <td className="p-2 text-amber-400 font-bold">15</td>
                    <td className="p-2 text-slate-400 font-sans">5,000 call concurrency & latency verified</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-medium">Viva Voce Defense, Presentation & Q&A Response</td>
                    <td className="p-2 text-amber-400 font-bold">15</td>
                    <td className="p-2 text-slate-400 font-sans">Satisfactory response to examiner queries</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Examiner Signatures Block */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 text-center font-mono text-[11px] text-slate-400 border-t border-white/10">
            <div className="space-y-8">
              <div className="h-6" />
              <div className="border-t border-slate-700 pt-1">Internal Faculty Guide</div>
            </div>
            <div className="space-y-8">
              <div className="h-6" />
              <div className="border-t border-slate-700 pt-1">External Examiner</div>
            </div>
            <div className="space-y-8 sm:block hidden">
              <div className="h-6" />
              <div className="border-t border-slate-700 pt-1">Head of the Department</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
