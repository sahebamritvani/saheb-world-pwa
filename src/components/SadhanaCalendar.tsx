import React from 'react';
import { Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';
import { Language } from '../context/LanguageContext';
import { SadhanaHistoryDay } from '../utils/sadhanaStorage';

interface SadhanaCalendarProps {
  lang: Language;
  history: SadhanaHistoryDay[];
  dailyGoal: number;
}

export function SadhanaCalendar({ lang, history, dailyGoal }: SadhanaCalendarProps) {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  // Helper to check if a specific day of this month was completed
  const isDayDone = (dayNum: number) => {
    // History is last 7 days usually, but let's see if we can find a match
    // In a real app we'd query full month, here we match current month days from history
    const dateStr = new Date(now.getFullYear(), now.getMonth(), dayNum).toISOString().slice(0, 10);
    // history object keys are 'day' labels (Mon, Tue), we need actual dates
    // For this simple PWA, we'll look for matches in the history array by index or logic
    // But since history is just 7 days, we'll mark those 7 days based on minutes
    const record = history.find(h => {
       // This is a bit tricky as history labels are localized strings.
       // Let's assume history[6] is today, history[5] is yesterday, etc.
       const daysAgo = now.getDate() - dayNum;
       if (daysAgo >= 0 && daysAgo < history.length) {
          const histItem = history[history.length - 1 - daysAgo];
          return histItem && histItem.minutes >= dailyGoal;
       }
       return false;
    });
    return !!record;
  };

  return (
    <div className="p-5 rounded-3xl bg-white border border-amber-200 shadow-xl space-y-4">
      <div className="flex justify-between items-center border-b border-amber-100 pb-3">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-amber-700" />
          <h3 className="font-black text-amber-900">
            {lang === 'pa' ? 'ਸਾਧਨਾ ਪੰਚਾਂਗ' : lang === 'en' ? 'Sadhana Calendar' : 'साधना पंचांग'}
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
          <span className="capitalize">{now.toLocaleString(lang, { month: 'long', year: 'numeric' })}</span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => (
          <div key={`cal-head-${idx}-${d}`} className="text-[10px] font-black text-amber-600 py-1">{d}</div>
        ))}
        
        {blanks.map(b => <div key={`b-${b}`} />)}
        
        {days.map(d => {
          const isToday = d === now.getDate();
          const isDone = isDayDone(d);
          
          return (
            <div 
              key={d} 
              className={`
                h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all relative
                ${isToday ? 'bg-amber-100 text-amber-900 ring-1 ring-amber-400' : 'text-gray-400'}
                ${isDone ? 'text-emerald-700' : ''}
              `}
            >
              {d}
              {isDone && (
                <CheckCircle2 className="absolute -top-1 -right-1 w-3 h-3 text-emerald-500 fill-white" />
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-2 flex items-center justify-between text-[10px] font-medium text-gray-500 italic">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
          <span>{lang === 'pa' ? 'ਸਾਧਨਾ ਪੂਰੀ' : lang === 'en' ? 'Goal Met' : 'साधना लक्ष्य पूर्ण'}</span>
        </div>
        <span>{lang === 'pa' ? 'ਅੱਜ ਦੀ ਤਰੀਕ: ' : lang === 'en' ? 'Today: ' : 'आज: '}{now.toLocaleDateString(lang)}</span>
      </div>
    </div>
  );
}
