// 11-Step Svadhyay Schema & Offline State Controller
// Complete structured JSON representation for the "11-चरणीय स्वाध्याय" (11-Step Self-Study process)

export interface SwadhyayStep {
  stepNumber: number;
  titleHi: string;
  titlePa: string;
  titleEn: string;
  descriptionHi: string;
  descriptionPa: string;
  descriptionEn: string;
  mantra: string;
  estimatedMinutes: number;
}

export const SWADHYAY_STEPS_SCHEMA: SwadhyayStep[] = [
  {
    stepNumber: 1,
    titleHi: "पवित्र स्नान एवं आसन शुद्धि",
    titlePa: "ਪਵਿੱਤਰ ਇਸਨਾਨ ਅਤੇ ਆਸਣ ਸ਼ੁੱਧੀ",
    titleEn: "Purification & Seating",
    descriptionHi: "शरीर व वस्त्र की शुद्धि कर सुखासन में एकाग्र चित्त से बैठें।",
    descriptionPa: "ਸ਼ਰੀਰ ਅਤੇ ਬਸਤਰ ਦੀ ਸ਼ੁੱਧੀ ਕਰਕੇ ਸੁਖਾਸਣ ਵਿੱਚ ਬੈਠੋ।",
    descriptionEn: "Cleanse body and clothes, sitting peacefully in Sukhasana.",
    mantra: "।। सत्यनाम ।।",
    estimatedMinutes: 5
  },
  {
    stepNumber: 2,
    titleHi: "सिर ढकना (शीश मर्यादा)",
    titlePa: "ਸੀਸ ਢੱਕਣਾ (ਮਰਿਆਦਾ)",
    titleEn: "Covering the Head",
    descriptionHi: "सद्गुरु कबीर साहेब की वाणी के सम्मान में रुमाल या वस्त्र से सिर ढकें।",
    descriptionPa: "ਸਤਿਗੁਰੂ ਕਬੀਰ ਸਾਹਿਬ ਦੀ ਬਾਣੀ ਦੇ ਸਤਿਕਾਰ ਵਿੱਚ ਸੀਸ ਢੱਕੋ।",
    descriptionEn: "Cover your head with a clean cloth in reverence to Satguru Kabir Saheb.",
    mantra: "।। साहेब बंदगी साहेब ।।",
    estimatedMinutes: 2
  },
  {
    stepNumber: 3,
    titleHi: "मंगलाचरण एवं गुरु वंदना",
    titlePa: "ਮੰਗਲਾਚਰਨ ਅਤੇ ਗੁਰੂ ਵੰਦਨਾ",
    titleEn: "Manglacharan & Guru Vandana",
    descriptionHi: "सतगुरु कबीर साहेब का ध्यान धर कर मंगलाचरण पाठ करें।",
    descriptionPa: "ਸਤਿਗੁਰੂ ਕਬੀਰ ਸਾਹਿਬ ਦਾ ਧਿਆਨ ਧਰ ਕੇ ਮੰਗਲਾਚਰਨ ਪਾਠ ਕਰੋ।",
    descriptionEn: "Contemplate Satguru Kabir Saheb and recite Manglacharan.",
    mantra: "ध्यातं सद्गुरु कबीरं, सर्व-व्यापकं परमेश्वरं।",
    estimatedMinutes: 5
  },
  {
    stepNumber: 4,
    titleHi: "नित्य नियम नितनेम पाठ",
    titlePa: "ਨਿਤਨੇਮ ਪਾਠ",
    titleEn: "Nitnem Scripture Reading",
    descriptionHi: "प्रातःकालीन या संध्याकालीन पावन नितनेम का सस्वर पाठ करें।",
    descriptionPa: "ਸਵੇਰ ਜਾਂ ਸ਼ਾਮ ਦਾ ਪਾਵਨ ਨਿਤਨੇਮ ਪਾਠ ਕਰੋ।",
    descriptionEn: "Perform the daily Nitnem scriptural contemplation.",
    mantra: "सतनाम का ध्यान धरूँ...",
    estimatedMinutes: 15
  },
  {
    stepNumber: 5,
    titleHi: "बीजक साखी मनन",
    titlePa: "ਬੀਜਕ ਸਾਖੀ ਮਨਨ",
    titleEn: "Bijak Sakhi Contemplation",
    descriptionHi: "सतगुरु कबीर बीजक ग्रंथ से साखियों का गंभीर अध्ययन व अर्थ चिंतन।",
    descriptionPa: "ਸਤਿਗੁਰੂ ਕਬੀਰ ਬੀਜਕ ਗ੍ਰੰਥ ਤੋਂ ਸਾਖੀਆਂ ਦਾ ਗੰਭੀਰ ਅਧਿਐਨ।",
    descriptionEn: "Deep study and contemplation of Sakhis from Kabir Bijak.",
    mantra: "कबीर सोई पीर है...",
    estimatedMinutes: 10
  },
  {
    stepNumber: 6,
    titleHi: "उलटबांसी गूढ़ रहस्य",
    titlePa: "ਉਲਟਬਾਣੀ ਗੂੜ੍ਹ ਭੇਦ",
    titleEn: "Esoteric Utlatbansi",
    descriptionHi: "अध्यात्मिक उलटबांसियों के गूढ़ आत्मकेंद्रित रहस्यों को समझें।",
    descriptionPa: "ਅਧਿਆਤਮਿਕ ਉਲਟਬਾਣੀਆਂ ਦੇ ਗੂੜ੍ਹ ਭੇਦਾਂ ਨੂੰ ਸਮਝੋ।",
    descriptionEn: "Understand the esoteric spiritual symbols and inverted verses.",
    mantra: "अकथ कहानी प्रेम की...",
    estimatedMinutes: 10
  },
  {
    stepNumber: 7,
    titleHi: "अनहद नाद श्रवण (ध्यान)",
    titlePa: "ਅਨਹਦ ਨਾਦ ਸ੍ਰਵਣ",
    titleEn: "Anahad Naad Meditation",
    descriptionHi: "बाहरी प्रपंच से ध्यान हटाकर भीतर अनहद झंकार का श्रवण करें।",
    descriptionPa: "ਬਾਹਰੀ ਪ੍ਰਪੰਚ ਤੋਂ ਧਿਆਨ ਹਟਾ ਕੇ ਅੰਦਰੂਨੀ ਨਾਦ ਸੁਣੋ।",
    descriptionEn: "Withdraw senses and listen to the inner celestial sound current.",
    mantra: "ঝংকার অনহদ বাਜै...",
    estimatedMinutes: 10
  },
  {
    stepNumber: 8,
    titleHi: "चार युगों का इतिहास बोध",
    titlePa: "ਚਾਰ ਜੁਗਾਂ ਦਾ ਇਤਿਹਾਸ ਬੋਧ",
    titleEn: "Four Yugas Wisdom",
    descriptionHi: "सत्ययुग, त्रेता, द्वापर और कलियुग में सतगुरु के अवतरण का स्मरण।",
    descriptionPa: "ਸਤਿਜੁਗ, ਤ੍ਰੇਤਾ, ਦ्वाਪਰ ਅਤੇ ਕਲਿਜੁਗ ਵਿੱਚ ਅਵਤਾਰ ਦਾ ਸਿਮਰਨ।",
    descriptionEn: "Contemplate the divine manifestations across the four cosmic Yugas.",
    mantra: "सुकृत, मुनिंद्र, करुणामय, कबीर...",
    estimatedMinutes: 10
  },
  {
    stepNumber: 9,
    titleHi: "आत्म-समीक्षा एवं स्वाध्याय लॉग",
    titlePa: "ਆਤਮ-ਸਮੀਖਿਆ ਅਤੇ ਸਵਾਧਿਆਇ ਲੌਗ",
    titleEn: "Self-Review & Sadhana Log",
    descriptionHi: "अपने दिनभर के आचरण और भक्ति सिमरन की डायरी समीक्षा करें।",
    descriptionPa: "ਆਪਣੇ ਦਿਨ ਭਰ ਦੇ ਆਚਰਣ ਅਤੇ ਭਗਤੀ ਦੀ ਸਮੀਖਿਆ ਕਰੋ।",
    descriptionEn: "Review your daily spiritual conduct and meditation progress.",
    mantra: "झूठी माया तजि भजु साहेब...",
    estimatedMinutes: 5
  },
  {
    stepNumber: 10,
    titleHi: "क्षमा प्रार्थना व अर्जी",
    titlePa: "ਛਮਾ ਪ੍ਰਾਰਥਨਾ ਅਤੇ ਅਰਦਾਸ",
    titleEn: "Prayer & Forgiveness",
    descriptionHi: "अनजाने में हुई भूलचूक के लिए साहेब के चरणों में क्षमा याचना।",
    descriptionPa: "ਅਣਜਾਣੇ ਵਿੱਚ ਹੋਈਆਂ ਭੁੱਲਾਂ ਲਈ ਸਾਹੇਬ ਦੇ ਚਰਨਾਂ ਵਿੱਚ ਅਰਦਾਸ।",
    descriptionEn: "Humble prayer and apology at the lotus feet of Satguru for any shortcomings.",
    mantra: "बन्दीछोड़ दया करो...",
    estimatedMinutes: 5
  },
  {
    stepNumber: 11,
    titleHi: "पूर्ण संकल्प एवं आशीर्वाद पत्र",
    titlePa: "ਸੰਪੂਰਨ ਸੰਕਲਪ ਅਤੇ ਅਸੀਸ ਪੱਤਰ",
    titleEn: "Pledge & Blessing Certificate",
    descriptionHi: "स्वाध्याय पूर्ण होने पर आशीर्वाद पत्र प्राप्त कर संकल्प लें।",
    descriptionPa: "ਸਵਾਧਿਆਇ ਪੂਰਾ ਹੋਣ 'ਤੇ ਅਸੀਸ ਪੱਤਰ ਪ੍ਰਾਪਤ ਕਰੋ।",
    descriptionEn: "Complete the 11-step journey and generate your spiritual blessing certificate.",
    mantra: "।। साहेब बंदगी साहेब ।। 🙏",
    estimatedMinutes: 5
  }
];

const STORAGE_KEY_PROGRESS = 'saheb_world_swadhyay_progress_v1';

export interface SwadhyayProgressState {
  currentStep: number;
  completedSteps: number[];
  totalMinutesSpent: number;
  lastUpdated: string;
}

export function loadOfflineSwadhyayProgress(): SwadhyayProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Fallback default
  }
  return {
    currentStep: 1,
    completedSteps: [],
    totalMinutesSpent: 0,
    lastUpdated: new Date().toISOString()
  };
}

export function saveOfflineSwadhyayProgress(state: SwadhyayProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify({
      ...state,
      lastUpdated: new Date().toISOString()
    }));
  } catch (err) {
    console.error('[SwadhyayStorage] Failed to save progress locally:', err);
  }
}
