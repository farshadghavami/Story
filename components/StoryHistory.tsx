import React from 'react';
import type { Story } from '../types';

interface StoryHistoryProps {
  history: Story[];
  onSelectStory: (story: Story) => void;
  currentTopic?: string;
  isVisible: boolean;
}

const BookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v14.053l3.86-1.93a.75.75 0 01.78 0l3.86 1.93A.75.75 0 0121 19.952V6.75a3 3 0 00-3-3h-6a.75.75 0 01-.75-.75zM8.25 4.5a3 3 0 00-3 3v13.202a.75.75 0 001.218.548l3.86-1.93a.75.75 0 01.78 0l3.86 1.93A.75.75 0 0015.75 21V5.25a.75.75 0 01-.75-.75h-6z" clipRule="evenodd" />
    </svg>
);


export const StoryHistory: React.FC<StoryHistoryProps> = ({ history, onSelectStory, currentTopic, isVisible }) => {
  if (!isVisible || history.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mt-12 animate-fade-in">
        <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center justify-center gap-x-2">
            <BookIcon className="w-6 h-6" />
            <span>داستان‌های اخیر</span>
        </h3>
        <ul className="space-y-2">
            {history.map((storyItem) => {
                const isSelected = storyItem.topic === currentTopic;
                return (
                    <li key={storyItem.topic}>
                        <button
                            onClick={() => onSelectStory(storyItem)}
                            className={`w-full text-right p-3 rounded-lg transition-all duration-200 flex items-center gap-x-3 ${
                                isSelected 
                                ? 'bg-purple-600 text-white shadow-lg scale-105' 
                                : 'bg-white/60 hover:bg-white/90 hover:shadow-md'
                            }`}
                        >
                            <span className={`font-semibold ${isSelected ? 'text-white' : 'text-purple-800'}`}>
                                داستان در مورد:
                            </span>
                            <span className={`${isSelected ? 'text-purple-100' : 'text-gray-700'}`}>
                                {storyItem.topic}
                            </span>
                        </button>
                    </li>
                );
            })}
        </ul>
    </div>
  );
};