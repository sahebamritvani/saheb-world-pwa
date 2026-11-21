import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  BookOpen,
  RotateCcw,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Eye,
  Sun,
  Moon,
  Feather
} from 'lucide-react';
import { Language } from '../context/LanguageContext';

interface Chapter {
  id: number;
  title: string;
  lines: string[];
  bhavarth?: string;
}

interface SacredReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  chapters: Chapter[];
  currentChapterIdx: number;
  onChapterChange: (idx: number) => void;
  lang: Language;
}

export function SacredReaderModal({
  isOpen,
  onClose,
  title,
  subtitle,
  chapters,
  currentChapterIdx,
  onChapterChange,
  lang
}: SacredReaderModalProps) {
  // Reading Mode Customization States
  const [readerTheme, setReaderTheme] = useState<'pothi' | 'night' | 'trueblack' | 'white'>('pothi');
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(2); // 1: small, 2: medium, 3: large, 4: XL
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(1); // 1: slow, 2: medium, 3: fast
  const [lineGuideActive, setLineGuideActive] = useState(true);
  const [activeLineIdx, setActiveLineIdx] = useState<number | null>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChapter = chapters[currentChapterIdx] || chapters[0] || {
    id: 1,
    title: "पावन वाचन",
    lines: ["सत्यनाम की महिमा अपार, सतगुरु देव की जय हो!"]
  };

  // Auto-scroll engine
  useEffect(() => {
    if (isAutoScrolling) {
      const intervalMs = scrollSpeed === 1 ? 50 : scrollSpeed === 2 ? 30 : 15;
      autoScrollTimerRef.current = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop += 1;
          // Check if reached bottom
          if (
            scrollRef.current.scrollTop + scrollRef.current.clientHeight >=
            scrollRef.current.scrollHeight - 5
          ) {
            setIsAutoScrolling(false);
          }
        }
      }, intervalMs);
    } else {
      if (autoScrollTimerRef.current) clearInterval(autoScrollTimerRef.current);
    }
    return () => {
      if (autoScrollTimerRef.current) clearInterval(autoScrollTimerRef.current);
    };
  }, [isAutoScrolling, scrollSpeed]);

  if (!isOpen) return null;

  const fontClasses = [
    'text-base md:text-lg leading-relaxed',
    'text-lg md:text-xl leading-relaxed',
    'text-xl md:text-2xl leading-loose',
    'text-2xl md:text-3xl leading-loose'
  ][fontSizeLevel - 1];

  const getThemeBg = () => {
    switch (readerTheme) {
      case 'pothi': return 'bg-[#F4ECD8] text-[#2C1E11] border-[#D2B48C]';
      case 'night': return 'bg-[#1E1E1E] text-[#E0E0E0] border-[#333333]';
      case 'trueblack': return 'bg-black text-[#FFD700] border-[#332211]';
      default: return 'bg-[#FFFDF9] text-[#1F1F1F] border-amber-200';
    }
  };

  const getCardStyle = () => {
    switch (readerTheme) {
      case 'pothi': return 'bg-[#FFFDF9] border-[#D2B48C] text-[#2C1E11] shadow-md';
      case 'night': return 'bg-[#2A2A2A] border-[#444444] text-[#E0E0E0] shadow-xl';
      case 'trueblack': return 'bg-[#0A0A0A] border-[#3A2A10] text-[#FFEA70] shadow-2xl';
      default: return 'bg-white border-amber-200 text-gray-900 shadow-md';
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col transition-all duration-300 ${getThemeBg()}`}>
      {/* Top Floating Control Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b backdrop-blur-md bg-black/10 shadow-sm z-10">
        <div className="flex items-center gap-2 truncate">
          <BookOpen className="w-5 h-5 text-amber-500 shrink-0 animate-pulse" />
          <div className="truncate">
            <h3 className="font-bold text-sm md:text-base m-0 truncate">{title}</h3>
            {subtitle && <p className="text-[11px] opacity-75 m-0 truncate">{subtitle}</p>}
          </div>
        </div>

        {/* Action Controls & Close */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Theme Quick Switches */}
          <div className="hidden sm:flex items-center gap-1 p-0.5 rounded-lg bg-black/20 border border-white/20">
            <button
              onClick={() => setReaderTheme('pothi')}
              className={`px-2 py-0.5 text-[10px] font-bold rounded ${readerTheme === 'pothi' ? 'bg-[#8B0000] text-white shadow-sm' : 'opacity-70'}`}
            >
              {lang === 'pa' ? 'ਪੋਥੀ' : lang === 'en' ? 'Pothi' : 'पोथी'}
            </button>
            <button
              onClick={() => setReaderTheme('night')}
              className={`px-2 py-0.5 text-[10px] font-bold rounded ${readerTheme === 'night' ? 'bg-amber-500 text-black shadow-sm' : 'opacity-70'}`}
            >
              {lang === 'pa' ? 'ਰਾਤਰੀ' : lang === 'en' ? 'Night' : 'रात्रि'}
            </button>
            <button
              onClick={() => setReaderTheme('trueblack')}
              className={`px-2 py-0.5 text-[10px] font-bold rounded ${readerTheme === 'trueblack' ? 'bg-[#FFD700] text-black shadow-sm' : 'opacity-70'}`}
            >
              OLED
            </button>
          </div>

          {/* TTS Customization (Speed/Pitch) */}
          <div className="flex items-center gap-1 bg-black/10 p-1 rounded-lg border border-white/10">
            <Volume2 className="w-3.5 h-3.5 text-amber-500" />
            <select 
              onChange={(e) => {
                const speed = parseFloat(e.target.value);
                (window as any).sahebTTSSpeed = speed;
              }}
              className="bg-transparent text-[10px] font-bold border-none outline-none cursor-pointer"
              defaultValue="0.9"
            >
              <option value="0.7">0.7x</option>
              <option value="0.9">0.9x</option>
              <option value="1.1">1.1x</option>
              <option value="1.3">1.3x</option>
            </select>
          </div>

          {/* Font Size Adjusters */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFontSizeLevel(Math.max(1, fontSizeLevel - 1))}
              className="w-7 h-7 rounded-lg bg-black/20 hover:bg-black/40 border border-white/20 flex items-center justify-center font-black text-xs cursor-pointer"
              title="फ़ॉन्ट छोटा करें"
            >
              अ-
            </button>
            <button
              onClick={() => setFontSizeLevel(Math.min(4, fontSizeLevel + 1))}
              className="w-7 h-7 rounded-lg bg-black/20 hover:bg-black/40 border border-white/20 flex items-center justify-center font-black text-xs cursor-pointer"
              title="फ़ॉन्ट बड़ा करें"
            >
              अ+
            </button>
          </div>

          {/* Auto Scroll Toggle */}
          <button
            onClick={() => setIsAutoScrolling(!isAutoScrolling)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition ${
              isAutoScrolling ? 'bg-emerald-600 text-white animate-pulse' : 'bg-amber-700 text-amber-100 hover:bg-amber-800'
            }`}
            title="स्वतः वाचन (Hands-Free Auto-Scroll)"
          >
            {isAutoScrolling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isAutoScrolling ? (lang === 'pa' ? 'ਰੁਕੋ' : lang === 'en' ? 'Stop' : 'रुकें') : (lang === 'pa' ? 'ਆਟੋ ਵਾਚਨ' : lang === 'en' ? 'Auto-Read' : 'स्वतः वाचन')}</span>
          </button>

          {/* Close Reader */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/20 transition cursor-pointer text-current"
            title="वाचन समाप्त (Close Reader)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Distraction-Free Scripture Container */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-8 md:px-12 md:py-12 max-w-4xl mx-auto w-full space-y-8 scroll-smooth"
      >
        {/* Chapter Title Badge */}
        <div className="text-center space-y-2 border-b border-amber-500/30 pb-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 border border-amber-500/40 text-amber-600">
            {lang === 'pa' ? 'ਅਧਿਆਇ' : lang === 'en' ? 'Chapter' : 'अध्याय'} {currentChapterIdx + 1} / {chapters.length}
          </span>
          <h2 className="text-2xl md:text-3xl font-black italic tracking-wide text-amber-700 m-0">
            {currentChapter.title}
          </h2>
        </div>

        {/* Verse Lines Display */}
        <div className={`space-y-6 ${getCardStyle()} p-6 md:p-10 rounded-3xl border-2`}>
          {currentChapter.lines.map((line, idx) => {
            const isActive = activeLineIdx === idx;
            return (
              <div
                key={`reader-line-${idx}-${line.slice(0, 10)}`}
                onClick={() => setActiveLineIdx(idx)}
                className={`p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                  isActive && lineGuideActive
                    ? 'bg-amber-500/15 border-l-4 border-amber-500 ring-1 ring-amber-500/30 scale-[1.01]'
                    : 'hover:bg-black/5'
                }`}
              >
                <p className={`font-serif text-center m-0 whitespace-pre-line ${fontClasses}`}>
                  {line}
                </p>
              </div>
            );
          })}

          {/* Optional Bhavarth Section */}
          {currentChapter.bhavarth && (
            <div className="mt-8 pt-6 border-t border-amber-500/30 text-left space-y-2 bg-amber-500/10 p-5 rounded-2xl">
              <h4 className="font-bold text-sm md:text-base text-amber-600 m-0 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{lang === 'pa' ? 'ਭਾਵਾਰਥ:' : lang === 'en' ? 'Essence & Meaning:' : 'भावार्थ:'}</span>
              </h4>
              <p className="text-sm md:text-base leading-relaxed opacity-95 m-0 italic">
                {currentChapter.bhavarth}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Floating Navigation Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 border-t backdrop-blur-md bg-black/10 z-10 text-xs">
        <button
          disabled={currentChapterIdx === 0}
          onClick={() => {
            if (currentChapterIdx > 0) {
              onChapterChange(currentChapterIdx - 1);
              if (scrollRef.current) scrollRef.current.scrollTop = 0;
            }
          }}
          className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 disabled:opacity-40 text-white font-bold flex items-center gap-1 transition shadow cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{lang === 'pa' ? 'ਪਿਛਲਾ' : lang === 'en' ? 'Previous' : 'पिछला अध्याय'}</span>
        </button>

        <span className="font-bold opacity-80">
          {currentChapterIdx + 1} / {chapters.length}
        </span>

        <button
          disabled={currentChapterIdx === chapters.length - 1}
          onClick={() => {
            if (currentChapterIdx < chapters.length - 1) {
              onChapterChange(currentChapterIdx + 1);
              if (scrollRef.current) scrollRef.current.scrollTop = 0;
            }
          }}
          className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 disabled:opacity-40 text-white font-bold flex items-center gap-1 transition shadow cursor-pointer"
        >
          <span>{lang === 'pa' ? 'ਅਗਲਾ' : lang === 'en' ? 'Next' : 'अगला अध्याय'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
