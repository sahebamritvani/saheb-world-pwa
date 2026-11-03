// Strict TypeScript Schemas for Saheb World Architecture

export interface VocabularySlot {
  word: string;
  meaning: string;
}

export interface QuizOptionSlot {
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizSlot {
  question: string;
  options: QuizOptionSlot[];
}

export interface SwadhyayStepSlot {
  // Step 1: विषय संदर्भ
  context: string;
  // Step 2: मूल पाठ एवं स्वर-तरंग
  original_text: string;
  transliteration?: string;
  // Step 3: शब्दार्थ कपाट
  vocabulary: VocabularySlot[];
  // Step 4: अंतःकरण सत्संग
  deep_bhavarth: string;
  // Step 5: प्रज्ञा प्रश्नोत्तरी
  mcq_quiz: QuizSlot;
  // Step 6: घट के भीतर का रहस्य
  inner_mystery: string;
  // Step 7: आज की मुख्य शिक्षा
  key_learnings: string[];
  // Step 8: शब्द-प्रमाण / संबंधित वाणियाँ
  cross_references: string[];
  // Step 9: आत्म-मंथन
  contemplation_prompts: string[];
  // Step 10: नाद अनुसन्धान एवं श्रवण साधना
  nad_pranayama: {
    purak: string;
    kumbhak: string;
    rechak: string;
    shunya: string;
  };
  // Step 11: सतगुरु आशीर्वाद एवं डिजिटल प्रमाण-पत्र
  certificate: {
    title: string;
    subtitle: string;
    verse: string;
    mantra: string;
  };
}

export interface ChapterSlot {
  id: number;
  title: string;
  lines: string[];
  bhavarth?: string;
  tag?: string;
}

export interface GranthVaultSlot {
  id: number;
  title: string;
  hindiTitle: string;
  subtitle: string;
  category: string;
  iconName: string;
  isSwadhyay?: boolean;
  isGamifiedQuiz?: boolean;
  isTabbedEras?: boolean;
  isAppHealth?: boolean;
  slotStatus: 'EMPTY_SLOT' | 'LOADED';
  totalChaptersExpected: number;
  chapters: ChapterSlot[];
}
