import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import logoHorizontal from '../assets/LogoHorizontalMonocromatico.png';
import { trackEvent } from './Analytics';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="modern-footer">
      {/* CONTENIDO PRINCIPAL DEL FOOTER */}
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img 
              src={logoHorizontal} 
              alt="BitOne Agencia Digital" 
              className="footer-brand-img"
              width="150"
              height="38"
              loading="lazy"
            />
          </Link>
          <p className="footer-description">
            Transformación digital basada en análisis para pymes y emprendedores.
          </p>
        </div>

        <div className="footer-links">
          <h3>Empresa</h3>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/nosotros">El Equipo</Link></li>
            <li><Link to="/como-trabajamos">Metodología</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Soluciones</h3>
          <ul>
            <li><Link to="/servicios">Servicios Digitales</Link></li>
            <li><Link to="/proyectos">Proyectos y Casos</Link></li>
            <li><Link to="/blog">Blog Tech</Link></li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Conecta con nosotros</h3>
          <div className="social-links">
            <a 
              href="https://www.facebook.com/share/18GBcUvQqF/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-btn" 
              aria-label="Seguir en Facebook"
              title="Facebook"
              onClick={() => trackEvent('Footer', 'Social Click', 'Facebook')}
            >
              <FaFacebook size={20} />
            </a>
            <a 
              href="https://www.instagram.com/bitone.mx?utm_source=qr&igsh=dGRjdWxwajgzaGdp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-btn" 
              aria-label="Seguir en Instagram"
              title="Instagram"
              onClick={() => trackEvent('Footer', 'Social Click', 'Instagram')}
            >
              <FaInstagram size={20} />
            </a>
            <a 
              href="https://wa.me/526681963932?text=Hola,%20me%20gustaría%20saber%20más%20sobre%20sus%20servicios" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-btn" 
              aria-label="Contactar por WhatsApp"
              title="WhatsApp"
              onClick={() => trackEvent('Footer', 'Social Click', 'WhatsApp')}
            >
              <FaWhatsapp size={20} />
            </a>
            <a 
              href="mailto:atencionclientes@bit-one.net" 
              className="social-icon-btn" 
              aria-label="Enviar correo electrónico"
              title="Correo"
              onClick={() => trackEvent('Footer', 'Social Click', 'Email')}
            >
              <FaEnvelope size={20} />
            </a>
          </div>
          <p className="footer-location">Los Mochis, Sinaloa</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} BitOne. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
