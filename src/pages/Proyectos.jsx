import { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/sanity';
import Seo from '../components/Seo';
import './Proyectos.css';

export default function Proyectos() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Consulta todos los proyectos y encuentra el testimonio asociado (si lo hay)
    client.fetch(`*[_type == "project"] | order(date desc){
      _id,
      name,
      "cat": category->title,
      logo,
      image,
      workDescription,
      longDescription,
      date,
      "testimonial": *[_type == "testimonial" && references(^._id)][0] {
        quote,
        authorName,
        authorRole
      }
    }`).then(setProjects).catch(console.error);
  }, []);

  return (
    <div className="proyectos-page">
      <Seo 
        title="Portafolio y Casos de Éxito con Software" 
        description="Evidencia de resultados. Explora los sistemas y aplicaciones web que hemos construido para modernizar la estructura operativa de nuestros clientes."
        url="/proyectos"
      />
      <div className="container relative-z text-center" style={{ marginBottom: '80px' }}>
        <div className="hero-badge-glass process-badge">
           <span className="live-dot-pulse"></span> Impacto Real
        </div>
        <h1 className="display-title-premium" autoFocus>
          Casos de <span className="gradient-text">Éxito</span>
        </h1>
        <p className="hero-subtitle centered">
          No somos de hablar de nosotros mismos. Dejamos que los resultados técnicos y los testimonios de nuestros clientes hablen por nuestro trabajo.
        </p>
      </div>

      <div className="container">
        <div className="proyectos-showcase-list">
          {projects.map((proj, i) => {
            const parsedDate = proj.date ? new Date(proj.date) : null;
            const displayDate = parsedDate ? 
              `${String(parsedDate.getUTCDate()).padStart(2, '0')}/${String(parsedDate.getUTCMonth() + 1).padStart(2, '0')}/${parsedDate.getUTCFullYear()}` 
              : '';

            return (
              <div key={proj._id} className="proyecto-showcase-item">
                
                {/* Lado Principal del Proyecto (Screenshot & Datos) */}
                <div className="proyecto-main-side">
                  <div className="project-glow"></div>
                  
                  {/* Foto de Portada (Si hay) */}
                  {proj.image && (
                    <div className="proyecto-featured-image">
                       <img src={urlFor(proj.image).height(600).url()} alt={proj.name} />
                       {displayDate && <span className="proyecto-date-badge">{displayDate}</span>}
                    </div>
                  )}

                  <div className="proyecto-data-box">
                    <div className="proyecto-logo-flex">
                      {proj.logo ? (
                         <img src={urlFor(proj.logo).height(80).url()} alt={`${proj.name} logo`} className="p-logo" />
                      ) : (
                         <span className="company-text-fallback">{proj.name}</span>
                      )}
                      <span className="category-tag">{proj.cat || 'Software Corporativo'}</span>
                    </div>

                    <div className="work-desc-box">
                      <span className="work-desc-tag">Solución Implementada</span>
                      <p className="work-desc">{proj.longDescription || proj.workDescription}</p>
                    </div>
                  </div>
                </div>

                {/* Si hay un testimonio asociado, lo mostramos como panel sobrepuesto */}
                {proj.testimonial ? (
                  <div className="quote-side">
                    <div className="quote-card-premium">
                      <div className="quote-mark-large">“</div>
                      <p className="quote-text-premium">"{proj.testimonial.quote}"</p>
                      
                      <div className="author-premium-bar">
                        <div className="author-avatar-proxy">
                           {proj.testimonial.authorName?.charAt(0).toUpperCase() || 'B'}
                        </div>
                        <div className="author-data">
                          <span className="person-name-premium">{proj.testimonial.authorName}</span>
                          <span className="person-role-premium">{proj.testimonial.authorRole}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                   /* Filler div to balance flex if no testimonial */
                   <div style={{ flex: 0 }} />
                )}
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
