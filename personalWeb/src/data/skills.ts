export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'devops' | 'tools';
}

export interface SkillCategory {
  key: string;
  label: string;
  emoji: string;
}

export const skillCategories: SkillCategory[] = [
  { key: 'frontend', label: 'Frontend', emoji: '🎨' },
  { key: 'backend', label: 'Backend', emoji: '⚙️' },
  { key: 'devops', label: 'DevOps', emoji: '🚀' },
  { key: 'tools', label: 'Tools', emoji: '🛠️' },
];

export const skills: Skill[] = [
  { name: 'React', level: 90, category: 'frontend' },
  { name: 'TypeScript', level: 85, category: 'frontend' },
  { name: 'CSS/SCSS', level: 80, category: 'frontend' },
  { name: 'Vue.js', level: 65, category: 'frontend' },
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Python', level: 75, category: 'backend' },
  { name: 'Go', level: 50, category: 'backend' },
  { name: 'PostgreSQL', level: 70, category: 'backend' },
  { name: 'Docker', level: 75, category: 'devops' },
  { name: 'AWS', level: 60, category: 'devops' },
  { name: 'CI/CD', level: 70, category: 'devops' },
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'Linux', level: 75, category: 'tools' },
  { name: 'VS Code', level: 95, category: 'tools' },
];
