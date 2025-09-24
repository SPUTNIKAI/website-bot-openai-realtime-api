import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScrapeForm.scss';
import { processHtmlContent } from '../utils/processHtmlContent';

interface ScrapeFormProps {
  onScrapedContent: (content: string) => void;
}

export function ScrapeForm({ onScrapedContent }: ScrapeFormProps) {
  const navigate = useNavigate();
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

   // const scrapingAntApiKey = process.env.REACT_APP_SCRAPINGANT_API_KEY;
    const scrapingAntApiKey = '063e8ec436ac4f389163d98e028de25e';

    
    if (!scrapingAntApiKey) {
      setError('ScrapingAnt API key is not set');
      setIsLoading(false);
      return;
    }

    const apiEndpoint = `https://api.scrapingant.com/v2/general?url=${encodeURIComponent(
      url
    )}&x-api-key=${scrapingAntApiKey}&browser=false&block_resource=stylesheet&block_resource=image&block_resource=media&block_resource=font&block_resource=texttrack&block_resource=xhr&block_resource=fetch&block_resource=eventsource&block_resource=websocket&block_resource=manifest`;

    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const htmlContent = await response.text();
      const textContent = processHtmlContent(htmlContent);
      console.log('🚀 ~ handleSubmit ~ textContent:', textContent);
      onScrapedContent(textContent);
    } catch (error) {
      console.error('Error while calling ScrapingAnt:', error);
      setError('An error occurred during scraping');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="scrape-form">
      <h1>AI Voice Assistant</h1>
      <p>Scrape a website and chat with an AI about it using voice!</p>
      
      <div className="form-options">
        <div className="option">
          <h2>Option 1: Website Analysis</h2>
          <p>Enter a website URL to analyze and discuss with AI</p>
          <form onSubmit={handleSubmit}>
            <input
              type="url"
              value={url}
              onChange={handleUrlChange}
              placeholder="Enter website URL..."
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Scraping...' : 'Start Voice Chat'}
            </button>
          </form>
        </div>
        
        <div className="option">
          <h2>Option 2: AI Persona Chat</h2>
          <p>Choose from pre-configured AI personas for specialized conversations</p>
          <button 
            className="prompt-library-btn"
            onClick={() => navigate('/prompt-library')}
          >
            Browse AI Personas
          </button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  );
}
