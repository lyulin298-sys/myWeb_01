export interface SocialLink {
  platform: string;
  url: string;
  emoji: string;
}

export const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/liyulin', emoji: '🐙' },
  { platform: 'Email', url: 'mailto:liyulin@example.com', emoji: '📧' },
  { platform: 'Twitter', url: 'https://twitter.com/liyulin', emoji: '🐦' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/liyulin', emoji: '💼' },
];
