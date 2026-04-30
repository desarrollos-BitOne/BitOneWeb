import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '../components/PortableTextCustom';
import Seo from '../components/Seo';
import Cta from '../components/Cta';
import LoadingScreen from '../components/LoadingScreen';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
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
    return <LoadingScreen message="Configurando proyecto..." />;
  }

  const parsedDate = project.date ? new Date(project.date) : null;
  const displayDate = parsedDate ? 
    parsedDate.toLocaleDateString('es-MX', { year: 'numeric', month: 'long' }) 
    : '';

  return (
    <article className="project-detail-page fade-in">
      <Seo 
        title={`${project.title} | ${project.name}`} 
        description={project.workDescription}
        image={project.image ? urlFor(project.image).width(1200).url() : null}
        url={`/proyectos/${slug}`}
      />

      <header className="post-hero-premium">
        <div className="hero-background-overlay"></div>
        {project.image && (
          <img 
            src={urlFor(project.image).width(1920).url()} 
            alt={project.title} 
            className="post-hero-img" 
          />
        )}
        
        <div className="post-hero-content container">
          <button onClick={() => navigate(-1)} className="back-to-blog" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            ← Ver todos los casos
          </button>
          
          <div className="post-tags-flex">
             <span className="post-cat-tag">{project.cat || 'Software Corporativo'}</span>
          </div>
          
          <h1 className="post-main-title">{project.title || 'Proyecto BitOne'}</h1>
          
          <div className="post-meta-premium">
             <span className="post-date-large">{displayDate}</span>
             <span className="meta-divider">•</span>
             <span className="post-author-name">Caso de éxito: <strong>{project.name}</strong></span>
          </div>
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
                
                <a href={`https://wa.me/526681963932?text=Hola,%20me%20interes%C3%B3%20el%20caso%20de%20éxito%20de%20${project.name}.%20Quisiera%20cotizar%20algo%20similar.`} target="_blank" rel="noopener noreferrer" className="sidebar-btn-contact">
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
