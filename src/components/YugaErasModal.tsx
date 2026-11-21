import React, { useState } from 'react';
import { Clock, Sparkles, X, ChevronRight, ShieldCheck, Bookmark } from 'lucide-react';
import { Language } from '../context/LanguageContext';

interface YugaErasModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const YUGAS = [
  {
    id: 'satya',
    yugaHi: 'सत्ययुग (कृतयुग)',
    yugaPa: 'ਸਤਿਜੁਗ (ਕ੍ਰਿਤਜੁਗ)',
    yugaEn: 'Sat Yuga (Krita Yuga)',
    avatarHi: 'सद्गुरु सुकृत साहेब',
    avatarPa: 'ਸਤਿਗੁਰੂ ਸੁਕ੍ਰਿਤ ਸਾਹਿਬ',
    avatarEn: 'Satguru Sukrit Saheb',
    discipleHi: 'राजा सत्यकेतु',
    disciplePa: 'ਰਾਜਾ ਸਤਿਕੇਤੂ',
    discipleEn: 'King Satyaketu',
    symbol: '🌸',
    color: 'from-amber-500 to-orange-600',
    descHi: 'सत्ययुग में कबीर साहेब "सुकृत साहेब" नाम से अवतरित हुए। उन्होंने राजा सत्यकेतु को अमरलोक एवं सत्यनाम का उपदेश प्रदान किया। सत्ययुग में केवल सत्य और पवित्रता का साम्राज्य था।',
    descPa: 'ਸਤਿਜੁਗ ਵਿੱਚ ਕਬੀਰ ਸਾਹਿਬ "ਸੁਕ੍ਰਿਤ ਸਾਹਿਬ" ਨਾਮ ਨਾਲ ਪ੍ਰਗਟ ਹੋਏ ਅਤੇ ਰਾਜਾ ਸਤਿਕੇਤੂ ਨੂੰ ਸਤਯਨਾਮ ਦਾ ਉਪਦੇਸ਼ ਦਿੱਤਾ।',
    descEn: 'In Sat Yuga, Kabir Saheb manifested as "Sukrit Saheb", imparting the eternal Satnam message to King Satyaketu.'
  },
  {
    id: 'treta',
    yugaHi: 'त्रेतायुग',
    yugaPa: 'ਤ੍ਰੇਤਾਜੁਗ',
    yugaEn: 'Treta Yuga',
    avatarHi: 'सद्गुरु मुनिंद्र साहेब',
    avatarPa: 'ਸਤਿਗੁਰੂ ਮੁਨਿੰਦ੍ਰ ਸਾਹਿਬ',
    avatarEn: 'Satguru Munindra Saheb',
    discipleHi: 'भक्त विभीषण, मंदोदरी व राजा जनक',
    disciplePa: 'ਭਗਤ ਵਿਭੀਸ਼ਣ, ਮੰਦੋਦਰੀ ਤੇ ਰਾਜਾ ਜਨਕ',
    discipleEn: 'Vibhishana, Mandodari & King Janak',
    symbol: '🌿',
    color: 'from-[#8B0000] to-amber-700',
    descHi: 'त्रेतायुग में साहेब "मुनिंद्र साहेब" नाम से पधारे। लंकापति विभीषण, महारानी मंदोदरी तथा विदेह राजा जनक को ब्रह्म ज्ञान और आत्म-शुद्धि का अमर पथ दिखाया।',
    descPa: 'ਤ੍ਰੇਤਾਜੁਗ ਵਿੱਚ ਸਾਹਿਬ "ਮੁਨਿੰਦ੍ਰ ਸਾਹਿਬ" ਨਾਮ ਨਾਲ ਆਏ ਅਤੇ ਭਗਤ ਵਿਭੀਸ਼ਣ, ਮੰਦੋਦਰੀ ਤੇ ਰਾਜਾ ਜਨਕ ਨੂੰ ਆਤਮ-ਗਿਆਨ ਦਿੱਤਾ।',
    descEn: 'In Treta Yuga, Saheb appeared as "Munindra Saheb", blessing Vibhishana, Mandodari, and King Janaka with supreme knowledge.'
  },
  {
    id: 'dvapara',
    yugaHi: 'द्वापरयुग',
    yugaPa: 'ਦੁਆਪਰਜੁਗ',
    yugaEn: 'Dvapara Yuga',
    avatarHi: 'सद्गुरु करुणामाय साਹਿਬ',
    avatarPa: 'ਸਤਿਗੁਰੂ ਕਰੁਣਾਮਯ ਸਾਹਿਬ',
    avatarEn: 'Satguru Karunamaya Saheb',
    discipleHi: 'धर्मराज युधिष्ठिर व पांडव',
    disciplePa: 'ਧਰਮਰਾਜ ਯੁਧਿਸ਼ਠਿਰ ਤੇ ਪਾਂਡਵ',
    discipleEn: 'King Yudhishthira & Pandavas',
    symbol: '🌺',
    color: 'from-orange-700 to-amber-800',
    descHi: 'द्वापरयुग में साहेब "करुणामाय साहेब" नाम से अवतरित हुए। सम्राट युधिष्ठिर के राजसूय यज्ञ में उपस्थित होकर जीव-दया और अद्वैत भक्ति का संदेश दिया।',
    descPa: 'ਦੁਆਪਰਜੁਗ ਵਿੱਚ ਸਾਹਿਬ "ਕਰੁਣਾਮਯ ਸਾਹਿਬ" ਨਾਮ ਨਾਲ ਪ੍ਰਗਟ ਹੋਏ ਅਤੇ ਯੁਧਿਸ਼ਠਿਰ ਦੇ ਰਾਜਸੂਯ ਯੱਗ ਵਿੱਚ ਹਾਜ਼ਰ ਰਹੇ।',
    descEn: 'In Dvapara Yuga, Saheb manifested as "Karunamaya Saheb", gracing King Yudhishthira\'s Rajasuya ceremony.'
  },
  {
    id: 'kali',
    yugaHi: 'कलियुग',
    yugaPa: 'ਕਲਿਜੁਗ',
    yugaEn: 'Kali Yuga',
    avatarHi: 'सद्गुरु कबीर साहेब',
    avatarPa: 'ਸਤਿਗੁਰੂ ਕਬੀਰ ਸਾਹਿਬ',
    avatarEn: 'Satguru Kabir Saheb',
    discipleHi: 'संत धर्मदास जी व संपूर्ण मानव जाति',
    disciplePa: 'ਸੰਤ ਧਰਮਦਾਸ ਜੀ ਤੇ ਸਮੁੱਚੀ ਮਾਨਵਤਾ',
    discipleEn: 'Sant Dharmadas Ji & Humanity',
    symbol: '🌹',
    color: 'from-[#8B0000] to-rose-900',
    descHi: 'कलियुग में संवत १४५५ में लहरतारा कमल पुष्प पर सद्गुरु "कबीर साहेब" नाम से अवतरित हुए। काशी में बीजक, साखी, सबद और अनुराग सागर के माध्यम से अमरापुर का मार्ग प्रशस्त किया।',
    descPa: 'ਕਲਿਜੁਗ ਵਿੱਚ ਸੰਵਤ ੧੪੫੫ ਵਿੱਚ ਲਹਿਰਤਾਰਾ ਕਮਲ \'ਤੇ ਸਾਹਿਬ "ਕਬੀਰ" ਨਾਮ ਨਾਲ ਸਮੁੱਚੇ ਜਗਤ ਦੇ ਉੱਧਾਰ ਹਿੱਤ ਪ੍ਰਗਟ ਹੋਏ।',
    descEn: 'In Kali Yuga, in Samvat 1455, Saheb manifested on the Lahartara lotus flower as "Kabir Saheb" for universal soul liberation.'
  }
];

export function YugaErasModal({ isOpen, onClose, lang }: YugaErasModalProps) {
  const [activeYugaIdx, setActiveYugaIdx] = useState(3); // Default Kali Yuga

  if (!isOpen) return null;

  const activeYuga = YUGAS[activeYugaIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="card w-full max-w-xl p-5 md:p-6 rounded-3xl shadow-2xl border-2 border-amber-300 bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#F4ECD8] space-y-5 text-amber-950">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-300/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-amber-700 text-amber-100 flex items-center justify-center shadow-md">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base md:text-lg text-[#8B0000] m-0 flex items-center gap-1.5">
                <span>{lang === 'pa' ? 'ਚਾਰ ਜੁਗਾਂ ਵਿੱਚ ਸਤਿਗੁਰੂ ਦਾ ਪਾਵਨ ਅਵਤਾਰ' : lang === 'en' ? 'Advent across 4 Yugas (Eras)' : 'चार युगों में सद्गुरु कबीर साहेब का अवतरण'}</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </h3>
              <p className="text-[11px] text-amber-800 m-0 font-medium">
                {lang === 'pa' ? 'ਸਤਿਜੁਗ, ਤ੍ਰੇਤਾ, ਦੁਆਪਰ ਤੇ ਕਲਿਜੁਗ ਇਤਿਹਾਸ' : lang === 'en' ? 'Satya, Treta, Dvapara & Kali Yugas' : 'सत्ययुग, त्रेतायुग, द्वापरयुग व कलियुग पावन चरित्र'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:text-amber-900 transition cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Yuga Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-2xl bg-amber-200/60 border border-amber-300">
          {YUGAS.map((y, idx) => (
            <button
              key={y.id}
              onClick={() => setActiveYugaIdx(idx)}
              className={`py-2 px-1 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                activeYugaIdx === idx
                  ? 'bg-[#8B0000] text-amber-100 shadow-md ring-1 ring-amber-400'
                  : 'bg-white/70 text-amber-950 hover:bg-white'
              }`}
            >
              <span>{y.symbol}</span>
              <span className="truncate">{y.id === 'satya' ? 'सत्ययुग' : y.id === 'treta' ? 'त्रेता' : y.id === 'dvapara' ? 'द्वापर' : 'कलियुग'}</span>
            </button>
          ))}
        </div>

        {/* Active Yuga Details Hero Card */}
        <div className="p-5 rounded-2xl bg-white border-2 border-amber-300 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-amber-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{activeYuga.symbol}</span>
              <div>
                <h4 className="font-extrabold text-lg text-[#8B0000] m-0">
                  {lang === 'pa' ? activeYuga.yugaPa : lang === 'en' ? activeYuga.yugaEn : activeYuga.yugaHi}
                </h4>
                <p className="text-xs font-bold text-amber-800 m-0">
                  {lang === 'pa' ? activeYuga.avatarPa : lang === 'en' ? activeYuga.avatarEn : activeYuga.avatarHi}
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-[11px] font-bold text-amber-950">
              युग #{activeYugaIdx + 1}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>{lang === 'pa' ? 'ਮੁੱਖ ਸਿੱਖ (Devotee Initiated):' : lang === 'en' ? 'Key Devotee Initiated:' : 'मुख्य शिष्य व अधिकारी हंस:'}</span>
              <span className="text-orange-700 font-extrabold">
                {lang === 'pa' ? activeYuga.disciplePa : lang === 'en' ? activeYuga.discipleEn : activeYuga.discipleHi}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-gray-800 italic pt-2 border-t border-amber-100 m-0">
              "{lang === 'pa' ? activeYuga.descPa : lang === 'en' ? activeYuga.descEn : activeYuga.descHi}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
