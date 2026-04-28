import { motion } from 'motion/react';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.container}>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={styles.titleWrapper}
      >
        <div className={styles.systemLabel}>
          <div className={styles.statusIndicator} />
          Terminal Core / v2.0
        </div>
        <h1 className={`${styles.logo} monitor-glow`}>
          ASCII.PRO
        </h1>
      </motion.div>
      
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className="terminal-title mb-1">Current Kernel</span>
          <span className={styles.statValue}>SYSTEM_V_CORE</span>
        </div>
        <div className={styles.statItem}>
          <span className="terminal-title mb-1">Encoding</span>
          <span className={styles.statValue}>MONO_16BIT</span>
        </div>
      </div>
    </header>
  );
}
