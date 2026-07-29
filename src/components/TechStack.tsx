import { ChevronDown } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import { technologies, type TechCategory } from '../data/portfolio';
import SectionHeading from './SectionHeading';
import TechPill from './TechPill';

type TechFilter = TechCategory | 'todas';

const categoryLabels: Record<TechFilter, string> = {
  todas: 'Todas',
  lenguajes: 'Lenguajes',
  frontend: 'Frontend',
  backend: 'Backend',
  datos: 'Datos',
  devops: 'DevOps',
};

const filterOrder: TechFilter[] = ['todas', 'lenguajes', 'frontend', 'backend', 'datos', 'devops'];
const compactLimit = 14;

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<TechFilter>('todas');
  const [expanded, setExpanded] = useState(false);

  const visibleCount = useMemo(
    () =>
      technologies.filter(
        (tech) => activeCategory === 'todas' || tech.category === activeCategory,
      ).length,
    [activeCategory],
  );

  const canExpand = visibleCount > compactLimit;
  const isExpanded = expanded || !canExpand;

  return (
    <section className="content-section section-shell reveal-section" id="tech">
      <SectionHeading
        kicker="Stack"
        title="Mi universo tecnológico"
        description="Una vista más completa de las tecnologías con las que diseño, construyo y despliego productos útiles."
        align="center"
      />

      <div className="tech-stack-panel glass-card">
        <div className="tech-stack-toolbar">
          <div className="project-filters" role="group" aria-label="Filtrar tecnologias">
            {filterOrder.map((category) => (
              <button
                className={activeCategory === category ? 'active' : ''}
                type="button"
                key={category}
                aria-pressed={activeCategory === category}
                aria-controls="tech-grid"
                onClick={() => {
                  setActiveCategory(category);
                  setExpanded(false);
                }}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>

          <p className="tech-stack-status">
            <strong>{visibleCount}</strong> tecnologias visibles en <span>{categoryLabels[activeCategory]}</span>
          </p>
        </div>

        <div className={`tech-stack-shell${isExpanded ? ' expanded' : ''}`}>
          <div className="tech-grid" id="tech-grid" aria-live="polite">
            {technologies.map((tech, index) => {
              const hidden = activeCategory !== 'todas' && tech.category !== activeCategory;
              return (
                <div
                  className="tech-grid-item"
                  hidden={hidden}
                  key={tech.id}
                  style={{ '--stagger': index } as CSSProperties & { '--stagger': number }}
                >
                  <TechPill label={tech.name} iconId={tech.id} hex={tech.hex} />
                </div>
              );
            })}
          </div>

          {!isExpanded ? <div className="stack-fade-overlay" aria-hidden="true" /> : null}
        </div>

        {canExpand ? (
          <div className="tech-stack-actions">
            <button
              className="stack-toggle"
              type="button"
              aria-expanded={isExpanded}
              onClick={() => setExpanded((value) => !value)}
            >
              {isExpanded ? 'Mostrar menos' : 'Mostrar mas'}
              <ChevronDown size={16} aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
