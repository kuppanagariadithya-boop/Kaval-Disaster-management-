// Web Audio API Synthesizers for DTMF Tones, Sirens, and Multilingual Speech Synthesis

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// DTMF standard frequencies (Hz)
const DTMF_FREQS = {
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
  '#': [941, 1477],
};

/**
 * Play authentic DTMF dual tone
 */
export function playDTMFTone(key, duration = 0.25) {
  const freqs = DTMF_FREQS[key];
  if (!freqs) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(freqs[0], ctx.currentTime);
    osc2.frequency.setValueAtTime(freqs[1], ctx.currentTime);

    // Smooth envelope to prevent audio clicking
    gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + duration);
    osc2.stop(ctx.currentTime + duration);
  } catch (err) {
    console.warn('Audio tone error:', err);
  }
}

/**
 * Play emergency alert siren sound (oscillating frequency sweep)
 */
export function playAlertSiren(cycles = 2) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sawtooth';
    const now = ctx.currentTime;
    const cycleDuration = 0.6;

    gainNode.gain.setValueAtTime(0.01, now);
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05);

    for (let i = 0; i < cycles; i++) {
      const startT = now + i * cycleDuration;
      osc.frequency.setValueAtTime(440, startT);
      osc.frequency.exponentialRampToValueAtTime(880, startT + cycleDuration * 0.5);
      osc.frequency.exponentialRampToValueAtTime(440, startT + cycleDuration);
    }

    const totalDuration = cycles * cycleDuration;
    gainNode.gain.setValueAtTime(0.15, now + totalDuration - 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + totalDuration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + totalDuration);
  } catch (err) {
    console.warn('Siren play error:', err);
  }
}

/**
 * Speak voice prompt using Web Speech Synthesis
 */
export function speakDisasterVoicePrompt(text, lang = 'en-IN', onStart, onEnd) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return null;
  }

  window.speechSynthesis.cancel(); // cancel any active utterance

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95; // slightly slower for clear disaster announcement
  utterance.pitch = 1.05;

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;

  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function stopVoiceSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
