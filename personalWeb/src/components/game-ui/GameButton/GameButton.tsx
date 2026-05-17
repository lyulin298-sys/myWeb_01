import { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './GameButton.module.css';

interface GameButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  small?: boolean;
}

function GameButton({ children, small, className, ...props }: GameButtonProps) {
  return (
    <button
      className={`${styles.button} ${small ? styles.small : ''} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default GameButton;
