import { skills, skillCategories } from '../../data/skills';
import DialogBox from '../../components/game-ui/DialogBox/DialogBox';
import ProgressBar from '../../components/game-ui/ProgressBar/ProgressBar';
import SeasonBanner from '../../components/game-ui/SeasonBanner/SeasonBanner';
import styles from './Skills.module.css';

function Skills() {
  return (
    <div className={styles.page}>
      <SeasonBanner />
      <h1 className={styles.title}>Skill Tree</h1>

      <DialogBox>
        {skillCategories.map((cat) => {
          const catSkills = skills.filter((s) => s.category === cat.key);
          return (
            <div key={cat.key} className={styles.category}>
              <div className={styles.categoryHeader}>
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </div>
              <div className={styles.skillsList}>
                {catSkills.map((skill) => (
                  <ProgressBar
                    key={skill.name}
                    label={skill.name}
                    value={skill.level}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </DialogBox>
    </div>
  );
}

export default Skills;
