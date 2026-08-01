import { Briefcase, Database, GraduationCap, Languages, MapPin, ServerCog } from 'lucide-react';
import SectionHeading from './SectionHeading';

const facts = [
  { icon: GraduationCap, label: 'Universidad', value: 'UTP - Perú' },
  { icon: MapPin, label: 'Ubicación', value: 'Lima, Perú' },
  { icon: Languages, label: 'Idiomas', value: 'Español, Inglés' },
  { icon: Briefcase, label: 'Carrera', value: 'Ing. de Software' },
] as const;

export default function About() {
  return (
    <section className="content-section section-shell reveal-section" id="about">
      <div className="about-grid">
        <div className="about-copy">
          <SectionHeading kicker="Perfil" title="Quién soy" />
          <p>
            Soy un apasionado estudiante de Ingeniería de Software en la Universidad Tecnológica
            del Perú (UTP). Mi enfoque se centra en desarrollar soluciones eficientes, con una
            mentalidad analítica orientada a resolver problemas complejos.
          </p>
          <p>
            Me apasiona el ecosistema de datos y el desarrollo Full Stack. En cada proyecto busco
            unir una experiencia cuidada, código mantenible y decisiones técnicas que aporten
            valor real.
          </p>

          <div className="facts-grid">
            {facts.map(({ icon: Icon, label, value }) => (
              <div className="fact-item" key={label}>
                <span>
                  <Icon size={21} aria-hidden="true" />
                </span>
                <div>
                  <strong>{label}</strong>
                  <small>{value}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-evidence glass-card" aria-label="Enfoque profesional">
          <p className="about-evidence-kicker">Cómo aporto</p>
          <h3>Producto completo, decisiones con datos.</h3>
          <div className="about-evidence-list">
            <article>
              <span><ServerCog size={20} aria-hidden="true" /></span>
              <div>
                <strong>Full Stack</strong>
                <p>Interfaces, APIs, bases de datos y despliegues pensados como un solo producto.</p>
              </div>
            </article>
            <article>
              <span><Database size={20} aria-hidden="true" /></span>
              <div>
                <strong>Datos</strong>
                <p>Limpieza, análisis y visualizaciones para convertir información en decisiones.</p>
              </div>
            </article>
          </div>
          <p className="about-evidence-note">Cada proyecto enlaza su código y explica las decisiones que lo sostienen.</p>
        </div>
      </div>
    </section>
  );
}
