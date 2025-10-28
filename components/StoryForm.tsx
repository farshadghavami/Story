
import React from 'react';

interface StoryFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const MagicWandIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.636l-.549.091c-.905.15-1.568.934-1.568 1.85 0 .916.663 1.699 1.567 1.85l.549.091c.281.047.517.283.517.565v.008l.091.549c.15.905.934 1.568 1.85 1.568.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.636l.549-.091c.905-.15 1.568-.934 1.568-1.85 0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.517-.565v-.008l-.091-.549A1.91 1.91 0 0011.828 2.25zM16.5 9.75a.75.75 0 000 1.5h.008a.75.75 0 000-1.5h-.008zM9 12.75a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H9z" clipRule="evenodd" />
        <path d="M12 1.5a.75.75 0 01.75.75V3a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM12.75 21a.75.75 0 001.5 0v-.008a.75.75 0 00-1.5 0v.008zM18.894 6.166a.75.75 0 00-1.06-1.06l-.72.72a.75.75 0 001.06 1.06l.72-.72zM5.106 17.834a.75.75 0 00-1.06-1.06l-.72.72a.75.75 0 101.06 1.06l.72-.72zM21 12.75a.75.75 0 000-1.5h-.008a.75.75 0 000 1.5h.008zM3.75 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h.75a.75.75 0 01.75.75zM6.166 18.894a.75.75 0 001.06-1.06l-.72-.72a.75.75 0 00-1.06 1.06l.72.72zM17.834 5.106a.75.75 0 001.06-1.06l-.72-.72a.75.75 0 00-1.06 1.06l.72.72z" />
    </svg>
);


export const StoryForm: React.FC<StoryFormProps> = ({ topic, setTopic, onSubmit, isLoading }) => (
  <form onSubmit={onSubmit} className="w-full space-y-4">
    <input
      type="text"
      value={topic}
      onChange={(e) => setTopic(e.target.value)}
      placeholder="موضوع داستان..."
      className="w-full px-5 py-4 text-center text-lg text-gray-700 bg-white/80 rounded-lg border-2 border-transparent focus:border-purple-400 focus:ring-purple-400 focus:outline-none shadow-md transition-all duration-300"
      disabled={isLoading}
    />
    <button
      type="submit"
      disabled={isLoading || !topic.trim()}
      className="w-full flex items-center justify-center gap-x-3 bg-purple-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
    >
        <MagicWandIcon className="w-6 h-6" />
        <span>برام داستان بگو!</span>
    </button>
  </form>
);
