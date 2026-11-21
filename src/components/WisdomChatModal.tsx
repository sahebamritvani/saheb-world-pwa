import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { Language } from '../context/LanguageContext';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

interface WisdomChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialContext?: string;
}

export function WisdomChatModal({ isOpen, onClose, lang, initialContext }: WisdomChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ 
        role: 'bot', 
        text: lang === 'pa' ? 'ਸਾਹਿਬ ਬੰਦਗੀ! ਮੈਂ ਤੁਹਾਡਾ ਗਿਆਨ ਸਹਾਇਕ ਹਾਂ। ਤੁਸੀਂ ਕਬੀਰ ਸਾਹਿਬ ਦੀ ਬਾਣੀ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛ ਸਕਦੇ ਹੋ।' : 
              lang === 'en' ? 'Saheb Bandagi! I am your Wisdom Assistant. Ask me anything about Kabir Saheb\'s teachings.' : 
              'साहेब बंदगी! मैं आपका ज्ञान सहायक हूँ। आप कबीर साहेब की वाणी या दर्शन के बारे में कुछ भी पूछ सकते हैं।' 
      }]);
    }
  }, [isOpen, lang]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await fetch('/api/wisdom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMsg, context: initialContext }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessages(prev => [...prev, { role: 'bot', text: data.error || (lang === 'pa' ? 'ਖਿਮਾ ਕਰਨਾ, ਇਸ ਸਮੇਂ ਏਆਈ ਉੱਤਰ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।' : lang === 'en' ? 'Apologies, AI reflection is temporarily unavailable.' : 'क्षमा करें, इस समय AI चिंतन उपलब्ध नहीं है। कृपया पुनः प्रयास करें।') }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: data.text || '...' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: lang === 'pa' ? 'ਨੈੱਟਵਰਕ ਸੰਪਰਕ ਵਿੱਚ ਰੁਕਾਵਟ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।' : lang === 'en' ? 'Network connection issue. Please try again.' : 'नेटवर्क संपर्क में समस्या आई। कृपया पुनः प्रयास करें।' }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl h-[70vh] flex flex-col shadow-2xl border-2 border-orange-200">
        <div className="p-4 border-b border-orange-100 flex justify-between items-center bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-3xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div>
               <h3 className="font-black text-amber-950 text-sm">
                 {lang === 'pa' ? 'ਸਾਹਿਬ ਗਿਆਨ AI' : lang === 'en' ? 'Saheb Wisdom AI' : 'साहेब ज्ञान AI Assistant'}
               </h3>
               {initialContext && <p className="text-[9px] text-orange-700 font-bold m-0 italic truncate max-w-[150px]">Ref: {initialContext}</p>}
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-orange-100 rounded-full transition">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-orange-50/20">
          {messages.map((m, idx) => (
            <div key={`msg-${idx}-${m.role}-${m.text.slice(0, 8)}`} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm flex gap-2 ${
                m.role === 'user' 
                  ? 'bg-[#8B0000] text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 rounded-tl-none border border-orange-100'
              }`}>
                {m.role === 'bot' && <Bot className="w-4 h-4 shrink-0 mt-0.5 text-orange-600" />}
                <p className="m-0 leading-relaxed whitespace-pre-wrap">{m.text}</p>
                {m.role === 'user' && <User className="w-4 h-4 shrink-0 mt-0.5 opacity-60" />}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-orange-100 flex items-center gap-2 shadow-sm">
                <Loader2 className="w-4 h-4 text-orange-600 animate-spin" />
                <span className="text-xs font-bold text-gray-400">Reflecting...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-orange-100 bg-white rounded-b-3xl">
          <form className="relative flex gap-2" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <input 
              type="text"
              placeholder={lang === 'pa' ? 'ਸਵਾਲ ਪੁੱਛੋ...' : lang === 'en' ? 'Ask a question...' : 'प्रश्न पूछें...'}
              className="flex-1 pl-4 pr-12 py-3 rounded-2xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-orange-50/30 text-sm font-medium"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button 
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-2 top-1.5 p-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition disabled:opacity-50 shadow-md active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
