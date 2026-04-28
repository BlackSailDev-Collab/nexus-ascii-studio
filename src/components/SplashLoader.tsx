import { RefreshCw } from 'lucide-react';
import styles from './SplashLoader.module.css';

export function SplashLoader() {
  return (
    <div className={styles.splash}>
      <div className="scanline" />
      <RefreshCw className={styles.loader} size={32} />
      <div className={styles.initializing}>Initializing Terminal Core...</div>
    </div>
  );
}
