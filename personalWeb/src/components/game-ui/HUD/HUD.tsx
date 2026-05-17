import { useSeason, Season, getSeasonFromMonth } from '../../../context/SeasonContext';
import { useGameState } from '../../../context/GameStateContext';
import styles from './HUD.module.css';

const nextSeason: Record<Season, Season> = {
  spring: 'summer',
  summer: 'fall',
  fall: 'winter',
  winter: 'spring',
};

const seasonLabel: Record<Season, string> = {
  spring: 'Spring',
  summer: 'Summer',
  fall: 'Fall',
  winter: 'Winter',
};

const seasonEmoji: Record<Season, string> = {
  spring: '🌱',
  summer: '☀️',
  fall: '🍂',
  winter: '❄️',
};

function HUD() {
  const { season, setSeason } = useSeason();
  const { gold, day } = useGameState();

  const handleCycleSeason = () => {
    setSeason(nextSeason[season]);
  };

  const handleResetSeason = () => {
    setSeason(getSeasonFromMonth(new Date().getMonth() + 1));
  };

  return (
    <div className={styles.hud}>
      <div className={styles.hudItem}>
        <span>{seasonEmoji[season]}</span>
        <button
          className={styles.seasonBtn}
          onClick={handleCycleSeason}
          title="Click to change season"
        >
          {seasonLabel[season]} {day}
        </button>
        <button
          className={styles.seasonBtn}
          onClick={handleResetSeason}
          title="Reset to real season"
          style={{ fontSize: '8px', padding: '2px' }}
        >
          ↺
        </button>
      </div>

      <div className={styles.separator} />

      <div className={`${styles.hudItem} ${styles.gold}`}>
        <span>⭐</span>
        <span>{gold.toLocaleString()}g</span>
      </div>
    </div>
  );
}

export default HUD;
