import { ExternalLink, GraduationCap } from 'lucide-react';
import { certifications, education, technologies } from '../data/portfolio';
import SectionHeading from './SectionHeading';
import TechPill from './TechPill';

const techByName = new Map(technologies.map((tech) => [tech.name, tech]));

function getInitials(institution: string) {
  const initials = institution
    .split(/[^A-Za-zÁÉÍÓÚÑáéíóúñ0-9]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase() ?? '')
    .join('');

  return initials || 'LC';
}

export default function Education() {
  return (
    <section className="experience-section reveal-section" id="experience">
      <div className="section-shell">
        <div className="experience-heading">
          <SectionHeading
            kicker="Formación"
            title="Formación y certificaciones"
            description="Mi base académica y las credenciales que la respaldan, cada una enlazada a su verificación pública."
          />
        </div>

        <div className="experience-list">
          {education.map((item) => (
            <article className="experience-card glass-card" key={`${item.institution}-${item.title}`}>
              <div className="experience-rail" aria-hidden="true">
                <span className="experience-point" />
              </div>

              <div className="experience-content">
                <div className="experience-card-head">
                  <div className="experience-brand">
                    {item.logo ? (
                      <img src={item.logo} alt="" loading="lazy" />
                    ) : (
                      <span className="experience-emblem-fallback">
                        {getInitials(item.institution)}
                      </span>
                    )}
                    <div>
                      <span className="experience-company">{item.institution}</span>
                      <h3>{item.title}</h3>
                    </div>
                  </div>

                  <div className="experience-meta">
                    <span>{item.period}</span>
                    {item.current ? <strong>En curso</strong> : null}
                  </div>
                </div>

                <p className="experience-summary">{item.summary}</p>

                {item.highlights.length > 0 ? (
                  <ul className="experience-achievements">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : null}

                {item.stack.length > 0 ? (
                  <div className="experience-stack" aria-label={`Tecnologías vistas en ${item.title}`}>
                    {item.stack.map((label) => {
                      const tech = techByName.get(label);
                      return (
                        <TechPill
                          compact
                          key={label}
                          label={label}
                          iconId={tech?.id}
                          hex={tech?.hex}
                        />
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        {certifications.length > 0 ? (
          <div className="certification-grid">
            {certifications.map((certification) => (
              <a
                className="certification-card glass-card"
                href={certification.credentialUrl}
                key={`${certification.issuer}-${certification.name}`}
                rel="noreferrer"
                target="_blank"
              >
                <span className="certification-icon">
                  <GraduationCap size={20} aria-hidden="true" />
                </span>
                <div>
                  <strong>{certification.name}</strong>
                  <small>
                    {certification.issuer} · {certification.date}
                  </small>
                </div>
                <ExternalLink className="certification-link" size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
