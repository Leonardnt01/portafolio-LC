import {
  BriefcaseBusiness,
  Clock3,
  Code2,
  Home,
  Menu,
  Send,
  UserRound,
  Wrench,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { navigation } from '../data/portfolio';

const navIcons = {
  home: Home,
  user: UserRound,
  timeline: Clock3,
  projects: Code2,
  tech: Wrench,
  contact: Send,
} as const;

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = navigation
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-35% 0px -55%', threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Ir al inicio">
          LMCN
        </a>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((item) => {
            const id = item.href.slice(1);
            return (
              <a className={activeSection === id ? 'active' : ''} href={item.href} key={item.href}>
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="header-actions">
          <a className="hire-button" href="#contact">
            <BriefcaseBusiness size={17} aria-hidden="true" />
            <span>Contáctame</span>
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <div className={`mobile-overlay ${isOpen ? 'open' : ''}`} onClick={closeMenu} aria-hidden="true" />
      <aside className={`mobile-panel ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        <div className="mobile-panel-heading">
          <div>
            <strong>LMCN</strong>
            <span>Software Engineer</span>
          </div>
          <button type="button" aria-label="Cerrar menú" onClick={closeMenu}>
            <X size={22} />
          </button>
        </div>
        <nav aria-label="Navegación móvil">
          {navigation.map((item) => {
            const Icon = navIcons[item.icon];
            const id = item.href.slice(1);
            return (
              <a
                className={activeSection === id ? 'active' : ''}
                href={item.href}
                key={item.href}
                onClick={closeMenu}
              >
                <Icon size={19} aria-hidden="true" />
                {item.label}
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
