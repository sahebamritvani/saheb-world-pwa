// Daily Kabir Sakhis & Affirmations Repository for Saheb World PWA

export interface KabirSakhiItem {
  id: number;
  coupletHi: string;
  coupletPa: string;
  coupletEn: string;
  bhavarthHi: string;
  bhavarthPa: string;
  bhavarthEn: string;
  topicHi: string;
  topicPa: string;
  topicEn: string;
}

export interface DailyAffirmationItem {
  id: number;
  affirmationHi: string;
  affirmationPa: string;
  affirmationEn: string;
  sourceHi: string;
  sourcePa: string;
  sourceEn: string;
}

export const DAILY_SAKHIS: KabirSakhiItem[] = [
  {
    id: 1,
    topicHi: "सद्गुरु की महिमा",
    topicPa: "ਸਤਿਗੁਰੂ ਦੀ ਮਹਿਮਾ",
    topicEn: "Glory of Satguru",
    coupletHi: "गुरु गोविंद दोऊ खड़े, काके लागूं पांय।\nबलिहारी गुरु आपने, गोविंद दियो बताय।।",
    coupletPa: "ਗੁਰੂ ਗੋਵਿੰਦ ਦੋਊ ਖੜੇ, ਕਾਕੇ ਲਾਗੂੰ ਪਾਂਇ।\nਬਲਿਹਾਰੀ ਗੁਰੂ ਆਪਣੇ, ਗੋਵਿੰਦ ਦਿਓ ਬਤਾਇ।।",
    coupletEn: "Guru and God both stand before me; to whom should I bow?\nI surrender unto my Guru, who revealed God unto me.",
    bhavarthHi: "सद्गुरु ही वह पावन द्वार हैं जो परमात्मा का साक्षात दर्शन कराते हैं, अतः सद्गुरु का स्थान सर्वोपरि है।",
    bhavarthPa: "ਸਤਿਗੁਰੂ ਹੀ ਉਹ ਪਵਿੱਤਰ ਦੁਆਰ ਹਨ ਜੋ ਪ੍ਰਮਾਤਮਾ ਦਾ ਸਾਕਸ਼ਾਤਕਾਰ ਕਰਾਉਂਦੇ ਹਨ।",
    bhavarthEn: "Satguru is the divine bridge who awakens true spiritual realization of the Supreme Divine."
  },
  {
    id: 2,
    topicHi: "सत्य और आचरण",
    topicPa: "ਸੱਚ ਅਤੇ ਆਚਰਣ",
    topicEn: "Truth & Right Conduct",
    coupletHi: "सांच बराबर तप नहीं, झूठ बराबर पाप।\nजाके हिरदै सांच है, ताके हिरदै आप।।",
    coupletPa: "ਸਾਂਚ ਬਰਾਬਰ ਤਪ ਨਹੀਂ, ਝੂਠ ਬਰਾਬਰ ਪਾਪ।\nਜਾਕੇ ਹਿਰਦੈ ਸਾਂਚ ਹੈ, ਤਾਕੇ ਹਿਰਦੈ ਆਪ।।",
    coupletEn: "No penance compares to Truth, no sin equals deceit.\nIn whose heart Truth abides, the Divine Himself resides.",
    bhavarthHi: "सत्य ही सर्वश्रेष्ठ तपस्या है। जिसके अंतःकरण में निष्कपट सत्य है, वहीं परमात्मा का प्रत्यक्ष वास है।",
    bhavarthPa: "ਸੱਚ ਹੀ ਸਰਵਉੱਚ ਤਪੱਸਿਆ ਹੈ। ਜਿਸਦੇ ਹਿਰਦੇ ਵਿੱਚ ਸੱਚ ਵੱਸਦਾ ਹੈ, ਉੱਥੇ ਹੀ ਪ੍ਰਮਾਤਮਾ ਵਸਦੇ ਹਨ।",
    bhavarthEn: "Truthfulness is the highest austerity. Divine presence blossoms in an honest heart."
  },
  {
    id: 3,
    topicHi: "मन की निर्मलता",
    topicPa: "ਮਨ ਦੀ ਨਿਰਮਲਤਾ",
    topicEn: "Purity of Mind",
    coupletHi: "कबीर मन निरमल भया, जैसे गंगा नीर।\nपाछे पाछे हरि फिरै, कहत कबीर कबीर।।",
    coupletPa: "ਕਬੀਰ ਮਨ ਨਿਰਮਲ ਭਇਆ, ਜੈਸੇ ਗੰਗਾ ਨੀਰ।\nਪਾਛੇ ਪਾਛੇ ਹਰਿ ਫਿਰੈ, ਕਹਤ ਕਬੀਰ ਕਬੀਰ।।",
    coupletEn: "Kabir's mind has become pure, like holy river waters.\nNow the Divine walks alongside, calling out Kabir, Kabir.",
    bhavarthHi: "जब चित्त विकार-रहित और निर्मल हो जाता है, तो जीव और परमात्मा के बीच का सारा द्वैत समाप्त हो जाता है।",
    bhavarthPa: "ਜਦੋਂ ਮਨ ਨਿਰਮਲ ਹੋ ਜਾਵੇ, ਤਾਂ ਪ੍ਰਭੂ ਖੁਦ ਅਜਿਹੇ ਸਾਧਕ ਦਾ ਸੰਗ ਕਰਦੇ ਹਨ।",
    bhavarthEn: "When the mind becomes pure and spotless, supreme spiritual oneness is achieved."
  },
  {
    id: 4,
    topicHi: "मधुर वाणी",
    topicPa: "ਮਿੱਠੀ ਬਾਣੀ",
    topicEn: "Gentle Speech",
    coupletHi: "ऐसी बानी बोलिए, मन का आपा खोय।\nऔरन को सीतल करै, आपहु सीतल होय।।",
    coupletPa: "ਐਸੀ ਬਾਨੀ ਬੋਲੀਏ, ਮਨ ਕਾ ਆਪਾ ਖੋਇ।\nਔਰਨ ਕੋ ਸੀਤਲ ਕਰੈ, ਆਪਹੁ ਸੀਤਲ ਹੋਇ।।",
    coupletEn: "Speak words so gentle and egoless that they soothe others,\nWhile keeping your own heart in profound peace.",
    bhavarthHi: "अहंकार को त्यागकर ऐसी मधुर एवं सत्य वाणी बोलें जिससे सुनने वाले को शांति मिले और स्वयं का मन भी शीतल रहे।",
    bhavarthPa: "ਹੰਕਾਰ ਤਿਆਗ ਕੇ ਮਿੱਠੀ ਬਾਣੀ ਬੋਲੋ ਜੋ ਸਭ ਨੂੰ ਸ਼ਾਂਤੀ ਅਤੇ ਸ਼ੀਤਲਤਾ ਪ੍ਰਦਾਨ ਕਰੇ।",
    bhavarthEn: "Egoless and compassionate speech brings peace to listeners and serenity to the speaker."
  },
  {
    id: 5,
    topicHi: "समय का महत्व",
    topicPa: "ਸਮੇਂ ਦੀ ਕੀਮਤ",
    topicEn: "Value of Time & Practice",
    coupletHi: "काल करै सो आज कर, आज करै सो अब।\nपल में परलै होएगी, बहुरि करेगा कब।।",
    coupletPa: "ਕਾਲ ਕਰੈ ਸੋ ਆਜ ਕਰ, ਆਜ ਕਰੈ ਸੋ ਅਬ।\nਪਲ ਮੇਂ ਪਰਲੈ ਹੋਏਗੀ, ਬਹੁਰਿ ਕਰੇਗਾ ਕਬ।।",
    coupletEn: "What you would do tomorrow, do today; what today, do this very moment.\nA moment can bring dissolution, when will you then act?",
    bhavarthHi: "आत्म-कल्याण और साधना के कार्य को कभी कल पर न टालें, प्रत्येक क्षण अनमोल है।",
    bhavarthPa: "ਸਾਧਨਾ ਅਤੇ ਨੇਕ ਕੰਮਾਂ ਨੂੰ ਕਦੇ ਕੱਲ੍ਹ 'ਤੇ ਨਾ ਛੱਡੋ, ਹਰ ਪਲ ਅਮੋਲਕ ਹੈ।",
    bhavarthEn: "Do not postpone meditation and noble deeds; every breath is invaluable."
  },
  {
    id: 6,
    topicHi: "घट में प्रभु",
    topicPa: "ਅੰਦਰ ਵੱਸਦਾ ਪ੍ਰਭੂ",
    topicEn: "Divine Within",
    coupletHi: "कस्तूरी कुंडल बसै, मृग ढूंढै बन माहि।\nऐसे घट घट राम हैं, दुनिया देखै नाहिं।।",
    coupletPa: "ਕਸਤੂਰੀ ਕੁੰਡਲ ਬਸੈ, ਮ੍ਰਿਗ ਢੂੰਢੈ ਬਨ ਮਾਹਿ।\nਐਸੇ ਘਟ ਘਟ ਰਾਮ ਹੈਂ, ਦੁਨੀਆ ਦੇਖੈ ਨਾਹਿਂ।।",
    coupletEn: "The musk fragrance resides in the deer's naval, yet it searches the forest.\nLikewise the Divine abides in every heart, yet the world searches outside.",
    bhavarthHi: "परम शांति और सत्य हमारे अपने अंतःकरण में विद्यमान हैं, केवल अंतर्मुखी होकर उन्हें पहचानना है।",
    bhavarthPa: "ਪ੍ਰਮਾਤਮਾ ਹਰੇਕ ਦੇ ਹਿਰਦੇ ਅੰਦਰ ਵਿਰਾਜਮਾਨ ਹੈ, ਸਿਰਫ਼ ਅੰਤਰਮੁਖੀ ਹੋ ਕੇ ਉਸਦਾ ਅਨੁਭਵ ਕਰਨਾ ਹੈ।",
    bhavarthEn: "The Divine is enshrined within every breath; inward contemplation awakens that vision."
  },
  {
    id: 7,
    topicHi: "सहज समाधि",
    topicPa: "ਸਹਜ ਸਮਾਧੀ",
    topicEn: "Spontaneous Meditation",
    coupletHi: "साधो सहज समाधि भली।\nसाईं सों मिलन भयो जबहीं ते, मिटि गई सकल रली।।",
    coupletPa: "ਸਾਧੋ ਸਹਜ ਸਮਾਧੀ ਭਲੀ।\nਸਾਂਈਂ ਸੋਂ ਮਿਲਨ ਭਇਓ ਜਬਹੀਂ ਤੇ, ਮਿਟਿ ਗਈ ਸਕਲ ਰਲੀ।।",
    coupletEn: "O seeker, natural effortless contemplation is sublime.\nEver since union with the Beloved, all worldly agitation dissolved.",
    bhavarthHi: "स्वाभाविक और सरल भाव से हर क्षण सद्गुरु के स्मरण में रहना ही सहज समाधि है।",
    bhavarthPa: "ਸਹਿਜ ਭਾਵ ਨਾਲ ਹਰ ਪਲ ਪ੍ਰਭੂ ਸਿਮਰਨ ਵਿੱਚ ਲੀਨ ਰਹਿਣਾ ਹੀ ਸਭ ਤੋਂ ਉੱਤਮ ਸਮਾਧੀ ਹੈ।",
    bhavarthEn: "Living in perpetual awareness with devotion is the highest state of peaceful meditation."
  }
];

export const DAILY_AFFIRMATIONS: DailyAffirmationItem[] = [
  {
    id: 1,
    affirmationHi: "आज मैं अपने मन को शांत, वाणी को शीतल और आचरण को सत्य के प्रकाश से युक्त रखूंगा।",
    affirmationPa: "ਅੱਜ ਮੈਂ ਆਪਣੇ ਮਨ ਨੂੰ ਸ਼ਾਂਤ, ਬੋਲਾਂ ਨੂੰ ਮਿੱਠਾ ਅਤੇ ਜੀਵਨ ਨੂੰ ਸੱਚ ਦੇ ਮਾਰਗ 'ਤੇ ਰੱਖਾਂਗਾ।",
    affirmationEn: "Today I will maintain a tranquil mind, gentle speech, and truthful conduct.",
    sourceHi: "सद्गुरु कबीर पावन वचन",
    sourcePa: "ਸਤਿਗੁਰੂ ਕਬੀਰ ਸਾਹਿਬ ਪਾਵਨ ਬਚਨ",
    sourceEn: "Satguru Kabir Saheb Sacred Word"
  },
  {
    id: 2,
    affirmationHi: "मन के हारे हार है, मन के जीते जीत। आज मैं भय और संशय को त्यागकर आत्मबल से युक्त रहूंगा।",
    affirmationPa: "ਮਨ ਦੇ ਹਾਰੇ ਹਾਰ ਹੈ, ਮਨ ਦੇ ਜਿੱਤੇ ਜਿੱਤ। ਅੱਜ ਮੈਂ ਸ਼ੰਕਾਵਾਂ ਤਿਆਗ ਕੇ ਆਤਮ-ਵਿਸ਼ਵਾਸ ਵਿੱਚ ਰਹਾਂਗਾ।",
    affirmationEn: "He who conquers the mind conquers all. Today I release all doubt and stand firm in inner strength.",
    sourceHi: "कबीर बीजक दर्शन",
    sourcePa: "ਕਬੀਰ ਬੀਜਕ ਦਰਸ਼ਨ",
    sourceEn: "Kabir Bijak Philosophy"
  },
  {
    id: 3,
    affirmationHi: "प्रत्येक श्वास में अनहद नाद और सद्गुरु की दया का स्मरण करते हुए मैं निष्काम कर्म करूंगा।",
    affirmationPa: "ਹਰ ਸਵਾਸ ਵਿੱਚ ਅਨਹਦ ਨਾਦ ਅਤੇ ਗੁਰੂ ਕਿਰਪਾ ਦਾ ਸਿਮਰਨ ਕਰਦਿਆਂ ਮੈਂ ਨੇਕ ਕੰਮ ਕਰਾਂਗਾ।",
    affirmationEn: "With each breath mindful of the inner divine vibration, I perform righteous, selfless action.",
    sourceHi: "कबीर शब्दावली",
    sourcePa: "ਕਬੀਰ ਸ਼ਬਦਾਵਲੀ",
    sourceEn: "Kabir Shabdavali"
  },
  {
    id: 4,
    affirmationHi: "मैं किसी के प्रति वैर अथवा द्वेष नहीं रखूंगा, सब घट में उसी एक परमात्मा की ज्योति को देखूंगा।",
    affirmationPa: "ਮੈਂ ਕਿਸੇ ਪ੍ਰਤੀ ਵੈਰ-ਵਿਰੋਧ ਨਹੀਂ ਰੱਖਾਂਗਾ, ਸਭ ਅੰਦਰ ਉਸ ਇੱਕ ਪ੍ਰਭੂ ਦੀ ਜੋਤ ਦੇਖਾਂਗਾ।",
    affirmationEn: "I hold no malice towards anyone; I recognize the singular divine spark in all living beings.",
    sourceHi: "कबीर साखी विचार",
    sourcePa: "ਕਬੀਰ ਸਾਖੀ ਵੀਚਾਰ",
    sourceEn: "Kabir Sakhi Contemplation"
  },
  {
    id: 5,
    affirmationHi: "सत्य ही मेरा धन है, संतोष ही मेरा सुख है और सद्गुरु स्मरण ही मेरा परम सहारा है।",
    affirmationPa: "ਸੱਚ ਹੀ ਮੇਰਾ ਧਨ ਹੈ, ਸੰਤੋਖ ਹੀ ਮੇਰਾ ਸੁਖ ਹੈ ਅਤੇ ਗੁਰੂ ਸਿਮਰਨ ਹੀ ਮੇਰਾ ਸਹਾਰਾ ਹੈ।",
    affirmationEn: "Truth is my treasure, contentment is my peace, and remembrance of Satguru is my refuge.",
    sourceHi: "कबीर ज्ञान गुदड़ी",
    sourcePa: "ਕਬੀਰ ਗਿਆਨ ਗੁਦੜੀ",
    sourceEn: "Kabir Gyan Gudari"
  }
];

export function getDailySakhi(): KabirSakhiItem {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const index = Math.abs(dayOfYear) % DAILY_SAKHIS.length;
  return DAILY_SAKHIS[index];
}

export function getDailyAffirmation(): DailyAffirmationItem {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const index = Math.abs(dayOfYear + 2) % DAILY_AFFIRMATIONS.length;
  return DAILY_AFFIRMATIONS[index];
}

export interface DailyHukamnamaItem {
  id: number;
  raagHi: string;
  raagPa: string;
  raagEn: string;
  verseHi: string;
  versePa?: string;
  verseEn?: string;
  meaningHi: string;
  meaningPa?: string;
  meaningEn?: string;
}

export const DAILY_HUKAMNAMAS: DailyHukamnamaItem[] = [
  {
    id: 1,
    raagHi: "राग भैरो — श्री गुरु ग्रंथ साहेब (भगत कबीर जी)",
    raagPa: "ਰਾਗ ਭੈਰਉ — ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ (ਭਗਤ ਕਬੀਰ ਜੀ)",
    raagEn: "Raag Bhairo — Sri Guru Granth Sahib (Bhagat Kabir Ji)",
    verseHi: "अव्वल अल्ला नूर उपाया, कुदरत के सब बंदे।\nएक नूर ते सब जग उपज्या, कौन भले को मन्दे।।",
    versePa: "ਅਵ्वल ਅੱਲਾ ਨੂਰ ਉਪਾਇਆ, ਕੁਦਰਤ ਕੇ ਸਭ ਬੰਦੇ।\nਇਕ ਨੂਰ ਤੇ ਸਭ ਜਗ ਉਪਜਿਆ, ਕੌਨ ਭਲੇ ਕੋ ਮੰਦੇ।।",
    verseEn: "First, God created the Light; all beings are creatures of His nature.\nFrom that One Light, the entire universe welled up. Who is good, and who is bad?",
    meaningHi: "परमात्मा का नूर समस्त सृष्टि में व्याप्त है। जब सब उसी एक ईश्वर की संतान हैं, तो किसी में भेदभाव या ऊंच-नीच का भाव नहीं रखना चाहिए।",
    meaningPa: "ਪ੍ਰਮਾਤਮਾ ਦਾ ਨੂਰ ਸਾਰੀ ਸ੍ਰਿਸ਼ਟੀ ਵਿੱਚ ਹੈ। ਸਭ ਉਸੇ ਦੀ ਸੰਤਾਨ ਹਨ, ਕੋਈ ਊਣਾ ਜਾਂ ਉੱਚਾ ਨਹੀਂ।",
    meaningEn: "The Divine Light pervades all creation. Recognizing the One Light in all eliminates division."
  },
  {
    id: 2,
    raagHi: "राग आसा — श्री गुरु ग्रंथ साहेब (भगत कबीर जी)",
    raagPa: "ਰਾਗ ਆਸਾ — ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ (ਭਗਤ ਕਬੀਰ ਜੀ)",
    raagEn: "Raag Asa — Sri Guru Granth Sahib (Bhagat Kabir Ji)",
    verseHi: "अरे इन दोउन राह न पाई।\nहिंदू तुरक कहा ते निकसे, किसने राह चलाई।।",
    versePa: "ਅਰੇ ਇਨ ਦੋਉਨ ਰਾਹ ਨ ਪਾਈ।\nਹਿੰਦੂ ਤੁਰਕ ਕਹਾ ਤੇ ਨਿਕਸੇ, ਕਿਸਨੇ ਰਾਹ ਚਲਾਈ।।",
    verseEn: "Alas, neither of these two paths have found the Truth.\nWhere did Hindu and Muslim come from? Who started these paths?",
    meaningHi: "सत्य किसी विशेष मजहब या संप्रदाय तक सीमित नहीं है, वह शाश्वत और सार्वभौमिक है जो हृदय की निर्मलता से प्राप्त होता है।",
    meaningPa: "ਸੱਚ ਕਿਸੇ ਖਾਸ ਧਰਮ ਜਾਂ ਫਿਰਕੇ ਤੱਕ ਸੀਮਤ ਨਹੀਂ, ਇਹ ਹਿਰਦੇ ਦੀ ਸ਼ੁੱਧਤਾ ਨਾਲ ਪ੍ਰਾਪत ਹੁੰਦਾ ਹੈ।",
    meaningEn: "True realization transcends outer religious dogmas and sectarian divisions."
  },
  {
    id: 3,
    raagHi: "राग प्रभाती — श्री गुरु ग्रंथ साहेब (भगत कबीर जी)",
    raagPa: "ਰਾਗ ਪ੍ਰਭਾਤੀ — ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ (ਭਗਤ ਕਬੀਰ ਜੀ)",
    raagEn: "Raag Prabhati — Sri Guru Granth Sahib (Bhagat Kabir Ji)",
    verseHi: "कबीर मेरी सिमरनी रसना ऊपर राम।\nआदि अंत मधि मोरै इहै छै काम।।",
    versePa: "ਕਬੀਰ ਮੇਰੀ ਸਿਮਰਨੀ ਰਸਨਾ ਊਪਰ ਰਾਮ।\nਆਦਿ ਅੰਤ ਮਧਿ ਮੋਰੈ ਇਹੈ ਛੈ ਕਾਮ।।",
    verseEn: "My true rosary is the perpetual repetition of the Divine Name upon my tongue.",
    meaningHi: "कबीर जी कहते हैं कि मेरी असली सिमरनी (माला) मेरी जिह्वा पर राम-नाम का निरंतर स्मरण है। आदि, मध्य और अंत में मेरा यही एक कार्य है।",
    meaningPa: "ਕਬੀਰ ਜੀ ਕਹਿੰਦੇ ਹਨ ਕਿ ਮੇਰੀ ਅਸਲੀ ਸਿਮਰਨੀ ਜੀਭ 'ਤੇ ਪ੍ਰਭੂ ਦਾ ਸਿਮਰਨ ਹੈ।",
    meaningEn: "My true rosary is the perpetual repetition of the Divine Name upon my tongue."
  },
  {
    id: 4,
    raagHi: "राग गौरी — श्री गुरु ग्रंथ साहेब (भगत कबीर जी)",
    raagPa: "ਰਾਗ ਗਉੜੀ — ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ (ਭਗਤ ਕਬੀਰ ਜੀ)",
    raagEn: "Raag Gauri — Sri Guru Granth Sahib (Bhagat Kabir Ji)",
    verseHi: "जोग न होई जटा बिखाए।\nभस्म लगाये जोग न होई।।",
    versePa: "ਜੋਗ ਨ ਹੋਈ ਜਟਾ ਬਿਖਾਏ।\nਭਸਮ ਲਗਾਏ ਜੋਗ ਨ ਹੋਈ।।",
    verseEn: "Yoga is not achieved through outer ascetic displays or ashes, but through purity of mind.",
    meaningHi: "केवल जटा बढ़ाने या शरीर पर भस्म रमाने से योग या परमात्मा की प्राप्ति नहीं होती, इसके लिए मन का संयम और निर्मल अंतःकरण आवश्यक है।",
    meaningPa: "ਸਿਰਫ਼ ਜਟਾਵਾਂ ਵਧਾਉਣ ਜਾਂ ਭਸਮ ਲਗਾਉਣ ਨਾਲ ਪ੍ਰਭੂ ਨਹੀਂ ਮਿਲਦੇ, ਮਨ ਦਾ ਸੰਜਮ ਜ਼ਰੂਰੀ ਹੈ।",
    meaningEn: "Yoga is not achieved through outer ascetic displays or ashes, but through purity of mind."
  }
];

export function getDailyHukamnama(): DailyHukamnamaItem {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const index = Math.abs(dayOfYear + 1) % DAILY_HUKAMNAMAS.length;
  return DAILY_HUKAMNAMAS[index];
}

