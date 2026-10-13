import React from 'react';
import { 
  Radio, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  Zap, 
  PhoneCall, 
  MapPin, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { projectMeta } from '../data/reviewData';

export function HeroBanner({ onLaunchSimulator, onOpenDossier }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 px-4 lg:px-8 border-b border-white/10 bg-gradient-to-b from-[#0d1322] via-[#090d16] to-[#07090e]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-12 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Meta Tag Row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Capstone Major Project Defense 2025–2026</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Bi-directional DTMF Voice Handshake</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>TRL 7 Validated System</span>
          </div>
        </div>

        {/* Main Project Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="space-y-1">
              <span className="text-sm font-bold tracking-widest uppercase font-mono text-amber-400">
                Project Code: CSE-CAPSTONE-KAVAL
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500">
                  KAVAL
                </span>
                : Last-Mile Disaster Communication & Verification System
              </h1>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
              An intelligent, fault-tolerant disaster warning and verification architecture that replaces unreliable text SMS and passive outdoor sirens with <span className="text-amber-300 font-semibold">automated multilingual synthesized voice calls</span> and <span className="text-cyan-300 font-semibold">real-time DTMF keypad acknowledgement tracking</span> over 2G/CS-fallback and LoRa edge repeaters.
            </p>

            {/* Core Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 hover:border-amber-500/30 transition-all">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1">
                  <PhoneCall className="w-4 h-4" />
                  <span>Zero-Literacy Barrier</span>
                </div>
                <p className="text-xs text-slate-400">
                  Synthesized voice broadcasts in 4 regional dialects directly interrupt citizen phones.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 transition-all">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Bidirectional DTMF</span>
                </div>
                <p className="text-xs text-slate-400">
                  Citizens press 1 (Safe), 2 (Trapped), or 3 (Medical) directly during call session.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 hover:border-emerald-500/30 transition-all">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>GIS Rescue Triage</span>
                </div>
                <p className="text-xs text-slate-400">
                  Automated priority scoring algorithm maps rescue boats to critical casualties first.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={onLaunchSimulator}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all transform hover:scale-[1.02]"
              >
                <Radio className="w-4 h-4" />
                <span>Launch Interactive Review Simulator</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onOpenDossier}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/15 text-sm font-semibold transition-all"
              >
                <span>View Evaluation Dossier & Rubric</span>
              </button>
            </div>
          </div>

          {/* Right Live Telemetry Card */}
          <div className="lg:col-span-4">
            <div className="glass-panel p-5 border border-white/10 relative overflow-hidden space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wide">
                    Live System Telemetry
                  </span>
                </div>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  NODE READY
                </span>
              </div>

              {/* Telemetry Stats */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center bg-slate-950/60 p-2.5 rounded-lg border border-white/5">
                  <span className="text-slate-400">Target Protocol:</span>
                  <span className="text-cyan-300 font-semibold">SIP/VoIP + GSM CS-Fallback</span>
                </div>

                <div className="flex justify-between items-center bg-slate-950/60 p-2.5 rounded-lg border border-white/5">
                  <span className="text-slate-400">Tone Demodulation:</span>
                  <span className="text-amber-300 font-semibold">Goertzel Algorithm (8 Bins)</span>
                </div>

                <div className="flex justify-between items-center bg-slate-950/60 p-2.5 rounded-lg border border-white/5">
                  <span className="text-slate-400">Offline Backhaul:</span>
                  <span className="text-purple-300 font-semibold">LoRa 868MHz + Solar Edge</span>
                </div>

                <div className="flex justify-between items-center bg-slate-950/60 p-2.5 rounded-lg border border-white/5">
                  <span className="text-slate-400">Acknowledgement Latency:</span>
                  <span className="text-emerald-400 font-bold">&lt; 8.4 Seconds (Real-time)</span>
                </div>
              </div>

              {/* Academic Review Metadata footer */}
              <div className="pt-2 text-[11px] text-slate-400 border-t border-white/10 space-y-1">
                <div className="flex justify-between">
                  <span>Candidate:</span>
                  <span className="text-slate-200 font-medium">Kuppanagari Adithya & Team</span>
                </div>
                <div className="flex justify-between">
                  <span>Faculty Guide:</span>
                  <span className="text-slate-200 font-medium">{projectMeta.guide.name}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
