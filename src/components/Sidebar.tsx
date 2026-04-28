import { Info, RefreshCw, Download, Check, Copy } from 'lucide-react';
import { cn } from '../lib/utils';
import { type FigFontName } from '../lib/asciiFonts';
import styles from './Sidebar.module.css';

interface SidebarProps {
  text: string;
  setText: (text: string) => void;
  font: FigFontName;
  setFont: (font: FigFontName) => void;
  fontSearch: string;
  setFontSearch: (search: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  history: string[];
  isLoading: boolean;
  isCopying: boolean;
  onDownload: () => void;
  onCopy: () => void;
  onGenerate: () => void;
  allFonts: FigFontName[];
  filteredFonts: FigFontName[];
}

export function Sidebar({
  text,
  setText,
  font,
  setFont,
  fontSearch,
  setFontSearch,
  fontSize,
  setFontSize,
  history,
  isLoading,
  isCopying,
  onDownload,
  onCopy,
  onGenerate,
  allFonts,
  filteredFonts
}: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      <section className={styles.section}>
        <div className="terminal-label">
          <span className={cn("w-2 h-2 rounded-full", text.length > 0 ? "bg-accent shadow-[0_0_5px_#00FF41]" : "bg-zinc-700")} />
          Signal Input
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="ENTER SIGNAL DATA..."
          className={cn("terminal-input terminal-scrollbar resize-none", styles.terminalInput)}
        />
      </section>

      <section className={styles.section}>
        <div className="terminal-label">
          <span className="w-2 h-2 bg-zinc-600 rounded-full" />
          Render Parameters
        </div>
        
        <div className={styles.inputGrid}>
          <div className="terminal-card flex flex-col h-[300px] !p-3">
            <div className="terminal-title mb-2 flex justify-between items-center">
              <span>Font Library ({allFonts.length})</span>
              <div className="flex gap-2 items-center">
                <button 
                  onClick={() => {
                    const randomFont = allFonts[Math.floor(Math.random() * allFonts.length)];
                    setFont(randomFont);
                  }}
                  className="terminal-badge"
                >
                  RAND
                </button>
                {isLoading && <RefreshCw size={10} className="animate-spin text-accent" />}
              </div>
            </div>
            <div className="mb-2">
              <input 
                type="text" 
                placeholder="PROBE FONT REGISTRY..." 
                value={fontSearch}
                onChange={(e) => setFontSearch(e.target.value)}
                className="terminal-search"
              />
            </div>
            <div className={cn(styles.scrollContainer, "terminal-scrollbar")}>
              {filteredFonts.map((f) => (
                <button
                  key={f}
                  onClick={() => setFont(f)}
                  className={cn(
                    "terminal-button w-full text-left",
                    font === f && "terminal-button-active"
                  )}
                >
                  {f}
                </button>
              ))}
              {filteredFonts.length === 0 && (
                <div className="text-[9px] text-zinc-700 p-2 italic uppercase tracking-widest">Signal lost...</div>
              )}
            </div>
          </div>
          
          <div className="terminal-card !p-3">
            <div className="terminal-title mb-2 flex justify-between">
              <span>Resolution Scale</span>
              <span className="text-accent tracking-widest">{fontSize}px</span>
            </div>
            <input 
              type="range"
              min="4"
              max="24"
              step="1"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="w-full accent-accent h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="terminal-card !p-4 flex flex-col justify-center">
            <div className="terminal-title mb-3">Transmission Actions</div>
            <div className="flex gap-4">
              <button 
                onClick={onDownload} 
                className="flex items-center gap-2 text-zinc-500 hover:text-accent transition-colors group px-2 py-1 border border-transparent hover:border-accent/30"
              >
                <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                <span className="text-[9px] uppercase font-bold tracking-widest">Download</span>
              </button>
              <button 
                onClick={onCopy} 
                className={cn(
                  "flex items-center gap-2 transition-colors group px-2 py-1 border border-transparent", 
                  isCopying ? "text-accent border-accent/30" : "text-zinc-500 hover:text-accent hover:border-accent/30"
                )}
              >
                {isCopying ? <Check size={14} /> : <Copy size={14} className="group-hover:scale-110 transition-transform" />}
                <span className="text-[9px] uppercase font-bold tracking-widest">{isCopying ? "Success" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="terminal-card !p-3">
          <div className="terminal-title mb-2 border-b border-border-mid/30 pb-1 flex justify-between items-center">
            <span>Buffer Log</span>
            <span className="text-[7px] text-zinc-800">HISTORY.LOG</span>
          </div>
          <div className={cn(styles.historyList, "terminal-scrollbar")}>
            {history.map((h, i) => (
              <button 
                key={i} 
                onClick={() => setText(h)}
                className="w-full text-left text-[10px] text-zinc-500 hover:text-accent font-mono transition-colors border-b border-border-mid/50 pb-1 flex items-center gap-2 group"
              >
                <span className="text-[8px] text-zinc-800 group-hover:text-accent opacity-50">[{i}]</span>
                <span className="truncate uppercase tracking-tighter"> {h}</span>
              </button>
            ))}
            {history.length === 0 && <div className="text-[10px] text-zinc-700 italic uppercase">Log empty...</div>}
          </div>
        </div>
      </section>
      
      <div className={styles.infoBox}>
         <Info size={14} className="text-accent/60 shrink-0 mt-1" />
         <p className={styles.infoText}>
           Rendering Engine: [FIGLET_JS_v2.2] / STATUS: OPTIMAL / CORES: ACTIVE
         </p>
      </div>
    </div>
  );
}
