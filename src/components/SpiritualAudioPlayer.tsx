import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Gauge, Music, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface SpiritualTrack {
  id: number;
  titleHi: string;
  titlePa: string;
  titleEn: string;
  raag: string;
  durationSec: number;
  baseFreq: number;
  scale: number[];
  bhav: string;
}

const TRACKS: SpiritualTrack[] = [
  {
    id: 1,
    titleHi: "झीनी झीनी बीनी चदरिया",
    titlePa: "ਝੀਣੀ ਝੀਣੀ ਬੀਣੀ ਚਦਰਿਆ",
    titleEn: "Jhini Jhini Beeni Chadariya",
    raag: "राग भैरवी (Bhairavi)",
    durationSec: 180,
    baseFreq: 220, // A3
    scale: [1, 1.125, 1.2, 1.333, 1.5, 1.6, 1.875, 2],
    bhav: "आत्मा और शरीर का पवित्र ताना-बाना"
  },
  {
    id: 2,
    titleHi: "घट घट में पंछी बोलता",
    titlePa: "ਘਟ ਘਟ ਮੇਂ ਪੰਛੀ ਬੋਲਤਾ",
    titleEn: "Ghat Ghat Mein Panchhi Bolta",
    raag: "राग यमन (Yaman)",
    durationSec: 210,
    baseFreq: 246.94, // B3
    scale: [1, 1.125, 1.25, 1.4, 1.5, 1.667, 1.875, 2],
    bhav: "समस्त घटों में परमात्मा की अद्वैत उपस्थिति"
  },
  {
    id: 3,
    titleHi: "मन लागो मेरो यार फ़कीरी में",
    titlePa: "ਮਨ ਲਾਗੋ ਮੇਰੋ ਯਾਰ ਫ਼ਕੀਰੀ ਮੇਂ",
    titleEn: "Mann Lago Mero Yaar Fakiri Mein",
    raag: "राग काफी (Kafi)",
    durationSec: 195,
    baseFreq: 196, // G3
    scale: [1, 1.125, 1.2, 1.333, 1.5, 1.667, 1.777, 2],
    bhav: "सच्चा वैराग्य एवं सद्गुरु की सहज प्रीत"
  },
  {
    id: 4,
    titleHi: "साधो सहज समाधि भली",
    titlePa: "ਸਾਧੋ ਸਹਜ ਸਮਾਧੀ ਭਲੀ",
    titleEn: "Sadho Sahaj Samadhi Bhali",
    raag: "राग देश (Desh)",
    durationSec: 240,
    baseFreq: 261.63, // C4
    scale: [1, 1.125, 1.25, 1.333, 1.5, 1.667, 1.875, 2],
    bhav: "उठते-बैठते निरंतर प्रभु स्मरण की अवस्था"
  },
  {
    id: 5,
    titleHi: "अनाहद नाद पावन धुन (४३२ Hz)",
    titlePa: "ਅਨਹਦ ਨਾਦ ਪਾਵਨ ਧੁਨ (੪੩੨ Hz)",
    titleEn: "Anahad Naad Sacred Drone (432 Hz)",
    raag: "नाद समाधि (Universal OM)",
    durationSec: 300,
    baseFreq: 216, // 432 / 2
    scale: [1, 1.25, 1.5, 1.75, 2],
    bhav: "दशम द्वार में गूंजती अखंड ब्रह्म ध्वनि"
  }
];

export const SpiritualAudioPlayer: React.FC<{ onTimeTracked?: (seconds: number) => void }> = ({ onTimeTracked }) => {
  const { lang } = useLanguage();
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(0.75);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);

  const track = TRACKS[currentTrackIdx];

  // Web Audio Context refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{ oscs: OscillatorNode[]; gain: GainNode } | null>(null);
  const timerRef = useRef<number | null>(null);
  const speedRef = useRef(playbackSpeed);
  speedRef.current = playbackSpeed;

  const getAudioContext = (): AudioContext => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const stopSynth = () => {
    if (synthNodesRef.current) {
      try {
        const { oscs, gain } = synthNodesRef.current;
        if (audioCtxRef.current) {
          gain.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.3);
        }
        setTimeout(() => {
          oscs.forEach(o => {
            try { o.stop(); o.disconnect(); } catch { /* ignore */ }
          });
          try { gain.disconnect(); } catch { /* ignore */ }
        }, 350);
      } catch {
        // ignore cleanup
      }
      synthNodesRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startSynth = (currTrack: SpiritualTrack) => {
    stopSynth();
    try {
      const ctx = getAudioContext();
      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0.001, ctx.currentTime);
      mainGain.gain.linearRampToValueAtTime(0.25 * volume, ctx.currentTime + 1);
      mainGain.connect(ctx.destination);

      // Create rich meditative harmonics
      const osc1 = ctx.createOscillator(); // Root base
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(currTrack.baseFreq * playbackSpeed, ctx.currentTime);

      const osc2 = ctx.createOscillator(); // Fifth / Harmonic
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(currTrack.baseFreq * 1.5 * playbackSpeed, ctx.currentTime);

      const osc3 = ctx.createOscillator(); // High chime
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(currTrack.baseFreq * 2.0 * playbackSpeed, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      filter.connect(mainGain);

      osc1.start();
      osc2.start();
      osc3.start();

      synthNodesRef.current = { oscs: [osc1, osc2, osc3], gain: mainGain };

      // Progress interval honoring playbackSpeed
      timerRef.current = window.setInterval(() => {
        setCurrentTimeSec(prev => {
          const next = prev + 1;
          if (onTimeTracked) onTimeTracked(1);
          if (next >= currTrack.durationSec) {
            handleNext();
            return 0;
          }
          return next;
        });
      }, 1000 / speedRef.current);
    } catch (e) {
      console.warn('Playback error', e);
    }
  };

  // Adjust playback speed dynamically
  const handleSpeedChange = (newSpeed: number) => {
    setPlaybackSpeed(newSpeed);
    speedRef.current = newSpeed;
    if (synthNodesRef.current && audioCtxRef.current) {
      try {
        const { oscs } = synthNodesRef.current;
        const ctx = audioCtxRef.current;
        oscs[0].frequency.linearRampToValueAtTime(track.baseFreq * newSpeed, ctx.currentTime + 0.2);
        oscs[1].frequency.linearRampToValueAtTime(track.baseFreq * 1.5 * newSpeed, ctx.currentTime + 0.2);
        oscs[2].frequency.linearRampToValueAtTime(track.baseFreq * 2.0 * newSpeed, ctx.currentTime + 0.2);
      } catch (e) {
        console.warn('Speed freq shift failed', e);
      }

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = window.setInterval(() => {
          setCurrentTimeSec(prev => {
            const next = prev + 1;
            if (onTimeTracked) onTimeTracked(1);
            if (next >= track.durationSec) {
              handleNext();
              return 0;
            }
            return next;
          });
        }, 1000 / newSpeed);
      }
    }
  };

  // Adjust volume
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (synthNodesRef.current && audioCtxRef.current) {
      try {
        synthNodesRef.current.gain.gain.linearRampToValueAtTime(0.25 * newVol, audioCtxRef.current.currentTime + 0.1);
      } catch {
        // ignore
      }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSynth();
      setIsPlaying(false);
    } else {
      startSynth(track);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIdx + 1) % TRACKS.length;
    setCurrentTrackIdx(nextIdx);
    setCurrentTimeSec(0);
    if (isPlaying) {
      startSynth(TRACKS[nextIdx]);
    }
  };

  const handlePrev = () => {
    const prevIdx = (currentTrackIdx - 1 + TRACKS.length) % TRACKS.length;
    setCurrentTrackIdx(prevIdx);
    setCurrentTimeSec(0);
    if (isPlaying) {
      startSynth(TRACKS[prevIdx]);
    }
  };

  useEffect(() => {
    return () => {
      stopSynth();
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const trackTitle = lang === 'pa' ? track.titlePa : lang === 'en' ? track.titleEn : track.titleHi;

  return (
    <div className="card p-4 sm:p-5 rounded-2xl border-2 border-amber-300/80 bg-gradient-to-b from-amber-50/80 to-[#FFFDF9] shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-200/80 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-700 text-amber-100 flex items-center justify-center shadow-xs">
            <Music className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-[#8B0000] m-0 flex items-center gap-1.5">
              <span>{lang === 'pa' ? 'ਕਬੀਰ ਬਾਣੀ ਅਤੇ ਭਜਨ ਸੰਗੀਤ' : lang === 'en' ? 'Kabir Bani & Bhajan Audio' : 'कबीर वाणी एवं भजन स्वर-तरंग'}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </h4>
            <p className="text-[10px] text-amber-800/80 m-0 font-medium">
              {track.raag} • {track.bhav}
            </p>
          </div>
        </div>

        {/* Speed Badge */}
        <span className="px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[10px] font-black text-[#8B0000]">
          {playbackSpeed}x {lang === 'pa' ? 'ਗਤੀ' : lang === 'en' ? 'Speed' : 'गति'}
        </span>
      </div>

      {/* Current Track Info */}
      <div className="text-center py-1">
        <div className="text-sm sm:text-base font-black text-gray-900 tracking-wide">
          "{trackTitle}"
        </div>
        <div className="text-xs text-amber-800 font-semibold mt-0.5">
          {lang === 'pa' ? `ਟ੍ਰੈਕ ${currentTrackIdx + 1} / ${TRACKS.length}` : lang === 'en' ? `Track ${currentTrackIdx + 1} of ${TRACKS.length}` : `पद ${currentTrackIdx + 1} / ${TRACKS.length}`}
        </div>
      </div>

      {/* Progress & Waveform */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
          <span>{formatTime(currentTimeSec)}</span>
          <div className="flex items-center gap-1 h-3">
            {isPlaying && (
              <>
                <div className="w-1 bg-amber-600 rounded-full wave-bar" style={{ animationDelay: '0.1s' }} />
                <div className="w-1 bg-orange-600 rounded-full wave-bar" style={{ animationDelay: '0.3s' }} />
                <div className="w-1 bg-amber-700 rounded-full wave-bar" style={{ animationDelay: '0.2s' }} />
                <div className="w-1 bg-red-700 rounded-full wave-bar" style={{ animationDelay: '0.4s' }} />
              </>
            )}
          </div>
          <span>{formatTime(track.durationSec)}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden border border-amber-300/40">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-[#8B0000] rounded-full transition-all"
            style={{ width: `${Math.min(100, (currentTimeSec / track.durationSec) * 100)}%` }}
          />
        </div>
      </div>

      {/* Primary Audio Transport Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition active:scale-95 cursor-pointer"
          title="Previous Track"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          onClick={togglePlay}
          className={`p-3.5 rounded-full text-white shadow-xl border-2 border-amber-300 transition transform active:scale-90 cursor-pointer ${
            isPlaying ? 'bg-[#8B0000] ring-4 ring-amber-400/40' : 'bg-gradient-to-r from-amber-700 to-orange-600 hover:brightness-110'
          }`}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition active:scale-95 cursor-pointer"
          title="Next Track"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Playback Speed Control Slider & Presets */}
      <div className="p-3 rounded-xl bg-white/90 border border-amber-200 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-amber-950">
          <span className="flex items-center gap-1.5 text-[11px]">
            <Gauge className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'pa' ? 'ਸੁਣਨ ਗਤੀ ਕੰਟਰੋਲ (Playback Speed):' : lang === 'en' ? 'Playback Speed Control:' : 'वाचन एवं श्रवण गति नियंत्रक (Playback Speed):'}</span>
          </span>
          <span className="text-amber-800 font-mono font-black">{playbackSpeed.toFixed(2)}x</span>
        </div>

        {/* Speed Slider */}
        <input
          type="range"
          min="0.5"
          max="2.0"
          step="0.05"
          value={playbackSpeed}
          onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
          className="w-full accent-amber-700 cursor-pointer h-1.5 bg-amber-200 rounded-lg appearance-none"
        />

        {/* Preset Speed Buttons */}
        <div className="flex items-center justify-between gap-1 pt-1">
          {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map(s => (
            <button
              key={s}
              onClick={() => handleSpeedChange(s)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                Math.abs(playbackSpeed - s) < 0.01
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Volume Slider */}
      <div className="flex items-center gap-2 pt-1 px-1">
        <button
          onClick={() => handleVolumeChange(volume > 0 ? 0 : 0.75)}
          className="text-amber-800 hover:text-amber-950"
          title="Mute / Unmute"
        >
          {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          className="w-full accent-amber-700 cursor-pointer h-1.5 bg-amber-200 rounded-lg appearance-none"
        />
        <span className="text-[10px] font-mono text-gray-500 w-8 text-right">
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  );
};
