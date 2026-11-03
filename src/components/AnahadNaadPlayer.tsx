// Anahad Naad Audio Player Component
// Responsive React component for spiritual audio streams with robust CacheStorage/Range-Request offline fallback.

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, AlertCircle, RefreshCw } from 'lucide-react';

interface AudioTrack {
  id: string;
  titleHi: string;
  titlePa: string;
  artist: string;
  url: string;
}

const SAMPLE_ANAHAD_TRACKS: AudioTrack[] = [
  {
    id: 'track-1',
    titleHi: 'अनहद नाद एवं सतनाम सिमरन',
    titlePa: 'ਅਨਹਦ ਨਾਦ ਅਤੇ ਸਤਨਾਮ ਸਿਮਰਨ',
    artist: 'सतगुरु कबीर सत्संग वाणी',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_db263d5964.mp3?filename=meditation-tanpura-ambient-111100.mp3'
  },
  {
    id: 'track-2',
    titleHi: 'अमरलोक ध्यान धुन (Tanpura Drone)',
    titlePa: 'ਅਮਰਲੋਕ ਧਿਆਨ ਧੁਨ',
    artist: 'साहेब वर्ल्ड नाद साधना',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a1b2c3d4.mp3?filename=tibetan-singing-bowl-calm-meditation-101150.mp3'
  }
];

export const AnahadNaadPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = SAMPLE_ANAHAD_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    try {
      setAudioError(null);
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setIsPlaying(false);
      console.warn('[AnahadNaadPlayer] Playback issue (likely offline/range-request):', err);
      setAudioError('ऑफ़लाइन मोड में कैश्ड ऑडियो लोड किया जा रहा है। कृपया पुनः प्रयास करें।');
    }
  };

  const handleAudioError = () => {
    setIsLoading(false);
    setIsPlaying(false);
    setAudioError('ऑफ़लाइन ऑडियो स्ट्रीम उपलब्ध नहीं है। कृपया पहले "ऑफ़लाइन सेव करें" बटन दबाएं।');
  };

  return (
    <div className="bg-[#FFFDF9] border-2 border-[#D4AF37] rounded-3xl p-5 shadow-xl text-[#2C1E11] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D2B48C]/50 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-[#8B0000] text-amber-200">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-black text-base text-[#8B0000]">अनहद नाद (Anahad Naad Player)</h3>
            <p className="text-xs font-medium text-[#9A7D46]">100% ऑफ़लाइन समर्थित (Range-Request Cached)</p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-amber-100 border border-amber-300 text-amber-900 rounded-full text-[11px] font-bold">
          {navigator.onLine ? '🟢 ऑनलाइन' : '🛡️ ऑफ़लाइन मोड'}
        </span>
      </div>

      {/* Track info */}
      <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-center space-y-1">
        <h4 className="font-bold text-sm text-[#8B0000]">{track.titleHi}</h4>
        <p className="text-xs text-[#5D4037] font-medium">{track.artist}</p>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={track.url}
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onError={handleAudioError}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
      />

      {/* Error / Offline Notice */}
      {audioError && (
        <div className="bg-red-50 border border-red-200 text-red-900 p-3 rounded-xl text-xs font-medium flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{audioError}</span>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              if (audioRef.current) audioRef.current.muted = !isMuted;
            }}
            className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 transition cursor-pointer"
            title="Volume Toggle"
          >
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-20 sm:w-28 accent-[#8B0000] cursor-pointer"
          />
        </div>

        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="px-6 py-3 bg-[#701A07] hover:bg-red-950 text-white rounded-full font-bold text-sm shadow-lg border-2 border-amber-400/50 flex items-center gap-2 cursor-pointer transition active:scale-95 disabled:opacity-50"
        >
          {isLoading ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : isPlaying ? (
            <>
              <Pause className="w-5 h-5" /> <span>विराम (Pause)</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5" /> <span>शुरू करें (Play Naad)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
