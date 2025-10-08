// Server-only helpers for Gemini. Aman dipanggil dari route handler.
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function buildRoadmapWithGemini({ name, role, level, skills }) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("NO_GEMINI_KEY");

  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Buat roadmap belajar 4–6 minggu berupa JSON murni (tanpa teks lain).
Role: ${role}. Level: ${level}. Skill user: ${skills.join(", ") || "-"}.
Fokuskan tema & task untuk menutup skill gap. Format wajib:

{
  "weeks":[
    {"week":1,"theme":"...", "tasks":["...","..."], "hours":6},
    ...
  ]
}
  `.trim();

  const res = await model.generateContent(prompt);
  const text = res.response.text();
  const json = extractJson(text);
  if (!Array.isArray(json.weeks) || !json.weeks.length) {
    throw new Error("AI_EMPTY");
  }
  return json;
}

function extractJson(s) {
  const m = String(s).match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = m ? m[1] : s;
  return JSON.parse(raw);
}
