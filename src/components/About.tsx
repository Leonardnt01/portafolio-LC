import { Briefcase, GraduationCap, Languages, MapPin } from 'lucide-react';
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

        <div className="about-gallery" aria-label="Espacio de trabajo de desarrollo">
          <figure className="gallery-image gallery-image-main">
            <img
              src="/images/portfolio-02.webp"
              alt="Teclado mecánico en un espacio de desarrollo moderno"
              width="512"
              height="279"
              loading="lazy"
            />
          </figure>
          <figure className="gallery-image gallery-image-offset">
            <img
              src="/images/portfolio-03.webp"
              alt="Monitores con código y visualizaciones de datos"
              width="512"
              height="279"
              loading="lazy"
            />
          </figure>
          <div className="experience-note">
            <strong>Full Stack</strong>
            <span>Producto, datos y código</span>
          </div>
        </div>
      </div>
    </section>
  );
}
