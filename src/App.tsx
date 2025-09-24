import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { VoiceChat } from './pages/VoiceChat';
import { ScrapeForm } from './pages/ScrapeForm';
import { PromptLibrary } from './pages/PromptLibrary';
import './App.scss';

function App() {
  const [scrapedContent, setScrapedContent] = useState<string>('');

  const handleScrapedContent = (content: string) => {
    setScrapedContent(content);
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route 
            path="/" 
            element={
              scrapedContent ? (
                <VoiceChat scrapedContent={scrapedContent} />
              ) : (
                <ScrapeForm onScrapedContent={handleScrapedContent} />
              )
            } 
          />
          <Route path="/prompt-library" element={<PromptLibrary />} />
          <Route path="/voice-chat" element={<VoiceChat scrapedContent={scrapedContent} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
