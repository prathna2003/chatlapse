
import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
import { Message } from './types';
import { Sender } from './types';
import { initializeChat, sendMessage } from './services/geminiService';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    try {
      chatRef.current = initializeChat();
      setMessages([
        {
          id: 'initial-ai-message',
          text: "Hello! I'm your AI assistant powered by Gemini. How can I help you today?",
          sender: Sender.AI,
        },
      ]);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred during initialization.');
      }
      console.error(e);
    }
  }, []);

  const handleSendMessage = async (userMessage: string) => {
    if (!chatRef.current) {
      setError('Chat is not initialized. Please refresh the page.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      text: userMessage,
      sender: Sender.USER,
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    const aiResponseId = `ai-${Date.now()}`;
    // Add a placeholder for the AI response
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: aiResponseId, text: '', sender: Sender.AI },
    ]);

    try {
      await sendMessage(chatRef.current, userMessage, (chunk) => {
        // Update the AI message text as chunks stream in
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === aiResponseId ? { ...msg, text: msg.text + chunk } : msg
          )
        );
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Error getting response: ${errorMessage}`);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === aiResponseId
            ? { ...msg, text: 'Sorry, I encountered an error. Please try again.' }
            : msg
        )
      );
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 font-sans">
      <Header />
      <ChatWindow messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      {error && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-red-500 text-white p-3 rounded-lg shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default App;
