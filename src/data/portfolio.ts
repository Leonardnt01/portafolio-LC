export type ProjectCategory = 'Todos' | 'Web' | 'Móvil' | 'Datos';

export interface Project {
  title: string;
  description: string;
  image: string;
  category: Exclude<ProjectCategory, 'Todos'>;
  technologies: string[];
  href: string;
}

export interface SkillGroup {
  title: string;
  icon: 'code' | 'web' | 'data' | 'tools';
  accent: 'primary' | 'secondary';
  skills: string[];
}

export const navigation = [
  { label: 'Inicio', href: '#home' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Tecnologías', href: '#tech' },
  { label: 'Contacto', href: '#contact' },
] as const;

export const roles = [
  'Software Engineer',
  'Full Stack Developer',
  'Data Analytics',
  'Python Developer',
  'SQL & Power BI',
] as const;

export const projects: Project[] = [
  {
    title: 'Analizador de Datos Pro',
    description:
      'Sistema automatizado de procesamiento de grandes volúmenes de datos con visualización integrada en Power BI.',
    image: '/images/portfolio-04.jpg',
    category: 'Datos',
    technologies: ['Python', 'SQL'],
    href: '#contact',
  },
  {
    title: 'HealthConnect App',
    description:
      'Aplicación móvil para la gestión de citas médicas y seguimiento de pacientes en tiempo real.',
    image: '/images/portfolio-05.jpg',
    category: 'Móvil',
    technologies: ['Flutter', 'Firebase'],
    href: '#contact',
  },
  {
    title: 'E-Commerce Backend',
    description:
      'Arquitectura escalable para comercio electrónico con integración de pasarelas de pago seguras.',
    image: '/images/portfolio-06.jpg',
    category: 'Web',
    technologies: ['Node.js', 'React'],
    href: '#contact',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Lenguajes',
    icon: 'code',
    accent: 'primary',
    skills: ['Python', 'Java', 'C++', 'JavaScript', 'SQL'],
  },
  {
    title: 'Frameworks',
    icon: 'web',
    accent: 'secondary',
    skills: ['React', 'Astro', 'Node.js', 'Express', 'Flutter'],
  },
  {
    title: 'Datos',
    icon: 'data',
    accent: 'primary',
    skills: ['Power BI', 'Pandas', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'Herramientas',
    icon: 'tools',
    accent: 'secondary',
    skills: ['Git', 'Docker', 'AWS', 'VS Code'],
  },
];

export const posts = [
  {
    category: 'Tecnología',
    date: '15 Oct 2023',
    title: 'El futuro de la Ingeniería de Software en Perú',
    excerpt:
      'Una reflexión sobre cómo la digitalización está transformando el mercado laboral local y qué habilidades son críticas hoy.',
    accent: 'primary',
  },
  {
    category: 'Datos',
    date: '02 Oct 2023',
    title: 'Por qué SQL sigue siendo el Rey de los Datos',
    excerpt:
      'Incluso con el auge de NoSQL, el lenguaje estructurado de consultas permanece como la base fundamental de todo analista.',
    accent: 'secondary',
  },
] as const;
