import { GranthVaultSlot, SwadhyayStepSlot } from '../types/schema';

// 1. Clean, Structural Empty Slot for 11-Step Swadhyay Architecture
export const EMPTY_SWADHYAY_SLOT: SwadhyayStepSlot = {
  context: "",
  original_text: "",
  transliteration: "",
  vocabulary: [],
  deep_bhavarth: "",
  mcq_quiz: {
    question: "",
    options: []
  },
  inner_mystery: "",
  key_learnings: [],
  cross_references: [],
  contemplation_prompts: [],
  nad_pranayama: {
    purak: "पूरक (Inhale - ४ से.) : रिक्त श्वास स्लॉट [Ready for Injection]",
    kumbhak: "कुंभक (Hold - ४ से.) : सत्यनाम स्पंदन स्लॉट [Ready for Injection]",
    rechak: "रेचक (Exhale - ४ से.) : विकार विसर्जन स्लॉट [Ready for Injection]",
    shunya: "शून्य (Rest - २ से.) : शून्य ध्यान स्लॉट [Ready for Injection]"
  },
  certificate: {
    title: "पावन स्वाध्याय आशीर्वाद पत्र",
    subtitle: "श्री सद्गुरु कबीर साहेब स्वाध्याय पीठ",
    verse: "कहैं कबीर सो हंस जन, अमरलोक में जाय।",
    mantra: "।। सत्यनाम ।। साहेब बंदगी साहेब ।।"
  }
};

// 2. The 11 Empty Sacred Granth Library Vaults (Empty Database Slots)
export const INITIAL_EMPTY_VAULTS: GranthVaultSlot[] = [
  {
    id: 1,
    title: "नितनेम गुटका साहेब",
    hindiTitle: "नितनेम गुटका साहेब",
    subtitle: "प्रातः व संध्या सुमिरन, आरती एवं मंगलाचरण",
    category: "दैनिक साधना",
    iconName: "BookOpen",
    slotStatus: "EMPTY_SLOT",
    totalChaptersExpected: 5,
    chapters: []
  },
  {
    id: 2,
    title: "कबीर बीजक ग्रंथ",
    hindiTitle: "कबीर बीजक ग्रंथ",
    subtitle: "रमैनी, सबद एवं साखी - सत्य का प्रामाणिक खजाना",
    category: "परम ग्रंथ",
    iconName: "Scroll",
    slotStatus: "EMPTY_SLOT",
    totalChaptersExpected: 11,
    chapters: []
  },
  {
    id: 3,
    title: "कबीर सागर",
    hindiTitle: "कबीर सागर",
    subtitle: "अनुराग सागर, अमर मूल, ब्रह्म बोध एवं सुखनिधान",
    category: "रहस्य ग्रंथ",
    iconName: "Circle",
    slotStatus: "EMPTY_SLOT",
    totalChaptersExpected: 8,
    chapters: []
  },
  {
    id: 4,
    title: "साखी संग्रह",
    hindiTitle: "साखी संग्रह (11-Steps)",
    subtitle: "११-चरणीय स्वाध्याय स्टेपर आर्किटेक्चर",
    category: "क्रियात्मक स्वाध्याय",
    iconName: "GraduationCap",
    isSwadhyay: true,
    slotStatus: "EMPTY_SLOT",
    totalChaptersExpected: 11,
    chapters: []
  },
  {
    id: 5,
    title: "उलटबांसी ग्रंथावली",
    hindiTitle: "उलटबांसी ग्रंथावली",
    subtitle: "3D Style Gamified Gaming Quiz Engine",
    category: "गूढ़ पहेलियाँ",
    iconName: "Gamepad",
    isGamifiedQuiz: true,
    slotStatus: "EMPTY_SLOT",
    totalChaptersExpected: 7,
    chapters: []
  },
  {
    id: 6,
    title: "श्री गुरु ग्रंथ साहिब वाणी",
    hindiTitle: "श्री गुरु ग्रंथ साहिब वाणी",
    subtitle: "Bani Bhag of Bhagat Kabir Ji (सलोक एवं राग)",
    category: "पवित्र गुरबाणी",
    iconName: "Bookmark",
    slotStatus: "EMPTY_SLOT",
    totalChaptersExpected: 6,
    chapters: []
  },
  {
    id: 7,
    title: "कबीर वाणी",
    hindiTitle: "कबीर वाणी एवं भजन",
    subtitle: "अमर भजन, पद एवं नाद श्रवण साधना",
    category: "नाद एवं रस",
    iconName: "Music",
    slotStatus: "EMPTY_SLOT",
    totalChaptersExpected: 9,
    chapters: []
  },
  {
    id: 8,
    title: "सद्गुरु कबीर साहेब जीवन परिचय",
    hindiTitle: "सद्गुरु जीवन परिचय",
    subtitle: "Tabbed Eras Tracking 4 Yugas (सत्य, त्रेता, द्वापर, कलि)",
    category: "इतिहास एवं महिमा",
    iconName: "Clock",
    isTabbedEras: true,
    slotStatus: "EMPTY_SLOT",
    totalChaptersExpected: 4,
    chapters: []
  },
  {
    id: 9,
    title: "कबीर मंसूर",
    hindiTitle: "कबीर मंसूर ग्रंथ",
    subtitle: "धर्मदास संवाद, सत्यनाम परवाना व चौका विधान",
    category: "निर्णय सार",
    iconName: "ShieldCheck",
    slotStatus: "EMPTY_SLOT",
    totalChaptersExpected: 5,
    chapters: []
  },
  {
    id: 10,
    title: "पावन धाम जंत्री",
    hindiTitle: "पावन धाम जंत्री",
    subtitle: "कबीर चौरा मठ, मगहर धाम, लहरतारा तीर्थ दर्शन",
    category: "तीर्थ एवं दर्शन",
    iconName: "MapPin",
    slotStatus: "EMPTY_SLOT",
    totalChaptersExpected: 4,
    chapters: []
  },
  {
    id: 11,
    title: "ऐप सेहत",
    hindiTitle: "ऐप सेहत एवं ऑफ़लाइन तिजोरी",
    subtitle: "Performance Logs, Storage Utilization, AES-256 Rules",
    category: "सिस्टम व सेटिंग्स",
    iconName: "HeartPulse",
    isAppHealth: true,
    slotStatus: "EMPTY_SLOT",
    totalChaptersExpected: 3,
    chapters: []
  }
];

// Helper functions for Dynamic Administrator Injection
const STORAGE_KEY_VAULTS = 'saheb_injected_vaults_v2';
const STORAGE_KEY_SWADHYAY = 'saheb_injected_swadhyay_v2';

export function getStoredVaults(): GranthVaultSlot[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_VAULTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === 11) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Storage parse error", e);
  }
  return INITIAL_EMPTY_VAULTS;
}

export function saveStoredVaults(vaults: GranthVaultSlot[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_VAULTS, JSON.stringify(vaults));
  } catch (e) {
    console.error("Storage save error", e);
  }
}

export function getStoredSwadhyay(): SwadhyayStepSlot {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SWADHYAY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Swadhyay parse error", e);
  }
  return EMPTY_SWADHYAY_SLOT;
}

export function saveStoredSwadhyay(data: SwadhyayStepSlot): void {
  try {
    localStorage.setItem(STORAGE_KEY_SWADHYAY, JSON.stringify(data));
  } catch (e) {
    console.error("Swadhyay save error", e);
  }
}
