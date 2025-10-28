
import React from 'react';

const Spinner: React.FC = () => (
  <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-purple-600 rounded-full animate-spin"></div>
);

interface LoadingIndicatorProps {
  step: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ step }) => (
  <div className="flex flex-col items-center justify-center space-y-6 text-indigo-800">
    <Spinner />
    <p className="text-lg font-semibold animate-pulse">{step}</p>
  </div>
);
