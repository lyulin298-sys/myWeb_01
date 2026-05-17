import { experiences } from '../../data/experience';
import DialogBox from '../../components/game-ui/DialogBox/DialogBox';
import SeasonBanner from '../../components/game-ui/SeasonBanner/SeasonBanner';
import styles from './Experience.module.css';

function Experience() {
  return (
    <div className={styles.page}>
      <SeasonBanner />
      <h1 className={styles.title}>The Mines</h1>

      <DialogBox>
        <div className={styles.timeline}>
          {experiences.map((exp, i) => (
            <div key={i} className={styles.node}>
              <div className={styles.nodeHeader}>
                <span className={styles.nodeTitle}>
                  {exp.title}
                </span>
                {' — '}
                <span className={styles.nodePeriod}>{exp.period}</span>
              </div>
              <div className={styles.nodeDesc}>{exp.description}</div>
              <div className={styles.depth}>
                {exp.type === 'work' ? '⛏️' : '📚'} Floor {experiences.length - i}
              </div>
            </div>
          ))}
        </div>
      </DialogBox>
    </div>
  );
}

export default Experience;
