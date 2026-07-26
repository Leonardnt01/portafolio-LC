import { ArrowUpRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { projects, type ProjectCategory } from '../data/portfolio';
import SectionHeading from './SectionHeading';

const categories: ProjectCategory[] = ['Todos', 'Web', 'Móvil', 'Datos'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('Todos');
  const visibleProjects = useMemo(
    () =>
      activeCategory === 'Todos'
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  );

  return (
    <section className="projects-section reveal-section" id="projects">
      <div className="section-shell">
        <div className="projects-heading">
          <SectionHeading
            title="Mis proyectos"
            description="Una selección de trabajos donde combino desarrollo, datos y experiencia de usuario."
          />
          <div className="project-filters" role="group" aria-label="Filtrar proyectos">
            {categories.map((category) => (
              <button
                className={activeCategory === category ? 'active' : ''}
                type="button"
                key={category}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid" aria-live="polite">
          {visibleProjects.map((project) => (
            <article className="project-card" key={project.title}>
              <a className="project-image" href={project.href} aria-label={`Ver ${project.title}`}>
                <img src={project.image} alt="" loading="lazy" />
                <span>{project.category}</span>
              </a>
              <div className="project-body">
                <div className="technology-tags">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a className="text-link" href={project.href}>
                  Ver detalles
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
