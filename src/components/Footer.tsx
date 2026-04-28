import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        © 2026 <span className={styles.companyName}>TERMINAL_LOGIC_SYSTEMS</span>
      </div>
      <div className={styles.links}>
        <span className={styles.status}>
          <span className={styles.statusIcon} />
          STATUS: ONLINE
        </span>
        <span className={styles.nodeId}>NODE_0x4F</span>
      </div>
    </footer>
  );
}
