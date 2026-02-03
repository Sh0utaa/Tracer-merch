import { GoogleGenAI, Type } from "@google/genai";
import { AIGeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMarketingCopy = async (productName: string, context: string): Promise<AIGeneratedContent> => {
  try {
    const modelId = "gemini-3-flash-preview"; 
    
    const prompt = `
      You are a creative marketing assistant for a Science/Physics merchandise store called "Tracer".
      Create a catchy, witty, physics-themed slogan and a short, exciting description for a product.
      
      Product Name: ${productName}
      Context: ${context}
      
      Return JSON only.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            slogan: { type: Type.STRING, description: "A witty, short physics pun or slogan." },
            extendedDescription: { type: Type.STRING, description: "A 2-sentence exciting marketing description." }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIGeneratedContent;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      slogan: "Physics in Motion",
      extendedDescription: "Experience the beauty of particle physics with this exclusive item from Tracer."
    };
  }
};