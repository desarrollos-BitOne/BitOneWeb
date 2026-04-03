import { urlFor } from '../lib/sanity';
import { Link } from 'react-router-dom';
import './Testimonials.css';

export default function Testimonials({ testimonials }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header-center">
          <span className="section-tag">LO QUE DICEN DE NOSOTROS</span>
          <h2>Historias de <span className="gradient-text">Éxito</span></h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((test, idx) => (
            <div key={test._id || idx} className="testimonial-card">
              <div className="quote-icon">“</div>
              <p className="testimonial-quote">"{test.quote}"</p>
              
              <div className="testimonial-author-box">
                {/* Logo de la empresa si existe, sino, un avatar */}
                {test.project?.logo ? (
                  <img 
                    src={urlFor(test.project.logo).width(100).url()} 
                    alt={test.project.name} 
                    className="author-avatar-img"
                  />
                ) : (
                  <div className="author-avatar">{test.authorName?.charAt(0).toUpperCase() || 'B'}</div>
                )}
                
                <div className="author-info">
                  <h4 className="author-name">{test.authorName}</h4>
                  <span className="author-role">{test.authorRole}</span>
                  <span className="author-company">{test.project?.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-footer-cta" style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
          <Link to="/proyectos" className="btn-secondary">Explorar Todos los Casos de Éxito</Link>
        </div>
      </div>
    </section>
  );
}
