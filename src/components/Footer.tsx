import { ArrowUp, GitFork, Link2 } from 'lucide-react';

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
        <p>© {new Date().getFullYear()} Leonardo Matías Condori Navarro.</p>
        <div className="footer-links">
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitFork size={19} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Link2 size={19} />
          </a>
          <a href="#home" aria-label="Volver al inicio">
            <ArrowUp size={19} />
          </a>
        </div>
      </div>
    </footer>
  );
}
