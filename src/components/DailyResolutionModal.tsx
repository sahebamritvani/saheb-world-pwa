import React, { useState } from 'react';
import { Sparkles, Heart, CheckCircle2, Send, X, ShieldCheck } from 'lucide-react';
import { Language } from '../context/LanguageContext';

interface DailyResolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  showToast: (msg: string) => void;
}

const RESOLUTIONS = [
  { day: 'सोमवार', textHi: "आज किसी भी परिस्थिति में क्रोध एवं अहंकार प्रकट नहीं करूँगा।", textPa: "ਅੱਜ ਕਿਸੇ ਵੀ ਸਥਿਤੀ ਵਿੱਚ ਕ੍ਰੋਧ ਅਤੇ ਅਹੰਕਾਰ ਪ੍ਰਗਟ ਨਹੀਂ ਕਰਾਂਗਾ।", textEn: "Today, under all circumstances, I will restrain anger and pride." },
  { day: 'मंगलवार', textHi: "आज प्रत्येक जीव के प्रति दया, करुणा एवं अहिंसा का पालन करूँगा।", textPa: "ਅੱਜ ਹਰ ਜੀਵ ਪ੍ਰਤੀ ਦਇਆ, ਕਰੁਣਾ ਅਤੇ ਅਹਿੰਸਾ ਦਾ ਪਾਲਣ ਕਰਾਂਗਾ।", textEn: "Today, I will practice compassion and non-violence toward all living beings." },
  { day: 'बुधवार', textHi: "आज मेरी वाणी में केवल सत्य, मधुर एवं निर्मल शब्द ही प्रस्फुटित होंगे।", textPa: "ਅੱਜ ਮੇਰੀ ਬਾਣੀ ਵਿੱਚ ਕੇਵਲ ਸਤਿ, ਮਿੱਠੇ ਅਤੇ ਨਿਰਮਲ ਸ਼ਬਦ ਹੀ ਹੋਣਗੇ।", textEn: "Today, my speech will reflect only truth, sweetness, and purity." },
  { day: 'गुरुवार', textHi: "आज सद्गुरु चरणों में पूर्ण समर्पण, वैराग्य व निष्काम सेवा का संकल्प है।", textPa: "ਅੱਜ ਸਤਿਗੁਰੂ ਚਰਨਾਂ ਵਿੱਚ ਪੂਰਨ ਸਮਰਪਣ ਅਤੇ ਨਿਸ਼ਕਾਮ ਸੇਵਾ ਦਾ ਸੰਕਲਪ ਹੈ।", textEn: "Today, I resolve full dedication and selfless service to Satguru." },
  { day: 'शुक्रवार', textHi: "आज निंदा, पर-छिद्रान्वेषण व असत्य चिंतन से सर्वथा दूर रहूँगा।", textPa: "ਅੱਜ ਨਿੰਦਿਆ, ਚੁਗਲੀ ਅਤੇ ਅਸਤਿ ਚਿੰਤਨ ਤੋਂ ਦੂਰ ਰਹਾਂਗਾ।", textEn: "Today, I will stay completely away from gossip, criticism, and negativity." },
  { day: 'शनिवार', textHi: "आज अपनी गाढ़ी कमाई का एक अंश परोपकार व साधु-सेवा में समर्पित करूँगा।", textPa: "ਅੱਜ ਆਪਣੀ ਕਮਾਈ ਦਾ ਇੱਕ ਹਿੱਸਾ ਪਰਉਪਕਾਰ ਅਤੇ ਸੇਵਾ ਵਿੱਚ ਦੇਵਾਂਗਾ।", textEn: "Today, I will share a portion of my earnings in selfless service and charity." },
  { day: 'रविवार', textHi: "आज ३० मिनट मौन रहकर अनहद नाद व सत्यनाम सुमिरन ध्यान करूँगा।", textPa: "ਅੱਜ ੩੦ ਮਿੰਟ ਮੌਨ ਰਹਿ ਕੇ ਅਨਹਦ ਨਾਦ ਅਤੇ ਸਤਯਨਾਮ ਧਿਆਨ ਕਰਾਂਗਾ।", textEn: "Today, I will practice 30 minutes of silent Anahad Naad meditation." }
];

export function DailyResolutionModal({ isOpen, onClose, lang, showToast }: DailyResolutionModalProps) {
  const dayIdx = new Date().getDay(); // 0 = Sunday
  const res = RESOLUTIONS[dayIdx === 0 ? 6 : dayIdx - 1];

  const [completedToday, setCompletedToday] = useState(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    return localStorage.getItem(`saheb_res_complete_${todayStr}`) === 'true';
  });

  const [prayerText, setPrayerText] = useState('');
  const [prayersList, setPrayersList] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('saheb_user_prayers');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleToggleComplete = () => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const nextState = !completedToday;
    setCompletedToday(nextState);
    localStorage.setItem(`saheb_res_complete_${todayStr}`, String(nextState));

    if (nextState) {
      showToast('🌹 आज का पावन संकल्प पूर्ण अंकित किया गया! साधुवाद! 🙏');
    }
  };

  const handleSubmitPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerText.trim()) return;
    const updated = [prayerText.trim(), ...prayersList];
    setPrayersList(updated);
    localStorage.setItem('saheb_user_prayers', JSON.stringify(updated));
    setPrayerText('');
    showToast('🙏 आपकी पावन प्रार्थना सतगुरु चरणों में सहेजी गई!');
  };

  if (!isOpen) return null;

  const resolutionText = lang === 'pa' ? res.textPa : lang === 'en' ? res.textEn : res.textHi;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="card w-full max-w-lg p-5 md:p-6 rounded-3xl shadow-2xl border-2 border-amber-300 bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#F4ECD8] space-y-5 text-amber-950">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-300/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-md">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-extrabold text-base md:text-lg text-[#8B0000] m-0 flex items-center gap-1.5">
                <span>{lang === 'pa' ? 'ਹੰਸ-ਜਨ ਦੈਨਿਕ ਸੰਕਲਪ ਤੇ ਅਰਦਾਸ' : lang === 'en' ? 'Daily Spiritual Resolution & Prayer' : 'हंस-जन दैनिक संकल्प व प्रार्थना कपाट'}</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </h3>
              <p className="text-[11px] text-amber-800 m-0 font-medium">
                {lang === 'pa' ? 'ਆਤਮ-ਸ਼ੁੱਧੀ ਸੰਕਲਪ ਅਤੇ ਸਤਿਗੁਰੂ ਅਰਦਾਸ' : lang === 'en' ? 'Inner Purification & Sacred Vow' : 'आत्म-शुद्धि हेतु आज का पावन व्रत व संकल्प'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:text-amber-900 transition cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Today's Sacred Resolution Card */}
        <div className="p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-300 shadow-md space-y-4 text-center">
          <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-950 text-xs font-bold border border-amber-300">
            {res.day} का पावन संकल्प
          </span>
          <p className="text-base md:text-lg font-bold text-[#701A07] italic leading-relaxed m-0">
            "{resolutionText}"
          </p>

          <button
            onClick={handleToggleComplete}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition shadow cursor-pointer active:scale-95 ${
              completedToday
                ? 'bg-emerald-700 text-white shadow-emerald-200 border border-emerald-500'
                : 'bg-amber-700 hover:bg-amber-800 text-amber-100'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{completedToday ? '✓ आज का संकल्प पूर्ण हुआ (Blessed!)' : 'आज का संकल्प अंकित करें'}</span>
          </button>
        </div>

        {/* Personal Prayer Request Box */}
        <div className="space-y-3 pt-1">
          <h4 className="font-bold text-xs md:text-sm text-amber-900 m-0 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>{lang === 'pa' ? 'ਸਤਿਗੁਰੂ ਚਰਨਾਂ ਵਿੱਚ ਨਿੱਜੀ ਅਰਦਾਸ:' : lang === 'en' ? 'Personal Sacred Prayer:' : 'सद्गुरु चरणों में हंस-जन प्रार्थना:'}</span>
          </h4>

          <form onSubmit={handleSubmitPrayer} className="space-y-2">
            <textarea
              value={prayerText}
              onChange={(e) => setPrayerText(e.target.value)}
              placeholder={lang === 'pa' ? "ਆਪਣੀ ਪਾਵਨ ਮਨੋਕਾਮਨਾ ਜਾਂ ਅਰਦਾਸ ਲਿਖੋ..." : lang === 'en' ? "Write your humble prayer..." : "अपनी पावन मनोकामना अथवा प्रार्थना लिखें..."}
              rows={2}
              className="w-full p-3 rounded-xl border border-amber-300 bg-white text-xs md:text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none shadow-xs"
            />
            <button
              type="submit"
              disabled={!prayerText.trim()}
              className="w-full py-2 bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>प्रार्थना सहेजें</span>
            </button>
          </form>

          {prayersList.length > 0 && (
            <div className="max-h-28 overflow-y-auto space-y-1.5 pt-2 border-t border-amber-200">
              {prayersList.slice(0, 3).map((p, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-amber-100/60 border border-amber-200/60 text-xs italic text-amber-950 truncate">
                  " {p} "
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
