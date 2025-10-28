import { GoogleGenAI, Modality } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateStoryText(topic: string): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `یک داستان کوتاه، شاد و آموزنده برای یک کودک ۵ ساله در مورد "${topic}" بنویس. داستان باید پایانی خوش و پیامی مثبت داشته باشد. لحن داستان باید بسیار صمیمی و کودکانه باشد.`,
            config: {
                temperature: 0.8,
                maxOutputTokens: 500,
                // FIX: Added thinkingConfig. When setting maxOutputTokens for gemini-2.5-flash,
                // a thinkingBudget must be set to reserve tokens for the final output.
                thinkingConfig: { thinkingBudget: 200 },
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating story text:", error);
        throw new Error("Failed to generate story text.");
    }
}

export async function generateStoryAudio(text: string): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: text }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' }, // A warm and friendly voice
                    },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) {
            throw new Error("No audio data received from API.");
        }
        return base64Audio;
    } catch (error) {
        console.error("Error generating story audio:", error);
        throw new Error("Failed to generate story audio.");
    }
}