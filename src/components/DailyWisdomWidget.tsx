import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Language } from '../context/LanguageContext';
import { DAILY_SAKHIS } from '../data/dailySakhis';

interface DailyWisdomWidgetProps {
  lang: Language;
}

export function DailyWisdomWidget({ lang }: DailyWisdomWidgetProps) {
  const [wisdom, setWisdom] = useState(() => {
    const today = new Date().toISOString().slice(0, 10);
    const stored = localStorage.getItem(`saheb_wisdom_${today}`);
    if (stored) return JSON.parse(stored);
    return getRandomWisdom();
  });

  function getRandomWisdom() {
    const randomIndex = Math.floor(Math.random() * DAILY_SAKHIS.length);
    const item = DAILY_SAKHIS[randomIndex];
    return {
      title: lang === 'pa' ? item.topicPa : lang === 'en' ? item.topicEn : item.topicHi,
      couplet: lang === 'pa' ? item.coupletPa : lang === 'en' ? item.coupletEn : item.coupletHi,
      bhavarth: lang === 'pa' ? item.bhavarthPa : lang === 'en' ? item.bhavarthEn : item.bhavarthHi
    };
  }

  const refreshWisdom = () => {
    setWisdom(getRandomWisdom());
  };

  return (
    <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-lg mb-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-3 opacity-20">
        <Sparkles className="w-20 h-20 text-amber-700" />
      </div>
      
      <div className="relative z-10 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-extrabold text-sm text-[#8B0000] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            {lang === 'pa' ? 'ਅੱਜ ਦਾ ਪਾਵਨ ਵਚਨ' : lang === 'en' ? 'Today\'s Sacred Wisdom' : 'आज का पावन अमृत वचन'}
          </h3>
          <button onClick={refreshWisdom} className="p-1.5 rounded-full hover:bg-amber-100 text-amber-700 transition cursor-pointer">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-sm font-bold text-gray-900 leading-snug italic">"{wisdom.couplet}"</p>
        <p className="text-xs text-amber-900 leading-relaxed opacity-90">{wisdom.bhavarth}</p>
      </div>
    </div>
  );
}
