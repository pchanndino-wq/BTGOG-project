
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const BTGOG_KNOWLEDGE_BASE = `
You are the Official BTGOG Systems Expert. BTGOG (Build The Ground of Growth) is a systems-based housing, education, and workforce development initiative.
Founder: Seven Crawford (442) 375-8487.

Core Principles:
1. Long-term stabilization (12-36 months) over short-term shelter.
2. Five Specialized Campuses: Family, Youth & Young Adult, Workforce & Trades, Recovery & Re-Entry, Technology & Operations.
3. Integrated Services: Education, licensed daycare, healthcare, and employment are on-site.
4. Sustainability: Self-sustaining models using on-campus farmland, data centers, and manufacturing.
5. Accountability: Data-driven decision making and rigorous outcome tracking.

Guideline: Be professional, institutional, and direct. Focus on systems, scalability, and impact for public partners.
`;

export async function queryBTGOG(question: string): Promise<string> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: question,
    config: {
      systemInstruction: BTGOG_KNOWLEDGE_BASE
    }
  });
  
  return response.text || "I apologize, I could not retrieve the specific system data. Please contact Seven Crawford at (442) 375-8487.";
}
