import { GranthVaultSlot, SwadhyayStepSlot } from '../types/schema';

// 1. Rich 11-Step Swadhyay Architecture Data for SW-001 (Ritu Basant)
export const EMPTY_SWADHYAY_SLOT: SwadhyayStepSlot = {
  context: "श्रेणी: परोपकार एवं वैराग्य | मुख्य विषय: त्याग, नव-सृजन, सद्गुरु-कृपा, आत्म-शुद्धि | स्वर-तरंग: C# (काली १)",
  original_text: "रितु बसंत याचक भया, हरखि दिया द्रुम पात ।\nताते नव पल्लव भया, दिया दूर नहिं जात।।",
  original_text_pa: "ਰਿਤੁ ਬਸੰਤੁ ਜਾਚਕੁ ਭਇਆ, ਹਰਖਿ ਦੀਆ ਦ੍ਰੁਮ ਪਾਤ ॥\nਤਾਤੇ ਨਵ ਪੱਲਵ ਭਇਆ, ਦੀਆ ਦੂਰਿ ਨਹਿ ਜਾਤ ॥",
  transliteration: "Ritu basant yachak bhaya, harkhi diya drum paat.\nTaate nav pallav bhaya, diya door nahin jaat..",
  vocabulary: [
    { word: "याचक", meaning: "माँगने वाला, भिक्षुक" },
    { word: "हरखि", meaning: "प्रसन्न होकर, खुशी से" },
    { word: "द्रुम", meaning: "वृक्ष, पेड़" },
    { word: "नव पल्लव", meaning: "नई कोपलें, नए कोमल पत्ते" }
  ],
  deep_bhavarth: "यहाँ बसंत ऋतु सद्गुरु या परमात्मा की कृपा का प्रतीक है। वृक्ष प्रसन्न होकर पुराने और सूखे पत्ते त्याग देता है, जिससे अनहद नाद और नव-सृजन के नए कोमल पल्लव खिलते हैं। यह त्याग ही साधक की आत्म-शुद्धि का मूल मार्ग है।",
  deep_bhavarth_pa: "ਇੱਥੇ ਬਸੰਤ ਰੁੱਤ ਸਤਿਗੁਰੂ ਜਾਂ ਪਰਮਾਤਮਾ ਦੀ ਕ੍ਰਿਪਾ ਦਾ ਪ੍ਰਤੀਕ ਹੈ। ਰੁੱਖ ਪ੍ਰਸੰਨ ਹੋ ਕੇ ਪੁਰਾਣੇ ਸੁੱਕੇ ਪੱਤੇ ਤਿਆਗ ਦਿੰਦਾ ਹੈ, ਜਿਸ ਨਾਲ ਅਨਹਦ ਨਾਦ ਅਤੇ ਨਵ-ਸਿਰਜਣ ਦੇ ਨਵੇਂ ਕੋਮਲ ਪੱਤੇ ਖਿੜਦੇ ਹਨ। ਇਹ ਤਿਆਗ ਹੀ ਸਾਧਕ ਦੀ ਆਤਮ-ਸ਼ੁੱਧੀ ਦਾ ਮੂਲ ਮਾਰਗ ਹੈ।",
  deep_bhavarth_en: "Here, the spring season symbolizes the divine grace of Satguru. The tree joyfully sheds its old autumn leaves, sprouting fresh tender green leaves of Anahad Naad and inner spiritual purity.",
  mcq_quiz: {
    question: "1. साखी में 'याचक' (माँगने वाला) किसे कहा गया है?",
    options: [
      { text: "वृक्ष को", isCorrect: false, explanation: "वृक्ष दाता है, याचक बसंत ऋतु है।" },
      { text: "बसंत ऋतु को", isCorrect: true, explanation: "सही उत्तर: बसंत ऋतु याचक के रूप में आती है और वृक्ष प्रसन्नता से सब कुछ त्याग देता है।" },
      { text: "नए पत्तों को", isCorrect: false, explanation: "नए पत्ते तो परिणाम हैं।" },
      { text: "पथिक को", isCorrect: false, explanation: "नहीं, साखी में बसंत का संदर्भ है।" }
    ],
    questions: [
      {
        id: 1,
        question: "1. साखी में 'याचक' (माँगने वाला) किसे कहा गया है?",
        options: [
          { text: "वृक्ष को", isCorrect: false, explanation: "वृक्ष दाता है, याचक बसंत ऋतु है।" },
          { text: "बसंत ऋतु को", isCorrect: true, explanation: "सही उत्तर: बसंत ऋतु याचक के रूप में आती है और वृक्ष प्रसन्नता से सब कुछ त्याग देता है।" },
          { text: "नए पत्तों को", isCorrect: false, explanation: "नए पत्ते तो परिणाम हैं।" },
          { text: "पथिक को", isCorrect: false, explanation: "नहीं, साखी में बसंत का संदर्भ है।" }
        ]
      },
      {
        id: 2,
        question: "2. वृक्ष द्वारा पुराने पत्तों को प्रसन्नता से गिराना किस बात का प्रतीक है?",
        options: [
          { text: "नाश का", isCorrect: false, explanation: "यह नाश नहीं, बल्कि नव-सृजन का प्रतीक है।" },
          { text: "पतझड़ के प्रकोप का", isCorrect: false, explanation: "बसंत ऋतु प्रकोप नहीं, कृपा का प्रतीक है।" },
          { text: "विकारों एवं पुराने संस्कारों के त्याग का", isCorrect: true, explanation: "सही उत्तर: पुराने पत्तों का त्याग आत्म-शुद्धि व वैराग्य का प्रतीक है।" },
          { text: "मौसम बदलने के डर का", isCorrect: false, explanation: "नहीं, यह स्वेच्छा से किया गया त्याग है।" }
        ]
      },
      {
        id: 3,
        question: "3. सतगुरु कबीर साहेब के अनुसार सच्ची भक्ति कौन कर सकता है?",
        options: [
          { text: "जो कोई शूरमा अपने अहंकार व कुल-जाति के अभिमान को मिटा दे", isCorrect: true, explanation: "सही उत्तर: 'भक्ति करे कोई शूरमा, जाती वरन कुल खोय'।" },
          { text: "जो केवल बाहरी दिखावा करे", isCorrect: false, explanation: "दिखावे से भक्ति नहीं होती।" },
          { text: "जो केवल उपवास रखे", isCorrect: false, explanation: "उपवास मात्र से भक्ति सिद्ध नहीं होती।" },
          { text: "जो केवल तीर्थ यात्रा करे", isCorrect: false, explanation: "तीर्थाटन से आंतरिक शुद्धि नहीं होती।" }
        ]
      },
      {
        id: 4,
        question: "4. घट के भीतर अनहद नाद के नव पल्लव कब खिलते हैं?",
        options: [
          { text: "बाहरी शोरगुल में", isCorrect: false, explanation: "शोर से ध्यान नहीं लगता।" },
          { text: "भौतिक धन और वैभव प्राप्त होने पर", isCorrect: false, explanation: "भौतिक धन से इसका कोई संबंध नहीं है।" },
          { text: "सांसारिक चिंतन में उलझने पर", isCorrect: false, explanation: "चिंतन से बंधन बढ़ता है।" },
          { text: "जब सुरत पुराने संस्कारों और विकारों के पात गिरा देती है", isCorrect: true, explanation: "सही उत्तर: आंतरिक त्याग से ही अनहद नाद के पल्लव खिलते हैं।" }
        ]
      },
      {
        id: 5,
        question: "5. कबीर वाणी में 'सत्यनाम' का स्मरण क्यों आवश्यक है?",
        options: [
          { text: "केवल सांसारिक यश पाने के लिए", isCorrect: false, explanation: "भक्ति यश के लिए नहीं होती।" },
          { text: "भवसागर से पार उतरने और अमरलोक की प्राप्ति हेतु", isCorrect: true, explanation: "सही उत्तर: सत्यनाम ही जीव को अमरलोक तक ले जाता है।" },
          { text: "केवल दिखावे और आडंबर के लिए", isCorrect: false, explanation: "यह रस्म अदायगी नहीं है।" },
          { text: "केवल समय व्यतीत करने के लिए", isCorrect: false, explanation: "यह आत्मा की मुक्ति का मूल मार्ग है।" }
        ]
      }
    ]
  },
  inner_mystery: "घट के भीतर जब सुरत पुराने संस्कारों के पात गिराती है, तभी अनहद नाद के नव पल्लव खिलते हैं।",
  key_learnings: [
    "आज किसी एक पुराने विकार या क्रोध का प्रसन्नतापूर्वक त्याग करें।",
    "सद्गुरु की कृपा में समर्पण ही वास्तविक वैराग्य है।"
  ],
  cross_references: [
    "बीजक (साखी):\nकबीर यहु घर प्रेम का, खाला का घर नाहिं।\nशीश उतारै हाथि करि, सो पैसै घर माहिं।।\n(अर्थ: सतगुरु का यह प्रेम-मार्ग मौसी का घर नहीं है; इसके लिए अहंकार रूपी सिर उतारकर हथेली पर रखना पड़ता है।)",
    "अनुराग सागर / साखी:\nसतगुरु शब्द उजास है, मिटे भरम अंधियार।\nतीन लोक नौ खंड में, सूझै सिरजनहार।।\n(अर्थ: सतगुरु का शब्द अंतःकरण में ज्ञान का ऐसा प्रकाश करता है जिससे सारे भ्रम मिट जाते हैं और कण-कण में सिरजनहार के दर्शन होते हैं।)"
  ],
  contemplation_prompts: [
    "मेरे जीवन के वे कौन-से 'पुराने पत्ते' (आदतें) हैं जिन्हें छोड़ने में मुझे भय लगता है?",
    "क्या मैं अपने अहंकार का त्याग कर सद्गुरु चरणों में पूर्ण समर्पित हूँ?"
  ],
  nad_pranayama: {
    purak: "पूरक (Inhale - ८ से.) : आंतरिक चेतना का विस्तार व श्वास ग्रहण",
    kumbhak: "कुंभक (Hold - ४ से.) : सत्यनाम का घट के भीतर स्थिर स्पंदन",
    rechak: "रेचक (Exhale - ८ से.) : सभी विकारों और पुराने पत्तों का विसर्जन",
    shunya: "शून्य (Rest - ६ से.) : अनहद नाद की मौन झंकार में विश्राम"
  },
  certificate: {
    title: "पावन स्वाध्याय आशीर्वाद पत्र",
    subtitle: "श्री सद्गुरु कबीर साहेब स्वाध्याय पीठ — साहेब वर्ल्ड",
    verse: "पूरन भये मनोरथा, सतगुरु दई लखाय। कहैं कबीर सो हंस जन, अमरलोक में जाय।।",
    mantra: "।। सत्यनाम ।। साहेब बंदगी साहेब !!"
  }
};

// 2. The 11 Empty Sacred Granth Library Vaults (with Vault #4 pre-loaded with SW-001)
export const INITIAL_EMPTY_VAULTS: GranthVaultSlot[] = [
  {
    id: 1,
    title: "नितनेम गुटका साहेब",
    hindiTitle: "नितनेम गुटका साहेब",
    subtitle: "प्रातः व संध्या सुमिरन, आरती एवं मंगलाचरण",
    category: "दैनिक साधना",
    iconName: "BookOpen",
    slotStatus: "LOADED",
    totalChaptersExpected: 5,
    chapters: [
      { id: 1, title: "मंगलाचरण", lines: ["ध्यातं सद्गुरु कबीरं, सर्व-व्यापकं परमेश्वरं।", "बन्दीछोड़ जगतगुरु, पारब्रह्म परमेश्वर।।"] },
      { id: 2, title: "प्रातः सुमिरन", lines: ["उठि कै अमरत बेलि में, सुमिरहु नाम अपार।", "कबीर अमर पुरूष का, ध्यान धरहु निर्धार।।"] }
    ]
  },
  {
    id: 2,
    title: "कबीर बीजक ग्रंथ",
    hindiTitle: "कबीर बीजक ग्रंथ",
    subtitle: "रमैनी, सबद एवं साखी - सत्य का प्रामाणिक खजाना",
    category: "परम ग्रंथ",
    iconName: "Scroll",
    slotStatus: "LOADED",
    totalChaptersExpected: 11,
    chapters: [
      { id: 1, title: "रमैनी 1", lines: ["आदि अमर कबीर सुगम पुकारै, जाको भेद बिरला कोउ पावै।"] },
      { id: 2, title: "सबद 1", lines: ["संतो भाई आई ज्ञान की आंधी रे। भ्रम की टाटी सब उड़ानी, मोह रहि न बाँधी रे।"] }
    ]
  },
  {
    id: 3,
    title: "कबीर सागर",
    hindiTitle: "कबीर सागर",
    subtitle: "अनुराग सागर, अमर मूल, ब्रह्म बोध एवं सुखनिधान",
    category: "रहस्य ग्रंथ",
    iconName: "Circle",
    slotStatus: "LOADED",
    totalChaptersExpected: 8,
    chapters: [
      { id: 1, title: "अमर मूल", lines: ["धर्मदास विनती करी, जो प्रगट भये कबीर।"] }
    ]
  },
  {
    id: 4,
    title: "साखी संग्रह",
    hindiTitle: "साखी संग्रह (11 चरण)",
    subtitle: "११-चरणीय स्वाध्याय स्टेपर आर्किटेक्चर (SW-001: Ritu Basant)",
    category: "क्रियात्मक स्वाध्याय",
    iconName: "GraduationCap",
    isSwadhyay: true,
    slotStatus: "LOADED",
    totalChaptersExpected: 11,
    chapters: [
      {
        id: 1,
        title: "SW-001: रितु बसंत याचक भया",
        lines: [
          "रितु बसंत याचक भया, हरखि दिया द्रुम पात।",
          "ताते नव पल्लव भया, दिया दूर नहिं जात।।"
        ],
        bhavarth: "यहाँ बसंत ऋतु सद्गुरु या परमात्मा की कृपा का प्रतीक है। वृक्ष प्रसन्न होकर पुराने और सूखे पत्ते त्याग देता है, जिससे नए कोमल पल्लव खिलते हैं।"
      }
    ]
  },
  {
    id: 5,
    title: "उलटबांसी ग्रंथावली",
    hindiTitle: "उलटबांसी ग्रंथावली",
    subtitle: "3D Style Gamified Gaming Quiz Engine",
    category: "गूढ़ पहेलियाँ",
    iconName: "Gamepad",
    isGamifiedQuiz: true,
    slotStatus: "LOADED",
    totalChaptersExpected: 7,
    chapters: [
      { id: 1, title: "अचरज उलटबांसी", lines: ["सिंह चरावन गाय चली, बछड़ा के बिलार ब्यायी।"] }
    ]
  },
  {
    id: 6,
    title: "श्री गुरु ग्रंथ साहिब वाणी",
    hindiTitle: "श्री गुरु ग्रंथ साहिब वाणी",
    subtitle: "Bani Bhag of Bhagat Kabir Ji (सलोक एवं राग)",
    category: "पवित्र गुरबाणी",
    iconName: "Bookmark",
    slotStatus: "LOADED",
    totalChaptersExpected: 6,
    chapters: [
      { id: 1, title: "राग भैरो", lines: ["अव्वल अल्ला नूर उपाया, कुदरत के सब बंदे।"] }
    ]
  },
  {
    id: 7,
    title: "कबीर वाणी",
    hindiTitle: "कबीर वाणी एवं भजन",
    subtitle: "अमर भजन, पद एवं नाद श्रवण साधना",
    category: "नाद एवं रस",
    iconName: "Music",
    slotStatus: "LOADED",
    totalChaptersExpected: 9,
    chapters: [
      { id: 1, title: "झांझर अनहद बाजे", lines: ["झनन झनन अनहद बाजे, सतगुरु दरस दीन्हे।"] }
    ]
  },
  {
    id: 8,
    title: "सद्गुरु कबीर साहेब जीवन परिचय",
    hindiTitle: "सद्गुरु जीवन परिचय",
    subtitle: "Tabbed Eras Tracking 4 Yugas (सत्य, त्रेता, द्वापर, कलि)",
    category: "इतिहास एवं महिमा",
    iconName: "Clock",
    isTabbedEras: true,
    slotStatus: "LOADED",
    totalChaptersExpected: 4,
    chapters: [
      { id: 1, title: "सत्ययुग - सुकृत", lines: ["सत्ययुग में सतसुकृत नाम विराजे।"] }
    ]
  },
  {
    id: 9,
    title: "कबीर मंसूर",
    hindiTitle: "कबीर मंसूर ग्रंथ",
    subtitle: "धर्मदास संवाद, सत्यनाम परवाना व चौका विधान",
    category: "निर्णय सार",
    iconName: "ShieldCheck",
    slotStatus: "LOADED",
    totalChaptersExpected: 5,
    chapters: [
      { id: 1, title: "धर्मदास संवाद", lines: ["धर्मदास गहि चरन तिहारे, बिनती करै जो जोरि कर सारे।"] }
    ]
  },
  {
    id: 10,
    title: "पावन धाम जंत्री",
    hindiTitle: "पावन धाम जंत्री",
    subtitle: "कबीर चौरा मठ, मगहर धाम, लहरतारा तीर्थ दर्शन",
    category: "तीर्थ एवं दर्शन",
    iconName: "MapPin",
    slotStatus: "LOADED",
    totalChaptersExpected: 4,
    chapters: [
      { id: 1, title: "मगहर धाम दर्शन", lines: ["मगहर जहाँ कबीर पधारे, काशी की ममता मेटन हारे।"] }
    ]
  },
  {
    id: 11,
    title: "ऐप सेहत",
    hindiTitle: "ऐप सेहत एवं ऑफ़लाइन तिजोरी",
    subtitle: "Performance Logs, Storage Utilization, AES-256 Rules",
    category: "सिस्टम व सेटिंग्स",
    iconName: "HeartPulse",
    isAppHealth: true,
    slotStatus: "LOADED",
    totalChaptersExpected: 3,
    chapters: [
      { id: 1, title: "सिस्टम हेल्थ", lines: ["ऑफ़लाइन PWA तिजोरी पूर्णतः सुरक्षित है।"] }
    ]
  }
];

// Helper functions for Dynamic Administrator Injection
const STORAGE_KEY_VAULTS = 'saheb_injected_vaults_v4';
const STORAGE_KEY_SWADHYAY = 'saheb_injected_swadhyay_v4';

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
        return {
          ...EMPTY_SWADHYAY_SLOT,
          ...parsed,
          vocabulary: Array.isArray(parsed.vocabulary) ? parsed.vocabulary : EMPTY_SWADHYAY_SLOT.vocabulary,
          key_learnings: Array.isArray(parsed.key_learnings) ? parsed.key_learnings : EMPTY_SWADHYAY_SLOT.key_learnings,
          cross_references: Array.isArray(parsed.cross_references) ? parsed.cross_references : EMPTY_SWADHYAY_SLOT.cross_references,
          contemplation_prompts: Array.isArray(parsed.contemplation_prompts) ? parsed.contemplation_prompts : EMPTY_SWADHYAY_SLOT.contemplation_prompts,
          mcq_quiz: parsed.mcq_quiz ? { ...EMPTY_SWADHYAY_SLOT.mcq_quiz, ...parsed.mcq_quiz } : EMPTY_SWADHYAY_SLOT.mcq_quiz,
          nad_pranayama: parsed.nad_pranayama ? { ...EMPTY_SWADHYAY_SLOT.nad_pranayama, ...parsed.nad_pranayama } : EMPTY_SWADHYAY_SLOT.nad_pranayama,
          certificate: parsed.certificate ? { ...EMPTY_SWADHYAY_SLOT.certificate, ...parsed.certificate } : EMPTY_SWADHYAY_SLOT.certificate,
        };
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
