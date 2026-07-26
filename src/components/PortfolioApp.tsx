import { useEffect } from 'react';
import About from './About';
import Blog from './Blog';
import Contact from './Contact';
import Footer from './Footer';
import GithubActivity from './GithubActivity';
import Hero from './Hero';
import Navigation from './Navigation';
import Projects from './Projects';
import TechStack from './TechStack';

export default function PortfolioApp() {
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
        <Projects />
        <TechStack />
        <GithubActivity />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
