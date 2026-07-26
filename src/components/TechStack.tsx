import { BarChart3, Braces, PanelsTopLeft, Wrench } from 'lucide-react';
import { skillGroups } from '../data/portfolio';
import SectionHeading from './SectionHeading';

const skillIcons = {
  code: Braces,
  web: PanelsTopLeft,
  data: BarChart3,
  tools: Wrench,
} as const;

export default function TechStack() {
  return (
    <section className="content-section section-shell reveal-section" id="tech">
      <SectionHeading
        title="Tecnologías y herramientas"
        description="Mi stack está enfocado en construir productos útiles, mantenibles y preparados para crecer."
        align="center"
      />

      <div className="skills-grid">
        {skillGroups.map((group) => {
          const Icon = skillIcons[group.icon];
          return (
            <article className={`skill-group accent-${group.accent}`} key={group.title}>
              <span className="skill-icon">
                <Icon size={23} aria-hidden="true" />
              </span>
              <h3>{group.title}</h3>
              <div className="skill-tags">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
