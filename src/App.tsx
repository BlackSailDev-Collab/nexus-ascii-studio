import { useState, useEffect, useCallback } from 'react';
import { asciiService } from './lib/asciiService';
import { FIG_FONTS, type FigFontName } from './lib/asciiFonts';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { OutputArea } from './components/OutputArea';
import { Footer } from './components/Footer';
import { SplashLoader } from './components/SplashLoader';

import './App.css';

const ALL_FONTS = Object.keys(FIG_FONTS) as FigFontName[];

export default function App() {
  const [text, setText] = useState('ASCII STUDIO');
  const [font, setFont] = useState<FigFontName>('standard');
  const [result, setResult] = useState('');
  const [isCopying, setIsCopying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [fontSearch, setFontSearch] = useState('');
  const [fontSize, setFontSize] = useState(11);

  const filteredFonts = ALL_FONTS.filter(f => f.includes(fontSearch.toLowerCase()));

  // Preload all fonts on startup
  useEffect(() => {
    const init = async () => {
      try {
        await asciiService.preloadAll();
      } catch (err) {
        console.error('Initialization failed:', err);
      } finally {
        setIsInitializing(false);
      }
    };
    init();
  }, []);

  const generateArt = useCallback(async (val: string, fontName: FigFontName) => {
    if (!val.trim()) {
      setResult('');
      return;
    }
    setIsLoading(true);
    try {
      const art = await asciiService.generate(val, fontName);
      setResult(art);
    } catch (err) {
      console.error(err);
      setResult('Error generating ASCII art');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      generateArt(text, font);
    }, 150);
    return () => clearTimeout(timer);
  }, [text, font, generateArt]);

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
    
    // Add to mock history
    if (!history.includes(text) && text.trim()) {
      setHistory(prev => [text, ...prev].slice(0, 5));
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ascii-${text.slice(0, 10).toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isInitializing) {
    return <SplashLoader />;
  }

  return (
    <div className="app-container flex flex-col">
      <Header />

      <main className="flex-1 grid grid-cols-12 gap-8 min-h-0">
        <Sidebar 
          text={text}
          setText={setText}
          font={font}
          setFont={setFont}
          fontSearch={fontSearch}
          setFontSearch={setFontSearch}
          fontSize={fontSize}
          setFontSize={setFontSize}
          history={history}
          isLoading={isLoading}
          isCopying={isCopying}
          onDownload={handleDownload}
          onCopy={handleCopy}
          onGenerate={() => generateArt(text, font)}
          allFonts={ALL_FONTS}
          filteredFonts={filteredFonts}
        />

        <OutputArea 
          result={result}
          fontSize={fontSize}
          isLoading={isLoading}
          onCopy={handleCopy}
          onDownload={handleDownload}
        />
      </main>

      <Footer />
      
      {/* Visual Glitch/Overlay */}
      <div className="scanline" />
      <div className="noise-overlay" />
    </div>
  );
}
