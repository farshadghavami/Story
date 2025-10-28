
import React from 'react';
import type { Story } from '../types';

interface StoryDisplayProps {
  story: Story;
  onReset: () => void;
}

export const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, onReset }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-2xl animate-fade-in text-right">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">داستان شما آماده است!</h2>
      <audio controls src={story.audioUrl} className="w-full mb-6 rounded-lg">
        مرورگر شما از پخش صدا پشتیبانی نمی‌کند.
      </audio>
      <div className="max-h-60 overflow-y-auto pr-4 text-gray-700 leading-relaxed whitespace-pre-wrap border-r-4 border-purple-200">
        <p>{story.text}</p>
      </div>
      <button
        onClick={onReset}
        className="mt-8 w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
      >
        یک داستان دیگر بگو
      </button>
    </div>
  );
};
