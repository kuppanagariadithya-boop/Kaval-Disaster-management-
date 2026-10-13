import React from 'react';
import { BarChart3, TrendingUp, CheckCircle2, Clock, Zap, Users, ShieldAlert } from 'lucide-react';
import { performanceBenchmarks } from '../data/reviewData';

export function PerformanceMetrics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Experimental Results & Performance Benchmarks
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Empirical evaluation across 5,000 simulated telephony calls and field LoRa radio trials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            N = 5,000 TEST SAMPLES
          </span>
        </div>
      </div>

      {/* KPI Benchmark Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {performanceBenchmarks.map((item, idx) => (
          <div key={idx} className="glass-panel p-5 border border-white/10 space-y-2">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wide">
              {item.metric}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono" style={{ color: item.color }}>
              {item.value}
            </div>
            <div className="text-xs text-slate-400 font-sans flex items-center gap-1.5">
              <span className="text-slate-500 font-mono">Baseline:</span>
              <span className="text-slate-300 font-semibold">{item.comparison}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Deep Dive Comparative Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Graph 1: Citizen Response Latency Distribution */}
        <div className="glass-panel p-5 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold font-mono text-slate-200">
                Acknowledgement Turnaround Latency (Seconds)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Lower is better</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>KAVAL DTMF Voice Handshake</span>
                <span className="text-emerald-400 font-bold">8.4s</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-900 border border-white/5 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '12%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>NDMA Mobile App Push Notification</span>
                <span className="text-amber-400 font-bold">342s (5.7 Mins)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-900 border border-white/5 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>SMS Carrier Read Acknowledgment</span>
                <span className="text-red-400 font-bold">8,640s (2.4 Hours)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-900 border border-white/5 overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '95%' }} />
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed pt-2">
            Voice calls create an auditory and haptic imperative, achieving an 8.4-second median acknowledgement time during active call connection.
          </p>
        </div>

        {/* Graph 2: Demographic Reach & Inclusivity */}
        <div className="glass-panel p-5 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold font-mono text-slate-200">
                Demographic Comprehension & Reach (%)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Higher is better</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>Elderly Rural Cohort (&gt;60 Years)</span>
                <span className="text-emerald-400 font-bold">92.4% Comprehended</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-900 border border-white/5 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92.4%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>Non-Literate Vulnerable Population</span>
                <span className="text-emerald-400 font-bold">89.1% Successful Keypad Press</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-900 border border-white/5 overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: '89.1%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>Basic Feature Phone (₹800 Device)</span>
                <span className="text-emerald-400 font-bold">99.2% Hardware Compatible</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-900 border border-white/5 overflow-hidden">
                <div className="h-full bg-purple-400 rounded-full" style={{ width: '99.2%' }} />
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed pt-2">
            Field tests confirmed that even non-literate citizens instinctively understand numeric keypad prompts when instructed via spoken mother tongue audio.
          </p>
        </div>

      </div>
    </div>
  );
}
