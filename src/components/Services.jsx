import { urlFor } from '../lib/sanity';
import { Link } from 'react-router-dom';
import './Services.css';

export default function Services({ services }) {
  // Defensive check
  const displayServices = services || [];

  return (
    <section className="services-section-dark">
      <div className="container">
        <div className="section-header-center">
          <span className="section-tag">Nuestras Soluciones</span>
          <h2>Tecnología con <span className="gradient-text">Propósito</span></h2>
          <p>
            No solo escribimos código; realizamos un diagnóstico empresarial para
            garantizar que cada solución impulse tu rentabilidad.
          </p>
        </div>

        {/* Cambia la clase CSS para que sea más espacioso (3 columnas max) */}
        <div className="services-spacious-grid">
          {displayServices.map((ser) => (
            <div key={ser._id} className="service-card-glass large-card">
              <div className="service-card-visual">
                {ser.icon?.asset && (
                  <img
                    src={urlFor(ser.icon).width(800).url()}
                    alt={ser.title}
                    className="service-visual-img"
                  />
                )}
              </div>

              <div className="service-card-content">
                <h3>{ser.title}</h3>
                {ser.subtitle && <h4 className="service-subtitle">{ser.subtitle}</h4>}
                <p>{ser.summary}</p>

                {ser.actionUrl?.startsWith('/') ? (
                  <Link to={ser.actionUrl} className="service-link-btn">Saber más &rarr;</Link>
                ) : (
                  <a href={ser.actionUrl || "mailto:atencionclientes@bit-one.net"} className="service-link-btn" target="_blank" rel="noopener noreferrer">Saber más &rarr;</a>
                )}
              </div>
              <div className="card-glow-effect"></div>
            </div>
          ))}
        </div>

        <div className="services-footer-cta">
          <Link to="/servicios" className="btn-secondary">Ver todas las soluciones</Link>
        </div>
      </div>
    </section>
  );
}
