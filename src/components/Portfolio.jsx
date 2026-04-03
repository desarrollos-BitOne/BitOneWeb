import { urlFor } from '../lib/sanity';
import { Link } from 'react-router-dom';
import './Portfolio.css';

export default function Portfolio({ projects }) {
  if (!projects || projects.length === 0) return null;

  // Mostramos máximo 3 en esta vista limitada (aunque desde API ya vengan limitados, por seguridad).
  const displayProjects = projects.slice(0, 3);

  // Función para formatear YYYY-MM-DD a DD/MM/YYYY
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  return (
    <section className="portfolio-section-dark">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">EVIDENCIA DE RESULTADOS</span>
          <h2>Software que impulsa <span className="gradient-text">Negocios Reales</span></h2>
        </div>

        <div className="projects-modern-grid">
          {displayProjects.map((proj) => (
            <div key={proj._id} className="modern-project-card">
              <div className="project-background">
                {proj.image && (
                  <img src={urlFor(proj.image).width(1000).url()} alt="" />
                )}
              </div>
              
              <div className="project-overlay">
                <div className="card-header">
                  <div className="client-identity">
                    <h3 className="client-name">{proj.name}</h3>
                    <span className="category-tag">{proj.cat || 'SOFTWARE'}</span>
                  </div>
                  {proj.date && (
                    <div className="project-date">
                      {formatDate(proj.date)}
                    </div>
                  )}
                </div>

                <div className="card-main-content">
                  <div className="client-logo-box">
                    {proj.logo ? (
                      <img src={urlFor(proj.logo).width(300).url()} alt={proj.name} />
                    ) : (
                      <span className="clean-logo-fallback">{proj.name.substring(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  
                  <div className="work-info">
                    <p className="work-description">
                      {proj.workDescription 
                        ? (proj.workDescription.length > 100 ? proj.workDescription.substring(0, 100) + '...' : proj.workDescription)
                        : "Desarrollo de solución tecnológica a medida."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="services-footer-cta" style={{ marginTop: '50px' }}>
          <Link to="/proyectos" className="btn-secondary">Ver todos los proyectos</Link>
        </div>
      </div>
    </section>
  );
}