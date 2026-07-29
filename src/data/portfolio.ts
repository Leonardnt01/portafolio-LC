import techData from './tech.json';

export type ProjectCategory = 'Todos' | 'Web' | 'Datos';
export type TechCategory = 'lenguajes' | 'frontend' | 'backend' | 'datos' | 'devops';

export interface Project {
  title: string;
  description: string;
  /** Sin imagen se muestra un marcador con la inicial: nunca una foto de stock. */
  image?: string;
  category: Exclude<ProjectCategory, 'Todos'>;
  technologies: string[];
  problem: string;
  /** Opcionales: si no hay contenido real, el bloque no se renderiza. */
  contribution?: string;
  result?: string;
  /** Etiqueta de estado, p. ej. "En desarrollo". */
  status?: string;
  repoUrl?: string;
  demoUrl?: string;
}

export interface TechItem {
  id: string;
  name: string;
  slug: string;
  category: TechCategory;
  hex: string;
}

export interface EducationItem {
  title: string;
  institution: string;
  logo?: string;
  period: string;
  current: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  /** Enlace publico a la credencial. Sin el, la certificacion no se muestra. */
  credentialUrl: string;
}

export const technologies = techData as TechItem[];

/**
 * Fuente unica de verdad para la identidad publica. Cualquier enlace social
 * que no este aqui simplemente no se renderiza: nunca un destino generico.
 */
export const contact = {
  name: 'Leonardo Matías Condori Navarro',
  shortName: 'Leonardo Condori',
  role: 'Software Engineer',
  location: 'Lima, Perú',
  email: 'leonardo.matias.01@hotmail.com',
  githubUser: 'Leonardnt01',
  github: 'https://github.com/Leonardnt01',
  // TODO(datos): anadir la URL real del perfil de LinkedIn.
  linkedin: '',
} as const;

/**
 * El icono se declara por entrada, no por posicion en un array paralelo:
 * anadir o reordenar secciones no debe desalinear los iconos del menu movil.
 */
export type NavIcon = 'home' | 'user' | 'timeline' | 'projects' | 'tech' | 'contact';

export interface NavItem {
  label: string;
  href: string;
  icon: NavIcon;
}

export const navigation: NavItem[] = [
  { label: 'Inicio', href: '#home', icon: 'home' },
  { label: 'Sobre mí', href: '#about', icon: 'user' },
  { label: 'Formación', href: '#experience', icon: 'timeline' },
  { label: 'Proyectos', href: '#projects', icon: 'projects' },
  { label: 'Tecnologías', href: '#tech', icon: 'tech' },
  { label: 'Contacto', href: '#contact', icon: 'contact' },
];

export const roles = [
  'Software Engineer',
  'Full Stack Developer',
  'Data Analytics',
  'Python Developer',
  'SQL & Power BI',
] as const;

/**
 * Solo proyectos reales, con repositorio publico verificable.
 * Dos que se pueden defender en una entrevista valen mas que cinco de relleno.
 *
 * PENDIENTE: capturas propias para `image` de Filo Estilo, y la URL de la demo
 * cuando vuelva a estar desplegada (la del README responde 404).
 */
export const projects: Project[] = [
  {
    title: 'Filo Estilo',
    description:
      'Sistema de reservas online para barberías: catálogo de servicios, agenda por barbero con franjas horarias y panel de administración de citas.',
    category: 'Web',
    technologies: ['TypeScript', 'React', 'Next.js', 'PostgreSQL', 'Docker', 'TailwindCSS'],
    problem:
      'Reservar en una barbería depende de llamadas y mensajes sueltos: el cliente no ve la disponibilidad real y el negocio pierde el control de su agenda.',
    contribution:
      'Proyecto desarrollado en equipo sobre Next.js 16 con App Router y React 19. La aplicación separa el flujo de cliente del de administración, persiste los datos en PostgreSQL y se despliega con Docker.',
    result:
      'La base técnica se sostiene sobre pruebas automatizadas: TDD con Vitest, escenarios BDD en Gherkin para los flujos de cliente y de administrador, contrato de API documentado y checklist de QA en el repositorio.',
    status: 'En desarrollo',
    repoUrl: 'https://github.com/Leonardnt01/filo-estilo',
  },
  {
    title: 'Análisis de gastos personales',
    description:
      'Script en Python que convierte un extracto mensual de gastos en tres visualizaciones: total por categoría, reparto porcentual y evolución en el tiempo.',
    image: '/images/proyecto-gastos.webp',
    category: 'Datos',
    technologies: ['Python', 'Pandas'],
    problem:
      'Un CSV de gastos no dice nada a simple vista: los importes vienen como texto con formato peruano ("S/ 1.234,56"), hay columnas vacías y el fichero está en latin-1.',
    contribution:
      'El script limpia y normaliza los datos con pandas —convierte los importes a numérico, descarta columnas vacías y resuelve la codificación— y genera las gráficas con matplotlib.',
    result:
      'Un único comando transforma el extracto en un panel de tres gráficos que revela dónde se concentra el gasto. En los datos de ejemplo, transporte y educación suman la mitad del total.',
    repoUrl: 'https://github.com/Leonardnt01/proyecto_Python',
  },
];

/**
 * Solo hechos verificables. Cada entrada nueva debe poder respaldarse:
 * una formacion con su institucion, una certificacion con su credencial publica.
 */
export const education: EducationItem[] = [
  {
    title: 'Ingeniería de Software',
    institution: 'Universidad Tecnológica del Perú (UTP)',
    // TODO(datos): sustituir por el rango real, p. ej. "2023 — 2028".
    period: 'Pregrado',
    current: true,
    summary:
      'Formación centrada en el diseño de soluciones eficientes, con enfoque analítico para resolver problemas complejos.',
    highlights: [],
    stack: ['Python', 'Java', 'SQL'],
  },
];

/**
 * Cada entrada necesita `credentialUrl` publica: sin enlace verificable no
 * se anade. Datos contrastados contra la API de Credly.
 */
export const certifications: CertificationItem[] = [
  {
    name: 'Data Analytics Essentials',
    issuer: 'Coursera',
    date: 'Julio 2026',
    credentialUrl:
      'https://www.credly.com/badges/acb11206-f0d9-4aec-acb9-ce22e2c2fef4/public_url',
  },
];

export const posts = [
  {
    category: 'Tecnologia',
    date: '15 Oct 2023',
    title: 'El futuro de la Ingenieria de Software en Peru',
    excerpt:
      'Una reflexion sobre como la digitalizacion esta transformando el mercado laboral local y que habilidades son criticas hoy.',
    accent: 'primary',
  },
  {
    category: 'Datos',
    date: '02 Oct 2023',
    title: 'Por que SQL sigue siendo el Rey de los Datos',
    excerpt:
      'Incluso con el auge de NoSQL, el lenguaje estructurado de consultas permanece como la base fundamental de todo analista.',
    accent: 'secondary',
  },
] as const;
