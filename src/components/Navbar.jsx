import React from 'react';
import { 
  Radio, 
  Volume2, 
  VolumeX, 
  FileText, 
  ShieldAlert, 
  Flame, 
  Cpu, 
  Layers, 
  BarChart3, 
  HelpCircle,
  Play
} from 'lucide-react';
import { playAlertSiren } from '../utils/audio';

export function Navbar({ 
  activeTab, 
  setActiveTab, 
  audioEnabled, 
  setAudioEnabled, 
  onOpenDossier,
  defenseMode,
  setDefenseMode
}) {
  const navItems = [
    { id: 'overview', label: 'Problem & Scope', icon: ShieldAlert },
    { id: 'architecture', label: '4-Tier Architecture', icon: Layers },
    { id: 'simulator', label: 'Live Simulator & Triage', icon: Radio, highlight: true },
    { id: 'methodology', label: 'DTMF & LoRa Edge', icon: Cpu },
    { id: 'benchmarks', label: 'Results & Metrics', icon: BarChart3 },
    { id: 'viva', label: 'Viva Voce Defense', icon: HelpCircle }
  ];

  const handleTestSiren = () => {
    if (audioEnabled) {
      playAlertSiren(2);
    }
  };

  return (
    <header className="no-print sticky top-0 z-50 w-full bg-[#080c14]/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Academic Project Badges */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Radio className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-wider font-heading text-white">
                KAVAL
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold tracking-wide">
                PROJECT REVIEW 2026
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-400 font-sans truncate max-w-sm">
              Last-Mile Disaster Voice Alert & Acknowledgement Tracking
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-white/5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm shadow-amber-500/30'
                    : item.highlight
                    ? 'text-amber-400 hover:text-white hover:bg-white/5'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : ''}`} />
                <span>{item.label}</span>
                {item.highlight && !isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right utility buttons */}
        <div className="flex items-center gap-2">
          {/* Defense Presentation Mode Toggle */}
          <button
            onClick={() => setDefenseMode(!defenseMode)}
            title="Toggle Viva Defense Slides View"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
              defenseMode
                ? 'bg-purple-600/20 text-purple-300 border-purple-500/50 shadow-sm shadow-purple-500/20'
                : 'bg-slate-900 text-slate-400 border-white/10 hover:text-slate-200'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${defenseMode ? 'bg-purple-400 animate-pulse' : 'bg-slate-600'}`} />
            <span className="hidden sm:inline font-sans">{defenseMode ? 'Defense Mode' : 'Standard'}</span>
          </button>

          {/* Test Siren Audio Trigger */}
          <button
            onClick={handleTestSiren}
            title="Sound Disaster Alert Siren"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 transition-all"
          >
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Siren Test</span>
          </button>

          {/* Audio Mute/Unmute */}
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            title={audioEnabled ? "Disable Audio Synthesizer" : "Enable Audio Synthesizer"}
            className={`p-2 rounded-lg border transition-all ${
              audioEnabled 
                ? 'bg-slate-800 text-amber-400 border-amber-500/30' 
                : 'bg-slate-900 text-slate-500 border-white/10'
            }`}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Academic Dossier / Print View */}
          <button
            onClick={onOpenDossier}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Project Dossier</span>
          </button>
        </div>

      </div>

      {/* Mobile Nav Bar */}
      <div className="lg:hidden flex items-center justify-between gap-1 overflow-x-auto pt-2.5 mt-2 border-t border-white/5 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1 px-2.5 py-1 text-[11px] rounded whitespace-nowrap transition-all ${
                isActive 
                  ? 'bg-amber-500 text-slate-950 font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
