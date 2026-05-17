import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  label: string;
  value: number;
  color?: string;
}

function ProgressBar({ label, value, color = 'var(--season-accent)' }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{clampedValue}/100</span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${clampedValue}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
