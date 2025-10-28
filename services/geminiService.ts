
import { GoogleGenAI, Chat } from '@google/genai';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const initializeChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: 'You are a helpful and creative AI assistant. Your responses should be formatted in markdown for better readability.',
    },
  });
};

export const sendMessage = async (
  chat: Chat,
  message: string,
  onChunk: (chunk: string) => void
): Promise<void> => {
  try {
    const stream = await chat.sendMessageStream({ message });
    for await (const chunk of stream) {
      onChunk(chunk.text);
    }
  } catch (error) {
    console.error('Error sending message to Gemini:', error);
    throw error;
  }
};
