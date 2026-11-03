import React from 'react';

interface MaryadaScreenProps {
  onComplete: () => void;
}

export const MaryadaScreen: React.FC<MaryadaScreenProps> = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 z-[10000] bg-[#F4ECD8] overflow-y-auto p-4 sm:p-6 text-[#2C1E11]">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <header className="text-center pt-4 pb-2 border-b border-[#D2B48C]">
          <h1 className="text-xl sm:text-2xl font-black text-[#8B0000]">🌹 ।।सत्यनाम।। 🌹</h1>
          <h2 className="text-sm font-bold text-[#5D4037] mt-1">पावन वाणी पाठ मर्यादा एवं स्मरण</h2>
        </header>

        {/* Main Instruction */}
        <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#D2B48C] shadow-sm text-center">
          <p className="text-lg font-bold text-[#8B0000]">
            कृपया सिर ढक कर, चरण धोकर और पवित्र मन से पाठ शुरू करें।
          </p>
        </div>

        {/* 3 Rules */}
        <section className="space-y-3">
          <h3 className="font-bold text-[#5D4037] border-l-4 border-[#8B0000] pl-3">मुख्य मर्यादा नियम:</h3>
          <ul className="space-y-2 text-sm font-medium">
            <li className="bg-amber-100/50 p-3 rounded-xl border border-[#D2B48C]">✅ <strong>शीश ढकें (Cover Your Head)</strong> — पावन ग्रन्थ के सम्मान में।</li>
            <li className="bg-amber-100/50 p-3 rounded-xl border border-[#D2B48C]">✅ <strong>हस्त एवं चरण शुद्धि (Cleanliness)</strong> — पवित्रता का प्रथम सोपान।</li>
            <li className="bg-amber-100/50 p-3 rounded-xl border border-[#D2B48C]">✅ <strong>शांत व एकाग्र मन (Pure Devotion)</strong> — ध्यानस्थ भाव।</li>
          </ul>
        </section>

        {/* Kabir Panth Maryada */}
        <section className="space-y-3">
          <h3 className="font-bold text-[#5D4037] border-l-4 border-[#8B0000] pl-3">कबीर पंथ मर्यादा एवं ध्यान श्लोक:</h3>
          <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#D2B48C] space-y-4 text-center">
            <p className="font-bold text-[#2C1E11] italic text-sm sm:text-base leading-relaxed">
              ध्यायतं सद्गुरु कबीरं, सर्व-व्यापकं परमेश्वरं।<br/>
              सत-नाम का ध्यान धरूँ, दु:ख-हरणं सुख-सागरं॥
            </p>
            <p className="font-bold text-[#2C1E11] italic text-sm sm:text-base leading-relaxed">
              ध्यान मूलम् गुरु मूर्ति, पूजा मूलम् गुरु पदम्।<br/>
              मंत्र मूलम् गुरु वाक्यं, मोक्ष मूलम् गुरु कृपा॥
            </p>
          </div>
        </section>

        {/* CTA Button */}
        <button 
          onClick={onComplete}
          className="w-full bg-[#701A07] text-white py-4 sm:py-5 rounded-3xl font-black text-lg shadow-xl hover:bg-red-950 transition-all border-4 border-amber-400/50"
        >
          ।। साहेब बंदगी साहेब ।। 🙏<br/>
          <span className="text-sm font-bold">(मर्यादा स्वीकार है)</span>
        </button>

        {/* Footer */}
        <footer className="text-center text-[11px] font-bold text-[#9A7D46] pt-4 pb-8">
          100% विज्ञापन-मुक्त (Strictly Ads-Free) | पूर्णतः ऑफलाइन (100% Offline)
        </footer>
      </div>
    </div>
  );
};
