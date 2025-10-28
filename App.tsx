import React, { useState, useCallback } from 'react';
import { generateStoryText, generateStoryAudio } from './services/geminiService';
import { decode, decodeAudioData, bufferToWavBlob } from './utils/audioUtils';
import { StoryDisplay } from './components/StoryDisplay';
import { StoryForm } from './components/StoryForm';
import { LoadingIndicator } from './components/LoadingIndicator';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StoryHistory } from './components/StoryHistory';
import type { Story } from './types';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [story, setStory] = useState<Story | null>(null);
  const [history, setHistory] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState<string>('');

  const handleReset = useCallback(() => {
    setStory(null);
    setTopic('');
  }, []);

  const handleSelectStoryFromHistory = useCallback((selectedStory: Story) => {
    setStory(selectedStory);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setStory(null);

    try {
      setLoadingStep('در حال نوشتن یک داستان زیبا...');
      const storyText = await generateStoryText(topic);
      
      setLoadingStep('در حال ضبط داستان با صدایی گرم...');
      const audioBase64 = await generateStoryAudio(storyText);

      setLoadingStep('آماده کردن صدا برای پخش...');
      const audioBytes = decode(audioBase64);
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const audioBuffer = await decodeAudioData(audioBytes, audioContext, 24000, 1);
      const wavBlob = bufferToWavBlob(audioBuffer);
      const audioUrl = URL.createObjectURL(wavBlob);

      const newStory: Story = { text: storyText, audioUrl, topic: topic.trim() };
      setStory(newStory);
      
      setHistory(prevHistory => {
        const updatedHistory = prevHistory.filter(
          h => h.topic.toLowerCase() !== topic.trim().toLowerCase()
        );
        return [newStory, ...updatedHistory].slice(0, 5);
      });

    } catch (err) {
      console.error(err);
      setError('متاسفانه مشکلی پیش آمد. لطفا دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  }, [topic, isLoading]);

  return (
    <div className="bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 min-h-screen flex flex-col items-center justify-between p-4 text-gray-800 selection:bg-purple-300 selection:text-purple-900">
      <Header />
      
      <main className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center flex-grow text-center px-4">
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 shadow">{error}</p>}
        
        {isLoading ? (
          <LoadingIndicator step={loadingStep} />
        ) : story ? (
          <StoryDisplay story={story} onReset={handleReset} />
        ) : (
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-indigo-800">چه داستانی دوست داری بشنوی؟</h2>
            <p className="text-gray-600 mb-8">یک کلمه یا عبارت کوتاه بگو، مثلا «یک خرس مهربان» یا «ماجراجویی در جنگل»</p>
            <StoryForm topic={topic} setTopic={setTopic} onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        )}

        <StoryHistory 
          history={history} 
          onSelectStory={handleSelectStoryFromHistory}
          currentTopic={story?.topic}
          isVisible={!isLoading}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;