import { ArrowUpRight, BookOpen, Code2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { projects, technologies, type ProjectCategory } from '../data/portfolio';
import SectionHeading from './SectionHeading';
import TechPill from './TechPill';

const categories: ProjectCategory[] = ['Todos', 'Web', 'Datos'];
const techByName = new Map(technologies.map((tech) => [tech.name, tech]));

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
            kicker="Trabajo"
            title="Mis proyectos"
            description="Casos donde combino desarrollo, datos y experiencia de usuario con un formato más claro: problema, aporte y resultado."
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
            <article className="project-card glass-card" key={project.title}>
              {/* Sin captura propia mostramos un marcador, nunca una foto de stock. */}
              <div className="project-image" aria-hidden="true">
                {project.image ? (
                  <img src={project.image} alt="" width="880" height="484" loading="lazy" />
                ) : (
                  <span className="project-image-fallback">{project.title.charAt(0)}</span>
                )}
                <span>{project.category}</span>
              </div>

              <div className="project-body">
                <div className="technology-tags">
                  {project.technologies.map((label) => {
                    const tech = techByName.get(label);
                    return (
                      <TechPill compact key={label} label={label} iconId={tech?.id} hex={tech?.hex} />
                    );
                  })}
                </div>

                <h3>
                  {project.title}
                  {project.status ? (
                    <span className="project-status">{project.status}</span>
                  ) : null}
                </h3>
                <p className="project-summary">{project.description}</p>

                {/*
                  Cada bloque se renderiza solo si tiene contenido real.
                  Un apartado vacio es preferible a un placeholder visible.
                */}
                <div className="project-details">
                  {([
                    ['Problema', project.problem],
                    ['Aporte', project.contribution],
                    ['Resultado', project.result],
                  ] as const)
                    .filter(([, value]) => Boolean(value))
                    .map(([label, value]) => (
                      <div className="project-detail" key={label}>
                        <span>{label}</span>
                        <p>{value}</p>
                      </div>
                    ))}
                </div>

                {project.demoUrl || project.repoUrl ? (
                  <div className="project-actions">
                    <a className="text-link" href={`/proyectos/${project.slug}/`}>
                      Ver caso
                      <BookOpen size={18} aria-hidden="true" />
                    </a>
                    {project.demoUrl ? (
                      <a className="text-link" href={project.demoUrl} rel="noreferrer" target="_blank">
                        Ver demo
                        <ArrowUpRight size={18} aria-hidden="true" />
                      </a>
                    ) : null}

                    {project.repoUrl ? (
                      <a className="text-link" href={project.repoUrl} rel="noreferrer" target="_blank">
                        Código
                        <Code2 size={18} aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                ) : (
                  <div className="project-actions">
                    <a className="text-link" href={`/proyectos/${project.slug}/`}>
                      Ver caso
                      <BookOpen size={18} aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
