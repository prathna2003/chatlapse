
import React from 'react';
import { Message, Sender } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const UserAvatar: React.FC = () => (
  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  </div>
);

const AiAvatar: React.FC = () => (
   <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  </div>
);

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === Sender.USER;

  // A simple markdown-to-html converter
  const renderText = (text: string) => {
    // Basic bold, italic, and code block support
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    text = text.replace(/`([^`]+)`/g, '<code class="bg-gray-200 dark:bg-gray-800 rounded px-1 py-0.5">$1</code>');
    text = text.replace(/\n/g, '<br />');
    return { __html: text };
  };

  if (isUser) {
    return (
      <div className="flex justify-end items-start space-x-4">
        <div className="bg-blue-500 text-white rounded-lg p-4 max-w-lg shadow">
          <p dangerouslySetInnerHTML={renderText(message.text)} />
        </div>
        <UserAvatar />
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-4">
      <AiAvatar />
      <div className="bg-white dark:bg-gray-700 dark:text-gray-200 rounded-lg p-4 max-w-lg shadow">
         <p dangerouslySetInnerHTML={renderText(message.text)} />
      </div>
    </div>
  );
};

export default MessageBubble;
