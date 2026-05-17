export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  emoji: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'hello-world',
    title: 'Hello, World!',
    date: '2026-05-17',
    excerpt: 'Welcome to my farm! First post about building this website.',
    emoji: '🌱',
  },
];
