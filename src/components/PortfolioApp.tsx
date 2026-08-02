import { useEffect } from 'react';
import About from './About';
import Contact from './Contact';
import Education from './Education';
import Footer from './Footer';
import GithubActivity from './GithubActivity';
import Hero from './Hero';
import Navigation from './Navigation';
import Projects from './Projects';
import TechStack from './TechStack';
import type { GithubProfile } from '../lib/github';

interface PortfolioAppProps {
  /** Resuelto en build time desde el frontmatter de Astro. */
  githubProfile: GithubProfile | null;
}

export default function PortfolioApp({ githubProfile }: PortfolioAppProps) {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.reveal-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Education />
        <Projects />
        <TechStack />
        <GithubActivity profile={githubProfile} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
