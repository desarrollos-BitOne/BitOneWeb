import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '../components/PortableTextCustom';
import Seo from '../components/Seo';
import Cta from '../components/Cta';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const query = `*[_type == "project" && slug.current == $slug][0] {
      ...,
      "name": client->name,
      "logo": client->logo,
      "cat": client->category->title
    }`;
    client.fetch(query, { slug })
      .then(setProject)
      .catch(console.error);
  }, [slug]);

  if (!project) {
    return (
      <div className="loading-container" style={{ padding: '10rem 0', textAlign: 'center' }}>
        <div className="live-dot-pulse"></div> Cargando proyecto...
      </div>
    );
  }

  const parsedDate = project.date ? new Date(project.date) : null;
  const displayDate = parsedDate ? 
    parsedDate.toLocaleDateString('es-MX', { year: 'numeric', month: 'long' }) 
    : '';

  return (
    <article className="project-detail-page">
      <Seo 
        title={`${project.title} | ${project.name}`} 
        description={project.workDescription}
        image={project.image ? urlFor(project.image).width(1200).url() : null}
        url={`/proyectos/${slug}`}
      />

      <header className="project-hero-premium">
        <div className="hero-background-overlay" style={{ background: 'linear-gradient(to top, var(--color-bg) 0%, transparent 100%)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}></div>
        {project.image && (
          <img 
            src={urlFor(project.image).width(1920).url()} 
            alt={project.title} 
            className="project-hero-img" 
          />
        )}
        
        <div className="project-hero-content container">
          <Link to="/proyectos" className="back-to-projects">← Ver todos los casos</Link>
          
          <div className="project-meta-premium">
             <span className="project-cat-tag">{project.cat || 'Software Corporativo'}</span>
             {displayDate && <span className="project-date-large">{displayDate}</span>}
          </div>
          
          <h1 className="project-main-title">{project.title || 'Proyecto BitOne'}</h1>
          <p className="project-client-subtitle">Caso de éxito: <strong>{project.name || 'Cliente por definir'}</strong></p>
        </div>
      </header>

      <div className="project-body-editorial container">
        <div className="project-layout-grid">
          
          <div className="editorial-content">
            {project.content ? (
              <PortableText value={project.content} components={portableTextComponents} />
            ) : (
              <div className="project-fallback-view">
                <h2 className="fallback-title">Visión General</h2>
                <p className="fallback-text">{project.longDescription || project.workDescription}</p>
                
                <div className="status-badge-minimal">
                  <span className="live-dot-pulse"></span>
                  Documentación completa en proceso
                </div>
              </div>
            )}
          </div>

          <aside className="project-sidebar">
            <div className="sidebar-sticky-box">
              <div className="client-info-widget">
                {project.logo && (
                   <img src={urlFor(project.logo).height(100).url()} alt={project.name} className="client-logo-detail" />
                )}
                <h3>Sobre el Proyecto</h3>
                <p>{project.workDescription}</p>
                
                <a href="https://wa.me/526681963932?text=Hola,%20me%20interes%C3%B3%20el%20caso%20de%20éxito%20de%20${project.name}.%20Quisiera%20cotizar%20algo%20similar." target="_blank" rel="noopener noreferrer" className="sidebar-btn-contact">
                  Cotizar Proyecto Similar
                </a>
              </div>
            </div>
          </aside>
          
        </div>
      </div>

      <Cta 
        title="¿Listo para digitalizar tu empresa?"
        description="Construyamos juntos el software que tu negocio necesita para escalar."
        buttonText="Hablar con un Experto"
        pageName="Detalle Proyecto"
      />
    </article>
  );
}
