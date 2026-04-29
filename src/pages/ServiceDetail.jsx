import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '../components/PortableTextCustom';
import Seo from '../components/Seo';
import Cta from '../components/Cta';
import './ServiceDetail.css';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const query = `*[_type == "service" && slug.current == $slug][0]`;
    client.fetch(query, { slug })
      .then(setService)
      .catch(console.error);
  }, [slug]);

  if (!service) {
    return (
      <div className="loading-container" style={{ padding: '10rem 0', textAlign: 'center' }}>
        <div className="live-dot-pulse"></div> Cargando servicio...
      </div>
    );
  }

  return (
    <article className="service-detail-page">
      <Seo 
        title={`${service.title} - Servicios Digitales`} 
        description={service.summary}
        image={service.icon ? urlFor(service.icon).width(1200).url() : null}
        url={`/servicios/${slug}`}
      />

      <header className="service-hero-premium">
        <div className="container service-hero-content">
          <Link to="/servicios" className="back-to-services">← Todos los servicios</Link>
          
          {service.icon && (
            <div className="service-icon-detail">
              <img src={urlFor(service.icon).url()} alt={service.title} />
            </div>
          )}
          
          <h1 className="service-main-title">{service.title}</h1>
          <p className="service-subtitle-large">{service.subtitle}</p>
        </div>
      </header>

      <div className="service-body-content container">
        <div className="service-content-layout">
          
          <div className="service-rich-text">
            {service.description ? (
              <PortableText value={service.description} components={portableTextComponents} />
            ) : (
              <p>{service.summary}</p>
            )}
          </div>

          <aside className="service-sidebar">
            <div className="service-sticky-card">
              <h3>Impulsa tu Negocio</h3>
              <p>Nuestros expertos en {service.title} están listos para analizar tus procesos y proponer la mejor solución técnica.</p>
              
              <a href="https://wa.me/526681963932?text=Hola,%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20servicio%20de%20${service.title}." target="_blank" rel="noopener noreferrer" className="btn-service-contact">
                Solicitar Consultoría
              </a>
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
