import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export function getGemini(model = 'gemini-1.5-flash') {
  return genAI.getGenerativeModel({
    model,
    generationConfig: { temperature: 0.7, topP: 0.95, maxOutputTokens: 1500 },
  });
}
