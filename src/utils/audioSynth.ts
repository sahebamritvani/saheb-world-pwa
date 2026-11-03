// Offline Meditative Audio Synthesizer using Web Audio API

let audioCtx: AudioContext | null = null;
let droneOsc1: OscillatorNode | null = null;
let droneOsc2: OscillatorNode | null = null;
let droneGain: GainNode | null = null;
let currentTanpuraVolume = 0.7; // default 70%

export function setTanpuraVolume(vol: number) {
  currentTanpuraVolume = Math.max(0.05, Math.min(1.0, vol));
  try {
    if (droneGain && audioCtx) {
      droneGain.gain.linearRampToValueAtTime(0.15 * currentTanpuraVolume, audioCtx.currentTime + 0.1);
    }
  } catch (e) {
    console.warn('Volume adjust failed', e);
  }
}

export function getTanpuraVolume(): number {
  return currentTanpuraVolume;
}

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playGentleBell(freq = 432) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.98, ctx.currentTime + 3);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 3);
  } catch (e) {
    console.warn('Audio play failed', e);
  }
}

export function startTanpuraDrone(): boolean {
  try {
    const ctx = getAudioContext();
    if (droneGain) {
      stopTanpuraDrone();
    }

    droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.001, ctx.currentTime);
    droneGain.gain.linearRampToValueAtTime(0.15 * currentTanpuraVolume, ctx.currentTime + 1.2);
    droneGain.connect(ctx.destination);

    // Fundamental root (C#3 / 138.59 Hz)
    droneOsc1 = ctx.createOscillator();
    droneOsc1.type = 'sawtooth';
    droneOsc1.frequency.setValueAtTime(138.59, ctx.currentTime);

    // Fifth overtone (G#3 / 207.65 Hz)
    droneOsc2 = ctx.createOscillator();
    droneOsc2.type = 'sine';
    droneOsc2.frequency.setValueAtTime(207.65, ctx.currentTime);

    // Warm low-pass filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);

    droneOsc1.connect(filter);
    droneOsc2.connect(filter);
    filter.connect(droneGain);

    droneOsc1.start();
    droneOsc2.start();
    return true;
  } catch (e) {
    console.warn('Drone start failed', e);
    return false;
  }
}

export function stopTanpuraDrone() {
  try {
    if (droneGain && audioCtx) {
      droneGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
      setTimeout(() => {
        droneOsc1?.stop();
        droneOsc2?.stop();
        droneOsc1?.disconnect();
        droneOsc2?.disconnect();
        droneGain?.disconnect();
        droneOsc1 = null;
        droneOsc2 = null;
        droneGain = null;
      }, 900);
    }
  } catch (e) {
    console.warn('Drone stop failed', e);
  }
}
