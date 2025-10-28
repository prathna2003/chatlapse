
import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import { Sender } from '../types';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const lastMessageIsUser = messages.length > 0 && messages[messages.length - 1].sender === Sender.USER;

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isLoading && (
         <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 max-w-lg shadow animate-pulse">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      )}
      <div ref={chatEndRef} />
    </main>
  );
};

export default ChatWindow;
