import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'hi' | 'pa' | 'en';

export interface Translations {
  headerBrand: string;
  footer: string;
  subtitle: string;
  tagline: string;
  enterVault: string;
  ringText: string;
  searchPlaceholder: string;
  allVaultsTitle: string;
  backToVaults: string;
  installApp: string;
  installed: string;
  installGuideTitle: string;
  installGuideDesc: string;
  installGuideDismiss: string;
  iosInstallTitle: string;
  iosStep1: string;
  iosStep2: string;
  offlineNotice: string;
  next: string;
  back: string;
  finish: string;
  toc: string;
  allChapters: string;
  previousChapter: string;
  nextChapter: string;
  chapter: string;
  revealSecret: string;
  hideSecret: string;
  bhavarth: string;
  verses: string;
  openChapter: string;
  emptySlotLabel: string;
  injectDataBtn: string;
  slotWaiting: string;
  stepPrefix: string;
  stepTotal: string;
  blessingLetterTitle: string;
  blessingLetterSubtitle: string;
  blessingCertifiedText: string;
  blessingRoseVarsha: string;
  blessingDownloadCertificate: string;
  devoteeNamePlaceholder: string;
  defaultDevoteeName: string;
  clearSearch: string;
  themeWhite: string;
  themePothi: string;
  themeNight: string;
  themeTrueBlack: string;
  fontSmall: string;
  fontLarge: string;
  dataInjectorTitle: string;
  close: string;
  dataActive: string;
  stepIndicatorBadge: string;
}

export const translationsMap: Record<Language, Translations> = {
  hi: {
    headerBrand: "🌹 ।।सत्यनाम।। 🌹",
    footer: "।।साहेब बंदगी साहेब।। 🙏",
    subtitle: "बंदीछोड़ सतगुरु कबीर साहेब",
    tagline: "पावन आत्म-ज्ञान एवं स्वाध्याय",
    enterVault: "📖 पावन ग्रन्थालय में प्रवेश करें ➔",
    ringText: "।। सत्यनाम ।। 🌹 ।। सत्यनाम ।। 🌹 ।। सत्यनाम ।। 🌹 ।। सत्यनाम ।। 🌹 ।। सत्यनाम ।। 🌹 ।। सत्यनाम ।। 🌹 ।। सत्यनाम ।। 🌹 ।। सत्यनाम ।। 🌹",
    searchPlaceholder: "🔍 पावन ग्रन्थों व साखियों के डेटा स्लॉट में खोजें...",
    allVaultsTitle: "अनंत पावन ग्रन्थालय (11 Holy Vaults)",
    backToVaults: "← ग्रन्थालय",
    installApp: "📱 ऐप इंस्टॉल करें",
    installed: "✓ ऐप इंस्टॉल है",
    installGuideTitle: "फोन होम-स्क्रीन पर जोड़ें",
    installGuideDesc: "अल्ट्रा-लाइटवेट PWA ऑफ़लाइन सुरक्षा",
    installGuideDismiss: "बाद में",
    iosInstallTitle: "iOS सफारी पर इंस्टॉल करें",
    iosStep1: "1. नीचे सफारी के शेयर (Share 📤) आइकन पर टैप करें।",
    iosStep2: "2. 'Add to Home Screen' (होम स्क्रीन पर जोड़ें) चुनें।",
    offlineNotice: "ऑफ़लाइन मोड सक्रिय — स्थानीय स्लॉट्स सुरक्षित हैं।",
    next: "आगे बढ़ें",
    back: "पीछे",
    finish: "पूर्ण संकल्प एवं आशीर्वाद",
    toc: "अध्यायों की सूची (TOC)",
    allChapters: "संपूर्ण पाठ",
    previousChapter: "पिछला अध्याय",
    nextChapter: "अगला अध्याय",
    chapter: "अध्याय",
    revealSecret: "🔍 उलटबांसी का गूढ़ रहस्य खोलें",
    hideSecret: "रहस्य छिपाएं",
    bhavarth: "भावार्थ",
    verses: "छंद / वाणियाँ",
    openChapter: "खोलें ➔",
    emptySlotLabel: "रिक्त डेटा स्लॉट (Empty Slot)",
    injectDataBtn: "⚙️ डेटा इंजेक्ट करें (Data Layer)",
    slotWaiting: "डेटा इंजेक्शन प्रतीक्षित है (Awaiting Content)",
    stepPrefix: "चरण",
    stepTotal: "११-चरणीय स्वाध्याय स्टेपर",
    blessingLetterTitle: "पावन स्वाध्याय आशीर्वाद पत्र",
    blessingLetterSubtitle: "श्री सद्गुरु कबीर साहेब स्वाध्याय पीठ — साहेब वर्ल्ड",
    blessingCertifiedText: "सप्रेम प्रमाणित किया जाता है कि हंस जन {name} ने आज कबीर साहेब के ११-चरणीय स्वाध्याय को पूर्ण श्रद्धा एवं एकाग्रता से संपन्न किया है।",
    blessingRoseVarsha: "🌹 गुलाब पुष्प वर्षा (Rose Petal Varsha)",
    blessingDownloadCertificate: "📥 डिजिटल PNG प्रमाण-पत्र डाउनलोड करें",
    devoteeNamePlaceholder: "साधक का नाम लिखें...",
    defaultDevoteeName: "सत्य साधक (हंस जन)",
    clearSearch: "हटाएं",
    themeWhite: "सफेद",
    themePothi: "पोथी",
    themeNight: "रात्रि",
    themeTrueBlack: "सत्य श्याम (OLED)",
    fontSmall: "अ-",
    fontLarge: "अ+",
    dataInjectorTitle: "प्रशासक डेटा लेयर इंजेक्टर",
    close: "✕ बंद करें",
    dataActive: "डेटा सक्रिय",
    stepIndicatorBadge: "११ चरण 🌟"
  },
  pa: {
    headerBrand: "🌹 ।।ਸਤਯਨਾਮ।। 🌹",
    footer: "।। ਸਾਹੇਬ ਬੰਦਗੀ ਸਾਹੇਬ ।। 🙏",
    subtitle: "ਬੰਦੀਛੋੜ ਸਤਿਗੁਰੂ ਕਬੀਰ ਸਾਹੇਬ",
    tagline: "ਪਾਵਨ ਆਤਮ-ਗਿਆਨ ਅਤੇ ਸਵਾਧਿਆਇ",
    enterVault: "📖 ਪਾਵਨ ਗ੍ਰੰਥਾਲਯ ਵਿੱਚ ਪ੍ਰਵੇਸ਼ ਕਰੋ ➔",
    ringText: "।। ਸਤਯਨਾਮ ।। 🌹 ।। ਸਤਯਨਾਮ ।। 🌹 ।। ਸਤਯਨਾਮ ।। 🌹 ।। ਸਤਯਨਾਮ ।। 🌹 ।। ਸਤਯਨਾਮ ।। 🌹 ।। ਸਤਯਨਾਮ ।। 🌹",
    searchPlaceholder: "🔍 ਪਾਵਨ ਗ੍ਰੰਥਾਂ ਅਤੇ ਬਾਣੀਆਂ ਵਿੱਚ ਖੋਜੋ...",
    allVaultsTitle: "ਅਨੰਤ ਪਾਵਨ ਗ੍ਰੰਥਾਲਯ (11 Holy Vaults)",
    backToVaults: "← ਗ੍ਰੰਥਾਲਯ",
    installApp: "📱 ਐਪ ਇੰਸਟਾਲ ਕਰੋ",
    installed: "✓ ਐਪ ਇੰਸਟਾਲ ਹੈ",
    installGuideTitle: "ਫ਼ੋਨ ਹੋਮ-ਸਕ੍ਰੀਨ ਉੱਤੇ ਜੋੜੋ",
    installGuideDesc: "ਅਲਟਰਾ-ਲਾਈਟਵੇਟ PWA ਔਫ਼ਲਾਈਨ ਸੁਰੱਖਿਆ",
    installGuideDismiss: "ਬਾਅਦ ਵਿੱਚ",
    iosInstallTitle: "iOS ਸਫ਼ਾਰੀ ਉੱਤੇ ਇੰਸਟਾਲ ਕਰੋ",
    iosStep1: "1. ਹੇਠਾਂ ਸਫ਼ਾਰੀ ਸ਼ੇਅਰ (Share 📤) ਆਈਕਨ 'ਤੇ ਟੈਪ ਕਰੋ।",
    iosStep2: "2. 'Add to Home Screen' (ਹੋਮ ਸਕ੍ਰੀਨ 'ਤੇ ਜੋੜੋ) ਚੁਣੋ।",
    offlineNotice: "ਔਫਲਾਈਨ ਮੋਡ ਚਾਲੂ — ਸਥਾਨਕ ਸਲਾਟ ਸੁਰੱਖਿਅਤ ਹਨ।",
    next: "ਅੱਗੇ ਵਧੋ",
    back: "ਪਿੱਛੇ",
    finish: "ਸੰਪੂਰਨ ਸੰਕਲਪ ਅਤੇ ਅਸੀਸ",
    toc: "ਅਧਿਆਵਾਂ ਦੀ ਸੂਚੀ (TOC)",
    allChapters: "ਸੰਪੂਰਨ ਪਾਠ",
    previousChapter: "ਪਿਛਲਾ ਅਧਿਆਇ",
    nextChapter: "ਅਗਲਾ ਅਧਿਆਇ",
    chapter: "ਅਧਿਆਇ",
    revealSecret: "🔍 ਉਲਟਬਾਣੀ ਦਾ ਗੂੜ੍ਹ ਭੇਦ ਖੋਲ੍ਹੋ",
    hideSecret: "ਭੇਦ ਲੁਕਾਓ",
    bhavarth: "ਭਾਵਾਰਥ",
    verses: "ਛੰਦ / ਬਾਣੀਆਂ",
    openChapter: "ਖੋਲ੍ਹੋ ➔",
    emptySlotLabel: "ਖਾਲੀ ਸਲਾਟ (Empty Slot)",
    injectDataBtn: "⚙️ ਡਾਟਾ ਇੰਜੈਕਟ ਕਰੋ (Data Layer)",
    slotWaiting: "ਡਾਟਾ ਇੰਜੈਕਸ਼ਨ ਉਡੀਕ ਵਿੱਚ ਹੈ",
    stepPrefix: "ਚਰਨ",
    stepTotal: "੧੧-ਚਰਣੀ ਸਵਾਧਿਆਇ ਸਟੈਪਰ",
    blessingLetterTitle: "ਪਾਵਨ ਸਵਾਧਿਆਇ ਅਸੀਸ ਪੱਤਰ",
    blessingLetterSubtitle: "ਸ੍ਰੀ ਸਤਿਗੁਰੂ ਕਬੀਰ ਸਾਹਿਬ ਸਵਾਧਿਆਇ ਪੀਠ — ਸਾਹਿਬ ਵਰਲਡ",
    blessingCertifiedText: "ਸਪ੍ਰੇਮ ਪ੍ਰਮਾਣਿਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਕਿ ਹੰਸ ਜਨ {name} ਨੇ ਅੱਜ ਕਬੀਰ ਸਾਹਿਬ ਦੇ ੧੧-ਚਰਣੀ ਸਵਾਧਿਆਇ ਨੂੰ ਪੂਰਨ ਸ਼ਰਧਾ ਅਤੇ ਇਕਾਗਰਤਾ ਨਾਲ ਸੰਪੰਨ ਕੀਤਾ ਹੈ।",
    blessingRoseVarsha: "🌹 ਗੁਲਾਬ ਪੁਸ਼ਪ ਵਰਖਾ (Rose Petal Varsha)",
    blessingDownloadCertificate: "📥 ਡਿਜੀਟਲ PNG ਪ੍ਰਮਾਣ-ਪੱਤਰ ਡਾਊਨਲੋਡ ਕਰੋ",
    devoteeNamePlaceholder: "ਸਾਧਕ ਦਾ ਨਾਮ ਲਿਖੋ...",
    defaultDevoteeName: "ਸਤਿ ਸਾਧਕ (ਹੰਸ ਜਨ)",
    clearSearch: "ਹਟਾਓ",
    themeWhite: "ਚਿੱਟਾ",
    themePothi: "ਪੋਥੀ",
    themeNight: "ਰਾਤ",
    themeTrueBlack: "ਟਰੂ ਬਲੈਕ (OLED)",
    fontSmall: "ਅ-",
    fontLarge: "ਅ+",
    dataInjectorTitle: "ਪ੍ਰਸ਼ਾਸਕ ਡਾਟਾ ਲੇਅਰ ਇੰਜੈਕਟਰ",
    close: "✕ ਬੰਦ ਕਰੋ",
    dataActive: "ਡਾਟਾ ਸਰਗਰਮ",
    stepIndicatorBadge: "੧੧ ਚਰਨ 🌟"
  },
  en: {
    headerBrand: "🌹 ।।Satyanaam।। 🌹",
    footer: "।। Saheb Bandagi Saheb ।। 🙏",
    subtitle: "Bandichhod Satguru Kabir Saheb",
    tagline: "Sacred Self-Realization & Contemplation",
    enterVault: "📖 Enter Sacred Vaults ➔",
    ringText: "।। SATYANAAM ।। 🌹 ।। SATYANAAM ।। 🌹 ।। SATYANAAM ।। 🌹 ।। SATYANAAM ।। 🌹 ।। SATYANAAM ।। 🌹 ।। SATYANAAM ।। 🌹 ।। SATYANAAM ।। 🌹",
    searchPlaceholder: "🔍 Search across scripture database slots...",
    allVaultsTitle: "Eternal Sacred Vaults (11 Holy Modules)",
    backToVaults: "← All Vaults",
    installApp: "📱 Install App",
    installed: "✓ App Installed",
    installGuideTitle: "Add to Phone Home Screen",
    installGuideDesc: "Ultra-Lightweight PWA Offline Reliability",
    installGuideDismiss: "Later",
    iosInstallTitle: "Install on iOS Safari",
    iosStep1: "1. Tap the Safari Share button (📤) at the bottom.",
    iosStep2: "2. Select 'Add to Home Screen' from the menu.",
    offlineNotice: "Offline Mode Active — Local slots intact.",
    next: "Next",
    back: "Back",
    finish: "Complete Pledge & Blessing",
    toc: "Table of Contents (TOC)",
    allChapters: "Full Scripture",
    previousChapter: "Previous Chapter",
    nextChapter: "Next Chapter",
    chapter: "Chapter",
    revealSecret: "🔍 Reveal Esoteric Meaning",
    hideSecret: "Hide Meaning",
    bhavarth: "Spiritual Meaning",
    verses: "Verses",
    openChapter: "Open ➔",
    emptySlotLabel: "Empty Database Slot",
    injectDataBtn: "⚙️ Inject Data Layer",
    slotWaiting: "Awaiting JSON injection",
    stepPrefix: "Step",
    stepTotal: "11-Step Swadhyay Stepper",
    blessingLetterTitle: "Sacred Swadhyay Blessing Certificate",
    blessingLetterSubtitle: "Satguru Kabir Saheb Swadhyay Peeth — Saheb World",
    blessingCertifiedText: "It is certified with reverence that seeker {name} has fulfilled the 11-Step Swadhyay of Satguru Kabir Saheb with devotion and mindful focus.",
    blessingRoseVarsha: "🌹 Rose Petal Shower (Varsha)",
    blessingDownloadCertificate: "📥 Download Digital PNG Certificate",
    devoteeNamePlaceholder: "Enter devotee name...",
    defaultDevoteeName: "Truth Seeker (Hans Jan)",
    clearSearch: "Clear",
    themeWhite: "White",
    themePothi: "Pothi",
    themeNight: "Night",
    themeTrueBlack: "True Black (OLED)",
    fontSmall: "A-",
    fontLarge: "A+",
    dataInjectorTitle: "Admin Data Layer Injector",
    close: "✕ Close",
    dataActive: "Data Active",
    stepIndicatorBadge: "11 Steps 🌟"
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'saheb_world_lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'hi' || saved === 'pa' || saved === 'en') {
        return saved;
      }
    } catch {
      // LocalStorage fallback
    }

    // Auto-detect mobile phone/browser system language
    try {
      if (typeof navigator !== 'undefined') {
        const browserLangs = [
          navigator.language,
          ...(navigator.languages || [])
        ].filter(Boolean).map(l => l.toLowerCase());

        for (const bl of browserLangs) {
          if (bl.startsWith('pa')) return 'pa';
          if (bl.startsWith('hi')) return 'hi';
          if (bl.startsWith('en')) return 'en';
        }
      }
    } catch {
      // Fallback
    }

    return 'pa';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
    } catch {
      // LocalStorage fallback
    }
  };

  const t = translationsMap[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
