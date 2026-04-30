import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '../components/PortableTextCustom';
import Seo from '../components/Seo';
import Cta from '../components/Cta';
import LoadingScreen from '../components/LoadingScreen';
import './ServiceDetail.css';

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    const query = `*[_type == "service" && slug.current == $slug][0]`;
    client.fetch(query, { slug })
      .then(setService)
      .catch(console.error);
  }, [slug]);

  if (!service) {
    return <LoadingScreen message="Personalizando servicio..." />;
  }

  return (
    <article className="service-detail-page fade-in">
      <Seo 
        title={`${service.title} - Servicios Digitales`} 
        description={service.summary}
        image={service.icon ? urlFor(service.icon).width(1200).url() : null}
        url={`/servicios/${slug}`}
      />

      <header className="post-hero-premium">
        <div className="hero-background-overlay"></div>
        {service.image && (
          <img 
            src={urlFor(service.image).width(1920).url()} 
            alt={service.title} 
            className="post-hero-img" 
          />
        )}
        
        <div className="post-hero-content container">
          <button onClick={() => navigate(-1)} className="back-to-blog" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            ← Todos los servicios
          </button>
          
          <div className="post-tags-flex">
            <span className="post-cat-tag">Solución BitOne</span>
          </div>
          
          <h1 className="post-main-title">{service.title}</h1>
          <p className="service-subtitle-large">{service.subtitle}</p>
        </div>
      </header>

      <div className="post-body-editorial container">
        <div className="post-layout-grid">
          
          <div className="editorial-content">
            {service.content ? (
              <PortableText value={service.content} components={portableTextComponents} />
            ) : (
              <div className="project-fallback-view">
                <h2 className="fallback-title">Visión General</h2>
                <p className="fallback-text">{service.summary}</p>
                <div className="status-badge-minimal">
                  <span className="live-dot-pulse"></span>
                  Documentación completa en proceso
                </div>
              </div>
            )}
          </div>

          <aside className="blog-sidebar">
            <div className="sidebar-sticky-box">
              <div className="sidebar-cta-widget">
                <h3>Impulsa tu Negocio</h3>
                <p>Nuestros expertos en {service.title} están listos para analizar tus procesos y proponer la mejor solución técnica.</p>
                
                <a href={`https://wa.me/526681963932?text=Hola,%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20servicio%20de%20${service.title}.`} target="_blank" rel="noopener noreferrer" className="sidebar-btn-cyber">
                  Solicitar Consultoría
                </a>
              </div>
            </div>
          </aside>
          
        </div>
      </div>

      <Cta 
        title="¿Tienes un proyecto en mente?"
        description="Agenda una llamada de 15 minutos para descubrir cómo podemos ayudarte a digitalizar tu empresa."
        buttonText="Agendar Llamada"
        pageName="Detalle Servicio"
      />
    </article>
  );
}
