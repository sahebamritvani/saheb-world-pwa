import React, { useState } from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff, Download, CheckCircle, ShieldCheck } from 'lucide-react';
import { downloadAllForOffline, getOfflineStorageUsage } from '../utils/offlineSync';

export const OfflineBanner: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [downloading, setDownloading] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const handleDownloadOffline = async () => {
    setDownloading(true);
    setDownloadMsg('ऑफ़लाइन डेटा डाउनलोड हो रहा है...');
    const result = await downloadAllForOffline((pct, url) => {
      setDownloadMsg(`डाउनलोड हो रहा है (${pct}%): ${url.split('/').pop() || 'ग्रंथ'}`);
    });

    setDownloading(false);
    if (result.success) {
      setDownloadMsg(`✓ सफलता! ${result.cachedCount} ग्रंथ एवं ऑडियो ऑफ़लाइन सहेज लिए गए।`);
      setTimeout(() => setDownloadMsg(null), 5000);
    } else {
      setDownloadMsg(`⚠️ त्रुटि: ${result.error}`);
      setTimeout(() => setDownloadMsg(null), 5000);
    }
  };

  return (
    <>
      {/* Offline Alert Banner in Hindi */}
      {!isOnline && (
        <div className="fixed bottom-20 left-4 right-4 z-[90] bg-[#3E2805] text-[#FDFBF7] border-2 border-[#D4AF37] rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-bounce-slow">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-2 rounded-full bg-[#8B0000] text-amber-200 shrink-0">
              <WifiOff className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm sm:text-base text-amber-200">
                आप ऑफ़लाइन हैं। सभी कैश्ड ग्रंथ और ऑडियो उपलब्ध हैं।
              </p>
              <p className="text-xs text-amber-300/80">
                सुरक्षित ऑफ़लाइन मोड सक्रिय — बिना इंटरनेट के निरंतर स्वाध्याय जारी रखें। 🙏
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDownloadOffline}
              disabled={downloading}
              className="px-3 py-2 bg-[#8B0000] hover:bg-red-950 text-white rounded-xl text-xs font-bold border border-amber-400/50 shadow-md flex items-center gap-1.5 cursor-pointer transition active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'डाउनलोड...' : 'ऑफ़लाइन सेव करें'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Persistent Download Feedback Banner when online or downloading */}
      {downloadMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-amber-950 text-amber-100 border border-amber-400 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-amber-400 animate-spin" />
          <span>{downloadMsg}</span>
        </div>
      )}
    </>
  );
};
