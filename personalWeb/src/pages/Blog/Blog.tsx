import { useNavigate } from 'react-router-dom';
import { blogPosts } from '../../data/blog';
import DialogBox from '../../components/game-ui/DialogBox/DialogBox';
import SeasonBanner from '../../components/game-ui/SeasonBanner/SeasonBanner';
import styles from './Blog.module.css';

function Blog() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <SeasonBanner />
      <h1 className={styles.title}>Bookshelf</h1>

      <DialogBox>
        <div className={styles.list}>
          {blogPosts.map((post) => (
            <div
              key={post.slug}
              className={styles.postCard}
              onClick={() => navigate(`/blog/${post.slug}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate(`/blog/${post.slug}`);
              }}
            >
              <span className={styles.postEmoji}>{post.emoji}</span>
              <div className={styles.postInfo}>
                <div className={styles.postTitle}>{post.title}</div>
                <div className={styles.postDate}>{post.date}</div>
                <div className={styles.postExcerpt}>{post.excerpt}</div>
              </div>
            </div>
          ))}
        </div>
      </DialogBox>
    </div>
  );
}

export default Blog;
