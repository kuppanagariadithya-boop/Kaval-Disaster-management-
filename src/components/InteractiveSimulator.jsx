import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio, 
  Phone, 
  PhoneCall, 
  PhoneOff, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Activity, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Users, 
  LifeBuoy, 
  Ambulance, 
  ShieldCheck, 
  Terminal, 
  RefreshCw,
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  Compass,
  Box
} from 'lucide-react';
import { disasterTemplates, dtmfOptions } from '../data/reviewData';
import { playDTMFTone, playAlertSiren, speakDisasterVoicePrompt, stopVoiceSpeech } from '../utils/audio';
import { DisasterMesh3D } from './3d/DisasterMesh3D';
import { FFTSpectrumVisualizer } from './audio/FFTSpectrumVisualizer';

export function InteractiveSimulator({ audioEnabled }) {
  // Selected disaster and configuration
  const [selectedDisaster, setSelectedDisaster] = useState(disasterTemplates[0]);
  const [selectedLang, setSelectedLang] = useState('en');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastProgress, setBroadcastProgress] = useState(0);

  // Phone Call State Machine: 'IDLE' | 'RINGING' | 'CONNECTED' | 'ACKNOWLEDGED' | 'COMPLETED'
  const [callState, setCallState] = useState('IDLE');
  const [callDuration, setCallDuration] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastDtmfKey, setLastDtmfKey] = useState(null);
  const [mapMode, setMapMode] = useState('3D');

  // Live Acknowledgements and Triage Feed
  const [stats, setStats] = useState({
    dispatched: 0,
    delivered: 0,
    safe: 0,
    trapped: 0,
    medical: 0,
    pending: 0
  });

  // Citizen Map Pins
  const [mapPins, setMapPins] = useState([
    { id: 1, x: 28, y: 35, status: 'safe', label: 'Household #104' },
    { id: 2, x: 42, y: 55, status: 'trapped', label: 'Household #219 (Water in Living Room)' },
    { id: 3, x: 65, y: 72, status: 'medical', label: 'Elderly Resident #312 (Oxygen Dependent)' },
    { id: 4, x: 50, y: 30, status: 'safe', label: 'Household #112' },
    { id: 5, x: 75, y: 45, status: 'trapped', label: 'Roof Shelter #405 (4 Children)' },
    { id: 6, x: 35, y: 80, status: 'medical', label: 'Casualty #520 (Hypothermia)' },
    { id: 7, x: 82, y: 65, status: 'safe', label: 'Relief Center Alpha' },
  ]);

  // Terminal log stream
  const [logs, setLogs] = useState([
    { time: '21:30:00', type: 'SYS', msg: 'KAVAL SIP Trunk Core initialized on Asterisk cluster.' },
    { time: '21:30:02', type: 'TELEMETRY', msg: 'District Ward 4 geo-fencing polygon mapped to 4,850 MSISDN entries.' },
    { time: '21:30:05', type: 'READY', msg: 'Awaiting Incident Commander alert activation.' }
  ]);

  // Audio timer ref
  const timerRef = useRef(null);

  // Add terminal log entry helper
  const addLog = (type, msg) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0').slice(0, 2);
    setLogs((prev) => [{ time: timeStr, type, msg }, ...prev.slice(0, 18)]);
  };

  // Trigger Broadcast Flow
  const handleTriggerBroadcast = () => {
    if (isBroadcasting) return;

    setIsBroadcasting(true);
    setBroadcastProgress(10);
    addLog('ALERT', `INCIDENT COMMANDER TRIGGERED: [${selectedDisaster.code}] ${selectedDisaster.name}`);
    addLog('DISPATCH', `Generating SIP INVITE batch for ${selectedDisaster.estimatedCitizens} endpoints.`);

    if (audioEnabled) {
      playAlertSiren(1);
    }

    // Step progress
    let p = 10;
    const interval = setInterval(() => {
      p += 20;
      setBroadcastProgress(p);
      if (p >= 60 && callState === 'IDLE') {
        // Start citizen phone ringing
        setCallState('RINGING');
        addLog('SIP', 'SIP/2.0 180 Ringing received from Endpoint +91 98765-XXXXX');
      }
      if (p >= 100) {
        clearInterval(interval);
        setBroadcastProgress(100);
        setStats({
          dispatched: selectedDisaster.estimatedCitizens,
          delivered: Math.floor(selectedDisaster.estimatedCitizens * 0.94),
          safe: Math.floor(selectedDisaster.estimatedCitizens * 0.72),
          trapped: Math.floor(selectedDisaster.estimatedCitizens * 0.16),
          medical: Math.floor(selectedDisaster.estimatedCitizens * 0.04),
          pending: Math.floor(selectedDisaster.estimatedCitizens * 0.08)
        });
        addLog('STATS', 'Broadcast batch delivered: 94.2% connect rate across 2G/CS-Fallback circuits.');
      }
    }, 450);
  };

  // Answer Incoming Call on Citizen Phone
  const handleAnswerCall = () => {
    setCallState('CONNECTED');
    setCallDuration(0);
    setIsSpeaking(true);
    addLog('SIP', 'SIP/2.0 200 OK — RTP Two-Way Voice Session Established (G.711u / 8kHz)');

    const voiceScript = selectedDisaster.voiceScripts[selectedLang] || selectedDisaster.voiceScripts['en'];
    const speechLangCode = selectedLang === 'hi' ? 'hi-IN' : selectedLang === 'te' ? 'te-IN' : selectedLang === 'ta' ? 'ta-IN' : 'en-IN';

    if (audioEnabled) {
      speakDisasterVoicePrompt(
        voiceScript,
        speechLangCode,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    } else {
      // Simulate speech completion after 8s
      setTimeout(() => setIsSpeaking(false), 6000);
    }

    // Start in-call duration timer
    timerRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
  };

  // Decline/End Call
  const handleEndCall = () => {
    stopVoiceSpeech();
    if (timerRef.current) clearInterval(timerRef.current);
    setCallState('COMPLETED');
    setIsSpeaking(false);
    addLog('SIP', 'Call terminated — BYE received. Session closed.');
  };

  // Citizen Press DTMF Keypad
  const handleDTMFPress = (key) => {
    if (callState !== 'CONNECTED' && callState !== 'ACKNOWLEDGED') return;

    if (audioEnabled) {
      playDTMFTone(key, 0.28);
    }
    setLastDtmfKey(key);
    setCallState('ACKNOWLEDGED');

    const dtmfItem = dtmfOptions.find(d => d.key === key);
    if (dtmfItem) {
      addLog('DTMF', `RFC 4733 Event: In-Band DTMF Tone '${key}' Decoded by Goertzel Filter -> Status: [${dtmfItem.label}]`);
      
      // Add or update pin on map
      const newStatus = key === '1' ? 'safe' : key === '2' ? 'trapped' : key === '3' ? 'medical' : 'trapped';
      setMapPins((prev) => [
        {
          id: Date.now(),
          x: 48 + (Math.random() * 20 - 10),
          y: 45 + (Math.random() * 20 - 10),
          status: newStatus,
          label: `Live Citizen (${dtmfItem.label})`
        },
        ...prev
      ]);

      // Bump stats
      setStats((prev) => ({
        ...prev,
        safe: key === '1' ? prev.safe + 1 : prev.safe,
        trapped: key === '2' || key === '4' ? prev.trapped + 1 : prev.trapped,
        medical: key === '3' ? prev.medical + 1 : prev.medical,
      }));
    } else {
      addLog('DTMF', `Received DTMF Tone '${key}'`);
    }
  };

  // Reset simulation
  const handleReset = () => {
    stopVoiceSpeech();
    if (timerRef.current) clearInterval(timerRef.current);
    setIsBroadcasting(false);
    setBroadcastProgress(0);
    setCallState('IDLE');
    setCallDuration(0);
    setIsSpeaking(false);
    setLastDtmfKey(null);
    setStats({ dispatched: 0, delivered: 0, safe: 0, trapped: 0, medical: 0, pending: 0 });
    addLog('RESET', 'Simulation reset to baseline state.');
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopVoiceSpeech();
    };
  }, []);

  const currentDtmfData = dtmfOptions.find(d => d.key === lastDtmfKey);

  return (
    <div className="space-y-8">
      
      {/* Simulation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Interactive Disaster Incident Simulator & Live Triage Center
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Demonstrate the full lifecycle: Broadcast Initiation → Citizen Voice Reception → DTMF Keypad Handshake → Geospatial Rescue Triage.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Scenario</span>
          </button>
        </div>
      </div>

      {/* Main Dual-Screen Interactive Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* =========================================================
            LEFT COLUMN (7 cols): INCIDENT COMMANDER ALERT CONSOLE
           ========================================================= */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-5 border border-white/10 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold font-mono tracking-wider uppercase text-slate-200">
                  Incident Commander Alert Control Desk
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                AUTH: NDMA LEVEL 1
              </span>
            </div>

            {/* Disaster Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Select Emergency Hazard Scenario:</span>
                <span className="text-amber-400 font-mono text-[11px]">{selectedDisaster.code}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {disasterTemplates.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedDisaster(item)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      selectedDisaster.id === item.id
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-sm shadow-amber-500/20'
                        : 'bg-slate-900/70 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-semibold">
                        {item.level}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-100 truncate">{item.name}</div>
                    <div className="text-[10px] text-slate-400 mt-1 truncate">{item.sector}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selector & Speech Preview */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Target Regional Dialect / Audio Synthesis:</span>
                <span className="text-cyan-400 font-mono text-[11px]">NEURAL TTS MULTILINGUAL</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { code: 'en', label: 'English (Indian Accent)' },
                  { code: 'hi', label: 'हिन्दी (Hindi)' },
                  { code: 'te', label: 'తెలుగు (Telugu)' },
                  { code: 'ta', label: 'தமிழ் (Tamil)' },
                ].map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setSelectedLang(l.code)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                      selectedLang === l.code
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 font-bold'
                        : 'bg-slate-900 text-slate-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Synthesized Voice Script Preview Box */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Synthesized Voice Message Teleprompter</span>
                </span>
                <span className="text-amber-400 font-semibold">{selectedDisaster.estimatedCitizens} Registered Endpoints</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-900/50 p-2.5 rounded-lg border border-white/5 italic">
                "{selectedDisaster.voiceScripts[selectedLang] || selectedDisaster.voiceScripts['en']}"
              </p>
            </div>

            {/* Broadcast Action Button */}
            <div className="space-y-3 pt-1">
              <button
                onClick={handleTriggerBroadcast}
                disabled={isBroadcasting}
                className={`w-full py-3.5 px-4 rounded-xl font-heading font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 transition-all ${
                  isBroadcasting
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-lg shadow-red-600/30 transform hover:scale-[1.01]'
                }`}
              >
                <Radio className={`w-5 h-5 ${isBroadcasting ? 'animate-spin' : 'animate-pulse'}`} />
                <span>
                  {isBroadcasting
                    ? `BROADCAST IN FLIGHT (${broadcastProgress}% DELIVERED)...`
                    : 'TRIGGER KAVAL VOICE BROADCAST BATCH'}
                </span>
              </button>

              {/* Progress bar */}
              {isBroadcasting && (
                <div className="space-y-1">
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                      style={{ width: `${broadcastProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Batch SIP INVITE Queued</span>
                    <span>{broadcastProgress}% Cellular Handshake Complete</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Total Calls</div>
              <div className="text-xl font-bold font-mono text-white mt-0.5">
                {stats.dispatched.toLocaleString()}
              </div>
              <div className="text-[10px] text-emerald-400 font-mono">100% Target Ward</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5 text-center">
              <div className="text-[10px] font-mono text-emerald-400 uppercase">Safe (DTMF 1)</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
                {stats.safe.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">Sheltered</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5 text-center">
              <div className="text-[10px] font-mono text-amber-400 uppercase">Trapped (DTMF 2)</div>
              <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">
                {stats.trapped.toLocaleString()}
              </div>
              <div className="text-[10px] text-amber-300 font-mono">Rescue Queue</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5 text-center">
              <div className="text-[10px] font-mono text-red-400 uppercase">Medical (DTMF 3)</div>
              <div className="text-xl font-bold font-mono text-red-400 mt-0.5">
                {stats.medical.toLocaleString()}
              </div>
              <div className="text-[10px] text-red-400 font-mono animate-pulse">Critical Priority</div>
            </div>
          </div>

          {/* Live In-Band Audio FFT Spectrum & Goertzel Demodulator */}
          <FFTSpectrumVisualizer activeKey={lastDtmfKey} isVoiceActive={isSpeaking} />

          {/* Raw Telemetry Terminal Console */}
          <div className="glass-panel p-4 border border-white/10 space-y-2">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                  Real-Time SIP & DTMF Telemetry Stream
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">ASTERISK PBX v20 / RFC 4733</span>
            </div>

            <div className="h-36 overflow-y-auto space-y-1 font-mono text-[11px] bg-slate-950 p-2.5 rounded-lg border border-white/5 scrollbar-thin">
              {logs.map((l, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-300 leading-tight">
                  <span className="text-slate-500 shrink-0">[{l.time}]</span>
                  <span className={`shrink-0 px-1 rounded text-[9px] font-bold ${
                    l.type === 'ALERT' ? 'bg-red-500/20 text-red-400' :
                    l.type === 'DTMF' ? 'bg-amber-500/20 text-amber-300' :
                    l.type === 'SIP' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {l.type}
                  </span>
                  <span className="text-slate-300">{l.msg}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* =========================================================
            RIGHT COLUMN (5 cols): CITIZEN PHONE SIMULATOR
           ========================================================= */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
          
          <div className="text-center space-y-1">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Citizen Endpoint Simulation
            </span>
            <p className="text-[11px] text-slate-400">
              Interactive 2G/4G Handset with DTMF Keypad & Speech Feedback
            </p>
          </div>

          {/* Smartphone Frame */}
          <div className="phone-bezel">
            {/* Top Notch & Camera */}
            <div className="phone-notch">
              <div className="phone-speaker" />
              <div className="phone-camera" />
            </div>

            {/* Status Bar */}
            <div className="pt-7 px-5 pb-2 flex justify-between items-center text-[10px] font-mono text-slate-400 border-b border-white/5">
              <span>21:30</span>
              <div className="flex items-center gap-2">
                <span className="text-[9px] px-1 bg-amber-500/20 text-amber-300 rounded font-bold">2G CS</span>
                <span>●●●●</span>
                <span>88% 🔋</span>
              </div>
            </div>

            {/* Dynamic Phone Content by Call State */}
            <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto">
              
              {/* STATE 1: IDLE */}
              {callState === 'IDLE' && (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-500">
                    <Phone className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-slate-300">Standby Mode</div>
                    <p className="text-xs text-slate-500 max-w-[200px]">
                      Trigger broadcast on the left console to simulate incoming emergency call.
                    </p>
                  </div>
                </div>
              )}

              {/* STATE 2: RINGING */}
              {callState === 'RINGING' && (
                <div className="flex-1 flex flex-col items-center justify-between py-4 text-center">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-mono border border-red-500/40 animate-pulse">
                      <Flame className="w-3.5 h-3.5 text-red-400" />
                      <span>HIGH PRIORITY ALERT</span>
                    </div>

                    <div className="w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center mx-auto text-red-400 animate-bounce">
                      <PhoneCall className="w-10 h-10" />
                    </div>

                    <h4 className="text-base font-bold font-heading text-white">
                      KAVAL EMERGENCY
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      Govt Disaster Command Center
                    </p>
                  </div>

                  {/* Accept / Decline buttons */}
                  <div className="w-full flex justify-around items-center pt-6">
                    <button
                      onClick={handleEndCall}
                      className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-600/40 transition-all transform hover:scale-110"
                      title="Decline Call"
                    >
                      <PhoneOff className="w-6 h-6" />
                    </button>

                    <button
                      onClick={handleAnswerCall}
                      className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/40 transition-all transform hover:scale-110 animate-pulse"
                      title="Answer Emergency Call"
                    >
                      <PhoneCall className="w-8 h-8" />
                    </button>
                  </div>
                </div>
              )}

              {/* STATE 3 & 4: CONNECTED or ACKNOWLEDGED */}
              {(callState === 'CONNECTED' || callState === 'ACKNOWLEDGED') && (
                <div className="flex-1 flex flex-col justify-between py-1 space-y-3">
                  
                  {/* Top in-call indicator */}
                  <div className="text-center space-y-1">
                    <div className="text-xs font-bold text-white flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>KAVAL VOICE BROADCAST</span>
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400">
                      00:{String(callDuration).padStart(2, '0')} • Active Voice Circuit
                    </div>

                    {/* Audio Wave Visualizer */}
                    {isSpeaking && (
                      <div className="flex items-center justify-center gap-1.5 py-1">
                        <div className="wave-bar" />
                        <div className="wave-bar" />
                        <div className="wave-bar" />
                        <div className="wave-bar" />
                        <div className="wave-bar" />
                        <div className="wave-bar" />
                      </div>
                    )}
                  </div>

                  {/* Acknowledged Status Pill */}
                  {currentDtmfData && (
                    <div 
                      className="p-2.5 rounded-xl border text-center space-y-0.5 animate-fadeIn"
                      style={{ 
                        backgroundColor: `${currentDtmfData.color}20`,
                        borderColor: `${currentDtmfData.color}60`
                      }}
                    >
                      <div className="text-xs font-bold" style={{ color: currentDtmfData.color }}>
                        ✓ ACKNOWLEDGED: {currentDtmfData.label}
                      </div>
                      <div className="text-[10px] text-slate-300">
                        DTMF Key [{currentDtmfData.key}] Recorded & Routed to Triage Map
                      </div>
                    </div>
                  )}

                  {/* DTMF Keypad Matrix */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-amber-400 text-center font-bold">
                      PRESS KEY TO ACKNOWLEDGE STATUS:
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => {
                        const opt = dtmfOptions.find(o => o.key === key);
                        return (
                          <button
                            key={key}
                            onClick={() => handleDTMFPress(key)}
                            className={`h-11 rounded-xl flex flex-col items-center justify-center font-mono transition-all border ${
                              opt 
                                ? 'bg-slate-800/90 hover:bg-amber-500 hover:text-slate-950 border-amber-500/40 text-white shadow-sm'
                                : 'bg-slate-900/60 hover:bg-slate-800 border-white/5 text-slate-400'
                            }`}
                          >
                            <span className="text-sm font-bold leading-none">{key}</span>
                            {opt && (
                              <span className="text-[8px] font-sans font-semibold opacity-80 leading-none mt-0.5 truncate max-w-[55px]">
                                {key === '1' ? 'SAFE' : key === '2' ? 'TRAP' : key === '3' ? 'MED' : 'PROXY'}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* End Call Button */}
                  <div className="flex justify-center pt-1">
                    <button
                      onClick={handleEndCall}
                      className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center text-white shadow-md shadow-red-600/30 transition-all"
                      title="Disconnect Call"
                    >
                      <PhoneOff className="w-5 h-5" />
                    </button>
                  </div>

                </div>
              )}

              {/* STATE 5: COMPLETED */}
              {callState === 'COMPLETED' && (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white">Handshake Complete</div>
                    <p className="text-xs text-slate-400 max-w-[200px]">
                      Call terminated. Your response has been indexed on the District Rescue Triage Map.
                    </p>
                  </div>
                  <button
                    onClick={() => setCallState('IDLE')}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800 text-slate-300 border border-white/10 hover:bg-slate-700"
                  >
                    Reset Handset
                  </button>
                </div>
              )}

            </div>

            {/* Bottom Home Indicator */}
            <div className="pb-3 flex justify-center">
              <div className="w-24 h-1 bg-slate-600 rounded-full" />
            </div>
          </div>

        </div>

      </div>

      {/* =========================================================
          LOWER SECTION: LIVE GIS RESCUE MAP & TRIAGE QUEUE
         ========================================================= */}
      <div className="glass-panel p-5 border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider uppercase text-slate-200">
                Geospatial Rescue Triage Map & Automated Dispatch
              </h3>
              <p className="text-xs text-slate-400">
                DTMF-verified victim clusters prioritized automatically by risk score.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-white/10">
              <button
                onClick={() => setMapMode('3D')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                  mapMode === '3D'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>3D Radio Mesh</span>
              </button>
              <button
                onClick={() => setMapMode('2D')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                  mapMode === '2D'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>2D Vector Map</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-slate-300">Safe</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-slate-300">Trapped</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
                <span className="text-slate-300">Medical</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Interactive Visual GIS Map View (3D or 2D) */}
          <div className="lg:col-span-7">
            {mapMode === '3D' ? (
              <DisasterMesh3D 
                activeIncident={selectedDisaster} 
                onSelectNode={(node) => addLog('GIS', `3D Node Inspected: ${node.label} (${node.status.toUpperCase()})`)}
              />
            ) : (
              <div className="relative h-[440px] bg-slate-950 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Background Grid & River Graphic */}
                <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  {/* River path */}
                  <path
                    d="M 0 200 Q 180 150 360 220 T 720 260"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="32"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                  <path
                    d="M 0 200 Q 180 150 360 220 T 720 260"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="4"
                    strokeDasharray="6 6"
                  />
                </svg>

                {/* Radar Sweep Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-cyan-500/20 pointer-events-none">
                  <div className="w-full h-full rounded-full border border-cyan-500/30 animate-radar" style={{
                    background: 'conic-gradient(from 0deg at 50% 50%, rgba(6,182,212,0.15) 0deg, transparent 60deg)'
                  }} />
                </div>

                {/* River & Hazard Labels */}
                <div className="absolute top-4 left-4 bg-slate-900/80 px-2.5 py-1 rounded-lg text-[10px] font-mono text-cyan-300 border border-cyan-500/20">
                  RIVER KRISHNA BASIN (ELEVATION +1.4m)
                </div>

                <div className="absolute bottom-4 left-4 bg-slate-900/80 px-2.5 py-1 rounded-lg text-[10px] font-mono text-emerald-300 border border-emerald-500/20">
                  SECTOR 4 RELIEF CAMP (ELEVATION +14.2m)
                </div>

                {/* Interactive Pins */}
                {mapPins.map((pin) => (
                  <div
                    key={pin.id}
                    style={{ top: `${pin.y}%`, left: `${pin.x}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                  >
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                        pin.status === 'medical'
                          ? 'bg-red-500 animate-ping'
                          : pin.status === 'trapped'
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                      }`}
                      style={{
                        boxShadow: `0 0 12px ${
                          pin.status === 'medical' ? '#ef4444' : pin.status === 'trapped' ? '#f59e0b' : '#10b981'
                        }`
                      }}
                    />
                    <div
                      className={`absolute w-3 h-3 rounded-full top-0.5 left-0.5 ${
                        pin.status === 'medical' ? 'bg-red-500' : pin.status === 'trapped' ? 'bg-amber-400' : 'bg-emerald-400'
                      }`}
                    />

                    {/* Hover Tooltip */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-900 text-white text-[11px] font-sans px-2.5 py-1 rounded-lg border border-white/20 whitespace-nowrap shadow-xl z-20">
                      <div className="font-bold">{pin.label}</div>
                      <div className="text-[9px] font-mono text-slate-400">Status: {pin.status.toUpperCase()}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Priority Triage Queue Table */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="font-bold uppercase">Automated Rescue Priority Queue</span>
              <span className="text-red-400 font-semibold animate-pulse">Live Triage Dispatch</span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto scrollbar-thin">
              {[
                { rank: 'P1', id: 'CAS-312', need: 'Oxygen Cylinder Depletion', loc: 'Low-Lying Delta Ward 4B', unit: 'NDRF Boat Unit 02', eta: '4 Mins', color: 'border-red-500/40 bg-red-950/20 text-red-300' },
                { rank: 'P1', id: 'CAS-520', need: 'Hypothermia / Infant', loc: 'Riverbank Sector B-12', unit: 'SDRF Quick Response 04', eta: '6 Mins', color: 'border-red-500/40 bg-red-950/20 text-red-300' },
                { rank: 'P2', id: 'TRP-219', need: 'Water Level at 4ft inside Home', loc: 'Ward 4 Old Town', unit: 'Inflatable Raft Alpha', eta: '12 Mins', color: 'border-amber-500/40 bg-amber-950/20 text-amber-300' },
                { rank: 'P2', id: 'TRP-405', need: 'Roof Trapped (4 Children)', loc: 'Ward 4 High School Road', unit: 'State Fire Service 01', eta: '15 Mins', color: 'border-amber-500/40 bg-amber-950/20 text-amber-300' },
                { rank: 'P3', id: 'SAFE-104', need: 'Evacuated to Shelter', loc: 'Relief Center Sector 4', unit: 'Status Logged Safe', eta: 'Resolved', color: 'border-emerald-500/20 bg-emerald-950/10 text-emerald-300' }
              ].map((item, i) => (
                <div key={i} className={`p-2.5 rounded-lg border ${item.color} flex items-center justify-between text-xs`}>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[11px] px-1.5 py-0.2 rounded bg-black/40">
                        {item.rank}
                      </span>
                      <span className="font-bold text-slate-200">{item.need}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {item.id} • {item.loc}
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-slate-200 text-[11px] font-semibold">{item.unit}</div>
                    <div className="text-[10px] text-amber-300">ETA: {item.eta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
