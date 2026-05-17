import { socialLinks } from '../../data/social';
import DialogBox from '../../components/game-ui/DialogBox/DialogBox';
import SeasonBanner from '../../components/game-ui/SeasonBanner/SeasonBanner';
import styles from './Contact.module.css';

function Contact() {
  return (
    <div className={styles.page}>
      <SeasonBanner />
      <h1 className={styles.title}>Mailbox</h1>

      <DialogBox>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', textAlign: 'center' }}>
          📬 Drop me a letter! Here's how to reach me:
        </p>
      </DialogBox>

      <div className={styles.socialGrid}>
        {socialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialCard}
          >
            <span className={styles.socialEmoji}>{link.emoji}</span>
            <div className={styles.socialInfo}>
              <div className={styles.socialPlatform}>{link.platform}</div>
              <div className={styles.socialUrl}>
                {link.url.replace('https://', '').replace('mailto:', '')}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Contact;
