import { about } from '../../data/about';
import DialogBox from '../../components/game-ui/DialogBox/DialogBox';
import ItemCard from '../../components/game-ui/ItemCard/ItemCard';
import SeasonBanner from '../../components/game-ui/SeasonBanner/SeasonBanner';
import styles from './Home.module.css';

const shortcuts = [
  { title: 'About', icon: '👤', to: '/about', description: 'Who am I?' },
  { title: 'Skills', icon: '⭐', to: '/skills', description: 'Tech stack' },
  { title: 'Projects', icon: '📦', to: '/projects', description: 'My work' },
  { title: 'Blog', icon: '📖', to: '/blog', description: 'Articles' },
  { title: 'Work', icon: '⛏️', to: '/experience', description: 'Career' },
  { title: 'Contact', icon: '📬', to: '/contact', description: 'Reach me' },
];

function Home() {
  return (
    <div className={styles.page}>
      <SeasonBanner />

      <h1 className={styles.welcome}>{about.name}'s Farm</h1>

      <DialogBox characterName={about.name}>
        {about.bio[0]}
      </DialogBox>

      <div className={styles.grid}>
        {shortcuts.map((item) => (
          <ItemCard
            key={item.to}
            title={item.title}
            icon={item.icon}
            description={item.description}
            to={item.to}
          />
        ))}
      </div>

      <div className={styles.farmStats}>
        <div className={styles.stat}>
          <span>Farm Level</span>
          <span className={styles.statValue}>42</span>
        </div>
        <div className={styles.stat}>
          <span>Projects</span>
          <span className={styles.statValue}>12</span>
        </div>
        <div className={styles.stat}>
          <span>Skills</span>
          <span className={styles.statValue}>14</span>
        </div>
        <div className={styles.stat}>
          <span>Blog Posts</span>
          <span className={styles.statValue}>5</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
