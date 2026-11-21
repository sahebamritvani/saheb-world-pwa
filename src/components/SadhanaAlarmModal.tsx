import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Clock, Sparkles, X, Check, Volume2 } from 'lucide-react';
import { playGentleBell } from '../utils/audioSynth';
import { Language } from '../context/LanguageContext';

interface SadhanaAlarmModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  showToast: (msg: string) => void;
}

export function SadhanaAlarmModal({ isOpen, onClose, lang, showToast }: SadhanaAlarmModalProps) {
  const [amritBelaEnabled, setAmritBelaEnabled] = useState(() => {
    return localStorage.getItem('saheb_alarm_amritbela') === 'true';
  });
  const [amritBelaTime, setAmritBelaTime] = useState(() => {
    return localStorage.getItem('saheb_alarm_amritbela_time') || '05:00';
  });

  const [eveningAartiEnabled, setEveningAartiEnabled] = useState(() => {
    return localStorage.getItem('saheb_alarm_aarti') === 'true';
  });
  const [eveningAartiTime, setEveningAartiTime] = useState(() => {
    return localStorage.getItem('saheb_alarm_aarti_time') || '18:30';
  });

  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if (typeof Notification !== 'undefined') {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (typeof Notification !== 'undefined') {
      const res = await Notification.requestPermission();
      setNotificationPermission(res);
      if (res === 'granted') {
        showToast('🔔 सूचनाएं (Notifications) सफलतापूर्वक सक्रिय हुईं!');
      } else {
        showToast('⚠️ सूचना अनुमति अस्वीकृत। केवल इन-ऐप घंटी अलार्म बजेगा।');
      }
    }
  };

  const handleSaveAmritBela = (enabled: boolean, timeStr: string) => {
    setAmritBelaEnabled(enabled);
    setAmritBelaTime(timeStr);
    localStorage.setItem('saheb_alarm_amritbela', String(enabled));
    localStorage.setItem('saheb_alarm_amritbela_time', timeStr);
    if (enabled) {
      playGentleBell(528);
      showToast(`🌅 प्रातः अमृत बेला अलार्म (${timeStr}) सक्रिय हुआ! 🌹`);
    } else {
      showToast('प्रातः अलार्म बंद किया गया।');
    }
  };

  const handleSaveEveningAarti = (enabled: boolean, timeStr: string) => {
    setEveningAartiEnabled(enabled);
    setEveningAartiTime(timeStr);
    localStorage.setItem('saheb_alarm_aarti', String(enabled));
    localStorage.setItem('saheb_alarm_aarti_time', timeStr);
    if (enabled) {
      playGentleBell(432);
      showToast(`🌇 संध्या आरती अलार्म (${timeStr}) सक्रिय हुआ! 🔔`);
    } else {
      showToast('संध्या अलार्म बंद किया गया।');
    }
  };

  const testAlarmBell = () => {
    playGentleBell(528);
    showToast('🔔 मंगलाचरण पावन घंटी ध्वनि (Test Bell Chime)');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="card w-full max-w-md p-5 md:p-6 rounded-3xl shadow-2xl border-2 border-amber-300 bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#F4ECD8] space-y-5 text-amber-950">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-300/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-amber-700 text-amber-100 flex items-center justify-center shadow-md">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base md:text-lg text-[#8B0000] m-0 flex items-center gap-1.5">
                <span>{lang === 'pa' ? 'ਦੈਨਿਕ ਸਾਧਨਾ ਤੇ ਮੰਗਲਾਚਰਣ ਅਲਾਰਮ' : lang === 'en' ? 'Daily Sadhana & Aarti Alarm' : 'दैनिक साधना व मंगलाचरण अलार्म'}</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </h3>
              <p className="text-[11px] text-amber-800 m-0 font-medium">
                {lang === 'pa' ? 'ਅੰਮ੍ਰਿਤ ਵੇਲਾ ਤੇ ਸੰਧਿਆ ਆਰਤੀ ਸਮੇਂ ਸਤਯਨਾਮ ਸਮਰਨ ਸੁਚਨਾ' : lang === 'en' ? 'Amrit Bela & Aarti Reminders' : 'अमृत बेला एवं संध्या आरती समय सत्यनाम स्मरण'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-amber-900 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Browser Notification Status Card */}
        {notificationPermission !== 'granted' && (
          <div className="p-3.5 rounded-2xl bg-amber-100/90 border border-amber-300 flex items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center gap-2 text-xs text-amber-900 font-medium">
              <BellOff className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{lang === 'pa' ? 'ਸੂਚਨਾ ਇਜਾਜ਼ਤ ਦੀ ਲੋੜ ਹੈ' : lang === 'en' ? 'Enable Web Notifications' : 'ब्राउज़र सूचना अनुमति की आवश्यकता है'}</span>
            </div>
            <button
              onClick={requestNotificationPermission}
              className="px-2.5 py-1 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs shadow-xs active:scale-95 transition cursor-pointer shrink-0"
            >
              अनुमति दें
            </button>
          </div>
        )}

        {/* 1. Morning Amrit Bela Alarm (5:00 AM) */}
        <div className="p-4 rounded-2xl bg-white border border-amber-300 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌅</span>
              <div>
                <h4 className="font-bold text-sm text-[#8B0000] m-0">
                  {lang === 'pa' ? 'ਪ੍ਰਾਤਹ ਅੰਮ੍ਰਿਤ ਵੇਲਾ ਅਲਾਰਮ' : lang === 'en' ? 'Morning Amrit Bela Alarm' : 'प्रातः अमृत बेला अलार्म'}
                </h4>
                <p className="text-[11px] text-gray-600 m-0">
                  {lang === 'pa' ? 'ਸਵੇਰੇ ੫:੦੦ ਵਜੇ ਮੰਗਲਾਚਰਣ ਪਾਠ' : lang === 'en' ? 'Morning 5:00 AM Mangalacharan' : 'प्रातः ५:०० बजे मंगलाचरण व सत्यनाम ध्यान'}
                </p>
              </div>
            </div>

            {/* Toggle switch */}
            <button
              onClick={() => handleSaveAmritBela(!amritBelaEnabled, amritBelaTime)}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                amritBelaEnabled ? 'bg-emerald-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform absolute top-0.5 ${
                  amritBelaEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-amber-100">
            <label className="text-xs font-bold text-amber-900 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>समय (Time):</span>
            </label>
            <input
              type="time"
              value={amritBelaTime}
              onChange={(e) => handleSaveAmritBela(amritBelaEnabled, e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-amber-300 bg-amber-50 text-amber-950 font-mono font-bold text-xs shadow-xs"
            />
          </div>
        </div>

        {/* 2. Evening Aarti Alarm (6:30 PM) */}
        <div className="p-4 rounded-2xl bg-white border border-amber-300 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌇</span>
              <div>
                <h4 className="font-bold text-sm text-[#8B0000] m-0">
                  {lang === 'pa' ? 'ਸੰਧਿਆ ਆਰਤੀ ਤੇ ਸਵਾਧਿਆਇ ਅਲਾਰਮ' : lang === 'en' ? 'Evening Aarti & Swadhyay Alarm' : 'संध्या आरती व स्वाध्याय अलार्म'}
                </h4>
                <p className="text-[11px] text-gray-600 m-0">
                  {lang === 'pa' ? 'ਸ਼ਾਮ ੬:੩੦ ਵਜੇ ਆਰਤੀ ਤੇ ਪਾਵਨ ਪਾਠ' : lang === 'en' ? 'Evening 6:30 PM Aarti & Swadhyay' : 'संध्या ६:३० बजे आरती व पावन स्वाध्याय'}
                </p>
              </div>
            </div>

            {/* Toggle switch */}
            <button
              onClick={() => handleSaveEveningAarti(!eveningAartiEnabled, eveningAartiTime)}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                eveningAartiEnabled ? 'bg-emerald-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform absolute top-0.5 ${
                  eveningAartiEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-amber-100">
            <label className="text-xs font-bold text-amber-900 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>समय (Time):</span>
            </label>
            <input
              type="time"
              value={eveningAartiTime}
              onChange={(e) => handleSaveEveningAarti(eveningAartiEnabled, e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-amber-300 bg-amber-50 text-amber-950 font-mono font-bold text-xs shadow-xs"
            />
          </div>
        </div>

        {/* Test Chime Action */}
        <div className="flex items-center justify-between gap-2 pt-2">
          <button
            onClick={testAlarmBell}
            className="px-3 py-1.5 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold text-xs flex items-center gap-1.5 shadow-xs transition cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-800" />
            <span>पावन घंटी ध्वनि सुनें</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#8B0000] hover:bg-amber-900 text-amber-100 font-bold text-xs shadow transition cursor-pointer"
          >
            सुरक्षित करें
          </button>
        </div>
      </div>
    </div>
  );
}
