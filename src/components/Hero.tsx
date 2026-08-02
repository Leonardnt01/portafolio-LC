import { ArrowDown, ArrowRight, GitFork, Link2, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { contact, roles } from '../data/portfolio';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const atEnd = visibleCharacters === currentRole.length;
    const atStart = visibleCharacters === 0;
    const delay = atEnd && !isDeleting ? 1500 : isDeleting ? 45 : 85;

    const timer = window.setTimeout(() => {
      if (atEnd && !isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (atStart && isDeleting) {
        setIsDeleting(false);
        setRoleIndex((current) => (current + 1) % roles.length);
        return;
      }

      setVisibleCharacters((current) => current + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isDeleting, roleIndex, visibleCharacters]);

  return (
    <section className="hero section-shell" id="home">
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />
      <div className="hero-content">
        <div className="hero-copy">
          <span className="availability">
            <i aria-hidden="true" />
            Disponible para nuevos retos
          </span>
          <p className="hero-eyebrow">Hola, soy</p>
          <h1>Leonardo Matías Condori Navarro</h1>
          <p className="hero-subtitle">Desarrollador Full Stack y Datos</p>
          <p className="typed-role" aria-live="polite">
            Soy <span>{roles[roleIndex].slice(0, visibleCharacters)}</span>
            <i aria-hidden="true" />
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#projects">
              Ver proyectos
              <ArrowRight size={19} aria-hidden="true" />
            </a>
            <a className="secondary-button" href="#contact">
              <Mail size={18} aria-hidden="true" />
              Hablemos
            </a>
          </div>

          {/* Solo se muestra el enlace que existe de verdad. */}
          <div className="social-links">
            <a href={contact.github} target="_blank" rel="noreferrer">
              <GitFork size={19} aria-hidden="true" />
              GitHub
            </a>
            {contact.linkedin ? (
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                <Link2 size={19} aria-hidden="true" />
                LinkedIn
              </a>
            ) : null}
          </div>
        </div>

        <div className="portrait-wrap" aria-label="Fotografía de Leonardo Matías Condori Navarro">
          <span className="portrait-orbit orbit-one" aria-hidden="true" />
          <span className="portrait-orbit orbit-two" aria-hidden="true" />
          <div className="portrait-frame">
            <img
              src="/images/ProfilGithub.jpg"
              alt="Leonardo Matías Condori Navarro"
              width="512"
              height="512"
              fetchPriority="high"
            />
          </div>
          <div className="portrait-badge">
            <Code2Icon />
            <span>
              En constante
              <strong>aprendizaje</strong>
            </span>
          </div>
        </div>
      </div>

      <a className="scroll-cue" href="#about" aria-label="Continuar hacia la sección Sobre mí">
        <ArrowDown size={22} />
      </a>
    </section>
  );
}

function Code2Icon() {
  return (
    <span className="code-icon" aria-hidden="true">
      {'</>'}
    </span>
  );
}
