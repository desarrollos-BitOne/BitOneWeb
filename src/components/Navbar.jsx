import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoHorizontal from '../assets/LogoHorizontalMonocromatico.png';
import { trackEvent } from './Analytics';
import { HiMenu, HiX } from 'react-icons/hi';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Efecto para detectar cuando el usuario hace scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/como-trabajamos', label: 'Cómo Trabajamos' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/proyectos', label: 'Proyectos' },
    { path: '/nosotros', label: 'Nosotros' },
    { path: '/blog', label: 'Blog' },
  ];

  return (
    <nav className={`modern-navbar ${scrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
      <div className="container nav-content">
        
        {/* Logo con Imagen Oficial */}
        <Link to="/" className="nav-logo">
          <img 
            src={logoHorizontal} 
            alt="BitOne Agencia Digital" 
            className="navbar-brand-img"
            width="180"
            height="45"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-links desktop-only">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path}
                onClick={() => {
                  if (location.pathname === link.path) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section: CTA & Hamburger */}
        <div className="nav-actions">
          <a 
            href="https://wa.me/526681963932?text=Hola,%20me%20gustaría%20cotizar%20un%20proyecto" 
            className="btn-primary nav-btn desktop-only"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('Navbar', 'WhatsApp Click', 'Cotizar')}
          >
            Cotizar
          </a>

          <button 
            className="mobile-toggle" 
            onClick={toggleMenu} 
            aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-overlay ${isOpen ? 'active' : ''}`}>
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  onClick={() => {
                    setIsOpen(false);
                    if (location.pathname === link.path) {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a 
                href="https://wa.me/526681963932?text=Hola,%20me%20gustaría%20cotizar%20un%20proyecto" 
                className="btn-primary mobile-cta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent('Navbar', 'WhatsApp Click', 'Cotizar-Mobile');
                  setIsOpen(false);
                }}
              >
                Cotizar Proyecto
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
