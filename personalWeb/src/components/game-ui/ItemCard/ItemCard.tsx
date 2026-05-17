import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ItemCard.module.css';

interface ItemCardProps {
  title: string;
  icon?: string;
  description?: ReactNode;
  to?: string;
  onClick?: () => void;
}

function ItemCard({ title, icon, description, to, onClick }: ItemCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    }
  };

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleClick();
      }}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
}

export default ItemCard;
