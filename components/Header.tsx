
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex items-center justify-center sticky top-0 z-10">
      <svg
        className="w-8 h-8 mr-3 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Gemini AI Chat</h1>
    </header>
  );
};

export default Header;
