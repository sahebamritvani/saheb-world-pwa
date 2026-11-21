import React from 'react';
import { X, MapPin, Info, Compass, ExternalLink } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Language } from '../context/LanguageContext';

interface PilgrimageMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const HOLY_SITES = [
  { 
    id: 1, 
    name: { hi: "लहरतारा (वाराणसी)", pa: "ਲਹਿਰਤਾਰਾ (ਵਾਰਾਣਸੀ)", en: "Lahartara (Varanasi)" },
    desc: { hi: "सद्गुरु साहेब का प्राकट्य स्थल — जहाँ नीरू-नीमा को कमल के फूल पर बालक रूप में मिले।", pa: "ਸਤਿਗੁਰੂ ਸਾਹਿਬ ਦਾ ਪ੍ਰਗਟ ਅਸਥਾਨ", en: "Appearance site of Satguru Saheb on a lotus flower." },
    lat: 25.3216, 
    lng: 82.9739,
    address: "Lahartara Boulia, Varanasi, Uttar Pradesh"
  },
  { 
    id: 2, 
    name: { hi: "मगहर धाम", pa: "ਮਗਹਰ ਧਾਮ", en: "Maghar Dham" },
    desc: { hi: "सद्गुरु साहेब का निर्वाण स्थल — जहाँ आपने कबीर मठ में शरीर त्याग कर सतलोक प्रस्थान किया।", pa: "ਸਤਿਗੁਰੂ ਸਾਹਿਬ ਦਾ ਨਿਰਵਾਣ ਅਸਥਾਨ", en: "Site of Satguru Saheb's departure to Satlok." },
    lat: 26.7570, 
    lng: 83.1250,
    address: "Maghar, Sant Kabir Nagar, Uttar Pradesh"
  },
  { 
    id: 3, 
    name: { hi: "कबीर चौरा मठ", pa: "ਕਬੀਰ ਚੌਰਾ ਮੱਠ", en: "Kabir Chaura Math" },
    desc: { hi: "वाराणसी में मुख्य केंद्र — जहाँ सदियों से कबीर वाणी और सत्संग का प्रकाश फैल रहा है।", pa: "ਵਾਰਾਣਸੀ ਵਿੱਚ ਮੁੱਖ ਕੇਂਦਰ", en: "Main historic center in Varanasi." },
    lat: 25.3176, 
    lng: 82.9901,
    address: "Kabir Chaura, Varanasi, Uttar Pradesh"
  }
];

export function PilgrimageMapModal({ isOpen, onClose, lang }: PilgrimageMapModalProps) {
  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#FFFDF9] rounded-3xl w-full max-w-4xl h-[85vh] overflow-hidden flex flex-col shadow-2xl border-2 border-amber-300">
        <div className="p-4 border-b border-amber-200 flex justify-between items-center bg-gradient-to-r from-amber-100 to-orange-100">
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-orange-600" />
            <div>
              <h3 className="font-black text-amber-900 text-sm md:text-base m-0">
                {lang === 'pa' ? 'ਪਾਵਨ ਤੀਰਥ ਦਰਸ਼ਨ' : lang === 'en' ? 'Sacred Pilgrimage Sites' : 'पावन तीर्थ दर्शन व पवित्र स्थल'}
              </h3>
              <p className="text-[10px] text-amber-800 m-0">कबीर साहेब से जुड़े ऐतिहासिक एवं पावन स्थल</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-amber-200/60 rounded-full transition cursor-pointer">
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left panel: Sites list */}
          <div className="w-full md:w-80 p-4 bg-amber-50/50 border-r border-amber-200 overflow-y-auto space-y-3">
             <h4 className="text-xs font-black uppercase text-amber-900 flex items-center gap-1.5 pb-1 border-b border-amber-200">
               <Compass className="w-4 h-4 text-orange-600" />
               <span>{lang === 'pa' ? 'ਤੀਰਥ ਸਥਾਨ' : lang === 'en' ? 'Holy Pilgrimage Centers' : 'प्रमुख पावन स्थल'}</span>
             </h4>
             {HOLY_SITES.map((site) => (
               <div 
                 key={site.id}
                 className="p-3 rounded-2xl bg-white border border-amber-200 shadow-xs hover:border-amber-400 transition space-y-1"
               >
                 <div className="flex items-center justify-between">
                   <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">#0{site.id}</span>
                   <a 
                     href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address + ' ' + (site.name.hi))}`}
                     target="_blank"
                     rel="noreferrer"
                     className="text-[10px] font-bold text-orange-700 hover:text-orange-900 flex items-center gap-0.5"
                   >
                     <span>Google Maps</span>
                     <ExternalLink className="w-3 h-3" />
                   </a>
                 </div>
                 <h5 className="font-black text-xs md:text-sm text-amber-950 m-0">{site.name[lang] || site.name.hi}</h5>
                 <p className="text-[11px] text-gray-700 m-0 leading-relaxed">{site.desc[lang] || site.desc.hi}</p>
                 <p className="text-[10px] text-gray-400 italic m-0 pt-1">{site.address}</p>
               </div>
             ))}
          </div>

          {/* Right panel: Map View or Fallback */}
          <div className="flex-1 relative bg-gray-100 flex items-center justify-center">
            {mapsApiKey ? (
              <APIProvider 
                apiKey={mapsApiKey as string}
                onLoad={() => console.log('Maps API has loaded.')}
              >
                <Map
                  style={{ width: '100%', height: '100%' }}
                  defaultCenter={{ lat: 26.0, lng: 83.0 }}
                  defaultZoom={7}
                  mapId="DEMO_MAP_ID"
                  internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
                >
                  {HOLY_SITES.map((site) => (
                    <AdvancedMarker
                      key={site.id}
                      position={{ lat: site.lat, lng: site.lng }}
                      title={site.name[lang] || site.name.hi}
                    >
                      <Pin background={'#8B0000'} glyphColor={'#FFD700'} borderColor={'#D4AF37'} />
                    </AdvancedMarker>
                  ))}
                </Map>
              </APIProvider>
            ) : (
              <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-amber-50 space-y-4">
                 <div className="w-16 h-16 rounded-3xl bg-amber-200 text-amber-900 flex items-center justify-center shadow-md">
                   <MapPin className="w-8 h-8 text-orange-700" />
                 </div>
                 <div>
                   <h4 className="font-black text-amber-950 text-base m-0">पावन तीर्थ दर्शन मानचित्र (Sacred Pilgrimage Map)</h4>
                   <p className="text-xs text-amber-900/80 max-w-sm mt-1">
                     लहरतारा, मगहर धाम एवं कबीर चौरा मठ जैसे पावन स्थल कबीर पंथियों के लिए सर्वोपरि तीर्थ हैं। ऊपर दिए गए 'Google Maps' लिंक से आप सीधे दिशा-निर्देश प्राप्त कर सकते हैं।
                   </p>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
