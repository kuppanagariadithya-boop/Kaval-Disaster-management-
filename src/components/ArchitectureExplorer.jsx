import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Radio, 
  Database, 
  Server, 
  PhoneCall, 
  ShieldCheck, 
  ArrowRight, 
  Code2, 
  CheckCircle2,
  Workflow
} from 'lucide-react';
import { architectureTiers } from '../data/reviewData';

export function ArchitectureExplorer() {
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);
  const currentTier = architectureTiers[selectedTierIndex];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              KAVAL 4-Tier Resilient System Architecture
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            End-to-end dataflow pipeline from sensor ingestion to in-band DTMF demodulation and rescue triage dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
            PROTOCOL: OASIS CAP v1.2 & RFC 4733
          </span>
        </div>
      </div>

      {/* Tier Selector Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {architectureTiers.map((tier, idx) => {
          const isSelected = selectedTierIndex === idx;
          return (
            <button
              key={tier.tier}
              onClick={() => setSelectedTierIndex(idx)}
              className={`p-4 rounded-xl text-left border transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/15'
                  : 'bg-slate-900/60 border-white/5 text-slate-400 hover:border-white/20 hover:bg-slate-900'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-white/10">
                  {tier.tier}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Step 0{idx + 1}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-200 line-clamp-1">{tier.name}</h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{tier.tech}</p>
            </button>
          );
        })}
      </div>

      {/* Interactive Detail Inspector for Selected Tier */}
      <div className="glass-panel p-6 border border-white/10 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Tier Description & Specs */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                {currentTier.tier} DEEP-DIVE INSPECTION
              </span>
              <h3 className="text-xl font-bold font-heading text-white">
                {currentTier.name}
              </h3>
              <div className="text-xs font-mono text-cyan-300">
                Core Stack: {currentTier.tech}
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {currentTier.desc}
            </p>

            {/* Submodules breakdown */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
                Internal Submodule Specifications:
              </div>
              <div className="space-y-2.5">
                {currentTier.submodules.map((sub, sidx) => (
                  <div key={sidx} className="p-3 rounded-xl bg-slate-950/70 border border-white/5 space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs font-bold text-slate-200">{sub.name}</span>
                    </div>
                    <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                      {sub.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Architecture Block Diagram Visualizer */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-amber-400" />
                  <span>Pipeline State Machine & Data Flow</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400">STATE: SYNCHRONIZED</span>
              </div>

              {/* Graphical Node Flow */}
              <div className="space-y-3 font-mono text-xs">
                
                <div className={`p-3 rounded-xl border transition-all ${selectedTierIndex === 0 ? 'bg-amber-500/20 border-amber-500 text-white font-bold' : 'bg-slate-900/60 border-white/5 text-slate-400'}`}>
                  <div className="flex items-center justify-between">
                    <span>1. INGESTION & TRIGGER</span>
                    <span className="text-[10px] opacity-75">OASIS CAP / IoT Webhooks</span>
                  </div>
                </div>

                <div className="flex justify-center text-slate-500">
                  ↓ <span className="text-[10px] ml-2 text-cyan-400">Geo-Polygon Cell Resolution</span>
                </div>

                <div className={`p-3 rounded-xl border transition-all ${selectedTierIndex === 1 ? 'bg-amber-500/20 border-amber-500 text-white font-bold' : 'bg-slate-900/60 border-white/5 text-slate-400'}`}>
                  <div className="flex items-center justify-between">
                    <span>2. MULTILINGUAL SIP ORCHESTRATION</span>
                    <span className="text-[10px] opacity-75">Asterisk / Neural TTS</span>
                  </div>
                </div>

                <div className="flex justify-center text-slate-500">
                  ↓ <span className="text-[10px] ml-2 text-purple-400">PRI Trunk / GSM CS-Fallback / LoRa</span>
                </div>

                <div className={`p-3 rounded-xl border transition-all ${selectedTierIndex === 2 ? 'bg-amber-500/20 border-amber-500 text-white font-bold' : 'bg-slate-900/60 border-white/5 text-slate-400'}`}>
                  <div className="flex items-center justify-between">
                    <span>3. LAST-MILE CITIZEN HANDSETS</span>
                    <span className="text-[10px] opacity-75">2G Feature Phone / PA Siren</span>
                  </div>
                </div>

                <div className="flex justify-center text-slate-500">
                  ↓ <span className="text-[10px] ml-2 text-emerald-400">Bidirectional DTMF Keypad Tone</span>
                </div>

                <div className={`p-3 rounded-xl border transition-all ${selectedTierIndex === 3 ? 'bg-amber-500/20 border-amber-500 text-white font-bold' : 'bg-slate-900/60 border-white/5 text-slate-400'}`}>
                  <div className="flex items-center justify-between">
                    <span>4. GOERTZEL FILTER & TRIAGE RESCUE MAP</span>
                    <span className="text-[10px] opacity-75">NDRF Boat Dispatch</span>
                  </div>
                </div>

              </div>

              {/* Code Snippet for Asterisk Dialplan & Goertzel */}
              <div className="pt-2">
                <div className="text-[11px] font-mono text-slate-400 mb-1.5 flex items-center justify-between">
                  <span>Asterisk Dialplan (extensions.conf snippet):</span>
                  <span className="text-amber-400">exten =&gt; s,1</span>
                </div>
                <pre className="p-3 rounded-lg bg-black/80 text-[11px] font-mono text-amber-300/90 overflow-x-auto border border-white/5 leading-relaxed">
{`exten => s,1,Answer(500)
same => n,Playback(disaster_flood_en)
same => n,Read(CITIZEN_STATUS,1,10)
same => n,Agi(kaval_triage_handler.py,\${CALLERID(num)},\${CITIZEN_STATUS})
same => n,Hangup()`}
                </pre>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
