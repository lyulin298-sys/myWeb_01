import { NavLink, useLocation } from 'react-router-dom';
import styles from './HotBar.module.css';

interface NavItem {
  path: string;
  label: string;
  emoji: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Farm', emoji: '🏠' },
  { path: '/about', label: 'About', emoji: '👤' },
  { path: '/skills', label: 'Skills', emoji: '⭐' },
  { path: '/projects', label: 'Projects', emoji: '📦' },
  { path: '/blog', label: 'Blog', emoji: '📖' },
  { path: '/experience', label: 'Work', emoji: '⛏️' },
  { path: '/contact', label: 'Contact', emoji: '📬' },
];

function HotBar() {
  const location = useLocation();

  return (
    <nav className={styles.hotbar}>
      {navItems.map((item) => {
        const isActive = item.path === '/'
          ? location.pathname === '/'
          : location.pathname.startsWith(item.path);

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`${styles.slot} ${isActive ? styles.active : ''}`}
          >
            <span>{item.emoji}</span>
            <span className={styles.label}>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default HotBar;
