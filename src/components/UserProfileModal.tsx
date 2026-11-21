import React from 'react';
import { X, User as UserIcon, LogOut, CheckCircle2, ShieldCheck, Flame, Trophy, Cloud, RefreshCw, Sparkles } from 'lucide-react';
import { User } from 'firebase/auth';
import { Language } from '../context/LanguageContext';
import { loginWithGoogle, logoutUser } from '../utils/firebase';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  lang: Language;
  sadhanaMinutes: number;
  sadhanaStreak: number;
  dailyGoal: number;
  onSyncCloud: () => Promise<void>;
  isSyncing: boolean;
}

export function UserProfileModal({
  isOpen,
  onClose,
  currentUser,
  lang,
  sadhanaMinutes,
  sadhanaStreak,
  dailyGoal,
  onSyncCloud,
  isSyncing
}: UserProfileModalProps) {
  if (!isOpen) return null;

  const getBadgeInfo = (streak: number) => {
    if (streak >= 100) {
      return {
        title: lang === 'pa' ? 'ਹੰਸ ਪਦ (Hans)' : lang === 'en' ? 'Hans (Liberated)' : 'हंस पद (Hans)',
        medal: '🥇',
        desc: lang === 'pa' ? '੧੦੦+ ਦਿਨਾਂ ਦੀ ਅਖੰਡ ਸਾਧਨਾ' : lang === 'en' ? '100+ Days Unbroken Sadhana' : '१००+ दिनों की अखंड साधना',
        progress: 100,
        nextTarget: null
      };
    }
    if (streak >= 30) {
      return {
        title: lang === 'pa' ? 'ਸਾਧਕ (Sadhak)' : lang === 'en' ? 'Sadhak (Devotee)' : 'साधक (Sadhak)',
        medal: '🥈',
        desc: lang === 'pa' ? '੩੦+ ਦਿਨਾਂ ਦੀ ਨਿਰੰਤਰ ਸਾਧਨਾ' : lang === 'en' ? '30+ Days Continuous Practice' : '३०+ दिनों की निरंतर साधना',
        progress: Math.min(100, Math.round(((streak - 30) / 70) * 100)),
        nextTarget: 100 - streak
      };
    }
    return {
      title: lang === 'pa' ? 'ਜਿਗਿਆਸੂ (Jigyasu)' : lang === 'en' ? 'Jigyasu (Seeker)' : 'जिज्ञासु (Jigyasu)',
      medal: '🥉',
      desc: lang === 'pa' ? 'ਸਾਧਨਾ ਪਥ ਉੱਤੇ ਆਰੰਭ' : lang === 'en' ? 'Beginning on the Path' : 'साधना पथ पर प्रथम चरण',
      progress: Math.min(100, Math.round((streak / 30) * 100)),
      nextTarget: 30 - streak
    };
  };

  const badge = getBadgeInfo(sadhanaStreak);

  const handleSignIn = async () => {
    try {
      await loginWithGoogle();
    } catch (err: unknown) {
      console.warn("Sign-in error in modal:", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutUser();
      onClose();
    } catch (err: unknown) {
      console.warn("Sign-out error:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-amber-50/95 border-2 border-amber-300 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#8B0000] via-amber-900 to-orange-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
              <Cloud className="w-4 h-4 text-amber-200" />
            </div>
            <div>
              <h3 className="font-black text-sm m-0">
                {lang === 'pa' ? 'ਸਾਧਕ ਪ੍ਰੋਫਾਈਲ ਤੇ ਕਲਾਊਡ ਸਿੰਕ' : lang === 'en' ? 'Spiritual Profile & Cloud Sync' : 'साधक प्रोफ़ाइल व क्लाउड सिंक'}
              </h3>
              <p className="text-[10px] text-amber-200/80 m-0">Firebase Multi-User Cloud Storage</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {currentUser ? (
            <>
              {/* User Identity Card */}
              <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs flex items-center gap-3">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt=""
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500 shadow-xs"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 text-white flex items-center justify-center text-xl font-bold shadow-xs">
                    {(currentUser.displayName || 'स')[0]}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-black text-amber-950 text-sm truncate m-0">
                      {currentUser.displayName || (lang === 'pa' ? 'ਸਤਿ ਸੰਗੀ ਹੰਸ' : lang === 'en' ? 'Seeker Hans' : 'सत्य साधक हंस')}
                    </h4>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Cloud Synced" />
                  </div>
                  <p className="text-[11px] text-gray-500 truncate m-0">{currentUser.email}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mt-1 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{lang === 'pa' ? 'ਕਲਾਊਡ ਸੁਰੱਖਿਅਤ' : lang === 'en' ? 'Cloud Synced' : 'क्लाउड सुरक्षित (Multi-Device Active)'}</span>
                  </span>
                </div>
              </div>

              {/* Growth Badge Section */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-100/90 to-orange-100/60 border border-amber-300 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'pa' ? 'ਸਾਧਨਾ ਮੈਡਲ (Growth Badge)' : lang === 'en' ? 'Spiritual Growth Badge' : 'आध्यात्मिक प्रगति सोपान (Badge)'}</span>
                  </span>
                  <span className="text-xl">{badge.medal}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <h5 className="text-base font-black text-amber-950 m-0">{badge.title}</h5>
                  <span className="text-xs font-bold text-orange-700">{sadhanaStreak} {lang === 'pa' ? 'ਦਿਨ' : lang === 'en' ? 'Days' : 'दिवस'}</span>
                </div>
                <p className="text-[11px] text-amber-900/80 m-0">{badge.desc}</p>
                {/* Progress bar to next medal */}
                <div className="space-y-1 pt-1">
                  <div className="w-full bg-amber-200/80 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-amber-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${badge.progress}%` }}
                    />
                  </div>
                  {badge.nextTarget !== null && (
                    <p className="text-[10px] text-gray-600 text-right m-0">
                      {badge.nextTarget} {lang === 'pa' ? 'ਹੋਰ ਦਿਨ ਅਗਲੇ ਮੈਡਲ ਲਈ' : lang === 'en' ? 'more days to next badge' : 'दिन शेष अगले पावन मेडल के लिए'}
                    </p>
                  )}
                </div>
              </div>

              {/* Sadhana Sync Stats */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-white border border-amber-200 text-center">
                  <div className="flex items-center justify-center gap-1 text-orange-600 mb-0.5">
                    <Flame className="w-4 h-4" />
                    <span className="text-base font-black text-amber-950">{sadhanaMinutes} / {dailyGoal}</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase">
                    {lang === 'pa' ? 'ਅੱਜ ਦੀ ਸਾਧਨਾ (ਮਿੰਟ)' : lang === 'en' ? 'Today\'s Mins' : 'आज की साधना (मिनट)'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-amber-200 text-center">
                  <div className="flex items-center justify-center gap-1 text-emerald-600 mb-0.5">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-base font-black text-amber-950">सक्रिय (Active)</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase">
                    {lang === 'pa' ? 'ਲਾਈਵ ਸਿਮਰਨ' : lang === 'en' ? 'Live Sumiran' : 'सामूहिक सुमिरन'}
                  </span>
                </div>
              </div>

              {/* Cloud Sync Action */}
              <button
                onClick={onSyncCloud}
                disabled={isSyncing}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-[0.99] text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>
                  {isSyncing
                    ? (lang === 'pa' ? 'ਸਿੰਕ ਹੋ ਰਿਹਾ ਹੈ...' : lang === 'en' ? 'Syncing to Cloud...' : 'क्लाउड पर सुरक्षित हो रहा है...')
                    : (lang === 'pa' ? 'ਹੁਣੇ ਕਲਾਊਡ ਸਿੰਕ ਕਰੋ' : lang === 'en' ? 'Sync to Firebase Now' : 'क्लाउड डाटा समन्वय (Force Sync)')}
                </span>
              </button>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="w-full py-2 px-4 rounded-xl bg-white border border-red-200 hover:bg-red-50 text-red-700 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{lang === 'pa' ? 'ਲੌਗਆਉਟ' : lang === 'en' ? 'Sign Out' : 'लॉगआउट (Sign Out)'}</span>
              </button>
            </>
          ) : (
            <>
              {/* Not Signed In Presentation */}
              <div className="text-center py-4 space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <UserIcon className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-black text-base text-amber-950 m-0">
                    {lang === 'pa' ? 'ਸਾਧਕ ਖਾਤਾ ਜੋੜੋ' : lang === 'en' ? 'Connect Sadhak Account' : 'साधक खाता जोड़ें व सुरक्षित करें'}
                  </h4>
                  <p className="text-xs text-amber-900/80 mt-1 max-w-xs mx-auto">
                    {lang === 'pa'
                      ? 'ਆਪਣੀ ਸਾਧਨਾ, ਨਿਰੰਤਰਤਾ ਅਤੇ ਮੈਡਲ ਕਿਸੇ ਵੀ ਮੋਬਾਈਲ ਜਾਂ ਕੰਪਿਊਟਰ ਉੱਤੇ ਕਲਾਊਡ ਰਾਹੀਂ ਸੁਰੱਖਿਅਤ ਰੱਖੋ।'
                      : lang === 'en'
                      ? 'Sync your streak, daily sadhana minutes, and badges across devices with Firebase.'
                      : 'सद्गुरु कृपा से अपनी साधना निरंतरता, दैनिक मिनट व मेडल किसी भी उपकरण पर सुरक्षित रखें।'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-100/70 border border-amber-300 text-left space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <Cloud className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span className="text-amber-900 font-medium">
                      {lang === 'pa' ? 'ਆਟੋਮੈਟਿਕ ਕਲਾਊਡ ਬੈਕਅੱਪ (Firebase)' : lang === 'en' ? 'Automatic Cloud Sync across devices' : 'बहु-उपकरण साधना समन्वय (Multi-Device Sync)'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span className="text-amber-900 font-medium">
                      {lang === 'pa' ? 'ਸਮੂਹਿਕ ਸਿਮਰਨ ਵਿੱਚ ਸਿੱਧਾ ਜੁੜੋ' : lang === 'en' ? 'Join Live Global Sumiran with other seekers' : 'विश्वव्यापी सामूहिक सुमिरन में अपनी उपस्थिति अंकित करें'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Trophy className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span className="text-amber-900 font-medium">
                      {lang === 'pa' ? 'ਜਿਗਿਆਸੂ, ਸਾਧਕ, ਹੰਸ ਮੈਡਲ ਸੁਰੱਖਿਆ' : lang === 'en' ? 'Preserve Jigyasu, Sadhak, Hans Badges' : 'जिज्ञासु, साधक, हंस मेडल कभी नष्ट नहीं होंगे'}
                    </span>
                  </div>
                </div>

                {/* Google Sign-In Button */}
                <button
                  onClick={handleSignIn}
                  className="w-full py-3 px-4 rounded-2xl bg-white border-2 border-amber-300 hover:border-amber-500 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="font-black text-amber-950 text-sm group-hover:text-amber-800">
                    {lang === 'pa' ? 'Google ਨਾਲ ਲੌਗਇਨ ਕਰੋ' : lang === 'en' ? 'Continue with Google' : 'Google से साइन-इन करें'}
                  </span>
                </button>

                <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>{lang === 'pa' ? '੧੦੦% ਸੁਰੱਖਿਅਤ ਅਤੇ ਮੁਫ਼ਤ' : lang === 'en' ? '100% Private & Free' : '१००% सुरक्षित एवं सात्विक (Google Firebase Secured)'}</span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
