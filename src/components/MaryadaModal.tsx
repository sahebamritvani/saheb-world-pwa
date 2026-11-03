import React from 'react';

interface MaryadaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MaryadaModal: React.FC<MaryadaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#FDFBF7] border-2 border-[#D4AF37] rounded-2xl p-6 shadow-2xl max-h-[80vh] overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <header className="text-center pb-2 border-b border-[#D4AF37]/50">
            <h1 className="text-xl sm:text-2xl font-black text-[#8B0000]">🌹 ।।सत्यनाम।। 🌹</h1>
            <h2 className="text-sm font-bold text-[#5D4037] mt-1">पावन वाणी पाठ मर्यादा एवं स्मरण</h2>
          </header>

          {/* Main Instruction */}
          <div className="p-4 rounded-xl border border-[#D4AF37] bg-amber-50 text-center">
            <p className="text-base font-bold text-[#8B0000]">
              सतगुरु कबीर साहेब की वाणी की सर्वोच्च पवित्रता बनाए रखने हेतु विनम्र प्रार्थना
            </p>
            <p className="text-sm font-bold text-[#5D4037] mt-2 italic">
              "कृपया सिर ढक कर, चरण धोकर और पवित्र मन से पाठ शुरू करें।"
            </p>
          </div>

          {/* Rules */}
          <section className="space-y-2">
            <ul className="space-y-2 text-sm font-medium text-[#2C1E11]">
              <li>🧣 <strong>शीश ढकें:</strong> रुमाल/वस्त्र धारण करें।</li>
              <li>🧼 <strong>हस्त एवं चरण शुद्धि:</strong> स्वच्छ होकर बैठें।</li>
              <li>🧘 <strong>शांत व एकाग्र मन:</strong> एकांत में ध्यान धरें।</li>
            </ul>
          </section>

          {/* Kabir Panth Maryada & Shloka */}
          <section className="bg-[#FFFDF9] p-4 rounded-xl border border-[#D2B48C] text-center text-xs text-[#2C1E11] italic font-medium leading-relaxed">
            <p>"ध्यान मूलम् गुरु मूर्ति, पूजा मूलम् गुरु पदम्।</p>
            <p>मंत्र मूलम् गुरु वाक्यं, मोक्ष मूलम् गुरु कृपा॥"</p>
          </section>

          {/* CTA Button */}
          <button 
            onClick={onClose}
            className="w-full bg-[#701A07] text-white py-4 rounded-[20px] font-black text-lg shadow-lg hover:bg-red-950 transition-all border border-[#D4AF37]"
          >
            ।। साहेब बंदगी साहेब ।। 🙏<br/>
            <span className="text-sm font-bold">(मर्यादा स्वीकार है)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
