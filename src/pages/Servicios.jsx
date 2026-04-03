import { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import './Servicios.css';

export default function Servicios() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Consulta los servicios ordenados por fecha de creación ascendente (automáticamente)
    client.fetch(`*[_type == "service"] | order(_createdAt asc)`)
      .then(setServices)
      .catch(console.error);
  }, []);

  return (
    <div className="services-page">
      <Seo 
        title="Desarrollo de Apps, E-commerce y Sistemas ERP" 
        description="Ingeniería de software adaptada a pymes. Desde páginas web corporativas hasta sistemas de control logístico e integraciones de bases de datos avanzadas en Sinaloa."
        url="/servicios"
      />
      <section className="services-hero">
        <div className="container">
          <h1 className="gradient-text">Soluciones que impulsan tu Negocio</h1>
          <p>Globalizamos tecnología para ofrecerte resultados, no solo código.</p>
        </div>
      </section>

      <section className="services-list-zigzag">
        <div className="container">
          {services.map((service, index) => (
            <div key={service._id} className={`zigzag-item ${index % 2 === 0 ? 'row' : 'row-reverse'}`}>
              
              <div className="zigzag-visual">
                {service.icon?.asset && (
                  <div className="icon-main-wrapper">
                    <img 
                      src={urlFor(service.icon).width(600).url()} 
                      alt={service.title} 
                    />
                  </div>
                )}
              </div>
              
              <div className="zigzag-text">
                <span className="service-number">0{index + 1}</span>
                <h2>{service.title}</h2>
                <p className="service-summary-bold">{service.summary}</p>
                
                <div className="service-rich-text">
                  {service.description && <PortableText value={service.description} />}
                </div>
                
                {service.actionUrl?.startsWith('/') ? (
                  <Link to={service.actionUrl} className="btn-primary">
                    Saber más
                  </Link>
                ) : (
                  <a href={service.actionUrl || "mailto:atencionclientes@bit-one.net"} className="btn-primary" target="_blank" rel="noopener noreferrer">
                    Saber más
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
}