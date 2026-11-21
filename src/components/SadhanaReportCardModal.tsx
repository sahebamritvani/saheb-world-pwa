import React, { useRef } from 'react';
import { Award, Download, Sparkles, X, CheckCircle2, ShieldCheck, Flame, BookOpen } from 'lucide-react';
import { Language } from '../context/LanguageContext';

interface SadhanaReportCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  devoteeName: string;
  malaRounds: number;
  totalReadingSeconds: number;
  vaultReadChapters: Record<number, number[]>;
  lang: Language;
  showToast: (msg: string) => void;
}

export function SadhanaReportCardModal({
  isOpen,
  onClose,
  devoteeName,
  malaRounds,
  totalReadingSeconds,
  vaultReadChapters,
  lang,
  showToast
}: SadhanaReportCardModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  if (!isOpen) return null;

  const totalReadingMinutes = Math.round(totalReadingSeconds / 60);
  const totalChaptersRead = Object.values(vaultReadChapters).reduce((acc, curr) => acc + curr.length, 0);
  const displayName = devoteeName.trim() || 'सत्य साधक (हंस जन)';

  const handleDownloadReportPng = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Parchment Fill
    ctx.fillStyle = '#FFFDF9';
    ctx.fillRect(0, 0, 1080, 1080);

    ctx.fillStyle = '#FAF4E8';
    ctx.fillRect(40, 40, 1000, 1000);

    // Outer double golden & maroon border
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#D4AF37';
    ctx.strokeRect(40, 40, 1000, 1000);

    ctx.lineWidth = 3;
    ctx.strokeStyle = '#8B0000';
    ctx.strokeRect(60, 60, 960, 960);

    ctx.textAlign = 'center';

    // Header
    ctx.font = 'bold 38px "Noto Serif", Devanagari, Gurmukhi, serif';
    ctx.fillStyle = '#8B0000';
    ctx.fillText('🌹 ।। सत्यनाम ।। 🌹', 540, 120);

    ctx.font = 'bold 24px "Noto Sans", Devanagari, Gurmukhi, sans-serif';
    ctx.fillStyle = '#5C4033';
    ctx.fillText('श्री सद्गुरु कबीर साहेब स्वाध्याय पीठ — साहेब वर्ल्ड', 540, 160);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#D4AF37';
    ctx.beginPath();
    ctx.moveTo(300, 185);
    ctx.lineTo(780, 185);
    ctx.stroke();

    // Title Badge
    ctx.font = 'bold 30px "Noto Serif", Devanagari, Gurmukhi, serif';
    ctx.fillStyle = '#8B0000';
    ctx.fillText('📜 मासिक साधना एवं स्वाध्याय रिपोर्ट कार्ड', 540, 235);

    // Devotee Name Card
    const boxX = 120;
    const boxY = 270;
    const boxW = 840;
    const boxH = 90;

    ctx.fillStyle = '#FFF9F0';
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    if (typeof (ctx as any).roundRect === 'function') {
      (ctx as any).roundRect(boxX, boxY, boxW, boxH, 14);
    } else {
      ctx.rect(boxX, boxY, boxW, boxH);
    }
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 24px "Noto Sans", Devanagari, Gurmukhi, sans-serif';
    ctx.fillStyle = '#5C4033';
    ctx.fillText('साधक (हंस जन):', 540, boxY + 35);

    ctx.font = 'bold 30px "Noto Serif", Devanagari, Gurmukhi, serif';
    ctx.fillStyle = '#701A07';
    ctx.fillText(displayName, 540, boxY + 70);

    // 4 Key Stats Metric Tiles
    const stats = [
      { label: 'माला सुमिरन (108)', val: `${malaRounds} माला` },
      { label: 'कुल साधना समय', val: `${totalReadingMinutes} मिनट` },
      { label: 'स्वाध्याय ग्रंथ वाचन', val: `${totalChaptersRead} अध्याय` },
      { label: 'आध्यात्मिक स्थिति', val: 'उत्तम हंस साधक' }
    ];

    stats.forEach((s, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const cardX = 120 + col * 430;
      const cardY = 390 + row * 190;
      const cardW = 410;
      const cardH = 160;

      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2;
      if (typeof (ctx as any).roundRect === 'function') {
        (ctx as any).roundRect(cardX, cardY, cardW, cardH, 16);
      } else {
        ctx.rect(cardX, cardY, cardW, cardH);
      }
      ctx.fill();
      ctx.stroke();

      ctx.font = '600 20px "Noto Sans", Devanagari, Gurmukhi, sans-serif';
      ctx.fillStyle = '#5C4033';
      ctx.fillText(s.label, cardX + cardW / 2, cardY + 50);

      ctx.font = 'bold 32px "Noto Serif", Devanagari, Gurmukhi, serif';
      ctx.fillStyle = '#8B0000';
      ctx.fillText(s.val, cardX + cardW / 2, cardY + 110);
    });

    // Verse
    ctx.font = 'italic 22px "Noto Serif", Devanagari, Gurmukhi, serif';
    ctx.fillStyle = '#701A07';
    ctx.fillText('"सतगुरु संगति उपजै वैराग, मिटै भरम की टाटी।"', 540, 810);

    // Footer Mantra
    ctx.font = 'bold 32px "Noto Serif", Devanagari, Gurmukhi, serif';
    ctx.fillStyle = '#B8860B';
    ctx.fillText('।। साहेब बंदगी साहेब ।। 🙏', 540, 930);

    ctx.font = 'bold 20px "Noto Sans", Devanagari, Gurmukhi, sans-serif';
    ctx.fillStyle = '#701A07';
    ctx.fillText('साहेब वर्ल्ड • स्वाध्याय तिजोरी', 540, 970);

    // Download PNG trigger
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `SahebWorld_SadhanaReport_${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('📜 साधना रिपोर्ट कार्ड डाउनलोड प्रारंभ हुआ! 🌹');
    } catch {
      showToast('इमेज डाउनलोड त्रुटि।');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="card w-full max-w-lg p-5 md:p-6 rounded-3xl shadow-2xl border-2 border-amber-300 bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#F4ECD8] space-y-5 text-amber-950">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-300/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-amber-700 text-amber-100 flex items-center justify-center shadow-md">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base md:text-lg text-[#8B0000] m-0 flex items-center gap-1.5">
                <span>{lang === 'pa' ? 'ਮਾਸਿਕ ਸਾਧਨਾ ਰਿਪੋਰਟ ਕਾਰਡ' : lang === 'en' ? 'Monthly Sadhana Report Card' : 'मासिक साधना एवं स्वाध्याय रिपोर्ट कार्ड'}</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </h3>
              <p className="text-[11px] text-amber-800 m-0 font-medium">
                {displayName} • {new Date().toLocaleDateString('hi-IN', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:text-amber-900 transition cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Metrics Tiles Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-white border border-amber-300 shadow-xs text-center space-y-1">
            <span className="text-2xl">📿</span>
            <p className="text-[11px] text-gray-600 font-bold m-0">माला सुमिरन (108)</p>
            <p className="text-xl font-black text-[#8B0000] m-0">{malaRounds} माला</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-300 shadow-xs text-center space-y-1">
            <span className="text-2xl">⏳</span>
            <p className="text-[11px] text-gray-600 font-bold m-0">कुल साधना समय</p>
            <p className="text-xl font-black text-amber-800 m-0">{totalReadingMinutes} मिनट</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-300 shadow-xs text-center space-y-1">
            <span className="text-2xl">📖</span>
            <p className="text-[11px] text-gray-600 font-bold m-0">ग्रंथ अध्याय वाचन</p>
            <p className="text-xl font-black text-[#8B0000] m-0">{totalChaptersRead} अध्याय</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-300 shadow-xs text-center space-y-1">
            <span className="text-2xl">🌟</span>
            <p className="text-[11px] text-gray-600 font-bold m-0">आध्यात्मिक स्थिति</p>
            <p className="text-xs font-black text-emerald-700 m-0">उत्तम हंस साधक</p>
          </div>
        </div>

        {/* Download Action */}
        <div className="pt-2">
          <button
            onClick={handleDownloadReportPng}
            className="w-full py-3 px-4 rounded-2xl bg-[#8B0000] hover:bg-amber-900 text-amber-100 font-extrabold text-xs md:text-sm flex items-center justify-center gap-2 shadow-xl cursor-pointer active:scale-95 transition"
          >
            <Download className="w-4 h-4" />
            <span>डिजिटल साधना रिपोर्ट कार्ड डाउनलोड करें (PNG/PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
