import React, { useEffect, useRef } from 'react';
import { Activity, Radio, Cpu } from 'lucide-react';

export function FFTSpectrumVisualizer({ activeKey, isVoiceActive }) {
  const canvasRef = useRef(null);

  // Frequency bands
  const dtmfFreqs = [
    { freq: 697, group: 'row', name: 'R1 (697Hz)' },
    { freq: 770, group: 'row', name: 'R2 (770Hz)' },
    { freq: 852, group: 'row', name: 'R3 (852Hz)' },
    { freq: 941, group: 'row', name: 'R4 (941Hz)' },
    { freq: 1209, group: 'col', name: 'C1 (1209Hz)' },
    { freq: 1336, group: 'col', name: 'C2 (1336Hz)' },
    { freq: 1477, group: 'col', name: 'C3 (1477Hz)' },
    { freq: 1633, group: 'col', name: 'C4 (1633Hz)' }
  ];

  // Map key to twin frequencies
  const activeTargets = {
    '1': [697, 1209],
    '2': [697, 1336],
    '3': [697, 1477],
    '4': [770, 1209],
    '5': [770, 1336],
    '6': [770, 1477],
    '7': [852, 1209],
    '8': [852, 1336],
    '9': [852, 1477],
    '*': [941, 1209],
    '0': [941, 1336],
    '#': [941, 1477]
  }[activeKey] || [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let phase = 0;

    const render = () => {
      phase += 0.08;
      const w = canvas.width;
      const h = canvas.height;

      // Dark background
      ctx.fillStyle = '#080c14';
      ctx.fillRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw FFT Spectrum Bars
      const numBars = 36;
      const barW = (w - 20) / numBars;

      for (let i = 0; i < numBars; i++) {
        const centerFreq = 400 + i * 40;
        let mag = 0.08 + Math.sin(phase + i * 0.4) * 0.04;

        // If voice is active, add broadband voice noise
        if (isVoiceActive) {
          mag += Math.abs(Math.sin(phase * 1.5 + i * 0.8)) * 0.45;
        }

        // If active DTMF key matches this frequency region
        const isMatchedFreq = activeTargets.some(f => Math.abs(f - centerFreq) < 35);
        if (isMatchedFreq) {
          mag = 0.88 + Math.sin(phase * 3) * 0.08;
        }

        const barHeight = Math.min(h - 25, mag * (h - 20));
        const x = 10 + i * barW;
        const y = h - 20 - barHeight;

        // Gradient based on match
        if (isMatchedFreq) {
          const grad = ctx.createLinearGradient(0, y, 0, h - 20);
          grad.addColorStop(0, '#f59e0b');
          grad.addColorStop(1, '#ef4444');
          ctx.fillStyle = grad;
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = isVoiceActive ? '#06b6d4' : '#1e293b';
          ctx.shadowBlur = 0;
        }

        ctx.fillRect(x, y, barW - 2, barHeight);
        ctx.shadowBlur = 0;
      }

      // Target DTMF Peak Markers
      activeTargets.forEach((freq) => {
        const targetX = 10 + ((freq - 400) / 40) * barW;
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(`▲ ${freq}Hz`, Math.max(8, targetX - 16), 14);
      });

      // Baseline line
      ctx.strokeStyle = '#334155';
      ctx.beginPath();
      ctx.moveTo(10, h - 20);
      ctx.lineTo(w - 10, h - 20);
      ctx.stroke();

      // Frequency Axis labels
      ctx.fillStyle = '#64748b';
      ctx.font = '8px monospace';
      ctx.fillText('500Hz', 15, h - 8);
      ctx.fillText('1000Hz', w * 0.45, h - 8);
      ctx.fillText('1600Hz', w - 45, h - 8);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeKey, isVoiceActive, activeTargets]);

  return (
    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5 space-y-2">
      <div className="flex items-center justify-between text-xs font-mono text-slate-300">
        <div className="flex items-center gap-1.5 text-cyan-400">
          <Activity className="w-4 h-4 animate-pulse" />
          <span className="font-bold uppercase text-[11px]">
            In-Band Audio Spectrum & Goertzel Filter
          </span>
        </div>
        <span className="text-[10px] text-amber-400 font-bold">
          {activeKey ? `DTMF DUAL PEAK: [${activeTargets.join('Hz + ')}Hz]` : isVoiceActive ? 'VOICE G.711u ACTIVE' : 'IDLE NOISE FLOOR'}
        </span>
      </div>

      <div className="relative w-full h-24 rounded-lg overflow-hidden border border-white/5">
        <canvas
          ref={canvasRef}
          width={420}
          height={96}
          className="w-full h-full block"
        />
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
        <span>Goertzel Bins: 697 | 770 | 852 | 941 | 1209 | 1336 | 1477 Hz</span>
        <span className="text-emerald-400">SNR: +18.4 dB</span>
      </div>
    </div>
  );
}
