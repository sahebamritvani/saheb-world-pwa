import React, { useState } from 'react';
import { Lock, X, KeyRound, ShieldAlert } from 'lucide-react';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  masterPin?: string;
}

export const AdminPinModal: React.FC<AdminPinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  masterPin = '7777'
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === masterPin) {
      setError(false);
      setPin('');
      onSuccess();
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFFDF7] border-2 border-[#D4AF37] rounded-3xl p-6 max-w-sm w-full shadow-2xl relative text-[#2C1E11] space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-900/60 hover:text-[#8B0000] p-1 rounded-full hover:bg-amber-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="flex flex-col items-center text-center space-y-2 pt-2">
          <div className="p-3 bg-[#8B0000] text-amber-200 rounded-full shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#8B0000]">प्रशासनिक सुरक्षा (Admin Security)</h3>
          <p className="text-xs text-amber-900/80 leading-relaxed">
            प्रशासक डेटा इंजेक्टर खोलने के लिए मास्टर पिन दर्ज करें।
          </p>
        </div>

        {/* PIN Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <KeyRound className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-amber-700/60" />
            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (error) setError(false);
              }}
              placeholder="मास्टर पिन दर्ज करें..."
              autoFocus
              className="w-full pl-10 pr-4 py-3 bg-amber-50/70 border border-amber-300 rounded-xl font-mono text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
            />
          </div>

          {error && (
            <div className="flex items-center gap-1.5 text-red-700 bg-red-50 p-2.5 rounded-lg text-xs font-semibold border border-red-200">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>अमान्य पिन! कृपया सही पिन दर्ज करें।</span>
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              रद्द करें
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#8B0000] hover:bg-red-950 text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
            >
              अनलॉक करें
            </button>
          </div>
        </form>

        <p className="text-[10px] text-center text-amber-800/60">
          डिफ਼ਾਲਟ ਮਾਸਟਰ ਪਿਨ (Master PIN): <span className="font-mono font-bold">7777</span>
        </p>
      </div>
    </div>
  );
};
