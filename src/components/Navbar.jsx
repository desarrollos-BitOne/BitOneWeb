import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoHorizontal from '../assets/LogoHorizontalMonocromatico.png';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Efecto para detectar cuando el usuario hace scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`modern-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        
        {/* Logo con Imagen Oficial */}
        <Link to="/" className="nav-logo">
          <img 
            src={logoHorizontal} 
            alt="BitOne Agencia Digital" 
            className="navbar-brand-img"
          />
        </Link>

        {/* Enlaces de Navegación */}
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/como-trabajamos">Cómo Trabajamos</Link></li>
          <li><Link to="/servicios">Servicios</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>

        {/* Botón CTA Fijo a WhatsApp genérico (o mail) */}
        <a 
          href="https://wa.me/526681963932?text=Hola,%20me%20gustaría%20cotizar%20un%20proyecto" 
          className="btn-primary nav-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cotizar
        </a>
      </div>
    </nav>
  );
}