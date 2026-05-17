import { projects } from '../../data/projects';
import DialogBox from '../../components/game-ui/DialogBox/DialogBox';
import ItemCard from '../../components/game-ui/ItemCard/ItemCard';
import SeasonBanner from '../../components/game-ui/SeasonBanner/SeasonBanner';
import styles from './Projects.module.css';

function Projects() {
  return (
    <div className={styles.page}>
      <SeasonBanner />
      <h1 className={styles.title}>Inventory</h1>

      <div className={styles.grid}>
        {projects.map((project) => (
          <ItemCard
            key={project.id}
            title={project.title}
            icon={project.icon}
            description={
              <>
                {project.description}
                <span className={styles.techList}>
                  {project.tech.map((t) => (
                    <span key={t} className={styles.techTag}>{t}</span>
                  ))}
                </span>
              </>
            }
            onClick={() => {
              if (project.github) {
                window.open(project.github, '_blank');
              }
            }}
          />
        ))}
      </div>

      <DialogBox>
        <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '16px' }}>
          Click any item to visit its GitHub repo!
        </p>
      </DialogBox>
    </div>
  );
}

export default Projects;
