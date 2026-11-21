import React, { useState } from 'react';
import { X, Book, Search } from 'lucide-react';
import { Language } from '../context/LanguageContext';

interface KabirGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const GLOSSARY_DATA = [
  { term: "अनहद (Anahad)", definition: { hi: "वह ध्वनि जो बिना किसी चोट या प्रहार के उत्पन्न हो; ब्रह्मांडीय संगीत।", pa: "ਉਹ ਧੁਨੀ ਜੋ ਬਿਨਾਂ ਕਿਸੇ ਸੱਟ ਦੇ ਪੈਦਾ ਹੋਵੇ; ਬ੍ਰਹਮ ਸੰਗੀਤ।", en: "Unstruck sound; cosmic music heard in deep meditation." } },
  { term: "शून्य (Shunya)", definition: { hi: "परम शांति की अवस्था; निर्विकार चैतन्य।", pa: "ਪਰਮ ਸ਼ਾਂਤੀ ਦੀ ਅਵਸਥਾ; ਨਿਰਵਿਕਾਰ ਚੇਤਨਾ।", en: "Void; the state of absolute stillness and divine consciousness." } },
  { term: "उलटबांसी (Ulatbansi)", definition: { hi: "कबीर साहेब की पहेलीनुमा वाणी जो सांसारिक अर्थ के विपरीत आध्यात्मिक सत्य प्रकट करती है।", pa: "ਕਬੀਰ ਸਾਹਿਬ ਦੀਆਂ ਬੁਝਾਰਤਾਂ ਵਰਗੀਆਂ ਬਾਣੀਆਂ।", en: "Paradoxical poetry used by Kabir to reveal hidden spiritual truths." } },
  { term: "हंस (Hans)", definition: { hi: "शुद्ध आत्मा जो नीर-क्षीर (विवेक) की क्षमता रखती है।", pa: "ਸ਼ੁੱਧ ਆਤਮਾ ਜੋ ਸੱਚ ਅਤੇ ਝੂਠ ਦਾ ਨਿਖੇੜਾ ਕਰ ਸਕਦੀ ਹੈ।", en: "Swan; symbol of the pure soul capable of spiritual discernment." } },
  { term: "सत्यनाम (Satnam)", definition: { hi: "परमात्मा का सच्चा और अविनाशी नाम।", pa: "ਪ੍ਰਮਾਤਮਾ ਦਾ ਸੱਚਾ ਅਤੇ ਅਬਿਨਾਸ਼ੀ ਨਾਮ।", en: "The True Name; the eternal and indestructible name of God." } },
  { term: "गगन (Gagan)", definition: { hi: "भीतरी आकाश; सहस्रार चक्र की अवस्था।", pa: "ਅੰਤਰੀਵ ਆਕਾਸ਼; ਉੱਚੀ ਅਧਿਆਤਮਿਕ ਅਵਸਥਾ।", en: "Inner sky; the higher state of consciousness in meditation." } }
];

export function KabirGlossaryModal({ isOpen, onClose, lang }: KabirGlossaryModalProps) {
  const [search, setSearch] = useState('');
  
  if (!isOpen) return null;

  const filtered = GLOSSARY_DATA.filter(item => 
    item.term.toLowerCase().includes(search.toLowerCase()) ||
    item.definition.hi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in zoom-in-95 duration-300">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl border-2 border-amber-300">
        <div className="p-5 border-b border-amber-100 flex justify-between items-center bg-amber-50 rounded-t-3xl">
          <div className="flex items-center gap-2">
            <Book className="w-6 h-6 text-amber-700" />
            <h3 className="font-black text-amber-900">
              {lang === 'pa' ? 'ਬਾਣੀ ਸ਼ਬਦਾਵਲੀ ਕਪਾਟ' : lang === 'en' ? 'Sacred Glossary' : 'वाणी शब्दावली कपाट'}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-amber-100 rounded-full transition">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-4 bg-amber-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-amber-600" />
            <input 
              type="text"
              placeholder={lang === 'pa' ? 'ਖੋਜੋ...' : lang === 'en' ? 'Search terms...' : 'शब्द खोजें...'}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-amber-50 border border-amber-100 hover:border-amber-300 transition-colors">
                <h4 className="font-black text-orange-800 text-base mb-1">{item.term}</h4>
                <p className="text-gray-700 text-sm leading-relaxed m-0">
                  {item.definition[lang] || item.definition.hi}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-10 italic">No terms found matching your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
