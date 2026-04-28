import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import styles from './OutputArea.module.css';

interface OutputAreaProps {
  result: string;
  fontSize: number;
  isLoading: boolean;
  onCopy: () => void;
  onDownload: () => void;
}

export function OutputArea({
  result,
  fontSize,
  isLoading,
  onCopy,
  onDownload
}: OutputAreaProps) {
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className="absolute top-2 right-4 terminal-title !text-zinc-800 opacity-50">VRT-MONITOR-01</div>
        <div className="output-grid-overlay" />
        
        <div className={cn(styles.monitor, "terminal-scrollbar")}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${result}-${fontSize}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ fontSize: `${fontSize}px` }}
              className="text-accent/90 whitespace-pre monitor-glow crt-flicker"
            >
              {result || "\n\n\n[SYSTEM] AWAITING INPUT SIGNAL..."}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.metaInfo}>
          <div className={styles.statusRow}>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-accent rounded-full animate-pulse" />
              [CORE] Rendering pipeline optimized
            </span>
            <span className="text-accent/60 tracking-widest">{isLoading ? "BUSY" : "0.0024s"}</span>
          </div>
          <div className={styles.memoryRow}>
            <span>[BUFFER] Volatile memory load</span>
            <span className="text-zinc-600 tracking-tighter">{new Blob([result]).size} BIT</span>
          </div>
          <div className={styles.readyLabel}>READY FOR TRANSMISSION</div>
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.actionButtonGroup}>
          <button 
            onClick={onCopy}
            className={styles.actionButton}
          >
            Copy Signal
          </button>
          <button 
            onClick={onDownload}
            className={styles.actionButton}
          >
            Export Stream
          </button>
        </div>
        <div className={styles.engineLabel}>
          <div className="w-1 h-1 bg-zinc-800 rounded-full" />
          Engine: Figlet-JS Core
        </div>
      </div>
    </div>
  );
}
