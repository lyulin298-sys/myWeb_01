import { ReactNode } from 'react';
import styles from './DialogBox.module.css';

interface DialogBoxProps {
  children: ReactNode;
  characterName?: string;
  portrait?: string;
  showArrow?: boolean;
  onClick?: () => void;
}

function DialogBox({
  children,
  characterName,
  portrait,
  showArrow = false,
  onClick,
}: DialogBoxProps) {
  const hasPortrait = characterName || portrait;

  return (
    <div
      className={`${styles.dialog} ${hasPortrait ? styles.dialogWithPortrait : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(); } : undefined}
    >
      {hasPortrait && (
        <div className={styles.portrait}>
          {portrait ? (
            <img src={portrait} alt={characterName || 'Character'} />
          ) : (
            <span>👨‍💻</span>
          )}
        </div>
      )}
      <div className={styles.content}>
        {characterName && (
          <div className={styles.nameTag}>{characterName}</div>
        )}
        {children}
      </div>
      {showArrow && <span className={styles.arrow}>▼</span>}
    </div>
  );
}

export default DialogBox;
