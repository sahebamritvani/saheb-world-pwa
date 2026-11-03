import React, { useRef } from 'react';
import { X, Download } from 'lucide-react';

interface QuoteCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: { title: string; text: string; essence: string } | null;
}

export const QuoteCardModal: React.FC<QuoteCardModalProps> = ({ isOpen, onClose, data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const downloadCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Kabir_Satsang_Quote.png';
    a.click();
  };

  React.useEffect(() => {
    if (!isOpen || !data || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas size
    canvas.width = 600;
    canvas.height = 800;

    // Background (Parchment)
    ctx.fillStyle = '#F4ECD8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Border
    ctx.strokeStyle = '#D2B48C';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Text Setup
    ctx.fillStyle = '#8B0000';
    ctx.textAlign = 'center';

    // Title
    ctx.font = 'bold 32px serif';
    ctx.fillText(data.title, canvas.width / 2, 80);

    // Verse
    ctx.fillStyle = '#2C1E11';
    ctx.font = '24px serif';
    const lines = data.text.split('\n');
    lines.forEach((line, i) => {
        ctx.fillText(line, canvas.width / 2, 200 + i * 35);
    });

    // Essence
    ctx.font = 'italic 20px serif';
    ctx.fillText(data.essence, canvas.width / 2, canvas.height - 150);

    // Signature
    ctx.font = 'bold 20px serif';
    ctx.fillText('।। साहेब बंदगी साहेब ।।', canvas.width / 2, canvas.height - 80);

  }, [isOpen, data]);

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#FFFDF9] rounded-2xl p-4 w-full max-w-sm border-2 border-amber-500 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-amber-900 text-sm">सुविचार कार्ड जनरेटर</h3>
            <button onClick={onClose}><X className="w-5 h-5 text-gray-500"/></button>
        </div>
        <canvas ref={canvasRef} className="w-full h-auto rounded-lg mb-4 border border-amber-300" />
        <button 
            onClick={downloadCard}
            className="w-full py-3 bg-[#8B0000] text-white font-bold rounded-xl flex items-center justify-center gap-2"
        >
            <Download className="w-4 h-4"/> कार्ड डाउनलोड करें
        </button>
      </div>
    </div>
  );
};
