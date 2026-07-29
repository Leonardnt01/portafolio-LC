import { ArrowUp, GitFork, Link2 } from 'lucide-react';
import { contact } from '../data/portfolio';

export default function Footer() {
  return (
    <footer>
      <div className="section-shell footer-content">
        <div>
          <a className="brand" href="#home">
            LMCN
          </a>
          <p>Diseño, datos y desarrollo con intención.</p>
        </div>
        <p>© {new Date().getFullYear()} {contact.name}.</p>
        <div className="footer-links">
          <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitFork size={19} />
          </a>
          {contact.linkedin ? (
            <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Link2 size={19} />
            </a>
          ) : null}
          <a href="#home" aria-label="Volver al inicio">
            <ArrowUp size={19} />
          </a>
        </div>
      </div>
    </footer>
  );
}
