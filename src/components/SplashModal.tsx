import React from 'react';
import { X } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { playGentleBell } from '../utils/audioSynth';
import { startRosePetalVarsha } from '../utils/rosePetalCanvas';

interface SplashModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Locked Language Dataset matching user specifications exactly
const langData: Record<Language, {
  mainTitle: string;
  circleText: string;
  subTitle: string;
  tagline: string;
  greeting: string;
  btnText: string;
}> = {
  hi: {
    mainTitle: "।। सत्यनाम ।।",
    circleText: "।। सत्यनाम ।। 🌹 ।। सत्यनाम ।। 🌹 ।। सत्यनाम ।। 🌹 ।। सत्यनाम ।। 🌹 ।। सत्यनाम ।। 🌹 ।। सत्यनाम ।। 🌹",
    subTitle: "बंदीछोड़ सतगुरु कबीर साहेब",
    tagline: "पावन आत्म-ज्ञान एवं स्वाध्याय",
    greeting: "।। साहेब बंदगी साहेब ।।",
    btnText: "पावन पुस्तकालय में प्रवेश करें"
  },
  pa: {
    mainTitle: "।। ਸਤਯਨਾਮ ।।",
    circleText: "।। ਸਤਯਨਾਮ ।। 🌹 ।। ਸਤਯਨਾਮ ।। 🌹 ।। ਸਤਯਨਾਮ ।। 🌹 ।। ਸਤਯਨਾਮ ।। 🌹 ।। ਸਤਯਨਾਮ ।। 🌹 ।। ਸਤਯਨਾਮ ।। 🌹",
    subTitle: "ਬੰਦੀਛੋੜ ਸਤਿਗੁਰੂ ਕਬੀਰ ਸਾਹੇਬ",
    tagline: "ਪਾਵਨ ਆਤਮ-ਗਿਆਨ ਅਤੇ ਸਵਾਧਿਆਇ",
    greeting: "।। ਸਾਹੇਬ ਬੰਦਗੀ ਸਾਹੇਬ ।।",
    btnText: "ਪਾਵਨ ਗ੍ਰੰਥਾਲਯ ਵਿੱਚ ਪ੍ਰਵੇਸ਼ ਕਰੋ"
  },
  en: {
    mainTitle: "|| Satyanaam ||", // Updated from Hindi script to English script
    circleText: "|| Satyanaam || 🌹 || Satyanaam || 🌹 || Satyanaam || 🌹 || Satyanaam || 🌹 || Satyanaam || 🌹 || Satyanaam || 🌹",
    subTitle: "Bandichhod Satguru Kabir Saheb",
    tagline: "Sacred Self-Realization & Contemplation",
    greeting: "|| Saheb Bandagi Saheb ||",
    btnText: "Enter Sacred Library"
  }
};

export const SplashModal: React.FC<SplashModalProps> = ({ isOpen, onClose }) => {
  const { lang, setLang } = useLanguage();

  if (!isOpen) return null;

  const current = langData[lang];

  const handleEnter = () => {
    playGentleBell(528);
    startRosePetalVarsha(4000);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#7A5C13]/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto select-none">
      {/* 9:16 Mobile Frame with Rounded Corners */}
      <div 
        className="phone-container relative w-full max-w-[410px] min-h-[640px] max-h-[94vh] bg-[#FFFDF7] rounded-[48px] shadow-2xl flex flex-col items-center justify-between p-4 sm:p-6 my-auto overflow-hidden"
        style={{
          border: '20px solid #7A5C13',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playGentleBell(432);
            onClose();
          }}
          className="absolute top-3.5 right-3.5 text-[#7A5C13]/70 hover:text-[#800000] p-1.5 rounded-full hover:bg-amber-100/60 transition cursor-pointer z-30"
          title="Close"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Section */}
        <div className="w-full flex flex-col items-center pt-1 z-10">
          {/* Language Switcher Tabs */}
          <div 
            className="language-tabs flex items-center justify-between w-[85%] max-w-[310px] p-1 mb-4 rounded-[30px] border border-[#E6D5B8]"
            style={{
              background: '#FFFBF0',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
            }}
          >
            <button
              type="button"
              onClick={() => setLang('hi')}
              className={`flex-1 py-2 text-sm sm:text-[15px] font-semibold rounded-[25px] transition-all cursor-pointer border-none ${
                lang === 'hi'
                  ? 'bg-[#800000] text-white shadow-[0_4px_10px_rgba(128,0,0,0.2)]'
                  : 'bg-transparent text-[#555] hover:text-[#800000]'
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => setLang('pa')}
              className={`flex-1 py-2 text-sm sm:text-[15px] font-semibold rounded-[25px] transition-all cursor-pointer border-none ${
                lang === 'pa'
                  ? 'bg-[#800000] text-white shadow-[0_4px_10px_rgba(128,0,0,0.2)]'
                  : 'bg-transparent text-[#555] hover:text-[#800000]'
              }`}
            >
              ਪੰਜਾਬੀ
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`flex-1 py-2 text-sm sm:text-[15px] font-semibold rounded-[25px] transition-all cursor-pointer border-none ${
                lang === 'en'
                  ? 'bg-[#800000] text-white shadow-[0_4px_10px_rgba(128,0,0,0.2)]'
                  : 'bg-transparent text-[#555] hover:text-[#800000]'
              }`}
            >
              English
            </button>
          </div>

          {/* Main Header Text with Roses - Perfectly Centered */}
          <div className="header-title-container flex items-center justify-center gap-3 w-full mb-2 text-center">
            <span className="rose-icon text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] select-none">🌹</span>
            <div className="main-title text-2xl sm:text-[28px] font-bold text-[#800000] tracking-wide font-serif text-center">
              {current.mainTitle}
            </div>
            <span className="rose-icon text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] select-none">🌹</span>
          </div>
        </div>

        {/* Center Emblem Area (290px x 290px with Dotted Circle, 1:1 SVG TextPath & Portrait) */}
        <div className="emblem-outer-container relative w-[275px] h-[275px] sm:w-[290px] sm:h-[290px] flex items-center justify-center my-auto">
          {/* Rotating Halo & 1:1 SVG Text Path */}
          <div className="absolute inset-0 w-full h-full animate-spin-slow pointer-events-none">
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 300 300"
              style={{ transform: 'rotate(-90deg)' }}
            >
              <defs>
                {/* Outer Decorative Dotted Ring */}
                <circle 
                  id="dottedCircle" 
                  cx="150" 
                  cy="150" 
                  r="134" 
                  stroke="#E6A123" 
                  strokeWidth="2" 
                  strokeDasharray="4,6" 
                  fill="none" 
                />
                {/* 1:1 Continuous Circular Path */}
                <path 
                  id="textPathLink" 
                  d="M 150,150 m -112,0 a 112,112 0 1,1 224,0 a 112,112 0 1,1 -224,0" 
                  fill="none"
                />
              </defs>
              <use href="#dottedCircle" />
              <text 
                fill="#800000" 
                fontSize="11.2" 
                fontWeight="bold" 
                style={{ 
                  fontFamily: lang === 'pa' 
                    ? "'Mukta Mahee', 'Noto Sans Gurmukhi', sans-serif" 
                    : lang === 'en'
                    ? "'Helvetica Neue', Arial, sans-serif"
                    : "'Noto Serif', serif, sans-serif"
                }}
              >
                <textPath 
                  id="rotatedText" 
                  href="#textPathLink" 
                  startOffset="0%"
                  textLength="700"
                  lengthAdjust="spacing"
                >
                  {current.circleText}
                </textPath>
              </text>
            </svg>
          </div>

          {/* Center Portrait Wrapper */}
          <div 
            className="center-portrait-wrapper relative z-[2] w-[155px] h-[155px] sm:w-[170px] sm:h-[170px] rounded-full overflow-hidden flex items-center justify-center bg-white"
            style={{
              border: '4px solid #E6A123',
              boxShadow: '0 8px 20px rgba(230,161,35,0.2)',
            }}
          >
            <img 
              src="/icons/kabir-swaroop.png" 
              alt="Satguru Kabir Saheb"
              className="w-[105%] h-[105%] object-cover object-center"
            />
          </div>
        </div>

        {/* Content Text Layout */}
        <div className="content-section text-center flex flex-col items-center w-full px-2 pb-1 z-10">
          <h1 className="sub-title text-xl sm:text-[22px] font-bold text-[#800000] mb-1.5 leading-snug">
            {current.subTitle}
          </h1>
          <p className="tagline text-xs sm:text-sm text-[#B3862B] font-medium mb-3 sm:mb-4 leading-normal">
            {current.tagline}
          </p>
          <div className="greeting text-base sm:text-[17px] font-semibold text-[#333333] mb-4 sm:mb-5 flex items-center justify-center gap-1.5">
            <span>{current.greeting}</span> 🙏
          </div>
          
          <button 
            onClick={handleEnter}
            className="action-button w-[90%] text-white border-none py-3.5 px-5 text-sm sm:text-base font-semibold rounded-[30px] shadow-[0_6px_15px_rgba(128,0,0,0.3)] flex items-center justify-center gap-2.5 transition-transform active:scale-98 cursor-pointer hover:brightness-110"
            style={{
              background: 'linear-gradient(135deg, #660000 0%, #800000 100%)',
            }}
          >
            📖 <span>{current.btnText}</span> ➔
          </button>
        </div>
      </div>
    </div>
  );
};
