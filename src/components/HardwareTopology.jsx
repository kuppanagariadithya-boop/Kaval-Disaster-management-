import React from 'react';
import { Cpu, Zap, Radio, BatteryCharging, Volume2, ShieldCheck, Server } from 'lucide-react';

export function HardwareTopology() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Hardware Architecture & Edge Mesh Failover Topology
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Off-grid survival hardware specifications for standalone village nodes and LoRa repeater stations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            OFF-GRID 72HR SURVIVAL SPEC
          </span>
        </div>
      </div>

      {/* Schematic Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Module 1: ESP32 Edge Core */}
        <div className="glass-panel p-5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-400">
              <Cpu className="w-5 h-5" />
              <h3 className="text-sm font-bold font-mono">ESP32-S3 Edge MCU</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
              240MHz DUAL-CORE
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Handles local audio buffering, DTMF frequency extraction via embedded Goertzel routines, and dynamic heartbeat relay over SPI bus.
          </p>
          <div className="space-y-1 text-[11px] font-mono text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-white/5">
            <div>• Flash: 16MB QSPI Flash (Audio Prompts)</div>
            <div>• RAM: 512KB SRAM + 8MB PSRAM</div>
            <div>• Deep Sleep: 15µA quiescent draw</div>
          </div>
        </div>

        {/* Module 2: LoRa 868MHz Mesh */}
        <div className="glass-panel p-5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-purple-400">
              <Radio className="w-5 h-5" />
              <h3 className="text-sm font-bold font-mono">SX1276 LoRa Transceiver</h3>
            </div>
            <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded">
              868 / 433 MHz
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Maintains localized ad-hoc mesh networking up to 15km line-of-sight when municipal cellular towers lose fiber backhaul connectivity.
          </p>
          <div className="space-y-1 text-[11px] font-mono text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-white/5">
            <div>• TX Power: +20 dBm (100mW)</div>
            <div>• Sensitivity: -148 dBm at SF12</div>
            <div>• Spread Spectrum: FSK/GFSK/OOK</div>
          </div>
        </div>

        {/* Module 3: GSM 2G CS-Fallback */}
        <div className="glass-panel p-5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400">
              <Zap className="w-5 h-5" />
              <h3 className="text-sm font-bold font-mono">SIM800L / SIM7600 GSM</h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              VOICE + DTMF AT
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Connects to standard telecom towers using CS-Fallback voice control channels, maintaining 99.8% reach even under severe 4G IP packet choking.
          </p>
          <div className="space-y-1 text-[11px] font-mono text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-white/5">
            <div>• Dual-Band: GSM 900 / DCS 1800MHz</div>
            <div>• Voice: Standard 8kHz G.711 codec</div>
            <div>• DTMF: In-band AT+DDET hardware detect</div>
          </div>
        </div>

        {/* Module 4: Power System */}
        <div className="glass-panel p-5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400">
              <BatteryCharging className="w-5 h-5" />
              <h3 className="text-sm font-bold font-mono">Solar MPPT + 18650 Pack</h3>
            </div>
            <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded">
              72HR RESERVE
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            CN3791 MPPT Solar charge controller paired with 4S 18650 Samsung Li-ion pack ensures uninterrupted uptime throughout heavy overcast monsoons.
          </p>
          <div className="space-y-1 text-[11px] font-mono text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-white/5">
            <div>• Capacity: 14.8V 10,400mAh (154Wh)</div>
            <div>• Solar Input: 50W Monocrystalline panel</div>
            <div>• BMS: Over-current & thermal cut-off</div>
          </div>
        </div>

        {/* Module 5: Acoustic PA Siren Driver */}
        <div className="glass-panel p-5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-400">
              <Volume2 className="w-5 h-5" />
              <h3 className="text-sm font-bold font-mono">100W Community Horn PA</h3>
            </div>
            <span className="text-[10px] font-mono text-red-300 bg-red-500/10 px-1.5 py-0.5 rounded">
              122 dB SPL
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            TPA3116D2 Class-D amplifier driving an IP66 weatherproof reflex horn speaker for broadcast to villagers who do not possess any mobile telephone.
          </p>
          <div className="space-y-1 text-[11px] font-mono text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-white/5">
            <div>• Audio Power: 100W RMS into 4Ω</div>
            <div>• Audibility Range: 1.5km radial zone</div>
            <div>• Preloaded Alerts: Flash memory stored</div>
          </div>
        </div>

        {/* Module 6: Server Cluster */}
        <div className="glass-panel p-5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-400">
              <Server className="w-5 h-5" />
              <h3 className="text-sm font-bold font-mono">Asterisk SIP Server Cluster</h3>
            </div>
            <span className="text-[10px] font-mono text-blue-300 bg-blue-500/10 px-1.5 py-0.5 rounded">
              DISTRIBUTED VOIP
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Central orchestration hub featuring dynamic PRI trunk balancing, Kamailio SIP load balancer, and asynchronous Redis queue for 5,000 parallel sessions.
          </p>
          <div className="space-y-1 text-[11px] font-mono text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-white/5">
            <div>• SIP Throughput: 1,200 CPS (Calls/sec)</div>
            <div>• Codec: G.711u / AMR-WB Adaptive Multi-rate</div>
            <div>• DB: PostGIS geo-indexed database</div>
          </div>
        </div>

      </div>

      {/* Signal Processing / Goertzel Algorithm Mathematical Model Card */}
      <div className="glass-panel p-5 border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            Mathematical Signal Processing: Goertzel Algorithm for DTMF Demodulation
          </span>
          <span className="text-[11px] font-mono text-cyan-300">O(N) Efficiency</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-2 text-xs text-slate-300 leading-relaxed">
            <p>
              Standard Fast Fourier Transforms (FFT) require $O(N \log N)$ operations to calculate all $N$ discrete frequency bins. Because DTMF operates exclusively on 8 discrete frequencies (697, 770, 852, 941 Hz and 1209, 1336, 1477, 1633 Hz), KAVAL implements the recursive second-order **Goertzel Algorithm**:
            </p>
            <div className="p-3 rounded-lg bg-black/60 font-mono text-[11px] text-amber-300 space-y-1 border border-white/5">
              <div>s[n] = x[n] + 2 \cos(2\pi k / N) \cdot s[n-1] - s[n-2]</div>
              <div>|X[k]|^2 = s[N]^2 + s[N-1]^2 - 2 \cos(2\pi k / N) \cdot s[N] \cdot s[N-1]</div>
            </div>
            <p className="text-slate-400">
              This delivers sub-millisecond tone extraction with minimal CPU load on low-power edge nodes, maintaining high noise rejection in noisy field conditions.
            </p>
          </div>

          <div className="lg:col-span-5 p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2 font-mono text-xs">
            <div className="text-slate-400 text-[11px] font-bold">Standard DTMF Frequency Grid:</div>
            <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
              <span className="p-1.5 bg-slate-900 text-slate-500 rounded">Hz</span>
              <span className="p-1.5 bg-slate-900 text-cyan-300 rounded font-bold">1209</span>
              <span className="p-1.5 bg-slate-900 text-cyan-300 rounded font-bold">1336</span>
              <span className="p-1.5 bg-slate-900 text-cyan-300 rounded font-bold">1477</span>

              <span className="p-1.5 bg-slate-900 text-amber-300 rounded font-bold">697</span>
              <span className="p-1.5 bg-slate-800 text-white rounded font-bold border border-emerald-500/50">1 (Safe)</span>
              <span className="p-1.5 bg-slate-800 text-white rounded font-bold border border-amber-500/50">2 (Trap)</span>
              <span className="p-1.5 bg-slate-800 text-white rounded font-bold border border-red-500/50">3 (Med)</span>

              <span className="p-1.5 bg-slate-900 text-amber-300 rounded font-bold">770</span>
              <span className="p-1.5 bg-slate-800 text-white rounded font-bold border border-purple-500/50">4 (Proxy)</span>
              <span className="p-1.5 bg-slate-800 text-slate-400 rounded">5</span>
              <span className="p-1.5 bg-slate-800 text-slate-400 rounded">6</span>

              <span className="p-1.5 bg-slate-900 text-amber-300 rounded font-bold">852</span>
              <span className="p-1.5 bg-slate-800 text-slate-400 rounded">7</span>
              <span className="p-1.5 bg-slate-800 text-slate-400 rounded">8</span>
              <span className="p-1.5 bg-slate-800 text-slate-400 rounded">9</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
