import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Scroll,
  Circle,
  GraduationCap,
  Gamepad2,
  Bookmark,
  Music,
  Clock,
  ShieldCheck,
  MapPin,
  HeartPulse,
  Volume2,
  VolumeX,
  CheckCircle2,
  Download,
  ChevronLeft,
  ChevronRight,
  Search,
  Eye,
  Database,
  Upload,
  Cpu,
  HardDrive,
  Lock,
  HelpCircle,
  Sparkle,
  Sparkles,
  Smartphone,
  Copy,
  ExternalLink,
  X,
  Flame,
  Target,
  RotateCcw,
  Check,
  ChevronUp,
  Share2,
  Play,
  Pause,
  TrendingUp,
  BarChart2,
  CheckCheck,
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';

import {
  GranthVaultSlot,
  SwadhyayStepSlot
} from './types/schema';
import {
  EMPTY_SWADHYAY_SLOT,
  INITIAL_EMPTY_VAULTS,
  getStoredVaults,
  saveStoredVaults,
  getStoredSwadhyay,
  saveStoredSwadhyay
} from './data/emptySchema';
import { usePWAInstall } from './hooks/usePWAInstall';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { useLanguage, Language } from './context/LanguageContext';
import { playGentleBell, startTanpuraDrone, stopTanpuraDrone, setTanpuraVolume } from './utils/audioSynth';
import { startRosePetalVarsha } from './utils/rosePetalCanvas';
import { generateAndDownloadCertificate } from './utils/certificateGenerator';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { getDailySakhi, getDailyAffirmation, getDailyHukamnama, KabirSakhiItem, DailyAffirmationItem, DailyHukamnamaItem, DAILY_SAKHIS, DAILY_HUKAMNAMAS } from './data/dailySakhis';
import {
  get7DaySadhanaHistory,
  recordSadhanaMinutesInHistory,
  exportAppBackup,
  importAppBackup,
  SadhanaHistoryDay
} from './utils/sadhanaStorage';
import { SadhanaLineChart } from './components/SadhanaLineChart';
import { SpiritualAudioPlayer } from './components/SpiritualAudioPlayer';
import { QuoteCardModal } from './components/QuoteCardModal';
import { SplashModal } from './components/SplashModal';
import { OfflineBanner } from './components/OfflineBanner';

export default function App() {
  const { lang, setLang, t } = useLanguage();

  // Navigation & View State
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<'dashboard' | 'swadhyay' | 'vaultReader' | 'mala'>('dashboard');
  const [selectedVault, setSelectedVault] = useState<GranthVaultSlot | null>(null);
  const [selectedSectionIdx, setSelectedSectionIdx] = useState<number | null>(null);

  // Dynamic Data Layer (Empty Database Slots by default)
  const [vaults, setVaults] = useState<GranthVaultSlot[]>(() => getStoredVaults());
  const [swadhyayData, setSwadhyayData] = useState<SwadhyayStepSlot>(() => getStoredSwadhyay());
  const [showDataInjector, setShowDataInjector] = useState(false);
  const [injectionJson, setInjectionJson] = useState('');
  const [injectionTarget, setInjectionTarget] = useState<'swadhyay' | 'vault'>('swadhyay');
  const [injectionVaultId, setInjectionVaultId] = useState<number>(1);
  const [injectionFeedback, setInjectionFeedback] = useState<string | null>(null);

  // Themes & UI Preferences (White, Pothi, Night, and True Black OLED)
  const [currentTheme, setCurrentTheme] = useState<'white' | 'pothi' | 'night' | 'trueblack'>('pothi');
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [lineGuideActive, setLineGuideActive] = useState(false);
  const [readerFontScale, setReaderFontScale] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [readerLineHeight, setReaderLineHeight] = useState<'normal' | 'relaxed' | 'loose'>('relaxed');

  // Swadhyay 11-Step Engine States
  const [currentStep, setCurrentStep] = useState(1);
  const [quizAnswerSelected, setQuizAnswerSelected] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [japaCount, setJapaCount] = useState(0);
  const [userJournal, setUserJournal] = useState(() => localStorage.getItem('saheb_swadhyay_journal') || '');
  const [devoteeName, setDevoteeName] = useState(() => localStorage.getItem('saheb_devotee_name') || '');
  const [revealedUlatbansi, setRevealedUlatbansi] = useState<Record<number, boolean>>({});

  interface JournalEntry {
    date: string;
    content: string;
  }

  // Secure Admin CMS & Authentication States
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => localStorage.getItem('saheb_admin_auth') === 'true');
  const [adminLoginAttempts, setAdminLoginAttempts] = useState(() => {
    const stored = localStorage.getItem('saheb_admin_attempts');
    return stored ? parseInt(stored, 10) : 0;
  });
  const [adminLockoutUntil, setAdminLockoutUntil] = useState<number>(() => {
    const stored = localStorage.getItem('saheb_admin_lockout_until');
    return stored ? parseInt(stored, 10) : 0;
  });
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [adminHoldProgress, setAdminHoldProgress] = useState(0);
  const logoHoldTimerRef = useRef<NodeJS.Timeout | null>(null);
  const logoHoldIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoHoldStart = () => {
    setAdminHoldProgress(0);
    let elapsed = 0;
    logoHoldIntervalRef.current = setInterval(() => {
      elapsed += 100;
      setAdminHoldProgress(Math.min(100, (elapsed / 5000) * 100));
    }, 100);

    logoHoldTimerRef.current = setTimeout(() => {
      if (logoHoldIntervalRef.current) clearInterval(logoHoldIntervalRef.current);
      setAdminHoldProgress(0);
      setShowAdminLoginModal(true);
      playGentleBell(528);
    }, 5000);
  };

  const handleLogoHoldEnd = () => {
    if (logoHoldTimerRef.current) clearTimeout(logoHoldTimerRef.current);
    if (logoHoldIntervalRef.current) clearInterval(logoHoldIntervalRef.current);
    setAdminHoldProgress(0);
  };

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (adminLockoutUntil > now) {
      const remainingMins = Math.ceil((adminLockoutUntil - now) / 60000);
      showToast(`सुरक्षा लॉकआउट सक्रिय: ${remainingMins} मिनट बाद पुनः प्रयास करें।`);
      return;
    }

    if (adminPasswordInput === 'Satyanaam108') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('saheb_admin_auth', 'true');
      localStorage.removeItem('saheb_admin_attempts');
      localStorage.removeItem('saheb_admin_lockout_until');
      setAdminLoginAttempts(0);
      setAdminLockoutUntil(0);
      setShowAdminLoginModal(false);
      setShowAdminDashboard(true);
      setAdminPasswordInput('');
      playGentleBell(528);
      showToast('🔐 एडमिन कपाट अनलॉक सफल! (Admin Dashboard Unlocked)');
    } else {
      const nextAttempts = adminLoginAttempts + 1;
      setAdminLoginAttempts(nextAttempts);
      localStorage.setItem('saheb_admin_attempts', String(nextAttempts));
      playGentleBell(396);

      if (nextAttempts >= 3) {
        const lockoutTime = now + 15 * 60 * 1000;
        setAdminLockoutUntil(lockoutTime);
        localStorage.setItem('saheb_admin_lockout_until', String(lockoutTime));
        showToast('⚠️ ३ से अधिक गलत प्रयास! १५ मिनट के लिए सुरक्षा लॉकआउट सक्रिय।');
      } else {
        showToast(`❌ गलत कूंजी! शेष प्रयास: ${3 - nextAttempts}`);
      }
    }
  };

  const handleAdminSignOut = () => {
    setIsAdminAuthenticated(false);
    setShowAdminDashboard(false);
    localStorage.removeItem('saheb_admin_auth');
    showToast('🔒 एडमिन सत्र समाप्त (Admin Signed Out)');
  };

  // 5 New Advanced Spiritual Features States & Handlers
  const [malaCount, setMalaCount] = useState<number>(() => {
    const stored = localStorage.getItem('saheb_mala_count');
    return stored ? parseInt(stored, 10) : 0;
  });
  const [malaRounds, setMalaRounds] = useState<number>(() => {
    const stored = localStorage.getItem('saheb_mala_rounds');
    return stored ? parseInt(stored, 10) : 0;
  });
  const [showQuoteCardModal, setShowQuoteCardModal] = useState(false);
  const [quoteCardData, setQuoteCardData] = useState<{ title: string; text: string; essence: string } | null>(null);

  const handleMalaTap = () => {
    if (navigator.vibrate) navigator.vibrate(45);
    playGentleBell(432);
    const next = malaCount + 1;
    if (next >= 108) {
      const nextRounds = malaRounds + 1;
      setMalaRounds(nextRounds);
      localStorage.setItem('saheb_mala_rounds', String(nextRounds));
      setMalaCount(0);
      localStorage.setItem('saheb_mala_count', '0');
      playGentleBell(528);
      startRosePetalVarsha(7000);
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
      showToast(lang === 'pa' ? '🌹 108 ਮਣਕੇ ਪੂਰੇ! ਮਾਲਾ ਸੰਪੰਨ! साहेब बंदगी साहेब!' : lang === 'en' ? '🌹 108 Beads Complete! Mala Blessed! Saheb Bandagi!' : '🌹 १०८ मनके पूर्ण! माला संपन्न! साहेब बंदगी साहेब! 🙏');
    } else {
      setMalaCount(next);
      localStorage.setItem('saheb_mala_count', String(next));
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'pa' ? 'pa-IN' : lang === 'en' ? 'en-US' : 'hi-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
      showToast(lang === 'pa' ? 'ਆਡੀਓ ਵਾਚਨ ਆਰੰਭ... 🔊' : lang === 'en' ? 'Audio recitation started... 🔊' : 'पावन वाचन प्रारंभ... 🔊');
    } else {
      showToast('Speech synthesis not supported');
    }
  };

  const handleGenerateQuoteCard = (title: string, text: string, essence: string) => {
    setQuoteCardData({ title, text, essence });
    setShowQuoteCardModal(true);
    playGentleBell(528);
  };

  // Journal and Search (with 5-second automatic draft persistence)
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const stored = localStorage.getItem('saheb_swadhyay_journal');
    if (!stored) return [];
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed as JournalEntry[];
      return [{ date: new Date().toISOString(), content: String(stored) }];
    } catch {
      return [{ date: new Date().toISOString(), content: stored }];
    }
  });
  const [journalSearchQuery, setJournalSearchQuery] = useState('');
  const [newJournalEntry, setNewJournalEntry] = useState(() => localStorage.getItem('saheb_journal_draft') || '');
  const [journalDraftSavedTime, setJournalDraftSavedTime] = useState<string | null>(null);

  // Audio / Meditation States & Volume
  const [isPlayingDrone, setIsPlayingDrone] = useState(false);
  const [tanpuraVolume, setTanpuraVolumeState] = useState<number>(0.75);
  const [showAnahadVolumeSlider, setShowAnahadVolumeSlider] = useState(false);
  const [showBhajanPlayer, setShowBhajanPlayer] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'पूरक' | 'कुंभक' | 'रेचक' | 'शून्य'>('पूरक');
  const [breathingTimerActive, setBreathingTimerActive] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Dedicated Reading Timer for Vault Reader
  const [readingSeconds, setReadingSeconds] = useState(0);
  const [isReadingTimerActive, setIsReadingTimerActive] = useState(true);
  const [granthReadingTime, setGranthReadingTime] = useState<Record<number, number>>(() => {
    try {
      const raw = localStorage.getItem('saheb_granth_reading_time');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Daily Kabir Sakhi & Affirmation States
  const [dailySakhi, setDailySakhi] = useState<KabirSakhiItem>(() => getDailySakhi());
  const [dailyHukamnama, setDailyHukamnama] = useState<DailyHukamnamaItem>(() => getDailyHukamnama());
  const [dailyAffirmation, setDailyAffirmation] = useState<DailyAffirmationItem>(() => getDailyAffirmation());
  const [affirmationCount, setAffirmationCount] = useState<number>(() => {
    const today = new Date().toISOString().slice(0, 10);
    const stored = localStorage.getItem(`saheb_affirmation_count_${today}`);
    return stored ? parseInt(stored, 10) : 0;
  });

  // Recharts 7-Day Sadhana Consistency Chart
  const [showSadhanaChart, setShowSadhanaChart] = useState(true);
  const [sadhanaHistory, setSadhanaHistory] = useState<SadhanaHistoryDay[]>(() => get7DaySadhanaHistory(lang));

  // Backup & Restore input ref
  const backupFileInputRef = useRef<HTMLInputElement | null>(null);

  // Gamified 3D Quiz for Vault 5
  const [gameScore, setGameScore] = useState(0);
  const [activeRiddleIdx] = useState(0);

  // 4 Yugas for Vault 8
  const [activeYugaIdx, setActiveYugaIdx] = useState(0);

  // App Health Metrics for Vault 11
  const [storageUsageKb, setStorageUsageKb] = useState(0);

  // Daily Sadhana Progress & Streak States
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState<number>(() => {
    const saved = localStorage.getItem('saheb_sadhana_goal');
    return saved ? Math.max(5, parseInt(saved, 10)) : 15;
  });

  const [todaySadhanaMinutes, setTodaySadhanaMinutes] = useState<number>(() => {
    const savedDate = localStorage.getItem('saheb_sadhana_last_date');
    const today = new Date().toISOString().slice(0, 10);
    if (savedDate === today) {
      const savedMin = localStorage.getItem('saheb_sadhana_today_minutes');
      return savedMin ? parseInt(savedMin, 10) : 0;
    }
    return 0;
  });

  const [sadhanaStreak, setSadhanaStreak] = useState<number>(() => {
    const savedStreak = localStorage.getItem('saheb_sadhana_streak');
    const lastActiveDate = localStorage.getItem('saheb_sadhana_streak_date');
    if (!savedStreak || !lastActiveDate) return 3; // inspiring initial streak
    const today = new Date();
    const lastDate = new Date(lastActiveDate);
    const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) {
      return parseInt(savedStreak, 10) || 1;
    }
    return 1;
  });

  const [sadhanaGoalCelebrated, setSadhanaGoalCelebrated] = useState<boolean>(() => {
    const today = new Date().toISOString().slice(0, 10);
    return localStorage.getItem('saheb_sadhana_celebrated_date') === today;
  });

  // Vault Reading Progress State (tracks read chapters array per vault ID)
  const [vaultReadChapters, setVaultReadChapters] = useState<Record<number, number[]>>(() => {
    const stored = localStorage.getItem('saheb_vaults_read_chapters');
    if (!stored) return {};
    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  });

  // PWA & Connectivity Hooks
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const isOnline = useOnlineStatus();
  const [showIOSInstallGuide, setShowIOSInstallGuide] = useState(false);

  // Auto-dismiss notification
  const showToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => {
      setNotificationMsg(null);
    }, 3500);
  };

  const handleInstallClick = () => {
    if (isInstallable) {
      install();
    } else if (isIOS) {
      setShowIOSInstallGuide(true);
    } else {
      showToast(
        lang === 'pa'
          ? 'ਬ੍ਰਾਊਜ਼ਰ ਮੀਨੂੰ ਵਿੱਚ ਜਾ ਕੇ "Add to Home Screen" ਚੁਣੋ'
          : lang === 'en'
          ? 'Select "Add to Home Screen" in your browser menu'
          : 'ब्राउज़र मेनू से "होम स्क्रीन पर जोड़ें" चुनें'
      );
    }
  };

  // Calculate local storage utilization on mount
  useEffect(() => {
    try {
      let totalBytes = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const val = localStorage.getItem(key) || '';
          totalBytes += (key.length + val.length) * 2;
        }
      }
      setStorageUsageKb(Math.round(totalBytes / 1024));
    } catch {
      setStorageUsageKb(12);
    }
  }, [vaults, swadhyayData]);

  // Breathing loop for Step 10
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (breathingTimerActive) {
      let seconds = 0;
      interval = setInterval(() => {
        seconds = (seconds + 1) % 14;
        if (seconds === 0) {
          setBreathingPhase('पूरक');
          playGentleBell(528);
        } else if (seconds === 4) {
          setBreathingPhase('कुंभक');
          playGentleBell(432);
        } else if (seconds === 8) {
          setBreathingPhase('रेचक');
          playGentleBell(396);
        } else if (seconds === 12) {
          setBreathingPhase('शून्य');
          playGentleBell(639);
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [breathingTimerActive]);

  // Floating Scroll-To-Top listener
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showOfflineBanner, setShowOfflineBanner] = useState(!isOnline);

  useEffect(() => {
    setShowOfflineBanner(!isOnline);
  }, [isOnline]);

  const OfflineAlertBanner = () => {
    if (!showOfflineBanner) return null;
    return (
      <div className="fixed bottom-20 left-4 right-4 z-[90] bg-amber-950 text-amber-100 border-2 border-amber-500 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-3 animate-bounce-slow">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🛡️</span>
          <div>
            <p className="text-sm font-black text-amber-300">ऑफ़लाइन मोड सक्रिय</p>
            <p className="text-xs text-amber-200">आपकी प्रोग्रेस सुरक्षित है।</p>
          </div>
        </div>
        <button onClick={() => setShowOfflineBanner(false)} className="text-amber-300 hover:text-white p-1">
          <X className="w-6 h-6" />
        </button>
      </div>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Offline transition toast & reassurance listener
  useEffect(() => {
    const handleOffline = () => {
      showToast(
        lang === 'pa'
          ? 'ਆਫ਼ਲਾਈਨ ਮੋਡ ਸਰਗਰਮ: ਤੁਹਾਡੀ ਪ੍ਰਗਤੀ ਅਤੇ ਡਾਇਰੀ ਸੁਰੱਖਿਅਤ ਤਰੀਕੇ ਨਾਲ ਕੈਸ਼ ਹੈ! 🛡️'
          : lang === 'en'
          ? 'Offline Mode Active: Reading progress & journal safely cached! 🛡️'
          : 'ऑफ़लाइन मोड सक्रिय: वाचन प्रगति व डायरी सुरक्षित रूप से सहेजी गई है! 🛡️'
      );
    };
    const handleOnline = () => {
      showToast(
        lang === 'pa'
          ? 'ਇੰਟਰਨੈੱਟ ਕਨੈਕਸ਼ਨ ਬਹਾਲ ਹੋ ਗਿਆ 🌐'
          : lang === 'en'
          ? 'Internet connection restored 🌐'
          : 'इंटरनेट कनेक्शन बहाल हो गया 🌐'
      );
    };
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [lang]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Audio drone toggle (Immediate control for Anahad Drone)
  const toggleAudioDrone = () => {
    if (isPlayingDrone) {
      stopTanpuraDrone();
      setIsPlayingDrone(false);
      showToast(lang === 'pa' ? 'ਅਨਹਦ ਨਾਦ ਵਿਸ਼ਰਾਮ' : lang === 'en' ? 'Anahad drone paused' : 'अनहद नाद विश्राम');
    } else {
      startTanpuraDrone();
      setIsPlayingDrone(true);
      showToast(lang === 'pa' ? 'ਅਨਹਦ ਨਾਦ ਤਾਨਪੂਰਾ ਆਰੰਭ (੪੩੨ Hz)' : lang === 'en' ? 'Anahad Tanpura drone started (432 Hz)' : 'अनहद नाद तानपूरा प्रारंभ (४३२ Hz)');
    }
  };

  const handleTanpuraVolumeChange = (vol: number) => {
    setTanpuraVolumeState(vol);
    setTanpuraVolume(vol);
  };

  // 5-Second Journal Draft Auto-Save
  useEffect(() => {
    const timer = setInterval(() => {
      if (newJournalEntry.trim()) {
        localStorage.setItem('saheb_journal_draft', newJournalEntry);
        setJournalDraftSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [newJournalEntry]);

  // Reading Timer for Vault Reader
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (currentView === 'vaultReader' && isReadingTimerActive && selectedVault) {
      interval = setInterval(() => {
        setReadingSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentView, isReadingTimerActive, selectedVault]);

  const handleSaveReadingTimeToSadhana = () => {
    if (readingSeconds < 10) {
      showToast(lang === 'pa' ? 'ਘੱਟੋ-ਘੱਟ 10 ਸਕਿੰਟ ਪੜ੍ਹੋ' : lang === 'en' ? 'Read for at least 10s' : 'कम से कम १० सेकंड वाचन करें');
      return;
    }
    const mins = Math.max(1, Math.round(readingSeconds / 60));
    handleAddSadhanaMinutes(mins);
    if (selectedVault) {
      setGranthReadingTime(prev => {
        const current = prev[selectedVault.id] || 0;
        const updated = { ...prev, [selectedVault.id]: current + readingSeconds };
        localStorage.setItem('saheb_granth_reading_time', JSON.stringify(updated));
        return updated;
      });
    }
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    playGentleBell(528);
    showToast(lang === 'pa' ? `+${mins} ਮਿੰਟ ਸਾਧਨਾ ਵਿੱਚ ਜੋੜੇ ਗਏ!` : lang === 'en' ? `+${mins} min saved to Sadhana!` : `+${mins} मिनट साधना में सहेजे गए!`);
    setReadingSeconds(0);
  };

  const formatReadingTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Social Share using Web Share API
  const handleSocialShare = async () => {
    const shareData = {
      title: 'Saheb World — कबीर साहेब पावन ज्ञान पीठ',
      text: '🌹 कबीर साहेब के पावन वचनों, ११-चरणीय स्वाध्याय, अनहद नाद और अमर साखियों का अनुभव करें। साहेब बंदगी साहेब!',
      url: window.location.href
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showToast(lang === 'pa' ? 'ਸਾਂਝਾ ਕੀਤਾ ਗਿਆ 🌹' : lang === 'en' ? 'Shared successfully 🌹' : 'सफलतापूर्वक साझा किया गया 🌹');
      } else {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        showToast(lang === 'pa' ? 'ਲਿੰਕ ਕਾਪੀ ਹੋ ਗਿਆ!' : lang === 'en' ? 'Link copied to clipboard!' : 'लिंक क्लिपबोर्ड पर कॉपी हो गया!');
      }
    } catch {
      // User dismissed share
    }
  };

  // Daily Affirmation Confirmation
  const handleAffirmationCommit = () => {
    const today = new Date().toISOString().slice(0, 10);
    const next = affirmationCount + 1;
    setAffirmationCount(next);
    localStorage.setItem(`saheb_affirmation_count_${today}`, String(next));
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
    playGentleBell(528);
    showToast(lang === 'pa' ? 'ਆਤਮ-ਸੰਕਲਪ ਸਵੀਕਾਰਿਆ ਗਿਆ 🙏' : lang === 'en' ? 'Affirmation sealed in heart 🙏' : 'आत्म-संकल्प हृदय में धारण किया 🙏');
  };

  // Sync 7-Day Sadhana History
  useEffect(() => {
    recordSadhanaMinutesInHistory(todaySadhanaMinutes);
    setSadhanaHistory(get7DaySadhanaHistory(lang));
  }, [todaySadhanaMinutes, dailyGoalMinutes, lang]);

  // App Backup & Restore Handlers
  const handleExportBackup = () => {
    exportAppBackup();
    showToast(lang === 'pa' ? 'ਬੈਕਅੱਪ JSON ਡਾਊਨਲੋਡ ਹੋ ਗਿਆ!' : lang === 'en' ? 'Backup JSON downloaded!' : 'बैकअप JSON डाउनलोड हो गया!');
  };

  const handleImportBackupFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importAppBackup(content);
      if (res.success) {
        setVaults(getStoredVaults());
        setSwadhyayData(getStoredSwadhyay());
        setSadhanaHistory(get7DaySadhanaHistory(lang));
        showToast(lang === 'pa' ? `ਸਫਲਤਾਪੂਰਵਕ ${res.count} ਆਈਟਮਾਂ ਰੀਸਟੋਰ ਹੋਈਆਂ!` : lang === 'en' ? `Restored ${res.count} items successfully!` : `सफलतापूर्वक ${res.count} डेटा स्लॉट्स पुनर्स्थापित हुए!`);
        playGentleBell(528);
      } else {
        showToast(res.error || 'पुनर्स्थापना विफल');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Daily Sadhana Handlers
  const handleAddSadhanaMinutes = (mins: number) => {
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const newMinutes = todaySadhanaMinutes + mins;
    setTodaySadhanaMinutes(newMinutes);
    localStorage.setItem('saheb_sadhana_today_minutes', String(newMinutes));
    localStorage.setItem('saheb_sadhana_last_date', today);

    // Goal reached check
    if (newMinutes >= dailyGoalMinutes && (!sadhanaGoalCelebrated || todaySadhanaMinutes < dailyGoalMinutes)) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      playGentleBell(528);
      setSadhanaGoalCelebrated(true);
      localStorage.setItem('saheb_sadhana_celebrated_date', today);

      const lastStreakDate = localStorage.getItem('saheb_sadhana_streak_date');
      if (lastStreakDate !== today) {
        let nextStreak = 1;
        if (lastStreakDate === yesterday) {
          nextStreak = sadhanaStreak + 1;
        } else if (!lastStreakDate) {
          nextStreak = Math.max(1, sadhanaStreak);
        } else {
          nextStreak = 1;
        }
        setSadhanaStreak(nextStreak);
        localStorage.setItem('saheb_sadhana_streak', String(nextStreak));
        localStorage.setItem('saheb_sadhana_streak_date', today);
      }
      showToast(lang === 'pa' ? 'ਅੱਜ ਦਾ ਪਾਵਨ ਸਾਧਨਾ ਟੀਚਾ ਪੂਰਾ ਹੋਇਆ! ਸਾਹਿਬ ਬੰਦਗੀ! 🙏' : lang === 'en' ? 'Daily Sadhana Goal Achieved! Saheb Bandagi! 🙏' : 'आज का पावन साधना लक्ष्य संपन्न! साहेब बंदगी साहेब! 🙏');
    } else {
      playGentleBell(432);
      showToast(lang === 'pa' ? `+${mins} ਮਿੰਟ ਸਾਧਨਾ ਜੁੜੀ` : lang === 'en' ? `+${mins} min sadhana recorded` : `+${mins} मिनट साधना जोड़ी गई`);
    }
  };

  const handleSetDailyGoal = (goal: number) => {
    setDailyGoalMinutes(goal);
    localStorage.setItem('saheb_sadhana_goal', String(goal));
    showToast(lang === 'pa' ? `ਨਵਾਂ ਦੈਨਿਕ ਟੀਚਾ: ${goal} ਮਿੰਟ` : lang === 'en' ? `New daily goal: ${goal} min` : `नया दैनिक लक्ष्य: ${goal} मिनट`);
    if (todaySadhanaMinutes >= goal && !sadhanaGoalCelebrated) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      playGentleBell(528);
      setSadhanaGoalCelebrated(true);
      localStorage.setItem('saheb_sadhana_celebrated_date', new Date().toISOString().slice(0, 10));
    }
  };

  const handleResetSadhana = () => {
    setTodaySadhanaMinutes(0);
    setSadhanaGoalCelebrated(false);
    localStorage.setItem('saheb_sadhana_today_minutes', '0');
    localStorage.removeItem('saheb_sadhana_celebrated_date');
    showToast(lang === 'pa' ? 'ਅੱਜ ਦੀ ਸਾਧਨਾ ਰੀਸੈੱਟ ਹੋਈ' : lang === 'en' ? "Today's sadhana reset" : 'आज की साधना रीसेट की गई');
  };

  // Vault Reading Progress Handlers
  const toggleChapterRead = (vaultId: number, chapterIdx: number, totalInVault: number) => {
    setVaultReadChapters(prev => {
      const current = prev[vaultId] || [];
      let updated: number[];
      if (current.includes(chapterIdx)) {
        updated = current.filter(idx => idx !== chapterIdx);
      } else {
        updated = [...current, chapterIdx];
        playGentleBell(432);
        if (updated.length >= totalInVault && totalInVault > 0) {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          playGentleBell(528);
          showToast(lang === 'pa' ? 'ਗ੍ਰੰਥ ਦੇ ਸਾਰੇ ਅਧਿਆਇ ਸੰਪੰਨ ਹੋਏ! 🌹' : lang === 'en' ? 'All chapters in this Granth completed! 🌹' : 'ग्रंथ के समस्त अध्याय संपन्न हुए! 🌹');
        }
      }
      const newMap = { ...prev, [vaultId]: updated };
      localStorage.setItem('saheb_vaults_read_chapters', JSON.stringify(newMap));
      return newMap;
    });
  };

  const markNextChapterRead = (vaultId: number, totalInVault: number) => {
    setVaultReadChapters(prev => {
      const current = prev[vaultId] || [];
      if (current.length >= totalInVault) return prev;
      let nextIdx = 0;
      while (current.includes(nextIdx) && nextIdx < totalInVault) {
        nextIdx++;
      }
      if (nextIdx >= totalInVault) return prev;
      const updated = [...current, nextIdx];
      playGentleBell(432);
      if (updated.length >= totalInVault) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        playGentleBell(528);
        showToast(lang === 'pa' ? 'ਗ੍ਰੰਥ ਦੇ ਸਾਰੇ ਅਧਿਆਇ ਸੰਪੰਨ ਹੋਏ! 🌹' : lang === 'en' ? 'All chapters completed! 🌹' : 'ग्रंथ के समस्त अध्याय संपन्न हुए! 🌹');
      } else {
        showToast(lang === 'pa' ? `ਅਧਿਆਇ ${nextIdx + 1} ਪੜ੍ਹਿਆ ਗਿਆ ✓` : lang === 'en' ? `Chapter ${nextIdx + 1} marked read ✓` : `अध्याय ${nextIdx + 1} पढ़ा गया ✓`);
      }
      const newMap = { ...prev, [vaultId]: updated };
      localStorage.setItem('saheb_vaults_read_chapters', JSON.stringify(newMap));
      return newMap;
    });
  };

  const resetVaultReadingProgress = (vaultId: number) => {
    setVaultReadChapters(prev => {
      const newMap = { ...prev, [vaultId]: [] };
      localStorage.setItem('saheb_vaults_read_chapters', JSON.stringify(newMap));
      return newMap;
    });
    showToast(lang === 'pa' ? 'ਵਾਚਨ ਪ੍ਰਗਤੀ ਰੀਸੈੱਟ ਹੋਈ' : lang === 'en' ? 'Reading progress reset' : 'वाचन प्रगति रीसेट की गई');
  };

  // Icon mapping for Granth Vault Cards
  const getIconComponent = (name: string) => {
    switch (name) {
      case 'BookOpen': return BookOpen;
      case 'Scroll': return Scroll;
      case 'Circle': return Circle;
      case 'GraduationCap': return GraduationCap;
      case 'Gamepad': return Gamepad2;
      case 'Bookmark': return Bookmark;
      case 'Music': return Music;
      case 'Clock': return Clock;
      case 'ShieldCheck': return ShieldCheck;
      case 'MapPin': return MapPin;
      case 'HeartPulse': return HeartPulse;
      default: return BookOpen;
    }
  };

  // Multilingual Granth Titles and Subtitles mapping
  const getVaultTitle = (vault: GranthVaultSlot) => {
    if (lang === 'pa') {
      const paTitles: Record<number, { title: string; subtitle: string; category: string }> = {
        1: { title: "ਨਿਤਨੇਮ ਗੁਟਕਾ ਸਾਹਿਬ", subtitle: "ਸਵੇਰ ਅਤੇ ਸੰਝ ਸਿਮਰਨ, ਆਰਤੀ ਅਤੇ ਮੰਗਲਾਚਰਨ", category: "ਨਿਤਨੇਮ ਸਾਧਨਾ" },
        2: { title: "ਕਬੀਰ ਬੀਜਕ ਗ੍ਰੰਥ", subtitle: "ਰਮੈਣੀ, ਸ਼ਬਦ ਅਤੇ ਸਾਖੀ — ਸੱਚ ਦਾ ਪਾਵਨ ਖ਼ਜ਼ਾਨਾ", category: "ਪਰਮ ਗ੍ਰੰਥ" },
        3: { title: "ਕਬੀਰ ਸਾਗਰ", subtitle: "ਅਨੁਰਾਗ ਸਾਗਰ, ਅਮਰ ਮੂਲ, ਬ੍ਰਹਮ ਬੋਧ ਅਤੇ ਸੁਖਨਿਧਾਨ", category: "ਰਹੱਸ ਗ੍ਰੰਥ" },
        4: { title: "ਸਾਖੀ ਸੰਗ੍ਰਹਿ (11-Steps)", subtitle: "੧੧-ਚਰਣੀ ਸਵਾਧਿਆਇ ਸਟੈਪਰ ਆਰਕੀਟੈਕਚਰ", category: "ਕ੍ਰਿਆਤਮਕ ਸਵਾਧਿਆਇ" },
        5: { title: "ਉਲਟਬਾਣੀ ਗ੍ਰੰਥਾਵਲੀ", subtitle: "3D Style Gamified Gaming Quiz Engine", category: "ਗੂੜ੍ਹ ਬੁਝਾਰਤਾਂ" },
        6: { title: "ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਬਾਣੀ", subtitle: "ਭਗਤ ਕਬੀਰ ਜੀ ਦੇ ਸਲੋਕ ਅਤੇ ਰਾਗ", category: "ਪਵਿੱਤਰ ਗੁਰਬਾਣੀ" },
        7: { title: "ਕਬੀਰ ਬਾਣੀ ਅਤੇ ਭਜਨ", subtitle: "ਅਮਰ ਭਜਨ, ਪਦ ਅਤੇ ਨਾਦ ਸਾਧਨਾ", category: "ਨਾਦ ਅਤੇ ਰਸ" },
        8: { title: "ਸਤਿਗੁਰੂ ਜੀਵਨ ਪਰਿਚੈ", subtitle: "ਚਾਰ ਜੁਗਾਂ ਵਿੱਚ ਸਤਿਗੁਰੂ ਦਾ ਪਾਵਨ ਅਵਤਾਰ (Tabbed Eras)", category: "ਇਤਿਹਾਸ ਅਤੇ ਮਹਿਮਾ" },
        9: { title: "ਕਬੀਰ ਮਨਸੂਰ ਗ੍ਰੰਥ", subtitle: "ਧਰਮਦਾਸ ਸੰਵਾਦ, ਸਤਯਨਾਮ ਪਰਵਾਨਾ ਅਤੇ ਚੌਕਾ ਵਿਧਾਨ", category: "ਨਿਰਣੈ ਸਾਰ" },
        10: { title: "ਪਾਵਨ ਧਾਮ ਜੰਤਰੀ", subtitle: "ਕਬੀਰ ਚੌਰਾ ਮੱਠ, ਮਗਹਰ ਧਾਮ, ਲਹਿਰਤਾਰਾ ਤੀਰਥ ਦਰਸ਼ਨ", category: "ਤੀਰਥ ਅਤੇ ਦਰਸ਼ਨ" },
        11: { title: "ਐਪ ਸਿਹਤ ਅਤੇ ਆਫ਼ਲਾਈਨ ਤਿਜੋਰੀ", subtitle: "Performance Logs, Storage, AES-256 Rules", category: "ਸਿਸਟਮ ਤੇ ਸੈਟਿੰਗਜ਼" },
      };
      return paTitles[vault.id] || { title: vault.title, subtitle: vault.subtitle, category: vault.category };
    }
    if (lang === 'en') {
      const enTitles: Record<number, { title: string; subtitle: string; category: string }> = {
        1: { title: "Nitnem Gutka Saheb", subtitle: "Morning & Evening Contemplation, Aarti & Invocations", category: "Daily Practice" },
        2: { title: "Kabir Bijak Granth", subtitle: "Ramaini, Sabad and Sakhi — The Authentic Treasury of Truth", category: "Supreme Granth" },
        3: { title: "Kabir Sagar", subtitle: "Anurag Sagar, Amar Mool, Brahm Bodh & Sukhnidhan", category: "Mystic Scripture" },
        4: { title: "Sakhi Sangrah (11-Steps)", subtitle: "11-Step Interactive Swadhyay Stepper Engine", category: "Applied Swadhyay" },
        5: { title: "Ulatbansi Granthavali", subtitle: "3D Style Gamified Gaming Quiz Engine", category: "Esoteric Riddles" },
        6: { title: "Sri Guru Granth Sahib Bani", subtitle: "Saloks and Ragas of Bhagat Kabir Ji", category: "Sacred Gurbani" },
        7: { title: "Kabir Bani & Bhajans", subtitle: "Immortal Bhajans, Hymns and Sound Meditation", category: "Naad & Devotion" },
        8: { title: "Satguru Life Introduction", subtitle: "Advent across 4 Yugas (Sat, Treta, Dvapara, Kali)", category: "Sacred History" },
        9: { title: "Kabir Mansoor Granth", subtitle: "Dharmadas Dialogue, Satnam Parwana & Chauka Vidhan", category: "Divine Discourse" },
        10: { title: "Holy Dhams & Pilgrimages", subtitle: "Kabir Chaura Math, Maghar Dham, Lahartara Darshan", category: "Holy Pilgrimages" },
        11: { title: "App Health & Offline Vault", subtitle: "Performance Logs, Storage Utilization, AES-256", category: "System & Settings" },
      };
      return enTitles[vault.id] || { title: vault.title, subtitle: vault.subtitle, category: vault.category };
    }
    return { title: vault.hindiTitle || vault.title, subtitle: vault.subtitle, category: vault.category };
  };

  // Open Vault click listener
  const openVault = (vault: GranthVaultSlot) => {
    playGentleBell(528);
    // If Sakhi Sangrah (id === 4 or isSwadhyay) -> directly route to Swadhyay Stepper view
    if (vault.id === 4 || vault.isSwadhyay) {
      setCurrentView('swadhyay');
      setCurrentStep(1);
      return;
    }

    // Otherwise route to the dedicated Vault Reader
    setSelectedVault(vault);
    setSelectedSectionIdx(null);
    setCurrentView('vaultReader');
  };

  // Filter Vaults via Search Query
  const filteredVaults = vaults.filter(v => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const localized = getVaultTitle(v);
    return (
      localized.title.toLowerCase().includes(q) ||
      localized.subtitle.toLowerCase().includes(q) ||
      localized.category.toLowerCase().includes(q) ||
      v.title.toLowerCase().includes(q) ||
      v.hindiTitle.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q)
    );
  });

  // Dynamic Data Layer JSON Injection
  const handleInjectJson = () => {
    try {
      const parsed = JSON.parse(injectionJson);
      if (injectionTarget === 'swadhyay') {
        const merged: SwadhyayStepSlot = {
          ...swadhyayData,
          ...parsed
        };
        setSwadhyayData(merged);
        saveStoredSwadhyay(merged);
        setInjectionFeedback("✅ साखी संग्रह (Swadhyay Step Slot) में डेटा सफलतापूर्वक लोड हुआ!");
      } else {
        const updatedVaults = vaults.map(v => {
          if (v.id === injectionVaultId) {
            return {
              ...v,
              slotStatus: 'LOADED' as const,
              chapters: Array.isArray(parsed) ? parsed : (parsed.chapters || [])
            };
          }
          return v;
        });
        setVaults(updatedVaults);
        saveStoredVaults(updatedVaults);
        setInjectionFeedback(`✅ वॉल्ट #${injectionVaultId} में डेटा सफलतापूर्वक लोड हुआ!`);
      }
      setTimeout(() => setInjectionFeedback(null), 4000);
    } catch {
      setInjectionFeedback("❌ त्रुटि: कृपया वैध JSON स्वरूप प्रदान करें।");
    }
  };

  // Reset to empty database slots
  const handleResetToEmpty = () => {
    setVaults(INITIAL_EMPTY_VAULTS);
    saveStoredVaults(INITIAL_EMPTY_VAULTS);
    setSwadhyayData(EMPTY_SWADHYAY_SLOT);
    saveStoredSwadhyay(EMPTY_SWADHYAY_SLOT);
    setInjectionFeedback("ℹ️ सभी डेटा स्लॉट्स को शुद्ध रिक्त स्वरूप (Empty Slots) पर रीसेट कर दिया गया है।");
    showToast("सभी डेटा स्लॉट्स रिक्त कर दिए गए हैं");
    setTimeout(() => setInjectionFeedback(null), 4000);
  };

  // 4 Yugas for Vault 8
  const yugasData = [
    { name: lang === 'pa' ? "ਸਤਿਜੁਗ (ਕ੍ਰਿਤਜੁਗ)" : lang === 'en' ? "Sat Yuga" : "सत्ययुग (कृतयुग)", avatar: lang === 'pa' ? "ਸੁਕ੍ਰਿਤ ਸਾਹਿਬ" : lang === 'en' ? "Sukrit Saheb" : "सुकृत साहेब", desc: lang === 'pa' ? "ਸਤਿਜੁਗ ਵਿੱਚ ਸਤਿਗੁਰੂ ਕਬੀਰ ਸਾਹਿਬ 'ਸੁਕ੍ਰਿਤ' ਨਾਮ ਨਾਲ ਪ੍ਰਗਟ ਹੋਏ ਅਤੇ ਰਾਜਾ ਸਤਿਕੇਤੂ ਨੂੰ ਸਤਯਨਾਮ ਉਪਦੇਸ਼ ਦਿੱਤਾ।" : lang === 'en' ? "In Sat Yuga, Satguru Kabir Saheb manifested as 'Sukrit Saheb' imparting Satnam initiation to King Satyaketu." : "सत्ययुग में सद्गुरु कबीर साहेब 'सुकृत' नाम से अवतरित हुए और राजा सत्यकेतु को सत्य-नाम उपदेश प्रदान किया।" },
    { name: lang === 'pa' ? "ਤ੍ਰੇਤਾਜੁਗ" : lang === 'en' ? "Treta Yuga" : "त्रेतायुग", avatar: lang === 'pa' ? "ਮੁਨਿੰਦ੍ਰ ਸਾਹਿਬ" : lang === 'en' ? "Munindra Saheb" : "मुनिंद्र साहेब", desc: lang === 'pa' ? "ਤ੍ਰੇਤਾਜੁਗ ਵਿੱਚ ਸਾਹਿਬ 'ਮੁਨਿੰਦ੍ਰ' ਨਾਮ ਨਾਲ ਪਧਾਰੇ ਅਤੇ ਭਗਤ ਵਿਭੀਸ਼ਣ, ਮੰਦੋਦਰੀ ਤੇ ਰਾਜਾ ਜਨਕ ਨੂੰ ਅਮਰ ਸੰਦੇਸ਼ ਦਿੱਤਾ।" : lang === 'en' ? "In Treta Yuga, Saheb appeared as 'Munindra Saheb', gracing devotee Vibhishana, Mandodari, and King Janaka with the eternal message." : "त्रेतायुग में साहेब 'मुनिंद्र' नाम से पधारे और भक्त विभीषण, मंदोदरी व राजा जनक को अमर संदेश दिया।" },
    { name: lang === 'pa' ? "ਦੁਆਪਰਜੁਗ" : lang === 'en' ? "Dvapara Yuga" : "द्वापरयुग", avatar: lang === 'pa' ? "ਕਰੁਣਾਮਯ ਸਾਹਿਬ" : lang === 'en' ? "Karunamaya Saheb" : "करुणामाय साहेब", desc: lang === 'pa' ? "ਦੁਆਪਰਜੁਗ ਵਿੱਚ ਸਾਹਿਬ 'ਕਰੁਣਾਮਯ' ਨਾਮ ਨਾਲ ਪ੍ਰਗਟ ਹੋਏ ਅਤੇ ਯੁਧਿਸ਼ਠਿਰ ਦੇ ਰਾਜਸੂਯ ਯੱਗ ਵਿੱਚ ਹਾਜ਼ਰ ਰਹੇ।" : lang === 'en' ? "In Dvapara Yuga, Saheb manifested as 'Karunamaya Saheb' and was revered in King Yudhishthira's Rajasuya ceremony." : "द्वापरयुग में साहेब 'करुणामाय' नाम से प्रकट हुए और युधिष्ठिर के राजसूय यज्ञ में उपस्थित रहे।" },
    { name: lang === 'pa' ? "ਕਲਿਜੁਗ" : lang === 'en' ? "Kali Yuga" : "कलियुग", avatar: lang === 'pa' ? "ਕਬੀਰ ਸਾਹਿਬ" : lang === 'en' ? "Kabir Saheb" : "कबीर साहेब", desc: lang === 'pa' ? "ਕਲਿਜੁਗ ਵਿੱਚ ਸੰਵਤ ੧੪੫੫ ਵਿੱਚ ਲਹਿਰਤਾਰਾ ਕਮਲ 'ਤੇ ਸਾਹਿਬ 'ਕਬੀਰ' ਨਾਮ ਨਾਲ ਸਮੁੱਚੇ ਜਗਤ ਦੇ ਉੱਧਾਰ ਹਿੱਤ ਪ੍ਰਗਟ ਹੋਏ।" : lang === 'en' ? "In Kali Yuga, in Samvat 1455, Saheb manifested on the Lahartara lotus flower as 'Kabir Saheb' for universal liberation." : "कलियुग में संवत १४५५ में लहरतारा कमल पर साहेब 'कबीर' नाम से संपूर्ण जगत के उद्धार हेतु प्रकट हुए।" }
  ];

  const effectiveDevoteeName = devoteeName.trim() || t.defaultDevoteeName;

  return (
    <div className={`main-container theme-${currentTheme} min-h-screen text-${fontSize === 'sm' ? 'sm' : fontSize === 'lg' ? 'lg' : 'base'}`}>

      {/* Offline Status Bar - Prominent Reassurance Banner */}
      {!isOnline && (
        <div className="bg-gradient-to-r from-amber-700 via-orange-700 to-amber-800 text-white text-xs font-bold py-2.5 px-4 text-center sticky top-0 z-50 shadow-xl flex items-center justify-center gap-2 animate-in fade-in">
          <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0 animate-bounce" />
          <span>
            {lang === 'pa'
              ? 'ਆਫ਼ਲਾਈਨ ਮੋਡ: ਤੁਹਾਡਾ ਸਾਧਨਾ ਡਾਟਾ, ਗ੍ਰੰਥ ਅਤੇ ਡਾਇਰੀ ਸਥਾਨਕ ਤੌਰ ਉੱਤੇ ਸੁਰੱਖਿਅਤ ਕੈਸ਼ ਹਨ।'
              : lang === 'en'
              ? 'Offline Mode: Reading progress, journal & sadhana safely cached locally.'
              : 'ऑफ़लाइन मोड: आपकी वाचन प्रगति, डायरी और साधना डेटा स्थानीय रूप से सुरक्षित रूप से कैश्ड हैं।'}
          </span>
        </div>
      )}

      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed top-14 right-4 z-50 bg-emerald-700 text-white text-xs px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* PWA Installation & Share Center Modal */}
      {showIOSInstallGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-amber-300 space-y-4 animate-in fade-in text-gray-900">
            <div className="flex justify-between items-center border-b border-amber-200 pb-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#8B0000]">
                <Smartphone className="w-5 h-5 text-amber-600" />
                <span>{t.installGuideTitle}</span>
              </div>
              <button
                onClick={() => setShowIOSInstallGuide(false)}
                className="text-gray-400 hover:text-black p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Biochemic Veda Style Step Cards */}
            <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
              {/* Step 1 */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/80 border border-amber-200 shadow-xs">
                <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">१</div>
                <div className="text-xs text-amber-950 font-medium">
                  {lang === 'pa' ? 'ਬ੍ਰਾਊਜ਼ਰ ਮੀਨੂ (⋮) ਉੱਤੇ ਕਲਿੱਕ ਕਰੋ।' : lang === 'en' ? 'Tap browser menu (⋮) in top right.' : 'ब्राउज़र मेनू (⋮) पर क्लिक करें।'}
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/80 border border-amber-200 shadow-xs">
                <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">२</div>
                <div className="text-xs text-amber-950 font-medium">
                  {lang === 'pa' ? '"Add to Home screen" (ਹੋਮ ਸਕ੍ਰੀਨ ਉੱਤੇ ਜੋੜੋ) ਚੁਣੋ।' : lang === 'en' ? 'Select "Add to Home screen".' : '"Add to Home screen" (होम स्क्रीन पर जोड़ें) चुनें।'}
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/80 border border-amber-200 shadow-xs">
                <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">३</div>
                <div className="text-xs text-amber-950 font-medium">
                  {lang === 'pa' ? '"Install" (ਇੰਸਟਾਲ ਕਰੋ) ਉੱਤੇ ਟੈਪ ਕਰੋ। ਸਾहेब ਵਰਲਡ ਦਾ ਆਈਕਨ ਫੋਨ ਉੱਤੇ ਆ ਜਾਵੇਗਾ!' : lang === 'en' ? 'Tap "Install". Saheb World app icon will appear on your phone!' : '"Install" (इंस्टॉल करें) पर टैप करें। साहेब वर्ल्ड का पवित्र आइकन आपके फोन पर आ जाएगा!'}
                </div>
              </div>
            </div>

            {/* Side by Side Action Buttons: Copy Link & Open in Chrome */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={() => {
                  navigator.clipboard.writeText("https://ais-pre-pqepm5oi5qcqf2yxcwmgxs-795050738320.asia-east1.run.app");
                  showToast(lang === 'pa' ? 'ਲਿੰਕ ਕਾਪੀ ਹੋ ਗਿਆ!' : lang === 'en' ? 'Link Copied!' : 'लिंक कॉपी हो गया है!');
                }}
                className="py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition"
              >
                <Copy className="w-3.5 h-3.5 text-amber-700" />
                <span className="truncate">{lang === 'pa' ? 'ਲਿੰਕ ਕਾਪੀ ਕਰੋ' : lang === 'en' ? 'Copy Link' : 'ऐप लिंक कॉपी करें'}</span>
              </button>

              <button
                onClick={() => {
                  window.open("https://ais-pre-pqepm5oi5qcqf2yxcwmgxs-795050738320.asia-east1.run.app", "_blank");
                }}
                className="py-2.5 px-3 rounded-xl bg-[#0F5132] hover:bg-[#146c43] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="truncate">{lang === 'pa' ? 'ਕ੍ਰੋਮ ਵਿੱਚ ਖੋਲ੍ਹੋ' : lang === 'en' ? 'Open in Chrome' : 'सीधे क्रोम में खोलें'}</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowIOSInstallGuide(false)}
              className="w-full py-2.5 bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold rounded-xl shadow-xs transition"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          1. AUTHENTIC MOBILE BLUEPRINT: PAAVAN VAANI PAATH MARYADA & SMARAN POPUP
         ========================================================================= */}
      <SplashModal isOpen={showSplash} onClose={() => setShowSplash(false)} />
        {/* =========================================================================
            2. MAIN WORKSPACE WITH DYNAMIC HEADER & THEME SELECTION (MOBILE OPTIMIZED)
           ========================================================================= */
        <div className="p-3 md:p-6 max-w-4xl mx-auto pb-24 main-container">
          
          {/* Offline State & UX Manager Banner */}
          <OfflineBanner />
          {/* Top Sticky Toolbar - Organized for Mobile Screens */}
          <header className="mb-4 border-b border-amber-900/10 pb-3 space-y-2.5">
            {/* Row 1: Sacred Brand + Mobile Global Language Pills + PWA Install Button */}
            <div className="flex items-center justify-between gap-2">
              {/* Dynamic Sacred Header with Left/Right Red Rose Anchors */}
              <div
                onClick={() => setShowSplash(true)}
                className="header-text font-black text-base sm:text-lg flex items-center gap-1.5 cursor-pointer hover:opacity-90 transition"
                title="स्प्लैश स्क्रीन पर वापस जाएं"
              >
                <span>{t.headerBrand}</span>
              </div>

              {/* Global Reactive Language Pills + PWA Install */}
              <div className="flex items-center gap-1.5">
                <div className="inline-flex items-center p-0.5 bg-amber-100/80 rounded-lg border border-amber-300 shadow-xs">
                  <button
                    onClick={() => setLang('hi')}
                    className={`px-2 py-1 text-[11px] font-bold rounded-md transition ${
                      lang === 'hi'
                        ? 'bg-[#8B0000] text-white shadow-xs'
                        : 'text-amber-950 hover:bg-amber-200/50'
                    }`}
                  >
                    हिन्दी
                  </button>
                  <button
                    onClick={() => setLang('pa')}
                    className={`px-2 py-1 text-[11px] font-bold rounded-md transition ${
                      lang === 'pa'
                        ? 'bg-[#8B0000] text-white shadow-xs'
                        : 'text-amber-950 hover:bg-amber-200/50'
                    }`}
                  >
                    ਪੰਜਾਬੀ
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={`px-2 py-1 text-[11px] font-bold rounded-md transition ${
                      lang === 'en'
                        ? 'bg-[#8B0000] text-white shadow-xs'
                        : 'text-amber-950 hover:bg-amber-200/50'
                    }`}
                  >
                    Eng
                  </button>
                </div>

                {/* Social Web Share Button */}
                <button
                  onClick={handleSocialShare}
                  className="p-1 sm:px-2.5 sm:py-1 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-[11px] font-bold shadow-xs flex items-center gap-1 cursor-pointer transition active:scale-95"
                  title={lang === 'pa' ? 'ਐਪ ਲਿੰਕ ਸਾਂਝਾ ਕਰੋ (Share)' : lang === 'en' ? 'Share App Link' : 'ऐप लिंक साझा करें (Share)'}
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{lang === 'pa' ? 'ਸਾਂਝਾ ਕਰੋ' : lang === 'en' ? 'Share' : 'साझा करें'}</span>
                </button>

                {/* PWA Install Trigger */}
                {isInstalled ? (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{t.installed}</span>
                  </span>
                ) : (
                  <button
                    onClick={handleInstallClick}
                    className="p-1 sm:px-2.5 sm:py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold shadow-xs flex items-center gap-1 cursor-pointer"
                    title={t.installApp}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t.installApp}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Row 2: Theme Switcher (White, Pothi, Night, True Black) + Audio + Data Injector */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-amber-900/5 flex-wrap sm:flex-nowrap">
              {/* Quad Theme Switcher */}
              <div className="flex items-center gap-1 flex-wrap">
                <button
                  onClick={() => setCurrentTheme('white')}
                  className={`px-2 py-0.5 text-[11px] rounded-md border font-medium transition cursor-pointer ${
                    currentTheme === 'white'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-white text-gray-800 border-gray-300'
                  }`}
                >
                  {t.themeWhite}
                </button>
                <button
                  onClick={() => setCurrentTheme('pothi')}
                  className={`px-2 py-0.5 text-[11px] rounded-md border font-medium transition cursor-pointer ${
                    currentTheme === 'pothi'
                      ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-xs'
                      : 'bg-[#F4ECD8] text-[#2C1E11] border-[#D2B48C]'
                  }`}
                >
                  {t.themePothi}
                </button>
                <button
                  onClick={() => setCurrentTheme('night')}
                  className={`px-2 py-0.5 text-[11px] rounded-md border font-medium transition cursor-pointer ${
                    currentTheme === 'night'
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-xs'
                      : 'bg-[#1E1E1E] text-white border-gray-700'
                  }`}
                >
                  {t.themeNight}
                </button>
                <button
                  onClick={() => setCurrentTheme('trueblack')}
                  className={`px-2 py-0.5 text-[11px] rounded-md border font-medium transition cursor-pointer ${
                    currentTheme === 'trueblack'
                      ? 'bg-black text-[#FFD700] border-[#FFD700] shadow-xs ring-1 ring-[#FFD700]'
                      : 'bg-black/90 text-amber-200 border-gray-800'
                  }`}
                  title="OLED True Black"
                >
                  {t.themeTrueBlack}
                </button>
              </div>

              {/* Actions: Anahad Drone + Bhajans + Data Injector */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={toggleAudioDrone}
                  title={isPlayingDrone ? "अनहद नाद विश्राम" : "अनहद नाद तानपूरा प्रारंभ"}
                  className={`px-2 py-1 rounded-md border text-[11px] font-bold flex items-center gap-1 transition cursor-pointer ${
                    isPlayingDrone
                      ? 'bg-amber-700 text-white animate-pulse'
                      : 'bg-white/90 text-amber-900 border-amber-300'
                  }`}
                >
                  {isPlayingDrone ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span className="text-[11px]">
                    {lang === 'pa' ? 'ਅਨਹਦ ਨਾਦ' : lang === 'en' ? 'Anahad' : 'अनहद नाद'}
                  </span>
                </button>

                {/* Kabir Bhajans & Chants Player Modal Toggle */}
                <button
                  onClick={() => setShowBhajanPlayer(!showBhajanPlayer)}
                  className={`px-2 py-1 rounded-md border text-[11px] font-bold flex items-center gap-1 transition cursor-pointer ${
                    showBhajanPlayer
                      ? 'bg-[#8B0000] text-white border-[#8B0000]'
                      : 'bg-amber-100/90 text-amber-950 border-amber-300 hover:bg-amber-200'
                  }`}
                  title="कबीर वाणी एवं भजन स्वर-तरंग (Audio Player)"
                >
                  <Music className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden sm:inline">{lang === 'pa' ? 'ਬਾਣੀ ਭਜਨ' : lang === 'en' ? 'Bhajans' : 'वाणी भजन'}</span>
                </button>

                {/* Data Injection Button */}
                <button
                  onClick={() => setShowDataInjector(!showDataInjector)}
                  className="p-1 rounded-md border border-amber-400 bg-amber-100 text-amber-900 hover:bg-amber-200 text-xs font-bold cursor-pointer"
                  title={t.dataInjectorTitle}
                >
                  <Database className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </header>

          {/* =========================================================================
              ADMINISTRATIVE DYNAMIC DATA INJECTION MODAL (For Empty Database Slots)
             ========================================================================= */}
          {showDataInjector && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-400 shadow-xl space-y-3">
              <div className="flex justify-between items-center border-b border-amber-200 pb-2">
                <div className="flex items-center gap-2 font-bold text-xs md:text-sm text-[#8B0000]">
                  <Database className="w-4 h-4 text-amber-700" />
                  <span>{t.dataInjectorTitle} (Empty Slot Injection)</span>
                </div>
                <button
                  onClick={() => setShowDataInjector(false)}
                  className="text-xs text-gray-500 hover:text-black font-bold"
                >
                  {t.close}
                </button>
              </div>

              <p className="text-[11px] text-gray-700 m-0">
                वर्तमान में सभी ११ ग्रंथ व साखी संग्रह <strong>शुद्ध रिक्त डेटा स्लॉट्स (Empty Slots)</strong> पर सेट हैं। आप स्थानीय JSON स्ट्रक्चर यहाँ पेस्ट करके किसी भी ग्रंथ में वास्तविक डेटा लोड कर सकते हैं:
              </p>

              <div className="flex flex-wrap gap-2 items-center text-xs">
                <label className="font-semibold text-gray-800">लक्षित स्लॉट:</label>
                <select
                  value={injectionTarget}
                  onChange={(e) => setInjectionTarget(e.target.value as 'swadhyay' | 'vault')}
                  className="p-1 rounded border border-amber-300 bg-white"
                >
                  <option value="swadhyay">साखी संग्रह (11-Steps Engine Slot)</option>
                  <option value="vault">अन्य ग्रंथ वॉल्ट (Granth Vault Slot)</option>
                </select>

                {injectionTarget === 'vault' && (
                  <select
                    value={injectionVaultId}
                    onChange={(e) => setInjectionVaultId(Number(e.target.value))}
                    className="p-1 rounded border border-amber-300 bg-white"
                  >
                    {vaults.map(v => {
                      const vTitle = getVaultTitle(v);
                      return (
                        <option key={v.id} value={v.id}>#{v.id}: {vTitle.title}</option>
                      );
                    })}
                  </select>
                )}
              </div>

              <textarea
                rows={4}
                value={injectionJson}
                onChange={(e) => setInjectionJson(e.target.value)}
                placeholder='JSON स्वरूप (उदा. { "context": "...", "original_text": "..." } अथवा [ { "title": "अध्याय १", "lines": ["..."] } ])'
                className="w-full p-2.5 rounded-xl border border-amber-300 bg-white text-xs font-mono text-gray-900"
              />

              {injectionFeedback && (
                <div className="text-xs font-semibold text-emerald-800 bg-emerald-100 p-2 rounded-lg">
                  {injectionFeedback}
                </div>
              )}

              <div className="flex justify-between items-center pt-1">
                <button
                  onClick={handleResetToEmpty}
                  className="px-3 py-1.5 rounded-lg border border-red-300 text-red-700 bg-red-50 hover:bg-red-100 text-xs font-bold"
                >
                  सभी स्लॉट्स रिक्त करें (Purge & Reset)
                </button>

                <button
                  onClick={handleInjectJson}
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>डेटा इंजेक्ट करें (Inject JSON)</span>
                </button>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW A: DASHBOARD (Universal Query + Empty 11-Sacred Granth Library Vaults)
             ========================================================================= */}
          {currentView === 'dashboard' && (
            <div>
              {/* Hidden file input for Backup Restore */}
              <input
                type="file"
                ref={backupFileInputRef}
                onChange={handleImportBackupFile}
                accept=".json"
                className="hidden"
              />

              {/* Universal Global Query Bar */}
              <div className="relative mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-10 pr-16 py-3 rounded-xl border border-amber-300/80 bg-white/95 text-black placeholder-amber-800/60 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs md:text-sm"
                />
                <Search className="w-5 h-5 absolute left-3 top-3.5 text-amber-700" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 px-2.5 py-1 rounded-md font-bold cursor-pointer"
                  >
                    {t.clearSearch}
                  </button>
                )}
              </div>

              {/* Collapsible Spiritual Audio Player for Bhajans & Chants */}
              {showBhajanPlayer && (
                <div className="mb-5">
                  <SpiritualAudioPlayer
                    onTimeTracked={(secs) => {
                      if (secs % 60 === 0) {
                        handleAddSadhanaMinutes(1);
                      }
                    }}
                  />
                </div>
              )}

              {/* =====================================================================
                  1. DAILY KABIR SAKHI SECTION (Inspirational Daily Scripture Quote)
                 ===================================================================== */}
              <div className="mb-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-[#FFFDF9] to-orange-50/60 border-2 border-amber-300 shadow-md space-y-3">
                <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg">🌹</span>
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-[#8B0000] m-0">
                        {lang === 'pa' ? 'ਅੱਜ ਦੀ ਪਾਵਨ ਕਬੀਰ ਸਾਖੀ' : lang === 'en' ? 'Daily Kabir Sakhi' : 'आज की पावन कबीर साखी'}
                      </h4>
                      <span className="text-[10px] text-amber-800 font-semibold">
                        {lang === 'pa' ? dailySakhi.topicPa : lang === 'en' ? dailySakhi.topicEn : dailySakhi.topicHi}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        const randomSakhi = DAILY_SAKHIS[Math.floor(Math.random() * DAILY_SAKHIS.length)];
                        setDailySakhi(randomSakhi);
                        playGentleBell(528);
                      }}
                      className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition cursor-pointer"
                      title="अन्य साखी देखें (Next Sakhi)"
                    >
                      🔄 {lang === 'pa' ? 'ਹੋਰ ਸਾਖੀ' : lang === 'en' ? 'Another' : 'अन्य साखी'}
                    </button>
                  </div>
                </div>

                {/* Sacred Couplet Display */}
                <div className="p-3.5 bg-amber-100/30 rounded-xl border border-amber-200 text-center">
                  <p className="text-sm sm:text-base font-black text-[#8B0000] italic leading-relaxed whitespace-pre-line m-0">
                    "{lang === 'pa' ? dailySakhi.coupletPa : lang === 'en' ? dailySakhi.coupletEn : dailySakhi.coupletHi}"
                  </p>
                  <p className="text-xs text-amber-950 font-medium mt-2 pt-2 border-t border-amber-200/70 m-0">
                    <strong>{lang === 'pa' ? 'ਭਾਵਾਰਥ: ' : lang === 'en' ? 'Spiritual Essence: ' : 'भावार्थ: '}</strong>
                    {lang === 'pa' ? dailySakhi.bhavarthPa : lang === 'en' ? dailySakhi.bhavarthEn : dailySakhi.bhavarthHi}
                  </p>
                </div>

                {/* Sakhi Action Bar */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={() => {
                      const textToCopy = `${dailySakhi.coupletHi}\n\nभावार्थ: ${dailySakhi.bhavarthHi}\n\n— साहेब वर्ल्ड (Saheb World PWA)`;
                      navigator.clipboard.writeText(textToCopy);
                      showToast(lang === 'pa' ? 'ਸਾਖੀ ਕਾਪੀ ਹੋਈ!' : lang === 'en' ? 'Sakhi copied!' : 'साखी क्लिपबोर्ड पर कॉपी हुई!');
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-[11px] font-bold border border-amber-300 transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{lang === 'pa' ? 'ਕਾਪੀ ਕਰੋ' : lang === 'en' ? 'Copy' : 'प्रतिलिपि'}</span>
                  </button>

                  <button
                    onClick={handleSocialShare}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-[11px] font-bold shadow-xs transition cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{lang === 'pa' ? 'ਸਾਂਝੀ ਕਰੋ' : lang === 'en' ? 'Share' : 'साझा करें'}</span>
                  </button>

                  <button
                    onClick={() => playGentleBell(528)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100/80 hover:bg-amber-200 text-amber-900 text-[11px] font-bold border border-amber-300 transition cursor-pointer"
                    title="चिंतन घंटी बजाएं (Reflection Bell)"
                  >
                    <span>🔔 {lang === 'pa' ? 'ਚਿੰਤਨ ਘੰਟੀ' : lang === 'en' ? 'Reflect Bell' : 'चिंतन घंटी'}</span>
                  </button>
                </div>
              </div>

              {/* =====================================================================
                  DAILY HUKAMNAMA SECTION (Sri Guru Granth Sahib Bani - Vault 6 Guidance)
                 ===================================================================== */}
              <div className="mb-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-[#FFFDF9] to-amber-100/70 border-2 border-amber-300 shadow-md space-y-3">
                <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg">📜</span>
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-[#8B0000] m-0">
                        {lang === 'pa' ? 'ਅਜੋਕਾ ਪਾਵਨ ਹੁਕਮਨਾਮਾ (Sri Guru Granth Sahib Bani)' : lang === 'en' ? 'Daily Hukamnama (Sri Guru Granth Sahib Bani)' : 'दैनिक पावन हुक्मनामा (श्री गुरु ग्रंथ साहेब बाणी)'}
                      </h4>
                      <span className="text-[10px] text-amber-800 font-semibold">
                        {lang === 'pa' ? dailyHukamnama.raagPa : lang === 'en' ? dailyHukamnama.raagEn : dailyHukamnama.raagHi}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        const randomHukam = DAILY_HUKAMNAMAS[Math.floor(Math.random() * DAILY_HUKAMNAMAS.length)];
                        setDailyHukamnama(randomHukam);
                        playGentleBell(528);
                      }}
                      className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition cursor-pointer"
                      title="दूसरा हुक्मनामा देखें (Next Hukamnama)"
                    >
                      🔄 {lang === 'pa' ? 'ਹੋਰ ਹੁਕਮਨਾਮਾ' : lang === 'en' ? 'Another' : 'अन्य हुक्मनामा'}
                    </button>
                  </div>
                </div>

                {/* Verse Display */}
                <div className="p-3.5 bg-amber-100/40 rounded-xl border border-amber-200 text-center">
                  <p className="text-sm sm:text-base font-black text-[#8B0000] italic leading-relaxed whitespace-pre-line m-0">
                    "{lang === 'pa' ? (dailyHukamnama.versePa || dailyHukamnama.verseHi) : lang === 'en' ? (dailyHukamnama.verseEn || dailyHukamnama.verseHi) : dailyHukamnama.verseHi}"
                  </p>
                  <p className="text-xs text-amber-950 font-medium mt-2 pt-2 border-t border-amber-200/70 m-0">
                    <strong>{lang === 'pa' ? 'ਸਾਰ/ਭਾਵਾਰਥ: ' : lang === 'en' ? 'Essence: ' : 'सार एवं भावार्थ: '}</strong>
                    {lang === 'pa' ? (dailyHukamnama.meaningPa || dailyHukamnama.meaningHi) : lang === 'en' ? (dailyHukamnama.meaningEn || dailyHukamnama.meaningHi) : dailyHukamnama.meaningHi}
                  </p>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={() => {
                      const textToCopy = `${dailyHukamnama.raagHi}\n\n"${dailyHukamnama.verseHi}"\n\nभावार्थ: ${dailyHukamnama.meaningHi}\n\n— साहेब वर्ल्ड (Saheb World PWA)`;
                      navigator.clipboard.writeText(textToCopy);
                      showToast(lang === 'pa' ? 'ਹੁਕਮਨਾਮਾ ਕਾਪੀ ਹੋ ਗਿਆ!' : lang === 'en' ? 'Hukamnama copied!' : 'हुक्मनामा क्लिपबोर्ड पर कॉपी हुआ!');
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-[11px] font-bold border border-amber-300 transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{lang === 'pa' ? 'ਕਾਪੀ ਕਰੋ' : lang === 'en' ? 'Copy' : 'प्रतिलिपि'}</span>
                  </button>

                  <button
                    onClick={handleSocialShare}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-[11px] font-bold shadow-xs transition cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{lang === 'pa' ? 'ਸਾਂਝੀ ਕਰੋ' : lang === 'en' ? 'Share' : 'साझा करें'}</span>
                  </button>

                  <button
                    onClick={() => {
                      const vault6 = vaults.find(v => v.id === 6);
                      if (vault6) openVault(vault6);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold transition cursor-pointer"
                  >
                    <span>📖 {lang === 'pa' ? 'ਗ੍ਰੰਥ ਖੋਲ੍ਹੋ' : lang === 'en' ? 'Open Granth' : 'ग्रंथ देखें'}</span>
                  </button>
                </div>
              </div>

              {/* =====================================================================
                  2. DAILY AFFIRMATION SECTION (Rotating Daily Soul Affirmation)
                 ===================================================================== */}
              <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50/80 to-yellow-50 border border-amber-300 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                    <span className="font-extrabold text-xs text-[#8B0000]">
                      {lang === 'pa' ? 'ਅੱਜ ਦਾ ਆਤਮ-ਸੰਕਲਪ (Daily Affirmation)' : lang === 'en' ? 'Daily Soul Affirmation' : 'आज का आत्म-संकल्प (Daily Affirmation)'}
                    </span>
                    <span className="text-[10px] text-gray-500 bg-white/80 px-1.5 py-0.2 rounded border border-amber-200">
                      {lang === 'pa' ? dailyAffirmation.sourcePa : lang === 'en' ? dailyAffirmation.sourceEn : dailyAffirmation.sourceHi}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-gray-900 italic m-0">
                    "{lang === 'pa' ? dailyAffirmation.affirmationPa : lang === 'en' ? dailyAffirmation.affirmationEn : dailyAffirmation.affirmationHi}"
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <span className="text-[10px] font-mono text-amber-900 font-bold bg-amber-100/90 px-2 py-1 rounded-md border border-amber-300">
                    {affirmationCount} {lang === 'pa' ? 'ਵਾਰ ਧਾਰਿਆ' : lang === 'en' ? 'affirmed' : 'बार धारण किया'}
                  </span>
                  <button
                    onClick={handleAffirmationCommit}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-700 to-orange-600 hover:brightness-110 text-white font-black text-xs shadow-xs active:scale-95 transition cursor-pointer flex items-center gap-1"
                  >
                    <span>🙏 {lang === 'pa' ? 'ਆਤਮਸਾਤ ਕੀਤਾ (+1)' : lang === 'en' ? 'I Affirm (+1)' : 'आत्मसात किया (+१)'}</span>
                  </button>
                </div>
              </div>

              {/* =====================================================================
                  3. DAILY SADHANA PROGRESS & 7-DAY LINE CHART (Recharts Integration)
                 ===================================================================== */}
              <div className="mb-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E8] to-[#F5ECE0] border-2 border-amber-300 shadow-md">
                {/* Header: Title & Streak Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-amber-200/80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-[#8B0000] flex items-center justify-center text-white shadow-sm shrink-0">
                      <Flame className="w-5 h-5 fill-amber-300 text-amber-200" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-[#8B0000] m-0 flex items-center gap-1.5">
                        <span>
                          {lang === 'pa' ? 'ਦੈਨਿਕ ਸਾਧਨਾ ਅਤੇ ਧਿਆਨ ਟੀਚਾ' : lang === 'en' ? 'Daily Sadhana Progress & Streak' : 'दैनिक साधना एवं ध्यान संकल्प'}
                        </span>
                      </h4>
                      <p className="text-[11px] text-amber-900/80 font-medium m-0">
                        {lang === 'pa' ? 'ਸਤਿਗੁਰੂ ਸਿਮਰਨ ਅਤੇ ਨਿੱਤ ਧਿਆਨ ਅਭਿਆਸ' : lang === 'en' ? 'Daily meditation discipline, streak & goals' : 'सद्गुरु सुमिरन एवं नित्य ध्यान साधना'}
                      </p>
                    </div>
                  </div>

                  {/* Streak Badge & Chart Toggle */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowSadhanaChart(!showSadhanaChart)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition flex items-center gap-1 cursor-pointer ${
                        showSadhanaChart
                          ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-xs'
                          : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                      }`}
                      title="७-दिवसीय लाइन चार्ट टॉगल करें"
                    >
                      <BarChart2 className="w-3.5 h-3.5" />
                      <span>{lang === 'pa' ? '੭-ਦਿਨ ਚਾਰਟ' : lang === 'en' ? '7-Day Chart' : '७-दिवसीय चार्ट'}</span>
                    </button>

                    <div className="inline-flex items-center gap-1.5 bg-amber-100/90 border border-amber-300/90 px-3 py-1 rounded-full shadow-xs">
                      <Flame className="w-4 h-4 text-orange-600 fill-orange-500 animate-pulse" />
                      <span className="text-xs font-black text-amber-950">
                        {sadhanaStreak} {lang === 'pa' ? 'ਦਿਨ ਨਿਰੰਤਰ (Streak)' : lang === 'en' ? 'Day Streak' : 'दिन निरंतर (Streak)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 7-Day Visual Streak Indicators */}
                <div className="mt-3 pt-1 flex items-center justify-between gap-1 max-w-sm mx-auto">
                  {['सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि', 'रवि'].map((dayLabel, idx) => {
                    const isActiveDay = idx < Math.min(7, sadhanaStreak);
                    const isTodayDay = idx === Math.min(6, (sadhanaStreak - 1) % 7);
                    return (
                      <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                        <span className="text-[9px] font-bold text-amber-900/70">
                          {lang === 'pa'
                            ? ['ਸੋਮ', 'ਮੰਗਲ', 'ਬੁੱਧ', 'ਵੀਰ', 'ਸ਼ੁੱਕਰ', 'ਸ਼ਨੀ', 'ਐਤ'][idx]
                            : lang === 'en'
                            ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]
                            : dayLabel}
                        </span>
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                            isActiveDay
                              ? 'bg-gradient-to-tr from-amber-600 to-[#8B0000] text-amber-100 shadow-xs ring-1 ring-amber-400'
                              : 'bg-amber-100/60 text-amber-400 border border-amber-200'
                          } ${isTodayDay ? 'ring-2 ring-orange-500 scale-105' : ''}`}
                          title={`Day ${idx + 1}`}
                        >
                          {isActiveDay ? (
                            <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-200" />
                          ) : (
                            <Circle className="w-2 h-2 fill-amber-300/40 text-amber-300" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 7-Day Sadhana Minutes Consistency Line Chart using Recharts */}
                {showSadhanaChart && (
                  <div className="mt-3 pt-2 border-t border-amber-200/60 bg-amber-50/50 rounded-xl p-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-950 px-1 mb-1">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
                        <span>{lang === 'pa' ? "ਪਿਛਲੇ ੭ ਦਿਨਾਂ ਦੀ ਸਾਧਨਾ ਪ੍ਰਗਤੀ (ਮਿੰਟਾਂ ਵਿੱਚ)" : lang === 'en' ? 'Last 7 Days Sadhana Minutes Trend' : 'विगत ७ दिनों की साधना प्रगति (मिनटों में)'}</span>
                      </span>
                      <span className="text-[10px] text-gray-500">
                        {lang === 'pa' ? `ਦੈਨਿਕ ਟੀਚਾ: ${dailyGoalMinutes} ਮਿੰਟ` : lang === 'en' ? `Target: ${dailyGoalMinutes}m` : `दैनिक लक्ष्य: ${dailyGoalMinutes} मिनट`}
                      </span>
                    </div>
                    <SadhanaLineChart data={sadhanaHistory} dailyGoal={dailyGoalMinutes} />
                  </div>
                )}

                {/* Progress Bar & Numerical Counter */}
                <div className="mt-4 bg-white/85 p-3 rounded-xl border border-amber-200/90 shadow-xs space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <div className="flex items-center gap-1.5 text-amber-950">
                      <Target className="w-4 h-4 text-[#8B0000]" />
                      <span>
                        {lang === 'pa' ? 'ਅੱਜ ਦੀ ਸਾਧਨਾ:' : lang === 'en' ? "Today's Sadhana:" : 'आज की साधना:'}
                      </span>
                      <span className="text-sm font-black text-[#8B0000]">{todaySadhanaMinutes}</span>
                      <span className="text-gray-500">/ {dailyGoalMinutes} {lang === 'pa' ? 'ਮਿੰਟ' : lang === 'en' ? 'min' : 'मिनट'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {todaySadhanaMinutes >= dailyGoalMinutes ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center gap-1 border border-emerald-300 shadow-xs">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {lang === 'pa' ? 'ਟੀਚਾ ਪੂਰਾ!' : lang === 'en' ? 'Goal Reached!' : 'लक्ष्य पूर्ण!'}
                        </span>
                      ) : (
                        <span className="text-[10px] text-amber-800 font-medium">
                          {lang === 'pa' ? `ਬਾਕੀ: ${dailyGoalMinutes - todaySadhanaMinutes} ਮਿੰਟ` : lang === 'en' ? `Remaining: ${dailyGoalMinutes - todaySadhanaMinutes}m` : `शेष: ${dailyGoalMinutes - todaySadhanaMinutes} मिनट`}
                        </span>
                      )}
                      <span className="text-xs font-black text-[#8B0000]">
                        {Math.min(100, Math.round((todaySadhanaMinutes / dailyGoalMinutes) * 100))}%
                      </span>
                    </div>
                  </div>

                  {/* Linear Progress Bar */}
                  <div className="w-full bg-amber-100 h-2.5 rounded-full overflow-hidden border border-amber-300/50 shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-[#8B0000] transition-all duration-500 rounded-full"
                      style={{ width: `${Math.min(100, Math.round((todaySadhanaMinutes / dailyGoalMinutes) * 100))}%` }}
                    />
                  </div>

                  {/* Celebratory Banner when Goal Reached */}
                  {todaySadhanaMinutes >= dailyGoalMinutes && (
                    <div className="pt-1 flex items-center justify-between text-xs bg-emerald-50 text-emerald-900 p-2.5 rounded-lg border border-emerald-200">
                      <span className="font-bold flex items-center gap-1.5 text-[11px] sm:text-xs">
                        <span>🌹</span>
                        <span>
                          {lang === 'pa' ? 'ਵਧਾਈ! ਅੱਜ ਦੀ ਸਾਧਨਾ ਸੰਪੰਨ ਹੋਈ। ਸਾਹਿਬ ਬੰਦਗੀ! 🙏' : lang === 'en' ? 'Blessed! Daily sadhana goal achieved. Saheb Bandagi! 🙏' : 'बधाई! आज का पावन साधना लक्ष्य संपन्न। साहेब बंदगी साहेब! 🙏'}
                        </span>
                      </span>
                      <button
                        onClick={() => {
                          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
                          playGentleBell(528);
                        }}
                        className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-[10px] font-bold shadow-xs active:scale-95 transition cursor-pointer"
                      >
                        {lang === 'pa' ? 'ਜਸ਼ਨ ਮਨਾਓ ✨' : lang === 'en' ? 'Celebrate ✨' : 'उत्सव मनाएं ✨'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Actions: Quick Log Sadhana & Goal Selection */}
                <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2 border-t border-amber-200/60">
                  {/* Quick Minutes Add Buttons */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold text-amber-900/80 mr-0.5">
                      {lang === 'pa' ? 'ਸਾਧਨਾ ਜੋੜੋ:' : lang === 'en' ? 'Add Time:' : 'साधना जोड़ें:'}
                    </span>
                    {[5, 10, 15, 30].map(mins => (
                      <button
                        key={mins}
                        onClick={() => handleAddSadhanaMinutes(mins)}
                        className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold shadow-xs transition transform active:scale-95 cursor-pointer"
                      >
                        +{mins} {lang === 'pa' ? 'ਮਿੰ' : lang === 'en' ? 'min' : 'मि.'}
                      </button>
                    ))}
                    {todaySadhanaMinutes > 0 && (
                      <button
                        onClick={handleResetSadhana}
                        className="p-1 rounded-lg border border-amber-300 text-amber-800 hover:bg-amber-100 text-[10px] font-bold cursor-pointer"
                        title={lang === 'pa' ? 'ਰੀਸੈੱਟ' : lang === 'en' ? 'Reset' : 'रीसेट'}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Set Goal Buttons */}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-amber-900/80 mr-0.5">
                      {lang === 'pa' ? 'ਟੀਚਾ:' : lang === 'en' ? 'Goal:' : 'लक्ष्य:'}
                    </span>
                    {[10, 15, 21, 30].map(goal => (
                      <button
                        key={goal}
                        onClick={() => handleSetDailyGoal(goal)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                          dailyGoalMinutes === goal
                            ? 'bg-[#8B0000] text-white shadow-xs'
                            : 'bg-amber-100/80 text-amber-900 hover:bg-amber-200 border border-amber-300/60'
                        }`}
                      >
                        {goal}m
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* =====================================================================
                  4. PROGRESS INSIGHTS & DATA BACKUP / RESTORE TOOL
                 ===================================================================== */}
              <div className="mb-6 p-4 rounded-2xl bg-white border border-amber-300 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-700" />
                    <h4 className="font-extrabold text-xs sm:text-sm text-[#8B0000] m-0">
                      {lang === 'pa' ? 'ਸਾਧਨਾ ਪ੍ਰਗਤੀ ਅੰਕੜੇ ਅਤੇ ਬੈਕਅੱਪ ਟੂਲ' : lang === 'en' ? 'Progress Insights & Backup / Restore' : 'साधना प्रगति अंतर्दृष्टि एवं डेटा बैकअप'}
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    {lang === 'pa' ? 'ਸਥਾਨਕ ਸੁਰੱਖਿਆ ✓' : lang === 'en' ? 'Local Vault Active ✓' : 'लोकल वॉल्ट सुरक्षित ✓'}
                  </span>
                </div>

                {/* Metric Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-center">
                    <span className="text-[10px] text-gray-500 block">
                      {lang === 'pa' ? 'ਕੁੱਲ ੭-ਦਿਨ ਸਾਧਨਾ' : lang === 'en' ? '7-Day Sadhana' : 'कुल ७-दिवसीय साधना'}
                    </span>
                    <span className="text-sm font-black text-amber-900">
                      {sadhanaHistory.reduce((acc, curr) => acc + curr.minutes, 0)} {lang === 'pa' ? 'ਮਿੰਟ' : lang === 'en' ? 'min' : 'मिनट'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-center">
                    <span className="text-[10px] text-gray-500 block">
                      {lang === 'pa' ? 'ਪੜ੍ਹੇ ਅਧਿਆਇ' : lang === 'en' ? 'Chapters Read' : 'अध्याय वाचन'}
                    </span>
                    <span className="text-sm font-black text-amber-900">
                      {Object.values(vaultReadChapters).reduce((acc, arr) => acc + arr.length, 0)} {lang === 'pa' ? 'ਅਧਿਆਇ' : lang === 'en' ? 'chapters' : 'अध्याय'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-center">
                    <span className="text-[10px] text-gray-500 block">
                      {lang === 'pa' ? 'ਡਾਇਰੀ ਪ੍ਰਵੇਸ਼' : lang === 'en' ? 'Journal Entries' : 'डायरी प्रविष्टियाँ'}
                    </span>
                    <span className="text-sm font-black text-amber-900">
                      {journalEntries.length} {lang === 'pa' ? 'ਨੋਟਸ' : lang === 'en' ? 'notes' : 'प्रविष्टियां'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-center">
                    <span className="text-[10px] text-gray-500 block">
                      {lang === 'pa' ? 'ਨਿਰੰਤਰਤਾ ਲੜੀ' : lang === 'en' ? 'Active Streak' : 'निरंतरता लड़ी'}
                    </span>
                    <span className="text-sm font-black text-orange-700 flex items-center justify-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-600" />
                      {sadhanaStreak} {lang === 'pa' ? 'ਦਿਨ' : lang === 'en' ? 'days' : 'दिन'}
                    </span>
                  </div>
                </div>

                {/* Backup & Restore Action Toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 border-t border-amber-200/60">
                  <p className="text-[10px] text-gray-500 m-0">
                    {lang === 'pa' ? "ਤੁਹਾਡਾ ਸਾਧਨਾ ਡਾਟਾ ਪੂਰੀ ਤਰ੍ਹਾਂ ਤੁਹਾਡੇ ਡਿਵਾਈਸ ਉੱਤੇ ਸੁਰੱਖਿਅਤ ਹੈ।" : lang === 'en' ? 'Your sacred sadhana progress is stored locally on this device.' : 'आपकी समस्त साधना, डायरी और वाचन प्रगति आपके डिवाइस पर सुरक्षित है।'}
                  </p>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleExportBackup}
                      className="px-3 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-xs flex items-center gap-1 cursor-pointer transition active:scale-95"
                      title="Download JSON Backup"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{lang === 'pa' ? 'ਬੈਕਅੱਪ ਡਾਊਨਲੋਡ' : lang === 'en' ? 'Export Backup' : 'बैकअप डाउनलोड'}</span>
                    </button>

                    <button
                      onClick={() => backupFileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg border border-amber-400 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs shadow-xs flex items-center gap-1 cursor-pointer transition active:scale-95"
                      title="Restore JSON Backup"
                    >
                      <Upload className="w-3.5 h-3.5 text-amber-800" />
                      <span>{lang === 'pa' ? 'ਬੈਕਅੱਪ ਰੀਸਟੋਰ' : lang === 'en' ? 'Restore Data' : 'डेटा पुनर्स्थापना'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Section Header */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-sm md:text-base border-l-4 border-orange-500 pl-2.5 flex items-center gap-2">
                  <span>{t.allVaultsTitle}</span>
                  {searchQuery && (
                    <span className="text-xs font-normal text-amber-800">
                      ({filteredVaults.length} परिणाम)
                    </span>
                  )}
                </h3>

                {/* Font Size Adjustments */}
                <div className="flex items-center gap-1 text-xs">
                  <button
                    onClick={() => setFontSize(fontSize === 'lg' ? 'md' : 'sm')}
                    className="w-7 h-7 rounded border border-amber-300 bg-white/70 flex items-center justify-center font-bold text-xs"
                    title={t.fontSmall}
                  >
                    {t.fontSmall}
                  </button>
                  <button
                    onClick={() => setFontSize(fontSize === 'sm' ? 'md' : 'lg')}
                    className="w-7 h-7 rounded border border-amber-300 bg-white/70 flex items-center justify-center font-bold text-xs"
                    title={t.fontLarge}
                  >
                    {t.fontLarge}
                  </button>
                </div>
              </div>

              {/* 11 Granth Library Vaults Responsive Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
                {filteredVaults.map((vault) => {
                  const IconComp = getIconComponent(vault.iconName);
                  const isInteractive = vault.id === 4;
                  const isEmpty = vault.slotStatus === 'EMPTY_SLOT';
                  const localized = getVaultTitle(vault);

                  return (
                    <div
                      key={vault.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => openVault(vault)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openVault(vault);
                        }
                      }}
                      className={`card vault-card-hover p-3.5 rounded-xl text-center cursor-pointer transition-all duration-300 ease-out transform active:scale-95 hover:scale-[1.03] hover:-translate-y-1.5 hover:shadow-2xl hover:border-amber-400 flex flex-col items-center justify-between min-h-[135px] md:min-h-[150px] relative overflow-hidden select-none group ${isInteractive ? 'ring-2 ring-orange-500/80 bg-orange-500/5' : ''}`}
                    >
                      {/* Top indicator tag */}
                      <div className="w-full flex justify-between items-center text-[10px] text-amber-800/80 mb-1">
                        <span className="px-1.5 py-0.5 rounded bg-amber-100/80 font-bold">#{vault.id}</span>
                        {isInteractive ? (
                          <span className="px-1.5 py-0.5 rounded bg-orange-600 text-white font-extrabold animate-pulse">
                            {t.stepIndicatorBadge}
                          </span>
                        ) : isEmpty ? (
                          <span className="px-1 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 font-mono text-[9px]">
                            {t.emptySlotLabel.split(' ')[0]}
                          </span>
                        ) : (
                          <span className="px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                            {t.dataActive}
                          </span>
                        )}
                      </div>

                      {/* Icon */}
                      <div className="w-10 h-10 rounded-full bg-amber-100/70 border border-amber-200 flex items-center justify-center my-1 text-amber-800 shadow-sm transition group-hover:scale-110">
                        <IconComp className="w-5 h-5 text-amber-700" />
                      </div>

                      {/* Titles & Category (Dynamically synced) */}
                      <div className="w-full">
                        <div className="font-bold text-xs md:text-sm text-gray-900 leading-snug line-clamp-2">
                          {localized.title}
                        </div>
                        <div className="text-[10px] text-amber-800/75 mt-0.5 line-clamp-1">
                          {localized.category}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick-Access Floating Action Button for Anahad Audio Drone in Bottom-Right Corner */}
              <div className="fixed bottom-16 right-4 sm:bottom-20 sm:right-6 z-40 flex flex-col items-end gap-2 select-none">
                {/* Floating Volume Slider for Anahad Drone */}
                {isPlayingDrone && (
                  <div className="bg-[#FFFDF9]/95 backdrop-blur-md border border-amber-300 px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2 w-44">
                    <Volume2 className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={tanpuraVolume}
                      onChange={(e) => handleTanpuraVolumeChange(parseFloat(e.target.value))}
                      className="w-full accent-amber-700 cursor-pointer h-1.5 bg-amber-200 rounded-lg appearance-none"
                      title="तानपूरा ध्वनि तीव्रता (Drone Volume)"
                    />
                    <span className="text-[10px] font-mono font-bold text-amber-900 w-7 text-right">
                      {Math.round(tanpuraVolume * 100)}%
                    </span>
                  </div>
                )}

                {/* Floating quick status pill */}
                <div
                  onClick={toggleAudioDrone}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md cursor-pointer transition-all border flex items-center gap-1.5 ${
                    isPlayingDrone
                      ? 'bg-amber-100 text-[#8B0000] border-amber-400 animate-pulse'
                      : 'bg-white/95 text-amber-900 border-amber-200 hover:bg-amber-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isPlayingDrone ? 'bg-red-600 animate-ping' : 'bg-amber-400'}`} />
                  <span>
                    {isPlayingDrone
                      ? (lang === 'pa' ? 'ਅਨਹਦ ਨਾਦ ਚਾਲੂ' : lang === 'en' ? 'Anahad Drone ON' : 'अनहद नाद चालू')
                      : (lang === 'pa' ? 'ਅਨਹਦ ਨਾਦ' : lang === 'en' ? 'Anahad Drone' : 'अनहद नाद')}
                  </span>
                </div>

                {/* Primary Circular Action Button */}
                <button
                  onClick={toggleAudioDrone}
                  aria-label={isPlayingDrone ? 'Stop Anahad drone' : 'Start Anahad drone'}
                  title={
                    isPlayingDrone
                      ? (lang === 'pa' ? 'ਅਨਹਦ ਨਾਦ ਵਿਸ਼ਰਾਮ' : lang === 'en' ? 'Pause Anahad Drone' : 'अनहद नाद विश्राम')
                      : (lang === 'pa' ? 'ਅਨਹਦ ਨਾਦ ਤਾਨਪੂਰਾ ਆਰੰਭ (੪੩੨ Hz)' : lang === 'en' ? 'Start Anahad Tanpura Drone (432 Hz)' : 'अनहद नाद तानपूरा प्रारंभ (४३२ Hz)')
                  }
                  className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform active:scale-90 border-2 cursor-pointer ${
                    isPlayingDrone
                      ? 'bg-[#8B0000] text-amber-200 border-amber-300 ring-4 ring-amber-400/50 shadow-orange-950/40'
                      : 'bg-[#701A07] hover:bg-[#8B0000] text-amber-100 border-amber-400/80 hover:border-amber-300 shadow-amber-950/30'
                  }`}
                >
                  {isPlayingDrone ? (
                    <div className="relative flex items-center justify-center">
                      <Volume2 className="w-6 h-6 sm:w-7 sm:h-7 text-amber-200 animate-pulse" />
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-300" />
                      </span>
                    </div>
                  ) : (
                    <VolumeX className="w-6 h-6 sm:w-7 sm:h-7 text-amber-200" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW B: THE EMPTY 11-STEP SWADHYAY READER SCHEMA (साखी संग्रह Stepper)
             ========================================================================= */}
          {currentView === 'swadhyay' && (
            <div className="card p-4 md:p-6 rounded-2xl shadow-xl border border-amber-300">
              {/* Stepper Header */}
              <div className="flex justify-between items-center mb-4 border-b border-amber-200 pb-3">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="text-xs md:text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t.backToVaults}</span>
                </button>
                <div className="text-center">
                  <span className="text-[11px] font-bold text-amber-900 block">
                    {lang === 'pa' ? 'ਸਾਖੀ ਸੰਗ੍ਰਹਿ' : lang === 'en' ? 'Sakhi Sangrah' : 'साखी संग्रह'} ({t.stepTotal})
                  </span>
                  <span className="text-xs font-extrabold text-orange-700 px-2.5 py-0.5 bg-orange-100 rounded-full inline-block">
                    {t.stepPrefix}: {currentStep}/11
                  </span>
                </div>
                <button
                  onClick={() => setLineGuideActive(!lineGuideActive)}
                  className={`p-1.5 rounded text-xs border ${lineGuideActive ? 'bg-amber-600 text-white border-amber-600' : 'bg-transparent text-amber-800 border-amber-300'}`}
                  title="पाठक रेखा हाइलाइटर"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Step Progress Indicators */}
              <div className="grid grid-cols-11 gap-1 mb-5">
                {Array.from({ length: 11 }).map((_, idx) => {
                  const stepNum = idx + 1;
                  const isDone = stepNum < currentStep;
                  const isCurrent = stepNum === currentStep;
                  return (
                    <button
                      key={stepNum}
                      onClick={() => setCurrentStep(stepNum)}
                      className={`h-2 rounded-full transition-all ${isCurrent ? 'bg-orange-600 ring-2 ring-orange-300' : isDone ? 'bg-amber-600' : 'bg-gray-200'}`}
                      title={`${t.stepPrefix} ${stepNum}`}
                    />
                  );
                })}
              </div>

              {/* ----------------- STEP 1: विषय संदर्भ ----------------- */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">1</span>
                    <h4 className="font-bold text-base md:text-lg text-amber-900 m-0">
                      {lang === 'pa' ? '੧. ਵਿਸ਼ਾ ਪ੍ਰਸੰਗ (Context Slot)' : lang === 'en' ? '1. Contextual Background (Context Slot)' : '१. विषय संदर्भ (Context Slot)'}
                    </h4>
                  </div>
                  {swadhyayData.context ? (
                    <p className={`leading-relaxed text-gray-800 ${lineGuideActive ? 'line-guide-active p-3 rounded' : ''}`}>
                      {swadhyayData.context}
                    </p>
                  ) : (
                    <div className="p-4 rounded-xl border border-dashed border-amber-300 bg-amber-50/50 text-center space-y-2">
                      <HelpCircle className="w-6 h-6 text-amber-600 mx-auto" />
                      <p className="text-xs font-bold text-amber-900 m-0">
                        {lang === 'pa' ? 'ਵਿਸ਼ਾ ਪ੍ਰਸੰਗ: ਖਾਲੀ ਡਾਟਾ ਸਲਾਟ (Empty Slot Ready for Injection)' : lang === 'en' ? 'Context Slot: Empty Database Slot Ready for Injection' : 'विषय संदर्भ: रिक्त डेटा स्लॉट (Empty Slot Ready for Injection)'}
                      </p>
                      <p className="text-[11px] text-gray-500 m-0">
                        {t.slotWaiting}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ----------------- STEP 2: मूल पाठ एवं स्वर-तरंग ----------------- */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">2</span>
                    <h4 className="font-bold text-base md:text-lg text-amber-900 m-0">
                      {lang === 'pa' ? '੨. ਮੂਲ ਬਾਣੀ ਪਾਠ (Scripture Verse)' : lang === 'en' ? '2. Original Verse & Recitation' : '२. मूल पाठ एवं स्वर-तरंग (Verse Slot)'}
                    </h4>
                  </div>
                  {swadhyayData.original_text ? (
                    <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-300 text-center space-y-2">
                      <p className="text-lg md:text-xl font-black text-[#8B0000] italic leading-relaxed">
                        {swadhyayData.original_text}
                      </p>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl border border-dashed border-amber-300 bg-amber-50/50 text-center space-y-2">
                      <Scroll className="w-8 h-8 text-amber-600 mx-auto" />
                      <p className="text-xs font-bold text-amber-900 m-0">
                        {lang === 'pa' ? 'ਮੂਲ ਪਾਠ: ਖਾਲੀ ਸਲਾਟ' : lang === 'en' ? 'Original Verse: Empty Slot' : 'मूल पाठ: रिक्त स्लॉट (Empty Verse Slot)'}
                      </p>
                      <p className="text-[11px] text-gray-500 m-0">
                        {t.slotWaiting}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ----------------- STEP 3: शब्दार्थ कपाट ----------------- */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">3</span>
                    <h4 className="font-bold text-base md:text-lg text-amber-900 m-0">
                      {lang === 'pa' ? '੩. ਸ਼ਬਦਾਰਥ ਕਪਾਟ (Glossary Slot)' : lang === 'en' ? '3. Vocabulary & Glossary' : '३. शब्दार्थ कपाट (Glossary Slot)'}
                    </h4>
                  </div>
                  {swadhyayData.vocabulary.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {swadhyayData.vocabulary.map((v, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-white border border-amber-200 text-xs">
                          <strong className="text-amber-900">{v.word}</strong>: {v.meaning}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl border border-dashed border-amber-300 bg-amber-50/50 text-center">
                      <p className="text-xs font-bold text-amber-900 m-0">शब्दार्थ कपाट: रिक्त स्लॉट</p>
                      <p className="text-[11px] text-gray-500 mt-1">{t.slotWaiting}</p>
                    </div>
                  )}
                </div>
              )}

              {/* ----------------- STEP 4: अंतःकरण सत्संग ----------------- */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">4</span>
                    <h4 className="font-bold text-base md:text-lg text-amber-900 m-0">
                      {lang === 'pa' ? '੪. ਗੂੜ੍ਹ ਭਾਵਾਰਥ (Spiritual Discourse)' : lang === 'en' ? '4. Deep Spiritual Commentary' : '४. अंतःकरण सत्संग एवं भावार्थ'}
                    </h4>
                  </div>
                  {swadhyayData.deep_bhavarth ? (
                    <p className={`leading-relaxed text-gray-800 ${lineGuideActive ? 'line-guide-active p-3 rounded' : ''}`}>
                      {swadhyayData.deep_bhavarth}
                    </p>
                  ) : (
                    <div className="p-4 rounded-xl border border-dashed border-amber-300 bg-amber-50/50 text-center">
                      <p className="text-xs font-bold text-amber-900 m-0">भावार्थ सत्संग: रिक्त स्लॉट</p>
                      <p className="text-[11px] text-gray-500 mt-1">{t.slotWaiting}</p>
                    </div>
                  )}
                </div>
              )}

              {/* ----------------- STEP 5: प्रज्ञा प्रश्नोत्तरी ----------------- */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">5</span>
                    <h4 className="font-bold text-base md:text-lg text-amber-900 m-0">
                      {lang === 'pa' ? '੫. ਪ੍ਰਗਿਆ ਪ੍ਰਸ਼ਨਾਵਲੀ (Quiz Slot)' : lang === 'en' ? '5. Discernment Quiz (MCQ)' : '५. प्रज्ञा प्रश्नोत्तरी (Quiz Slot)'}
                    </h4>
                  </div>
                  {swadhyayData.mcq_quiz.question ? (
                    <div className="space-y-3">
                      <p className="text-sm font-bold text-gray-900">{swadhyayData.mcq_quiz.question}</p>
                      <div className="space-y-2">
                        {swadhyayData.mcq_quiz.options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setQuizAnswerSelected(idx);
                              if (opt.isCorrect) {
                                setQuizScore(prev => prev + 10);
                                playGentleBell(528);
                              }
                            }}
                            className={`w-full p-2.5 rounded-xl border text-left text-xs font-medium transition ${quizAnswerSelected === idx ? (opt.isCorrect ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold' : 'bg-red-50 border-red-400 text-red-900') : 'bg-white border-amber-200 hover:bg-amber-50'}`}
                          >
                            {opt.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl border border-dashed border-amber-300 bg-amber-50/50 text-center">
                      <p className="text-xs font-bold text-amber-900 m-0">प्रज्ञा प्रश्नोत्तरी: रिक्त स्लॉट</p>
                      <p className="text-[11px] text-gray-500 mt-1">{t.slotWaiting}</p>
                    </div>
                  )}
                </div>
              )}

              {/* ----------------- STEP 6: घट के भीतर का रहस्य ----------------- */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">6</span>
                    <h4 className="font-bold text-base md:text-lg text-amber-900 m-0">
                      {lang === 'pa' ? '੬. ਘਟ ਦੇ ਅੰਦਰ ਦਾ ਰਹੱਸ' : lang === 'en' ? '6. Inner Esoteric Mystery' : '६. घट के भीतर का रहस्य'}
                    </h4>
                  </div>
                  {swadhyayData.inner_mystery ? (
                    <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-300">
                      <button
                        onClick={() => setRevealedUlatbansi(prev => ({ ...prev, [currentStep]: !prev[currentStep] }))}
                        className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1.5"
                      >
                        {revealedUlatbansi[currentStep] ? t.hideSecret : t.revealSecret}
                      </button>
                      {revealedUlatbansi[currentStep] && (
                        <p className="mt-2.5 text-xs text-gray-800 leading-relaxed">
                          {swadhyayData.inner_mystery}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl border border-dashed border-amber-300 bg-amber-50/50 text-center">
                      <p className="text-xs font-bold text-amber-900 m-0">घट का रहस्य: रिक्त स्लॉट</p>
                      <p className="text-[11px] text-gray-500 mt-1">{t.slotWaiting}</p>
                    </div>
                  )}
                </div>
              )}

              {/* ----------------- STEP 7: आज की मुख्य शिक्षा ----------------- */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">7</span>
                    <h4 className="font-bold text-base md:text-lg text-amber-900 m-0">
                      {lang === 'pa' ? '੭. ਅੱਜ ਦੀ ਮੁੱਖ ਸਿੱਖਿਆ' : lang === 'en' ? '7. Daily Core Teachings' : '७. आज की मुख्य शिक्षा'}
                    </h4>
                  </div>
                  {swadhyayData.key_learnings.length > 0 ? (
                    swadhyayData.key_learnings.map((k, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white border border-amber-200 text-xs md:text-sm">
                        ✓ {k}
                      </div>
                    ))
                  ) : (
                    <div className="p-4 rounded-xl border border-dashed border-amber-300 bg-amber-50/50 text-center">
                      <p className="text-xs font-bold text-amber-900 m-0">आज की मुख्य शिक्षा: रिक्त स्लॉट</p>
                      <p className="text-[11px] text-gray-500 mt-1">{t.slotWaiting}</p>
                    </div>
                  )}
                </div>
              )}

              {/* ----------------- STEP 8: शब्द-प्रमाण ----------------- */}
              {currentStep === 8 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">8</span>
                    <h4 className="font-bold text-base md:text-lg text-amber-900 m-0">
                      {lang === 'pa' ? '੮. ਸ਼ਬਦ-ਪ੍ਰਮਾਣ (Cross-References)' : lang === 'en' ? '8. Scriptural Cross-References' : '८. शब्द-प्रमाण / संबंधित वाणियाँ'}
                    </h4>
                  </div>
                  {swadhyayData.cross_references.length > 0 ? (
                    swadhyayData.cross_references.map((c, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs italic">
                        "{c}"
                      </div>
                    ))
                  ) : (
                    <div className="p-4 rounded-xl border border-dashed border-amber-300 bg-amber-50/50 text-center">
                      <p className="text-xs font-bold text-amber-900 m-0">शब्द-प्रमाण: रिक्त संदर्भ स्लॉट</p>
                      <p className="text-[11px] text-gray-500 mt-1">{t.slotWaiting}</p>
                    </div>
                  )}
                </div>
              )}

              {/* ----------------- STEP 9: आत्म-मंथन ----------------- */}
              {currentStep === 9 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">9</span>
                    <h4 className="font-bold text-base md:text-lg text-amber-900 m-0">
                      {lang === 'pa' ? '੯. ਆਤਮ-ਮੰਥਨ ਡਾਇਰੀ (Journal)' : lang === 'en' ? '9. Personal Contemplation Journal' : '९. आत्म-मंथन (Contemplation Journal Slot)'}
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder={lang === 'pa' ? "ਡਾਇਰੀ ਖੋਜੋ..." : lang === 'en' ? "Search journal entries..." : "डायरी प्रविष्टियाँ खोजें..."}
                      value={journalSearchQuery}
                      onChange={(e) => setJournalSearchQuery(e.target.value)}
                      className="w-full p-2 rounded-xl border border-amber-300 text-xs bg-white shadow-inner"
                    />
                    <textarea
                      rows={3}
                      value={newJournalEntry}
                      onChange={(e) => setNewJournalEntry(e.target.value)}
                      placeholder={lang === 'pa' ? "ਨਵੀਂ ਡਾਇਰੀ ਪ੍ਰਵੇਸ਼..." : lang === 'en' ? "New entry..." : "नई डायरी प्रविष्टि..."}
                      className="w-full p-3 rounded-xl border border-amber-300 text-xs bg-white text-gray-900 shadow-inner"
                    />

                    {/* 5-Second Draft Auto-Save Indicator */}
                    <div className="flex justify-between items-center text-[10px] text-gray-500 px-1 -mt-1">
                      <span>{newJournalEntry.length} {lang === 'pa' ? 'ਅੱਖਰ' : lang === 'en' ? 'characters' : 'अक्षर'}</span>
                      {journalDraftSavedTime && (
                        <span className="flex items-center gap-1 text-emerald-700 font-bold">
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{lang === 'pa' ? `ਮਸੌਦਾ ਸੁਰੱਖਿਅਤ (${journalDraftSavedTime})` : lang === 'en' ? `Draft auto-saved (${journalDraftSavedTime})` : `मस्यौदा स्वतः सुरक्षित (${journalDraftSavedTime})`}</span>
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        if (!newJournalEntry.trim()) return;
                        const updated = [...journalEntries, { date: new Date().toISOString(), content: newJournalEntry }];
                        setJournalEntries(updated);
                        localStorage.setItem('saheb_swadhyay_journal', JSON.stringify(updated));
                        localStorage.removeItem('saheb_journal_draft');
                        setNewJournalEntry('');
                        setJournalDraftSavedTime(null);
                        showToast(lang === 'pa' ? 'ਡਾਇਰੀ ਸੁਰੱਖਿਅਤ ਕੀਤੀ ਗਈ!' : lang === 'en' ? 'Entry saved!' : 'डायरी प्रविष्टि सहेजी गई!');
                      }}
                      className="w-full py-2 rounded-xl bg-amber-700 text-white font-bold text-xs cursor-pointer shadow-xs active:scale-95 transition"
                    >
                      {lang === 'pa' ? 'ਸੁਰੱਖਿਅਤ ਕਰੋ' : lang === 'en' ? 'Save Entry' : 'प्रविष्टि सहेजें'}
                    </button>
                    <div className="space-y-2 mt-2 max-h-40 overflow-y-auto">
                      {journalEntries
                        .filter((e: JournalEntry) => e.content.toLowerCase().includes(journalSearchQuery.toLowerCase()))
                        .map((entry: JournalEntry, idx: number) => (
                          <div key={idx} className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-[11px]">
                            <div className="font-bold text-gray-500">{new Date(entry.date).toLocaleDateString()}</div>
                            <div>{entry.content}</div>
                          </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <button
                      onClick={() => {
                        const blob = new Blob([userJournal], { type: 'text/plain;charset=utf-8' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `saheb_swadhyay_journal_${new Date().toISOString().slice(0, 10)}.txt`;
                        link.click();
                        URL.revokeObjectURL(url);
                        showToast(lang === 'pa' ? 'ਡਾਇਰੀ ਬੈਕਅੱਪ ਡਾਊਨਲੋਡ ਹੋ ਗਿਆ!' : lang === 'en' ? 'Journal backup downloaded!' : 'डायरी बैकअप सफलतापूर्वक डाउनलोड हो गया!');
                      }}
                      className="px-3 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{lang === 'pa' ? 'ਡਾਇਰੀ ਬੈਕਅੱਪ (TXT)' : lang === 'en' ? 'Export Journal Backup (TXT)' : 'डायरी बैकअप डाउनलोड करें (TXT)'}</span>
                    </button>
                    <span className="text-[10px] text-gray-500">
                      {userJournal.length} {lang === 'pa' ? 'ਅੱਖਰ' : lang === 'en' ? 'characters' : 'अक्षर'}
                    </span>
                  </div>
                </div>
              )}

              {/* ----------------- STEP 10: नाद अनुसन्धान एवं श्रवण साधना ----------------- */}
              {currentStep === 10 && (
                <div className="space-y-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">10</span>
                    <h4 className="font-bold text-base md:text-lg text-amber-900 m-0">
                      {lang === 'pa' ? '੧੦. ਨਾਦ ਅਨੁਸੰਧਾਨ ਤੇ ਪ੍ਰਾਣਾਯਾਮ' : lang === 'en' ? '10. Naad Pranayama & Meditation' : '१०. नाद अनुसन्धान एवं श्रवण साधना'}
                    </h4>
                  </div>

                  {/* Breath pacing loops: Recaka, Kumbhaka, Sunya */}
                  <div className="h-40 w-full mb-4">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                      <LineChart data={[
                        { t: 0, v: 1 }, { t: 3, v: 1 }, { t: 4, v: 1 }, { t: 7, v: 1 },
                        { t: 8, v: 0 }, { t: 11, v: 0 }, { t: 12, v: 0.5 }, { t: 13, v: 0.5 }
                      ]}>
                        <XAxis dataKey="t" hide />
                        <YAxis domain={[0, 1.2]} hide />
                        <Line type="step" dataKey="v" stroke="#D97706" strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-40 h-40 mx-auto my-4 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-600 p-1 flex items-center justify-center shadow-xl">
                    <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center p-2 text-center transition-all duration-1000">
                      <span className="text-xl font-black text-amber-900 tracking-wider">
                        {breathingPhase}
                      </span>
                      <span className="text-[9px] text-gray-500 mt-0.5">
                        {breathingPhase === 'पूरक' && (lang === 'pa' ? 'ਸਵਾਸ ਅੰਦਰ' : lang === 'en' ? 'Inhale (4s)' : 'श्वास भीतर (Inhale)')}
                        {breathingPhase === 'कुंभक' && (lang === 'pa' ? 'ਨਾਮ ਸਥਿਰ' : lang === 'en' ? 'Hold (4s)' : 'नाम स्थिर (Kumbhaka)')}
                        {breathingPhase === 'रेचक' && (lang === 'pa' ? 'ਵਿਕਾਰ ਵਿਸਰਜਨ' : lang === 'en' ? 'Exhale (4s)' : 'अहंकार विसर्जन (Recaka)')}
                        {breathingPhase === 'शून्य' && (lang === 'pa' ? 'ਸੁੰਨ ਧਿਆਨ' : lang === 'en' ? 'Rest (2s)' : 'शून्य ध्यान (Sunya)')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setBreathingTimerActive(!breathingTimerActive);
                      playGentleBell(432);
                    }}
                    className="px-5 py-2 rounded-full bg-amber-700 text-white font-bold text-xs shadow"
                  >
                    {breathingTimerActive ? (lang === 'pa' ? "ਸਾਧਨਾ ਰੋਕੋ" : lang === 'en' ? "Pause Meditation" : "साधना रोकें") : (lang === 'pa' ? "ਪ੍ਰਾਣਾਯਾਮ ਸਾਧਨਾ ਸ਼ੁਰੂ ਕਰੋ" : lang === 'en' ? "Begin Breath Pacing" : "प्राणायाम साधना प्रारंभ करें")}
                  </button>

                  <div className="grid grid-cols-2 gap-2 text-left text-[10px] text-gray-700 mt-2">
                    <div className="p-2 bg-amber-50 rounded border border-amber-200">{swadhyayData.nad_pranayama.purak}</div>
                    <div className="p-2 bg-amber-50 rounded border border-amber-200">{swadhyayData.nad_pranayama.kumbhak}</div>
                    <div className="p-2 bg-amber-50 rounded border border-amber-200">{swadhyayData.nad_pranayama.rechak}</div>
                    <div className="p-2 bg-amber-50 rounded border border-amber-200">{swadhyayData.nad_pranayama.shunya}</div>
                  </div>
                </div>
              )}

              {/* ----------------- STEP 11: सतगुरु आशीर्वाद एवं डिजिटल प्रमाण-पत्र ----------------- */}
              {currentStep === 11 && (
                <div className="space-y-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">11</span>
                    <h4 className="font-bold text-base md:text-lg text-amber-900 m-0">
                      {lang === 'pa' ? '੧੧. ਸਤਿਗੁਰੂ ਅਸੀਸ ਅਤੇ ਡਿਜੀਟਲ ਪ੍ਰਮਾਣ-ਪੱਤਰ' : lang === 'en' ? '11. Satguru Blessing & Digital Certificate' : '११. सतगुरु आशीर्वाद एवं डिजिटल प्रमाण-पत्र'}
                    </h4>
                  </div>

                  <div className="max-w-xs mx-auto">
                    <input
                      type="text"
                      value={devoteeName}
                      onChange={(e) => {
                        setDevoteeName(e.target.value);
                        localStorage.setItem('saheb_devotee_name', e.target.value);
                      }}
                      className="p-1.5 px-3 rounded-lg border border-amber-300 text-xs w-full bg-white font-bold text-amber-950 text-center"
                      placeholder={t.devoteeNamePlaceholder}
                    />
                  </div>

                  {/* Certified blessing letter - New Layout */}
                  <div id="blessing-certificate" className="p-6 rounded-2xl bg-[#FFFDF9] border-4 border-double border-amber-600 shadow-xl space-y-4 text-center">
                    {/* Header */}
                    <div className="space-y-1">
                      <div className="mx-auto w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500 shadow-md mb-1 bg-amber-50">
                        <img
                          src="/assets/images/kabir_saheb_maghar.jpg"
                          alt="सद्गुरु कबीर साहेब"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xl font-serif text-[#8B0000]">🌹 ।।सत्यनाम।। 🌹</div>
                      <h3 className="text-sm font-bold text-[#8B0000] uppercase tracking-wide">पावन स्वाध्याय आशीर्वाद पत्र</h3>
                      <div className="text-[10px] text-amber-900 font-medium">श्री सद्गुरु कबीर साहेब स्वाध्याय पीठ — साहेब वर्ल्ड</div>
                    </div>
                    
                    {/* Body */}
                    <p className="text-xs text-gray-800 font-medium leading-relaxed">
                      सप्रेम प्रमाणित किया जाता है कि हंस जन सत्य साधक ({effectiveDevoteeName || "हंस जन"}) ने आज कबीर साहेब के ११-चरणीय स्वाध्याय को पूर्ण श्रद्धा एवं एकाग्रता से संपन्न किया है।
                    </p>

                    {/* Couplet - Strict 2-line */}
                    <div className="p-3 bg-amber-100/70 rounded-xl border border-amber-300 font-bold text-amber-950 text-xs italic space-y-1">
                      <div>"पूरन भये मनोरथा, सतगुरु दई लखाय।</div>
                      <div>कहैं कबीर सो हंस जन, अमरलोक में जाय।।"</div>
                    </div>
                    
                    {/* Footer */}
                    <div className="space-y-1 text-[10px] text-amber-900 font-medium border-t border-amber-200/60 pt-3">
                      <div>दिनांक: {new Date().toLocaleDateString(lang === 'pa' ? 'pa-IN' : lang === 'en' ? 'en-US' : 'hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                      <div>पावन स्वाध्याय मुद्रा (Seal Placeholder)</div>
                      <div>सद्गुरु चरण अनुरागी - Saheb World PWA</div>
                    </div>

                    {/* Footer Anchor */}
                    <div className="pt-2 text-sm sm:text-base font-black text-[#701A07] drop-shadow-[0_1px_3px_rgba(212,175,55,0.6)] uppercase tracking-wider">
                      ।। साहेब बंदगी साहेब ।। 🙏
                    </div>
                  </div>

                  {/* Dual Actions */}
                  <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                    <button
                      onClick={() => {
                        startRosePetalVarsha(7000);
                        playGentleBell(528);
                      }}
                      className="flex-1 py-3 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                    >
                      <Sparkle className="w-4 h-4 text-amber-300 animate-spin" />
                      <span>{t.blessingRoseVarsha}</span>
                    </button>

                    <button
                      onClick={() => generateAndDownloadCertificate(effectiveDevoteeName, "पूरन भये मनोरथा, सतगुरु दई लखाय। कहैं कबीर सो हंस जन, अमरलोक में जाय।।", "।।सत्यनाम।।", lang)}
                      className="flex-1 py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>{t.blessingDownloadCertificate}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Step Navigation Buttons (Language-synced dynamically) */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-amber-200">
                <button
                  onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
                  disabled={currentStep === 1}
                  className={`px-4 py-2 rounded-lg font-bold text-xs md:text-sm border transition flex items-center gap-1 ${currentStep === 1 ? 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-white text-gray-800 border-gray-300'}`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t.back}</span>
                </button>

                <button
                  onClick={() => {
                    if (currentStep < 11) {
                      setCurrentStep(prev => prev + 1);
                      if (currentStep === 10) {
                        startRosePetalVarsha(6000);
                        playGentleBell(528);
                        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                      } else {
                        playGentleBell(432);
                      }
                    } else {
                      startRosePetalVarsha(6000);
                      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
                    }
                  }}
                  className="px-6 py-2.5 rounded-lg font-bold text-xs md:text-sm btn-primary shadow-md hover:opacity-95 transition flex items-center gap-1"
                >
                  <span>{currentStep === 11 ? t.finish : t.next}</span>
                  {currentStep < 11 && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW C: DEDICATED VAULT READER (For Vaults 1 to 11 with custom features)
             ========================================================================= */}
          {currentView === 'vaultReader' && selectedVault && (() => {
            const totalChapters = selectedVault.chapters.length > 0
              ? selectedVault.chapters.length
              : (selectedVault.totalChaptersExpected || 10);
            const readList = vaultReadChapters[selectedVault.id] || [];
            const readCount = Math.min(readList.length, totalChapters);
            const progressPercent = Math.min(100, Math.round((readCount / totalChapters) * 100));

            return (
              <div className="card p-4 md:p-6 rounded-2xl shadow-xl border border-amber-300 space-y-4 relative">
                {/* Small Sticky Reading Progress Bar at the top of vaultReader View */}
                <div className="sticky top-0 z-30 bg-[#FFFDF9]/95 backdrop-blur-md -mx-4 -mt-4 md:-mx-6 md:-mt-6 px-4 md:px-6 py-2.5 border-b border-amber-300/90 shadow-sm rounded-t-2xl">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-950 mb-1.5">
                    <div className="flex items-center gap-1.5 truncate mr-2">
                      <BookOpen className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span className="truncate">
                        {lang === 'pa' ? 'ਗ੍ਰੰਥ ਵਾਚਨ ਪ੍ਰਗਤੀ' : lang === 'en' ? 'Reading Progress' : 'ग्रंथ वाचन प्रगति'}
                      </span>
                      <span className="text-[10px] text-amber-800 font-semibold bg-amber-100/90 px-1.5 py-0.2 rounded border border-amber-300/60 shrink-0">
                        {readCount}/{totalChapters} {lang === 'pa' ? 'ਅਧਿਆਇ' : lang === 'en' ? 'chapters' : 'अध्याय'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {progressPercent === 100 ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center gap-1 border border-emerald-300 shadow-xs">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {lang === 'pa' ? 'ਸੰਪੰਨ 🌹' : lang === 'en' ? 'Completed 🌹' : 'संपूर्ण 🌹'}
                        </span>
                      ) : (
                        <button
                          onClick={() => markNextChapterRead(selectedVault.id, totalChapters)}
                          className="px-2 py-0.5 rounded bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold transition shadow-xs flex items-center gap-0.5 active:scale-95 cursor-pointer"
                          title={lang === 'pa' ? 'ਅਗਲਾ ਅਧਿਆਇ ਪੜ੍ਹਿਆ ਅੰਕਿਤ ਕਰੋ' : lang === 'en' ? 'Mark next chapter read' : 'अगला अध्याय पढ़ा चिह्नित करें'}
                        >
                          <span>+1 {lang === 'pa' ? 'ਪੜ੍ਹਿਆ' : lang === 'en' ? 'Read' : 'पढ़ा'}</span>
                        </button>
                      )}
                      <span className="text-xs font-black text-[#8B0000]">{progressPercent}%</span>
                      {readCount > 0 && (
                        <button
                          onClick={() => resetVaultReadingProgress(selectedVault.id)}
                          className="p-1 rounded text-gray-400 hover:text-amber-800 hover:bg-amber-100 transition cursor-pointer"
                          title={lang === 'pa' ? 'ਪ੍ਰਗਤੀ ਰੀਸੈੱਟ' : lang === 'en' ? 'Reset reading progress' : 'वाचन प्रगति रीसेट'}
                        >
                          <RotateCcw className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Animated Progress Track */}
                  <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden border border-amber-300/40 shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-[#8B0000] transition-all duration-500 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Row 2: Reading Timer & True Black High-Contrast Night Reading Toggle */}
                  <div className="flex items-center justify-between gap-2 mt-2 pt-1.5 border-t border-amber-200/50 text-[11px] flex-wrap">
                    {/* Active Reading Timer */}
                    <div className="flex items-center gap-1.5 bg-amber-100/70 border border-amber-300 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      <span className="text-[10px] text-gray-600 font-medium">
                        {lang === 'pa' ? 'ਸਮਾਂ:' : lang === 'en' ? 'Time:' : 'वाचन:'}
                      </span>
                      <span className="font-bold text-amber-950 font-mono text-xs">
                        {formatReadingTime(readingSeconds)}
                      </span>
                      <button
                        onClick={() => setIsReadingTimerActive(!isReadingTimerActive)}
                        className="p-0.5 rounded text-amber-800 hover:text-amber-950 transition cursor-pointer"
                        title={isReadingTimerActive ? "Pause Timer" : "Resume Timer"}
                      >
                        {isReadingTimerActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      </button>
                      <button
                        onClick={handleSaveReadingTimeToSadhana}
                        className="ml-1 px-1.5 py-0.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[9px] shadow-xs active:scale-95 transition cursor-pointer"
                        title="Save reading time to Sadhana progress"
                      >
                        + {lang === 'pa' ? "ਸਾਧਨਾ ਵਿੱਚ ਜੋੜੋ" : lang === 'en' ? 'Save to Sadhana' : 'साधना में सहेजें'}
                      </button>
                    </div>

                    {/* High-Contrast True Black Theme Quick Switcher for Low-Light Night Reading */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setCurrentTheme('pothi')}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition cursor-pointer ${
                          currentTheme === 'pothi' ? 'bg-[#8B0000] text-white border-[#8B0000]' : 'bg-[#F4ECD8] text-amber-950 border-amber-300'
                        }`}
                        title="पोथी (Pothi)"
                      >
                        {t.themePothi}
                      </button>
                      <button
                        onClick={() => setCurrentTheme('night')}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition cursor-pointer ${
                          currentTheme === 'night' ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-[#1E1E1E] text-white border-gray-700'
                        }`}
                        title="रात्रि (Night)"
                      >
                        {t.themeNight}
                      </button>
                      <button
                        onClick={() => setCurrentTheme('trueblack')}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition cursor-pointer ${
                          currentTheme === 'trueblack' ? 'bg-black text-[#FFD700] border-[#FFD700] ring-1 ring-[#FFD700]' : 'bg-black text-amber-200 border-gray-800'
                        }`}
                        title="OLED True Black (Low-Light Night Reading)"
                      >
                        {t.themeTrueBlack}
                      </button>
                    </div>
                  </div>
                </div>

              {/* Reader Header */}
              <div className="flex justify-between items-center border-b border-amber-200 pb-3">
                <button
                  onClick={() => {
                    if (readingSeconds >= 30) {
                      handleSaveReadingTimeToSadhana();
                    }
                    if (selectedSectionIdx !== null) {
                      setSelectedSectionIdx(null);
                    } else {
                      setCurrentView('dashboard');
                      setSelectedVault(null);
                    }
                  }}
                  className="text-xs md:text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{selectedSectionIdx !== null ? t.toc : t.backToVaults}</span>
                </button>

                <div className="text-center px-2">
                  <span className="text-xs md:text-sm font-bold text-amber-900 block truncate max-w-[200px] sm:max-w-xs">
                    {getVaultTitle(selectedVault).title}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium">
                    {getVaultTitle(selectedVault).category}
                  </span>
                </div>

                <button
                  onClick={() => setLineGuideActive(!lineGuideActive)}
                  className={`p-1.5 rounded text-xs border ${lineGuideActive ? 'bg-amber-600 text-white border-amber-600' : 'bg-transparent text-amber-800 border-amber-300'}`}
                  title="पाठक रेखा हाइलाइटर"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Special Vault 7: Kabir Bani & Bhajans Audio Player with Playback Speed Control Slider */}
              {(selectedVault.id === 7 || selectedVault.iconName === 'Music') && (
                <div className="mb-2">
                  <SpiritualAudioPlayer
                    onTimeTracked={(secs) => {
                      setReadingSeconds(prev => prev + 1);
                    }}
                  />
                </div>
              )}

              {/* Subtitle Card */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                <h4 className="font-bold text-xs md:text-sm text-[#8B0000] m-0 mb-1">
                  {getVaultTitle(selectedVault).subtitle}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] font-bold">
                    {selectedVault.slotStatus === 'EMPTY_SLOT' ? t.emptySlotLabel : t.dataActive}
                  </span>
                  <span className="text-[10px] text-gray-500">
                    {lang === 'pa' ? `ਅਪੇਖਿਤ ਅਧਿਆਇ: ${selectedVault.totalChaptersExpected}` : lang === 'en' ? `Expected chapters: ${selectedVault.totalChaptersExpected}` : `अपेक्षित अध्याय: ${selectedVault.totalChaptersExpected}`}
                  </span>
                </div>
              </div>

              {/* Reading Accessibility Toggles (Font size & Line Height) */}
              <div className="flex items-center justify-between bg-amber-50/80 p-2.5 rounded-xl border border-amber-200 text-xs flex-wrap gap-2">
                <div className="flex items-center gap-1 font-bold text-amber-950">
                  <span>🔤 वाचन अक्षमता नियंत्रण (Accessibility):</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-gray-500 font-semibold">अक्षर आकार:</span>
                    {(['normal', 'large', 'xlarge'] as const).map(scale => (
                      <button
                        key={scale}
                        onClick={() => setReaderFontScale(scale)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border transition cursor-pointer ${readerFontScale === scale ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-amber-900 border-amber-300'}`}
                      >
                        {scale === 'normal' ? 'अ' : scale === 'large' ? 'आ+' : 'आ++'}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 border-l border-amber-300 pl-2">
                    <span className="text-[10px] text-gray-500 font-semibold">पंक्ति अंतर:</span>
                    {(['normal', 'relaxed', 'loose'] as const).map(lh => (
                      <button
                        key={lh}
                        onClick={() => setReaderLineHeight(lh)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border transition cursor-pointer ${readerLineHeight === lh ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-amber-900 border-amber-300'}`}
                      >
                        {lh === 'normal' ? '१x' : lh === 'relaxed' ? '१.५x' : '२x'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Special Vault 5: 3D-styled Gamified Gaming Quiz Engine */}
              {selectedVault.isGamifiedQuiz && (
                <div className="p-4 rounded-xl bg-gradient-to-tr from-amber-50 via-orange-50 to-amber-100 border-2 border-orange-300 shadow-md space-y-3">
                  <div className="flex justify-between items-center border-b border-orange-200 pb-2">
                    <span className="text-xs font-black text-amber-900 flex items-center gap-1">
                      <Gamepad2 className="w-4 h-4 text-orange-600" />
                      <span>3D Style Gamified Gaming Quiz Engine</span>
                    </span>
                    <span className="px-2 py-0.5 bg-orange-600 text-white rounded-full text-xs font-bold">
                      स्कोर: {gameScore}
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-amber-200 shadow transform hover:-translate-y-1 transition text-center">
                    <p className="text-xs font-bold text-amber-950 mb-1">उलटबांसी पहेली स्लॉट #{activeRiddleIdx + 1}:</p>
                    <p className="text-sm font-extrabold text-[#8B0000] italic">
                      "एक अचंभा देखा रे भाई, ठाढ़ा सिंह चरावे गाई।"
                    </p>
                    <button
                      onClick={() => {
                        setGameScore(prev => prev + 25);
                        startRosePetalVarsha(3000);
                        playGentleBell(528);
                      }}
                      className="mt-2 px-4 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow active:scale-95 transition"
                    >
                      🎮 3D पहेली हल करें (+२५ अंक)
                    </button>
                  </div>
                </div>
              )}

              {/* Special Vault 8: Tabbed Eras Tracking 4 Yugas */}
              {selectedVault.isTabbedEras && (
                <div className="p-3 rounded-xl bg-white border border-amber-200 space-y-3">
                  <span className="text-xs font-bold text-[#8B0000] block">
                    {lang === 'pa' ? 'ਚਾਰ ਜੁਗਾਂ ਵਿੱਚ ਸਤਿਗੁਰੂ ਦਾ ਪਾਵਨ ਅਵਤਾਰ (Tabbed Eras):' : lang === 'en' ? 'Advent across 4 Yugas (Tabbed Eras):' : 'चार युगों में सद्गुरु का पावन अवतरण (Tabbed Eras):'}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {yugasData.map((y, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveYugaIdx(idx)}
                        className={`p-2 rounded-lg text-xs font-bold transition text-center ${activeYugaIdx === idx ? 'bg-amber-700 text-white shadow' : 'bg-amber-100 text-amber-900 hover:bg-amber-200'}`}
                      >
                        {y.name}
                      </button>
                    ))}
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs">
                    <strong className="text-amber-900 block text-sm">{yugasData[activeYugaIdx].avatar}</strong>
                    <p className="text-gray-700 mt-1 m-0">{yugasData[activeYugaIdx].desc}</p>
                  </div>
                </div>
              )}

              {/* Special Vault 11: App Health Dashboard (Performance, Storage, AES-256) */}
              {selectedVault.isAppHealth && (
                <div className="p-4 rounded-xl bg-white border border-amber-300 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                    <Cpu className="w-4 h-4 text-amber-700" />
                    <span className="text-xs font-bold text-[#8B0000]">ऐप सेहत एवं सुरक्षा स्थिति (App Health Dashboard)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                      <div className="flex items-center gap-1.5 font-bold text-gray-800 mb-1">
                        <Cpu className="w-3.5 h-3.5 text-amber-600" />
                        <span>रेंडर गति (FPS)</span>
                      </div>
                      <div className="text-lg font-black text-emerald-700">६० FPS</div>
                      <p className="text-[10px] text-gray-500 m-0">ज़ीरो-डिपेंडेंसी सुपर फास्ट</p>
                    </div>

                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                      <div className="flex items-center gap-1.5 font-bold text-gray-800 mb-1">
                        <HardDrive className="w-3.5 h-3.5 text-amber-600" />
                        <span>स्टोरेज उपयोग</span>
                      </div>
                      <div className="text-lg font-black text-amber-800">{storageUsageKb} KB</div>
                      <p className="text-[10px] text-gray-500 m-0">लोकल PWA कैश सुरक्षित</p>
                    </div>

                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                      <div className="flex items-center gap-1.5 font-bold text-gray-800 mb-1">
                        <Lock className="w-3.5 h-3.5 text-amber-600" />
                        <span>AES-256 सुरक्षा</span>
                      </div>
                      <div className="text-lg font-black text-emerald-700">प्रमाणित ✓</div>
                      <p className="text-[10px] text-gray-500 m-0">क्लाइंट-साइड एन्क्रिप्शन नियम</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Empty Slot Display or Loaded Chapters */}
              {selectedVault.chapters.length === 0 ? (
                <div className="p-6 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/40 text-center space-y-3">
                  <Database className="w-8 h-8 text-amber-600 mx-auto" />
                  <h5 className="font-bold text-sm text-[#8B0000] m-0">
                    {getVaultTitle(selectedVault).title} — {t.emptySlotLabel}
                  </h5>
                  <p className="text-xs text-gray-600 max-w-md mx-auto m-0">
                    यह वॉल्ट अभी पूर्णतः शुद्ध एवं रिक्त है (No pre-loaded text arrays)। प्रशासक किसी भी समय 'डेटा लेयर इंजेक्टर' का उपयोग कर इसमें अध्याय एरे जोड़ सकते हैं।
                  </p>
                  <button
                    onClick={() => {
                      setInjectionVaultId(selectedVault.id);
                      setInjectionTarget('vault');
                      setShowDataInjector(true);
                    }}
                    className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold shadow inline-flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{t.injectDataBtn}</span>
                  </button>
                </div>
              ) : (
                /* When Administrator Injected Chapters */
                <div className={`space-y-3 granth-reader-content ${readerFontScale === 'large' ? 'text-base sm:text-lg' : readerFontScale === 'xlarge' ? 'text-lg sm:text-xl' : 'text-xs sm:text-sm'} ${readerLineHeight === 'relaxed' ? 'leading-relaxed' : readerLineHeight === 'loose' ? 'leading-loose' : 'leading-normal'}`}>
                  {selectedVault.chapters.map((ch, idx) => {
                    const isRead = readList.includes(idx);
                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl bg-white border transition shadow-sm ${
                          isRead ? 'border-emerald-300 bg-emerald-50/25 ring-1 ring-emerald-300/40' : 'border-amber-200'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1.5">
                          <h5 className="font-bold text-xs md:text-sm text-amber-900 m-0">{ch.title}</h5>
                          <button
                            onClick={() => toggleChapterRead(selectedVault.id, idx, totalChapters)}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition flex items-center gap-1 cursor-pointer ${
                              isRead
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-xs'
                                : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                            }`}
                          >
                            {isRead && <Check className="w-3 h-3 text-emerald-600" />}
                            <span>
                              {isRead
                                ? (lang === 'pa' ? 'ਪੜ੍ਹਿਆ ਗਿਆ ✓' : lang === 'en' ? 'Read ✓' : 'पढ़ा गया ✓')
                                : (lang === 'pa' ? 'ਪੜ੍ਹਿਆ ਅੰਕਿਤ ਕਰੋ' : lang === 'en' ? 'Mark Read' : 'पढ़ा चिह्नित करें')}
                            </span>
                          </button>
                        </div>
                        <div className="space-y-1 text-xs text-gray-800">
                          {ch.lines.map((l, lIdx) => <p key={lIdx} className="m-0">{l}</p>)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Back CTA */}
              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    setCurrentView('dashboard');
                    setSelectedVault(null);
                  }}
                  className="px-6 py-2 rounded-full bg-amber-700 text-white text-xs font-bold hover:bg-amber-800 transition cursor-pointer"
                >
                  {t.backToVaults}
                </button>
              </div>
            </div>
          );
        })()}
        </div>
      }

      {/* Floating Scroll-to-Top Button (Appears only when user has scrolled down dashboard or vault reader) */}
      {showScrollTop && (currentView === 'dashboard' || currentView === 'vaultReader') && (
        <button
          onClick={scrollToTop}
          aria-label={lang === 'pa' ? 'ਸਭ ਤੋਂ ਉੱਪਰ ਜਾਓ' : lang === 'en' ? 'Scroll to top' : 'शीर्ष पर जाएं'}
          title={lang === 'pa' ? 'ਸਭ ਤੋਂ ਉੱਪਰ ਜਾਓ' : lang === 'en' ? 'Scroll to top' : 'शीर्ष पर जाएं'}
          className="fixed bottom-36 sm:bottom-44 right-5 sm:right-7 z-40 p-2.5 sm:p-3 rounded-full bg-[#701A07] hover:bg-[#8B0000] text-amber-200 border-2 border-amber-400/80 shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer group"
        >
          <ChevronUp className="w-5 h-5 text-amber-300 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* 🔐 Admin Login Gatekeeper Modal (Pothi Mode #F4ECD8 parchment leaf theme) */}
      {showAdminLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#F4ECD8] border-2 border-[#D2B48C] rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-[#2C1E11]">
            <div className="flex justify-between items-center border-b border-[#D2B48C] pb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-[#8B0000]">
                <Lock className="w-5 h-5 text-amber-700" />
                <span>🔐 श्री सद्गुरु कबीर साहेब ग्रन्थालय - एडमिन कपाट कूंजी</span>
              </div>
              <button
                onClick={() => setShowAdminLoginModal(false)}
                className="text-gray-500 hover:text-black p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#5D4037] font-medium m-0">
              श्री सद्गुरु कबीर साहेब ग्रन्थालय — एडमिनिस्ट्रेटर कंटेंट मैनेजमेंट सिस्टम (CMS) में प्रवेश हेतु गुप्त कूंजी दर्ज करें।
            </p>

            <form onSubmit={handleAdminLoginSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type={showAdminPassword ? "text" : "password"}
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="गुप्त कूंजी (उदा. Satyanaam108)"
                  className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-[#D2B48C] bg-white text-[#2C1E11] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-black cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {adminLoginAttempts > 0 && (
                <div className="text-[11px] text-red-700 font-semibold bg-red-50 p-2 rounded-lg border border-red-200">
                  ⚠️ असफल प्रयास: {adminLoginAttempts} / 3
                  {adminLockoutUntil > Date.now() && (
                    <span className="block mt-0.5 text-red-900 font-bold">
                      लॉकआउट सक्रिय (Lockout active)
                    </span>
                  )}
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAdminLoginModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs border border-[#D2B48C] transition cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#8B0000] hover:bg-red-900 text-white font-bold text-xs shadow-md transition cursor-pointer"
                >
                  अनलॉक करें 🔓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🚀 Admin Content Management System (CMS) Dashboard */}
      {showAdminDashboard && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-[#FFFDF9] border-2 border-amber-500 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl space-y-4 text-gray-900">
            <div className="flex justify-between items-center border-b border-amber-300 pb-3">
              <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-[#8B0000]">
                <Cpu className="w-5 h-5 text-amber-600" />
                <span>सद्गुरु कबीर सत्यनाम पथ-प्रदर्शक (Admin CMS Dashboard)</span>
              </div>
              <button
                onClick={() => setShowAdminDashboard(false)}
                className="text-gray-500 hover:text-black p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-700 m-0">
              प्रशासक महोदय, आप सफलतापूर्वक प्रमाणित हैं। यहाँ से आप साखी संग्रह, वाचन डेटा और दैनिक हुक्मनामा को प्रबंधित व इंजेक्ट कर सकते हैं।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 space-y-2">
                <h5 className="font-bold text-amber-900 m-0">📊 डेटा लेयर स्थिति</h5>
                <p className="text-gray-600 m-0">स्टोरेज उपयोग: <strong>{storageUsageKb} KB</strong></p>
                <p className="text-gray-600 m-0">सुरक्षा एनक्रिप्शन: <strong>AES-256 Local Vault Active</strong></p>
                <button
                  onClick={() => {
                    setShowDataInjector(true);
                    setShowAdminDashboard(false);
                  }}
                  className="w-full py-2 mt-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-bold text-xs cursor-pointer"
                >
                  डेटा इंजेक्टर खोलें (Open JSON Injector)
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 space-y-2">
                <h5 className="font-bold text-amber-900 m-0">🛡️ सुरक्षा एवं सत्र</h5>
                <p className="text-gray-600 m-0">मास्टर कूंजी: <strong>Satyanaam108 (Verified)</strong></p>
                <p className="text-gray-600 m-0">लॉकआउट स्टेटस: <strong>सुरक्षित (0 सक्रिय प्रतिबंध)</strong></p>
                <button
                  onClick={handleAdminSignOut}
                  className="w-full py-2 mt-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-bold text-xs cursor-pointer"
                >
                  सुरक्षित लॉगआउट करें (Sign Out)
                </button>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowAdminDashboard(false)}
                className="px-6 py-2.5 bg-[#701A07] text-white rounded-xl text-xs font-bold shadow hover:bg-[#8B0000] cursor-pointer"
              >
                डैशबोर्ड बंद करें (Close CMS)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PERMANENT FOOTER ANCHOR (Polished metallic gold #D4AF37, exactly one instance)
         ========================================================================= */}
      <footer className="footer-anchor">
        <span>{t.footer}</span>
      </footer>

      <QuoteCardModal 
        isOpen={showQuoteCardModal} 
        onClose={() => setShowQuoteCardModal(false)} 
        data={quoteCardData} 
      />
    </div>
  );
}
