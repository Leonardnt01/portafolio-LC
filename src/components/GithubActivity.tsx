import { ExternalLink, GitFork, GitPullRequest, Star } from 'lucide-react';
import SectionHeading from './SectionHeading';

const contributionLevels = Array.from({ length: 84 }, (_, index) => {
  const value = (index * 7 + index * index * 3) % 11;
  return value < 4 ? 0 : value < 7 ? 1 : value < 9 ? 2 : 3;
});

export default function GithubActivity() {
  return (
    <section className="github-section reveal-section" id="github">
      <div className="section-shell">
        <SectionHeading
          title="Actividad en GitHub"
          description="Código, experimentos y proyectos que documentan mi aprendizaje continuo."
          align="center"
        />

        <div className="github-layout">
          <aside className="github-profile">
            <img src="/images/portfolio-01.jpg" alt="Avatar de Leonardo Condori" loading="lazy" />
            <h3>leomcondori</h3>
            <p>Software Engineer & Data Enthusiast</p>
            <div className="github-stats">
              <span>
                <strong>24</strong>
                Repos
              </span>
              <span>
                <strong>1.2k</strong>
                Stars
              </span>
            </div>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              Ver perfil
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </aside>

          <div className="github-dashboard">
            <div className="dashboard-title">
              <div>
                <span>Contribuciones</span>
                <strong>Trabajo constante, paso a paso</strong>
              </div>
              <GitPullRequest size={23} aria-hidden="true" />
            </div>

            <div className="heatmap-scroll" aria-label="Visualización decorativa de contribuciones">
              <div className="heatmap">
                {contributionLevels.map((level, index) => (
                  <i className={`level-${level}`} key={`${index}-${level}`} />
                ))}
              </div>
            </div>

            <div className="repository-list">
              <article>
                <span className="repo-icon">
                  <GitFork size={18} aria-hidden="true" />
                </span>
                <div>
                  <strong>Portfolio-Website</strong>
                  <small>Astro, React y Tailwind CSS</small>
                </div>
                <span className="repo-stat">
                  <Star size={14} aria-hidden="true" /> 18
                </span>
              </article>
              <article>
                <span className="repo-icon secondary">
                  <GitFork size={18} aria-hidden="true" />
                </span>
                <div>
                  <strong>Data-Analysis-Engine</strong>
                  <small>Motor de procesamiento con Python</small>
                </div>
                <span className="repo-stat">
                  <Star size={14} aria-hidden="true" /> 12
                </span>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
