import { useState } from 'react';
import { about } from '../../data/about';
import DialogBox from '../../components/game-ui/DialogBox/DialogBox';
import SeasonBanner from '../../components/game-ui/SeasonBanner/SeasonBanner';
import styles from './About.module.css';

function About() {
  const [page, setPage] = useState(0);

  const nextPage = () => {
    setPage((prev) => (prev + 1) % about.bio.length);
  };

  return (
    <div className={styles.page}>
      <SeasonBanner />
      <h1 className={styles.title}>About {about.name}</h1>

      <DialogBox
        characterName={about.name}
        showArrow
        onClick={nextPage}
      >
        <div className={styles.dialogPage}>
          {about.bio[page]}
          <div className={styles.pageCounter}>
            Click to continue... ({page + 1}/{about.bio.length})
          </div>
        </div>
      </DialogBox>

      <DialogBox characterName="Stats">
        <p>{about.title}</p>
      </DialogBox>
    </div>
  );
}

export default About;
