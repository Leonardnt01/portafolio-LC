import { ExternalLink, GitFork, Star } from 'lucide-react';
import { contact } from '../data/portfolio';
import type { GithubProfile } from '../lib/github';
import SectionHeading from './SectionHeading';

interface GithubActivityProps {
  profile: GithubProfile | null;
}
   
 
const dateFormatter = new Intl.DateTimeFormat('es-PE', { month: 'short', year: 'numeric' });

export default function GithubActivity({ profile }: GithubActivityProps) {
  // Sin datos reales no se renderiza nada: mejor ausencia que cifras inventadas.
  if (!profile) return null;

  return (
    <section className="github-section reveal-section" id="github">
      <div className="section-shell">
        <SectionHeading
          kicker="Código abierto"
          title="Actividad en GitHub"
          description="Código, experimentos y proyectos que documentan mi aprendizaje continuo."
          align="center"
        />

        <div className="github-layout">
          <aside className="github-profile glass-card">
            <img
              src={profile.avatarUrl}
              alt={`Avatar de ${profile.name}`}
              width="512"
              height="512"
              loading="lazy"
            />
            <h3>{profile.login}</h3>
            {profile.bio ? <p>{profile.bio}</p> : null}
            <div className="github-stats">
              <span>
                <strong>{profile.publicRepos}</strong>
                Repos
              </span>
              {profile.languages[0] ? (
                <span>
                  <strong>{profile.languages[0].name}</strong>
                  Principal
                </span>
              ) : null}
            </div>
            <a href={profile.url} target="_blank" rel="noreferrer">
              Ver perfil
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </aside>

          <div className="github-dashboard glass-card">
            <div className="dashboard-title">
              <div>
                <span>Lenguajes</span>
                <strong>En qué escribo el código</strong>
              </div>
              <Star size={23} aria-hidden="true" />
            </div>

            {/*
              GitHub no expone el heatmap de contribuciones en su API publica,
              asi que mostramos el reparto de lenguajes, que si es calculable.
            */}
            <ul className="language-bars">
              {profile.languages.map((language) => (
                <li key={language.name}>
                  <div className="language-bar-head">
                    <span>{language.name}</span>
                    <small>{language.share}%</small>
                  </div>
                  <div
                    className="language-bar-track"
                    role="img"
                    aria-label={`${language.name}: ${language.share}% de los repositorios`}
                  >
                    <span style={{ width: `${language.share}%` }} />
                  </div>
                </li>
              ))}
            </ul>

            <div className="repository-list">
              {profile.repos.map((repo) => (
                <a href={repo.url} key={repo.name} rel="noreferrer" target="_blank">
                  <span className="repo-icon">
                    <GitFork size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <strong>{repo.name}</strong>
                    <small>{repo.description ?? repo.language ?? 'Sin descripción'}</small>
                  </div>
                  <span className="repo-stat">
                    {dateFormatter.format(new Date(repo.pushedAt))}
                  </span>
                </a>
              ))}
            </div>

            <p className="github-footnote">
              Datos obtenidos de la API pública de GitHub en cada despliegue ·{' '}
              <a href={contact.github} rel="noreferrer" target="_blank">
                @{contact.githubUser}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
