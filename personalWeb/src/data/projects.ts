export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  icon: string;
}

export const projects: Project[] = [
  {
    id: 'personal-web',
    title: 'Stardew Web',
    description: 'A personal website themed after Stardew Valley, built with React and TypeScript.',
    tech: ['React', 'TypeScript', 'CSS Modules'],
    github: 'https://github.com/liyulin/personal-web',
    icon: '🏠',
  },
  {
    id: 'api-gateway',
    title: 'API Gateway',
    description: 'A lightweight API gateway with rate limiting and authentication.',
    tech: ['Go', 'Redis', 'Docker'],
    github: 'https://github.com/liyulin/api-gateway',
    icon: '🔌',
  },
  {
    id: 'dev-dashboard',
    title: 'Dev Dashboard',
    description: 'A developer dashboard for monitoring CI/CD pipelines and deployments.',
    tech: ['React', 'Node.js', 'WebSocket'],
    github: 'https://github.com/liyulin/dev-dashboard',
    icon: '📊',
  },
  {
    id: 'cli-toolkit',
    title: 'CLI Toolkit',
    description: 'A collection of command-line utilities for daily development tasks.',
    tech: ['Python', 'Click', 'Rich'],
    github: 'https://github.com/liyulin/cli-toolkit',
    icon: '⌨️',
  },
];
