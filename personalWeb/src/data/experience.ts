export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  type: 'work' | 'education';
}

export const experiences: Experience[] = [
  {
    title: 'Senior Frontend Developer',
    company: 'Tech Company A',
    period: '2022 - Present',
    description: 'Lead frontend architecture for the main product. Built design system from scratch. Mentored junior developers.',
    type: 'work',
  },
  {
    title: 'Full-Stack Developer',
    company: 'Startup B',
    period: '2020 - 2022',
    description: 'Developed full-stack features using React and Node.js. Managed AWS infrastructure. Improved CI/CD pipeline efficiency by 40%.',
    type: 'work',
  },
  {
    title: 'Junior Developer',
    company: 'Company C',
    period: '2018 - 2020',
    description: 'Built and maintained web applications. Wrote unit and integration tests. Participated in code reviews and agile ceremonies.',
    type: 'work',
  },
  {
    title: 'B.S. Computer Science',
    company: 'University',
    period: '2014 - 2018',
    description: 'Focused on software engineering and distributed systems.',
    type: 'education',
  },
];
