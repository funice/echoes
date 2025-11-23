import { GoogleGenAI, Type, Chat } from "@google/genai";
import { Note, Language } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const PASTEL_COLORS = [
  '#ffeded', // Light Pink
  '#e8f4f8', // Light Blue
  '#fdfcdc', // Light Yellow
  '#f2f2f2', // Light Gray
  '#eafaf1', // Light Mint
  '#fbf4ec', // Light Beige
];

/**
 * Generates a batch of "community" notes.
 */
export const generateSampleNotes = async (lang: Language = 'en'): Promise<Note[]> => {
  try {
    const langPrompt = lang === 'zh-CN' ? 'Simplified Chinese' : lang === 'zh-TW' ? 'Traditional Chinese' : lang === 'ja' ? 'Japanese' : 'English';

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate 6 short, emotional, heartbreaking, or bittersweet anonymous messages in ${langPrompt}. They should be addressed to ex-lovers, lost friends, or past selves. Keep them under 140 characters.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              to: { type: Type.STRING },
              from: { type: Type.STRING },
              message: { type: Type.STRING },
            },
            required: ["to", "from", "message"]
          }
        }
      }
    });

    const rawData = JSON.parse(response.text || '[]');

    return rawData.map((item: any, index: number) => ({
      id: `ai-${Date.now()}-${index}`,
      to: item.to,
      from: item.from,
      message: item.message,
      timestamp: Date.now() - Math.floor(Math.random() * 10000000),
      color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
      isAiGenerated: true
    }));

  } catch (error) {
    console.error("Failed to generate notes:", error);
    // Fallback based on language could be added here, using EN for now
    return [
      {
        id: 'fallback-1',
        to: 'J',
        from: 'M',
        message: 'I still look for your car every time I drive down that street.',
        timestamp: Date.now(),
        color: '#ffeded',
        isAiGenerated: true
      }
    ];
  }
};

/**
 * Generates a hypothetical note.
 */
export const generateHypotheticalNote = async (name: string, lang: Language = 'en'): Promise<Note> => {
  try {
    const langPrompt = lang === 'zh-CN' ? 'Simplified Chinese' : lang === 'zh-TW' ? 'Traditional Chinese' : lang === 'ja' ? 'Japanese' : 'English';

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, poetic, and ambiguous unsent letter addressed to the name "${name}" in ${langPrompt}. It should feel real.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            message: { type: Type.STRING },
            from: { type: Type.STRING, description: "A generic initial or common name" },
          },
          required: ["message", "from"]
        }
      }
    });

    const data = JSON.parse(response.text || '{}');

    return {
      id: `ai-hypothetical-${Date.now()}`,
      to: name,
      from: data.from || 'Anonymous',
      message: data.message || `I wonder if you still remember the days we spent together, ${name}.`,
      timestamp: Date.now(),
      color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
      isAiGenerated: true
    };

  } catch (error) {
    return {
      id: 'error-hypo',
      to: name,
      from: '?',
      message: 'The silence here is loud, but I hope you are doing well.',
      timestamp: Date.now(),
      color: '#f2f2f2',
      isAiGenerated: true
    };
  }
}

/**
 * Chatbot initialization and message sending
 */
let chatSession: Chat | null = null;

export const sendChatMessage = async (message: string, lang: Language): Promise<string> => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are an empathetic, gentle, and supportive AI companion on a website called "Echoes of Goodbye". 
        Users come here to post stories about breakups, loss, and sadness. 
        Your goal is to listen, validate their feelings, and offer gentle comfort. 
        Do not give generic advice like "move on". Be poetic, soft-spoken, and kind.
        Always respond in the same language as the user (Current Language context: ${lang}).
        If they mention a story they posted, ask them how they felt writing it.`,
      }
    });
  }

  try {
    const result = await chatSession.sendMessage({ message });
    return result.text || "...";
  } catch (e) {
    console.error(e);
    return "I am having trouble hearing you right now, but I am here.";
  }
};

export const resetChat = () => {
  chatSession = null;
}
