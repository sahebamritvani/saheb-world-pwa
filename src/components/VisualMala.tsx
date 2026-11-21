import React from 'react';
import { RotateCcw, Volume2 } from 'lucide-react';
import { Language } from '../context/LanguageContext';

interface VisualMalaProps {
  lang: Language;
  showToast: (msg: string) => void;
  count: number;
  rounds: number;
  onTap: () => void;
  onReset: () => void;
}

export function VisualMala({ lang, showToast, count, rounds, onTap, onReset }: VisualMalaProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-6 select-none">
      <div className="relative flex items-center justify-center">
        {/* Rotating Aura Effect with 108 markers */}
        <div className="absolute w-64 h-64 border-2 border-dashed border-amber-400/40 rounded-full rotating-aura" />
        
        {/* Divine Glowing Ring */}
        <div className="absolute w-56 h-56 border-4 border-amber-500/20 rounded-full animate-pulse" />
        
        {/* Mala Center Display - The Primary Tap Target */}
        <button
          onClick={onTap}
          className="w-48 h-48 rounded-full bg-gradient-to-br from-[#701A07] via-[#8B0000] to-[#5C1405] border-4 border-amber-300 shadow-[0_0_40px_rgba(139,0,0,0.4)] flex flex-col items-center justify-center text-amber-100 cursor-pointer active:scale-90 transition-all duration-150 touch-none"
        >
          <span className="text-5xl font-black drop-shadow-lg">{count}</span>
          <span className="text-xs font-bold opacity-80 uppercase tracking-widest mt-1">/ 108 मनके</span>
          <div className="text-2xl mt-3 animate-bounce-slow">📿</div>
        </button>
      </div>

      <div className="text-center space-y-1">
        <h3 className="font-black text-xl text-amber-950">
          {lang === 'pa' ? 'ਸਤਯਨਾਮ ਸਿਮਰਨ' : lang === 'en' ? 'Satyanaam Simran' : '।। सत्यनाम सुमिरन ।।'}
        </h3>
        <p className="font-bold text-amber-800 bg-amber-100 px-4 py-1 rounded-full border border-amber-200 inline-block shadow-sm">
          {lang === 'pa' ? `ਮਾਲਾ ਗੇੜੇ: ${rounds}` : lang === 'en' ? `Mala Rounds: ${rounds}` : `माला फेरे: ${rounds}`}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-500 hover:text-red-700 hover:border-red-300 transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {lang === 'pa' ? 'ਰੀਸੈੱਟ' : lang === 'en' ? 'Reset' : 'रीसेट'}
        </button>
        
        <button
          onClick={() => {
             import('../utils/audioSynth').then(m => m.playSatyanaamDhun());
             showToast(lang === 'pa' ? 'ਸਤਯਨਾਮ ਧੁਨੀ ਆਰੰਭ' : lang === 'en' ? 'Satyanaam Dhun Started' : 'सत्यनाम ध्वनि प्रारंभ');
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 text-xs font-bold text-amber-800 hover:bg-amber-100 transition cursor-pointer"
        >
          <Volume2 className="w-3.5 h-3.5" />
          {lang === 'pa' ? 'ਧੁਨੀ' : lang === 'en' ? 'Dhun' : 'धून'}
        </button>
      </div>
      
      <p className="text-[10px] text-gray-500 italic max-w-[220px] text-center">
        {lang === 'pa' ? 'ਮਾਲਾ ਉੱਤੇ ਟੈਪ ਕਰੋ। 108 ਪੂਰੇ ਹੋਣ ਤੇ ਵਿਸ਼ੇਸ਼ ਧੁਨੀ ਵੱਜੇਗੀ।' : lang === 'en' ? 'Tap the mala. A sacred dhun will play after 108 beads.' : 'माला पर टैप करें। १०८ पूर्ण होने पर पावन ध्वनि गुंजायमान होगी।'}
      </p>
    </div>
  );
}
