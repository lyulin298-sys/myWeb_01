import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { blogPosts } from '../../data/blog';
import DialogBox from '../../components/game-ui/DialogBox/DialogBox';
import GameButton from '../../components/game-ui/GameButton/GameButton';
import SeasonBanner from '../../components/game-ui/SeasonBanner/SeasonBanner';
import styles from './BlogPost.module.css';

function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!slug) return;
    fetch(`/content/blog/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setContent('Post not found.');
        setLoading(false);
      });
  }, [slug]);

  return (
    <div className={styles.page}>
      <SeasonBanner />

      <div className={styles.backBtn}>
        <GameButton small onClick={() => navigate('/blog')}>
          ← Back to Bookshelf
        </GameButton>
      </div>

      <h1 className={styles.title}>{post?.title || slug}</h1>

      <DialogBox>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.content}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </DialogBox>
    </div>
  );
}

export default BlogPost;
