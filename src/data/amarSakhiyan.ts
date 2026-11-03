// Amar Sakhiyan & Pavan Vachan Mock Database & Offline Routing Helper
// Contains categorized "अमर साखियाँ" and "पावन वचन" with local offline fallback.

export interface SakhiItem {
  id: string;
  category: 'amar_sakhi' | 'pavan_vachan' | 'ultabansi' | 'bijak';
  titleHi: string;
  titlePa: string;
  contentHi: string;
  contentPa: string;
  bhavarthHi: string;
  bhavarthPa: string;
  source: string;
}

export const AMAR_SAKHIYAN_DATABASE: SakhiItem[] = [
  {
    id: 'sakhi-1',
    category: 'amar_sakhi',
    titleHi: 'माया महाठगिनी हम जानी',
    titlePa: 'ਮਾਇਆ ਮਹਾਠਗਿਨੀ ਹਮ ਜਾਨੀ',
    contentHi: 'माया महाठगिनी हम जानी। तिरहुत ध्यावै सुई फिरावै, सिर पर मुकुट धरी ज्ञानी॥',
    contentPa: 'ਮਾਇਆ ਮਹਾਠਗਿਨੀ ਹਮ ਜਾਨੀ। ਤਿਰਹੁਤ ਧਿਆਵੈ ਸੁਈ ਫਿਰਾਵੈ, ਸਿਰ ਪਰ ਮੁਕੁਟ ਧਰੀ ਗਿਆਨੀ॥',
    bhavarthHi: 'सतगुरु समझाते हैं कि यह संसार रूपी माया सबको ठग रही है, ज्ञानी-ध्यानी भी इसके जाल में हैं। केवल सत्यनाम ही इससे बचाता है।',
    bhavarthPa: 'ਸਤਿਗੁਰੂ ਸਮਝਾਉਂਦੇ ਹਨ ਕਿ ਇਹ ਮਾਇਆ ਸਭ ਨੂੰ ਠੱਗ ਰਹੀ ਹੈ। ਕੇਵਲ ਸਤਿਨਾਮ ਹੀ ਇਸ ਤੋਂ ਬਚਾਉਂਦਾ ਹੈ।',
    source: 'कबीर साहेब बीजक — साखी प्रकरण'
  },
  {
    id: 'sakhi-2',
    category: 'pavan_vachan',
    titleHi: 'पोथी पढ़ि पढ़ि जग मुआ',
    titlePa: 'ਪੋਥੀ ਪੜ੍ਹਿ ਪੜ੍ਹਿ ਜਗ ਮੁਆ',
    contentHi: 'पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोय। ढाई आखर प्रेम का, पढ़ै सो पंडित होय॥',
    contentPa: 'ਪੋਥੀ ਪੜ੍ਹਿ ਪੜ੍ਹਿ ਜਗ ਮੁਆ, ਪੰਡਿਤ ਭਇਆ ਨ ਕੋਇ। ਢਾਈ ਅਖਰ ਪ੍ਰੇਮ ਕਾ, ਪੜ੍ਹੈ ਸੋ ਪੰਡਿਤ ਹੋਇ॥',
    bhavarthHi: 'केवल बाहरी ग्रंथ पढ़ने से मुक्ति नहीं मिलती, जब तक हृदय में सतगुरु के प्रति प्रेम और भक्ति भाव जागृत न हो।',
    bhavarthPa: 'ਕੇਵਲ ਬਾਹਰੀ ਗ੍ਰੰਥ ਪੜ੍ਹਨ ਨਾਲ ਮੁਕਤੀ ਨਹੀਂ ਮਿਲਦੀ, ਜਦ ਤੱਕ ਹਿਰਦੇ ਵਿੱਚ ਪ੍ਰੇਮ ਅਤੇ ਭਗਤੀ ਨਾ ਜਾਗੇ।',
    source: 'कबीर साहेब शब्दावली'
  },
  {
    id: 'sakhi-3',
    category: 'ultabansi',
    titleHi: 'अचरज एक भया है भाई',
    titlePa: 'ਅਚਰਜੁ ਏਕ ਭਇਆ ਹੈ ਭਾਈ',
    contentHi: 'अचरज एक भया है भाई, सिंह चरावन गाय चली। बछड़ा के बिलार ब्यायी, देख तमाशा मन मली॥',
    contentPa: 'ਅਚਰਜੁ ਏਕ ਭਇਆ ਹੈ ਭਾਈ, ਸਿੰਘ ਚਰਾਵਨ ਗਾਇ ਚਲੀ। ਬਛੜਾ ਕੇ ਬਿਲਾਰ ਬਿਆਈ, ਦੇਖ ਤਮਾਸ਼ਾ ਮਨ ਮਲੀ॥',
    bhavarthHi: 'यह आध्यात्मिक उलटबांसी है। मन रूपी सिंह जब सतगुरु के रंग में रंग जाता है, तो विषय-विकार शांत हो जाते हैं।',
    bhavarthPa: 'ਇਹ ਅਧਿਆਤਮਿਕ ਉਲਟਬਾਣੀ ਹੈ। ਮਨ ਰੂਪੀ ਸਿੰਘ ਜਦ ਸਤਿਗੁਰੂ ਦੇ ਰੰਗ ਵਿੱਚ ਰੰਗਿਆ ਜਾਂਦਾ ਹੈ।',
    source: 'कबीर उलटबांसी संग्रह'
  },
  {
    id: 'sakhi-4',
    category: 'bijak',
    titleHi: 'जहाँ सोच तहँ संकट भारी',
    titlePa: 'ਜਹਾਂ ਸੋਚ ਤਹਾਂ ਸੰਕਟ ਭਾਰੀ',
    contentHi: 'जहाँ सोच तहँ संकट भारी, सोच बिना तहँ सुखहि सुखारा। सोच त्यागि भजु साहेब अपना, उतरि जाहु भवसागर पारा॥',
    contentPa: 'ਜਹਾਂ ਸੋਚ ਤਹਾਂ ਸੰਕਟ ਭਾਰੀ, ਸੋਚ ਬਿਨਾ ਤਹਾਂ ਸੁਖਹਿ ਸੁਖਾਰਾ। ਸੋਚ ਤਿਆਗਿ ਭਜੁ ਸਾਹਿਬ ਅਪਨਾ, ਉਤਰਿ ਜਾਹੁ ਭਵਸਾਗਰ ਪਾਰਾ॥',
    bhavarthHi: 'सांसारिक चिंता (सोच) ही सारे संकटों की जड़ है। चिंता त्यागकर केवल सतगुरु का सिमरन करो, भवसागर तर जाओगे।',
    bhavarthPa: 'ਸਾਂਸਾਰਿਕ ਚਿੰਤਾ ਹੀ ਸਾਰੇ ਸੰਕਟਾਂ ਦੀ ਜੜ੍ਹ ਹੈ। ਚਿੰਤਾ ਤਿਆਗ ਕੇਵਲ ਸਤਿਗੁਰੂ ਦਾ ਸਿਮਰਨ ਕਰੋ।',
    source: 'कबीर बीजक रमैणी'
  },
  {
    id: 'sakhi-5',
    category: 'amar_sakhi',
    titleHi: 'ज्यों तिल माहि तेल है',
    titlePa: 'ਜਿਉ ਤਿਲ ਮਾਹਿ ਤੇਲ ਹੈ',
    contentHi: 'ज्यों तिल माहि तेल है, ज्यों चकमक में आग। तेरा साई तुझ ही में, जाग सके तो जाग॥',
    contentPa: 'ਜਿਉ ਤਿਲ ਮਾहि ਤੇਲ ਹੈ, ਜਿਉ ਚਕਮਕ ਮਹਿ ਆਗ। ਤੇਰਾ ਸਾਈ ਤੁਝ ਹੀ ਮਹਿ, ਜਾਗ ਸਕੇ ਤੋ ਜਾਗ॥',
    bhavarthHi: 'जैसे तिल में तेल और पत्थर में अग्नि छिपी है, वैसे ही परमात्मा हर जीव के भीतर विराजमान है। अंतःकरण में खोजो।',
    bhavarthPa: 'ਜਿਵੇਂ ਤਿਲ ਵਿੱਚ ਤੇਲ ਅਤੇ ਪੱਥਰ ਵਿੱਚ ਅੱਗ ਹੈ,ਿਵੇਂ ਹੀ ਪ੍ਰਮਾਤਮਾ ਹਰ ਜੀਵ ਦੇ ਅੰਦਰ ਵਿਰਾਜਮਾਨ ਹੈ।',
    source: 'कबीर साखी संकलन'
  }
];

const OFFLINE_CACHED_SAKHI_KEY = 'saheb_world_sakhi_cache_v1';

export async function fetchAmarSakhiyanOffline(): Promise<SakhiItem[]> {
  try {
    // Try localStorage fallback or cache storage first when offline
    const cached = localStorage.getItem(OFFLINE_CACHED_SAKHI_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
    // Otherwise store default database locally and return
    localStorage.setItem(OFFLINE_CACHED_SAKHI_KEY, JSON.stringify(AMAR_SAKHIYAN_DATABASE));
    return AMAR_SAKHIYAN_DATABASE;
  } catch {
    return AMAR_SAKHIYAN_DATABASE;
  }
}
