import { useSeason } from '../../../context/SeasonContext';
import styles from './SeasonBanner.module.css';

const seasonLabels: Record<string, string> = {
  spring: 'Spring',
  summer: 'Summer',
  fall: 'Fall',
  winter: 'Winter',
};

const seasonEmojis: Record<string, string> = {
  spring: '🌸🌱',
  summer: '☀️🌻',
  fall: '🍂🎃',
  winter: '❄️⛄',
};

function SeasonBanner() {
  const { season } = useSeason();

  return (
    <div className={styles.banner}>
      <span className={styles.emoji}>{seasonEmojis[season]}</span>
      Welcome to the Farm — {seasonLabels[season]} Edition
    </div>
  );
}

export default SeasonBanner;
