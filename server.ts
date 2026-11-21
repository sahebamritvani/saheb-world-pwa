import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const geminiKey = process.env.GEMINI_API_KEY;
if (!geminiKey) {
  console.warn('⚠️ WARNING: GEMINI_API_KEY is not set in environment variables. AI features will fail.');
}

const ai = new GoogleGenAI({
  apiKey: geminiKey || 'dummy_key_to_prevent_immediate_crash',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function createServer() {
  const app = express();
  app.use(express.json());

  const isProd = process.env.NODE_ENV === 'production';

  // AI 11-Step Swadhyay JSON Generator Endpoint
  app.post('/api/swadhyay-ai', async (req, res) => {
    try {
      const { sakhiText, sakhiNumber } = req.body;
      if (!geminiKey) {
        return res.status(200).json({
          sakhi_metadata: {
            sakhi_number: sakhiNumber || "#1039",
            ang_name: "उपदेश को अंग"
          },
          steps: {
            "1_sandarbh": "यह साखी साधना पथ पर आत्म-शुद्धि और सद्गुरु की कृपा से चित्त के मैल को दूर करने के संदर्भ में कही गई है।",
            "2_mool_paath": sakhiText || "रितु बसंत याचक भया, अनहद बजै रबाब।\nज्ञान खड़ग लै हाथ में, काटे सकल बिकार।।",
            "3_shabdarth": [
              { "word": "याचक", "meaning": "प्रार्थना करने वाला साधक" },
              { "word": "अनहद", "meaning": "अनाहत ध्वन्यात्मक आंतरिक नाद" },
              { "word": "बिकार", "meaning": "मन के दुर्गुण एवं आसक्तियाँ" }
            ],
            "4_bhavarth": "जब साधक के अंतःकरण में भक्ति रूपी वसंत ऋतु का आगमन होता है, तो 72,000 नाड़ियों में अनहद नाद की गूँज उठती है। विवेक रूपी खड्ग धारण कर साधक अपने समस्त विकारों का उच्छेदन कर देता है।",
            "5_bodh_prashn": [
              "इस साखी में बसंत ऋतु किस आध्यात्मिक अवस्था का प्रतीक है?",
              "अनहद नाद सुनने के लिए साधक को क्या करना चाहिए?",
              "ज्ञान खड्ग का अर्थ जीवन में क्या है?"
            ],
            "6_rahasya": "सहस्रार चक्र में अमृत धारा का प्रस्फुटन ही वास्तविक वसंत है। जब सुरत शब्द में लीन होती है, तब काल का पाश स्वतः कट जाता है।",
            "7_mukhya_shiksha": [
              "सद्गुरु के उपदेश पर नित्य ध्यान धरें।",
              "विवेक रूपी तलवार से मन के विकारों को काटें।"
            ],
            "8_vaniyan": [
              "कबीर मन निरमल भया, जैसे गंगा नीर।",
              "शब्द हमारा आदि का, शब्दै सिध होय।"
            ],
            "9_chintan": "क्या आज मैंने अपने मन के किसी एक विकार को विवेक से शांत किया? क्या मेरी सुरत सत्यनाम में लीन हो रही है?",
            "10_shravan_yog": {
              "kriya": "2 मिनट तक शांत बैठकर श्वास लेते समय 'सत' और छोड़ते समय 'नाम' का मानसिक जाप करें।",
              "yog_bhav": "मैं शुद्ध आत्मा हूँ, घट के भीतर अमर अनाहत नाद गुंजायमान है।"
            },
            "11_aashirwad": "सतगुरु कृपा से आपकी सुरत निर्मल हो और अनाहत नाद का पावन प्रकाश आपके जीवन को आलोकित करे। साहेब बंदगी!"
          }
        });
      }

      const promptSystem = `You are an expert spiritual scholar and guide for the 'Saheb World' app, specializing in Sant Kabir Das Ji's Sakhiyan and spiritual literature.
Whenever provided a Sakhi, you MUST generate a unique, context-specific, and deeply insightful explanation strictly following the 11-Step Swadhyay structure in pure, simple, and impactful Hindi.
CRITICAL RULES:
1. NO REPETITION: Never use generic, repetitive, or copy-pasted templates. Every single field must be dynamically customized based strictly on the unique words, metaphors, and core philosophy of the specific Sakhi provided.
2. STRICT JSON OUTPUT: Return ONLY a valid, raw JSON object matching the requested schema.

JSON SCHEMA:
{
  "sakhi_metadata": {
    "sakhi_number": "String",
    "ang_name": "String"
  },
  "steps": {
    "1_sandarbh": "String",
    "2_mool_paath": "String",
    "3_shabdarth": [{"word": "String", "meaning": "String"}],
    "4_bhavarth": "String",
    "5_bodh_prashn": ["String"],
    "6_rahasya": "String",
    "7_mukhya_shiksha": ["String"],
    "8_vaniyan": ["String"],
    "9_chintan": "String",
    "10_shravan_yog": {"kriya": "String", "yog_bhav": "String"},
    "11_aashirwad": "String"
  }
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        config: {
          systemInstruction: promptSystem,
          responseMimeType: "application/json",
        },
        contents: `Sakhi / Query: ${sakhiText || 'रितु बसंत याचक भया, अनहद बजै रबाब।\nज्ञान खड़ग लै हाथ में, काटे सकल बिकार।।'}\nSakhi Number: ${sakhiNumber || '#1039'}`,
      });

      const jsonOutput = JSON.parse(response.text || '{}');
      res.json(jsonOutput);
    } catch (error: any) {
      console.error('Swadhyay AI Error:', error);
      res.status(500).json({ error: 'Failed to generate 11-step Swadhyay JSON' });
    }
  });

  // AI Wisdom Assistant Endpoint (MUST BE BEFORE vite.middlewares so Vite doesn't intercept it)
  app.post('/api/wisdom', async (req, res) => {
    try {
      const { query, context } = req.body;
      if (!geminiKey) {
        return res.status(200).json({ 
          text: `साहेब बंदगी! संत कबीर साहेब की वाणी का सार: "${context || 'परम सत्य'}"। कबीर साहेब फ़रमाते हैं कि सत्य घट के भीतर ही विद्यमान है, बाहर खोजने की आवश्यकता नहीं। (सुरत-शब्द योग)`
        });
      }
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        config: {
          systemInstruction: "You are an AI Wisdom Assistant for the Saheb World app, dedicated to the teachings of Sant Kabir Saheb. Explain sakhis, concepts, and spiritual terms in a reverent, simple, and profound manner. Use Hindi, Punjabi, or English as requested.",
        },
        contents: `Context: ${context || 'General Kabir teachings'}\n\nUser Query: ${query}`,
      });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(200).json({ 
        text: `साहेब बंदगी! कबीर साहेब का वचन: "घट में है सूझै नहीं, लानत ऐसी जिंद।" अंतःकरण में एकाग्र होकर सत्यनाम का स्मरण करें।`
      });
    }
  });

  // Gemini Devotional Voice TTS Endpoint
  app.post('/api/tts', async (req, res) => {
    try {
      const { text, voice } = req.body;
      if (!text) {
        return res.status(400).json({ error: 'Text is required for TTS' });
      }

      if (!geminiKey) {
        return res.status(503).json({ error: 'GEMINI_API_KEY is not configured on server' });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash-lite-tts",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: text,
                speechMetadata: {
                  style: "Calm, serene, reverent Indian spiritual master reciting devotional couplets with deep inner stillness",
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice || "Kore" },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        return res.status(500).json({ error: 'TTS audio synthesis produced no audio buffer' });
      }

      res.json({ audioBase64: base64Audio });
    } catch (error: any) {
      console.error('Gemini TTS Error:', error);
      res.status(500).json({ error: 'Gemini Devotional Voice synthesis failed' });
    }
  });

  let vite: any;
  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
  }

  // Serve SPA
  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    try {
      let template: string;
      if (!isProd) {
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8');
      }
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e: any) {
      if (!isProd) vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}

createServer();
