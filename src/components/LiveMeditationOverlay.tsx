import React, { useState, useEffect } from 'react';
import { X, Sparkles, Users, Music, Flame, LogIn, Heart } from 'lucide-react';
import { collection, doc, setDoc, deleteDoc, onSnapshot, query, limit } from 'firebase/firestore';
import { Language } from '../context/LanguageContext';
import { db, auth, loginWithGoogle } from '../utils/firebase';

interface LiveMeditationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface LiveParticipant {
  userId: string;
  userName?: string;
  userPhoto?: string | null;
  joinedAt?: number;
}

export function LiveMeditationOverlay({ isOpen, onClose, lang }: LiveMeditationOverlayProps) {
  const [seconds, setSeconds] = useState(0);
  const [liveParticipants, setLiveParticipants] = useState<LiveParticipant[]>([]);
  const [isJoined, setIsJoined] = useState(false);

  // Real-time Firestore sync for live global meditation
  useEffect(() => {
    if (!isOpen) return;

    // Reset seconds
    setSeconds(0);

    // Timer
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // 1. Listen to live participants in Firestore
    const q = query(collection(db, 'live_sumiran'), limit(30));
    const unsubscribeSnapshot = onSnapshot(
      q,
      (snapshot) => {
        const participants: LiveParticipant[] = [];
        snapshot.forEach((docSnap) => {
          participants.push(docSnap.data() as LiveParticipant);
        });
        setLiveParticipants(participants);
      },
      (error) => {
        console.warn("Live sumiran snapshot note:", error);
      }
    );

    // 2. Register current authenticated user to live collection
    const currentUid = auth.currentUser?.uid;
    if (currentUid) {
      const presenceRef = doc(db, 'live_sumiran', currentUid);
      setDoc(presenceRef, {
        userId: currentUid,
        userName: auth.currentUser?.displayName || (lang === 'pa' ? 'ਸਾਧਕ ਹੰਸ' : lang === 'en' ? 'Seeker Soul' : 'साधक हंस'),
        userPhoto: auth.currentUser?.photoURL || null,
        joinedAt: Date.now()
      }).then(() => {
        setIsJoined(true);
      }).catch((err) => {
        console.warn("Presence registration notice:", err);
      });
    }

    return () => {
      clearInterval(interval);
      unsubscribeSnapshot();

      // Clean up presence when leaving
      if (currentUid) {
        deleteDoc(doc(db, 'live_sumiran', currentUid)).catch(() => {});
      }
    };
  }, [isOpen, lang]);

  if (!isOpen) return null;

  const handleQuickSignIn = async () => {
    try {
      const result = await loginWithGoogle();
      if (result.user) {
        await setDoc(doc(db, 'live_sumiran', result.user.uid), {
          userId: result.user.uid,
          userName: result.user.displayName || 'साधक हंस',
          userPhoto: result.user.photoURL || null,
          joinedAt: Date.now()
        });
        setIsJoined(true);
      }
    } catch (err) {
      console.warn("Quick sign-in in live overlay:", err);
    }
  };

  const handleCloseSession = async () => {
    const currentUid = auth.currentUser?.uid;
    if (currentUid) {
      try {
        await deleteDoc(doc(db, 'live_sumiran', currentUid));
      } catch {
        // ignore on close
      }
    }
    onClose();
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Base global quorum + real Firestore participants
  const totalSoulsDisplay = Math.max(108 + liveParticipants.length, liveParticipants.length);

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6 text-white overflow-hidden animate-in fade-in duration-700">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-gradient from-amber-900/20 to-black pointer-events-none" />
      
      {/* Moving Light Orbs */}
      <div className="absolute w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] -top-20 -left-20 animate-pulse" />
      <div className="absolute w-96 h-96 bg-red-600/10 rounded-full blur-[120px] -bottom-20 -right-20 animate-pulse delay-700" />

      <button 
        onClick={handleCloseSession}
        className="absolute top-8 right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10 cursor-pointer"
        title="बंद करें"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative z-10 flex flex-col items-center space-y-8 text-center max-w-md w-full">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
             <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">
               Live Global Sumiran • Firebase Sync
             </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black italic tracking-tight">सामूहिक ध्यान</h2>
          <p className="text-amber-200/70 font-medium italic text-xs sm:text-sm">
            {lang === 'pa' ? 'ਸਤਿਗੁਰੂ ਦੇ ਚਰਨਾਂ ਵਿੱਚ ਲੀਨ ਹੋ ਕੇ ਅੰਤਰਮੁਖੀ ਹੋਵੋ' : lang === 'en' ? 'Dissolve into the Satguru\'s sacred presence' : 'सद्गुरु के पावन चरणों में स्वयं को विलीन करें'}
          </p>
        </div>

        {/* Central Visualization */}
        <div className="relative flex items-center justify-center my-2">
           <div className="absolute w-64 h-64 border border-white/5 rounded-full animate-spin-slow" />
           <div className="absolute w-48 h-48 border-2 border-amber-500/20 rounded-full animate-pulse" />
           
           <div className="w-36 h-36 rounded-full bg-gradient-to-t from-[#8B0000] to-orange-600 shadow-[0_0_60px_rgba(234,88,12,0.5)] flex flex-col items-center justify-center border-4 border-white/15">
              <Flame className="w-10 h-10 text-white animate-bounce-slow" />
              <span className="text-[11px] font-black mt-2 uppercase tracking-widest text-amber-200">सत्यनाम</span>
           </div>
        </div>

        {/* Live Devotees Avatars Row */}
        {liveParticipants.length > 0 && (
          <div className="w-full bg-white/5 rounded-2xl p-2.5 border border-white/10 backdrop-blur-xs">
            <div className="flex items-center justify-between text-[10px] text-amber-200/80 mb-1.5 px-1 font-bold">
              <span>{lang === 'pa' ? 'ਹੁਣੇ ਧਿਆਨ ਵਿੱਚ ਜੁੜੇ ਸਾਧਕ' : lang === 'en' ? 'Devotees Currently Meditating' : 'वर्तमान में उपस्थित हंस जन (Live)'}</span>
              <span className="text-emerald-400 font-mono">{liveParticipants.length} Connected</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 overflow-x-auto py-1">
              {liveParticipants.slice(0, 7).map((p, idx) => (
                <div key={p.userId || idx} className="flex flex-col items-center group relative">
                  {p.userPhoto ? (
                    <img src={p.userPhoto} alt="" className="w-7 h-7 rounded-full border border-amber-400 object-cover" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 border border-amber-300 flex items-center justify-center text-[10px] font-bold text-white">
                      {(p.userName || 'स')[0]}
                    </div>
                  )}
                  <span className="text-[8px] text-gray-300 max-w-[45px] truncate mt-0.5 font-medium">
                    {p.userName?.split(' ')[0] || 'हंस'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Timer & Stats */}
        <div className="space-y-3 w-full">
           <div className="text-4xl sm:text-5xl font-mono font-black tracking-widest text-white/95">
             {formatTime(seconds)}
           </div>
           
           <div className="flex items-center justify-center gap-6 pt-1">
              <div className="flex flex-col items-center gap-0.5">
                 <div className="flex items-center gap-1">
                   <Users className="w-3.5 h-3.5 text-emerald-400" />
                   <span className="text-xs font-mono font-black text-emerald-300">{totalSoulsDisplay}</span>
                 </div>
                 <span className="text-[9px] font-bold text-gray-400 uppercase">
                   {lang === 'pa' ? 'ਸਮੂਹਿਕ ਹੰਸ' : lang === 'en' ? 'Global Seekers' : 'साधक आत्माएं'}
                 </span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div className="flex flex-col items-center gap-0.5">
                 <div className="flex items-center gap-1">
                   <Music className="w-3.5 h-3.5 text-orange-400" />
                   <span className="text-xs font-mono font-black text-orange-300">Anahad</span>
                 </div>
                 <span className="text-[9px] font-bold text-gray-400 uppercase">528Hz Drone</span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div className="flex flex-col items-center gap-0.5">
                 <div className="flex items-center gap-1">
                   <Heart className="w-3.5 h-3.5 text-red-400" />
                   <span className="text-xs font-mono font-black text-red-300">{isJoined ? 'Synced' : 'Guest'}</span>
                 </div>
                 <span className="text-[9px] font-bold text-gray-400 uppercase">Firebase</span>
              </div>
           </div>
        </div>

        {/* Guest Sign-In Notice if not signed in */}
        {!auth.currentUser && (
          <button
            onClick={handleQuickSignIn}
            className="w-full max-w-xs py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-400/30 text-amber-200 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{lang === 'pa' ? 'ਸੂਚੀ ਵਿੱਚ ਆਪਣੀ ਹਾਜ਼ਰੀ ਪਾਓ (Google Login)' : lang === 'en' ? 'Register Presence (Google Login)' : 'लाइव सूची में उपस्थिति दर्ज करें (Google)'}</span>
          </button>
        )}

        {/* End Session Button */}
        <button 
          onClick={handleCloseSession}
          className="px-10 py-3 rounded-2xl bg-white text-black font-black text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 cursor-pointer"
        >
          {lang === 'pa' ? 'ਸਮਾਪਤ ਕਰੋ (End Session)' : lang === 'en' ? 'End Session' : 'विश्राम (End Session)'}
        </button>
      </div>

      {/* Floating Rose Petals Simulation (CSS based) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {Array.from({ length: 15 }).map((_, i) => (
           <div 
             key={i}
             className="absolute bg-red-500/20 rounded-full blur-[2px] animate-fall"
             style={{
               width: `${Math.random() * 8 + 4}px`,
               height: `${Math.random() * 12 + 6}px`,
               left: `${Math.random() * 100}%`,
               top: '-20px',
               animationDuration: `${Math.random() * 5 + 5}s`,
               animationDelay: `${Math.random() * 10}s`
             }}
           />
         ))}
      </div>
    </div>
  );
}
