import { ReactNode } from 'react';
import HUD from '../HUD/HUD';
import HotBar from '../HotBar/HotBar';
import styles from './GameFrame.module.css';

interface GameFrameProps {
  children: ReactNode;
}

function GameFrame({ children }: GameFrameProps) {
  return (
    <div className={styles.frame}>
      <HUD />
      <div className={styles.woodBorder} aria-hidden="true" />
      <main className={`${styles.content} ${styles.contentWithHud}`}>
        {children}
      </main>
      <HotBar />
    </div>
  );
}

export default GameFrame;
