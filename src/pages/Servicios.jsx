import React, { useState, useEffect, useLayoutEffect } from 'react';
import { client, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Cta from '../components/Cta';
import { trackEvent } from '../components/Analytics';
import './Servicios.css';

let memoryCache = {
  services: null,
  scrollPos: 0
};

export default function Servicios() {
  const [services, setServices] = useState(memoryCache.services || []);

  useEffect(() => {
    // Si ya tenemos los datos, evitamos peticiones innecesarias
    if (memoryCache.services) return;

    // Consulta los servicios ordenados por fecha de creación ascendente (automáticamente)
    client.fetch(`*[_type == "service"] | order(_createdAt asc){
      _id,
      title,
      subtitle,
      "slug": slug.current,
      summaryList,
      summaryHome,
      icon
    }`)
      .then((data) => {
        setServices(data);
        memoryCache.services = data;
      })
      .catch(console.error);
  }, []);

  // Restauración síncrona antes de pintar
  useLayoutEffect(() => {
    if (memoryCache.scrollPos > 0) {
      window.scrollTo({ top: memoryCache.scrollPos, behavior: 'instant' });
    }
  }, []);

  // Guardar posición continuamente mientras scrolleamos
  useEffect(() => {
    let timeoutId = null;
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        memoryCache.scrollPos = window.scrollY;
      }, 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="services-page">
      <Seo
        title="Desarrollo de Apps, E-commerce y Sistemas ERP"
        description="Ingeniería de software adaptada a pymes. Desde páginas web corporativas hasta sistemas de control logístico e integraciones de bases de datos avanzadas en Sinaloa."
        url="/servicios"
      />

      {/* PREMIUM HERO */}
      <section className="service-hero-premium hero-section-premium">
        <div className="container relative-z text-center">
          <div className="hero-badge-glass">
            <span className="live-dot-pulse"></span> Nuestros Servicios
          </div>
          <h1 className="display-title-premium" autoFocus>
            Ingeniería de <span className="gradient-text">Impacto</span>
          </h1>
          <p className="hero-subtitle-centered">
            Globalizamos tecnología para ofrecerte resultados, no solo código. Transformamos procesos complejos en experiencias digitales simples y potentes.
          </p>
        </div>
      </section>

      {/* ZIGZAG SERVICES LIST */}
      <section className="services-list-zigzag">
        <div className="container">
          {services.map((service, index) => (
            <div key={service._id} className={`zigzag-item ${index % 2 === 0 ? 'row' : 'row-reverse'}`}>

              <div className="zigzag-visual">
                {/* El número ahora vive aquí, detrás de la imagen */}
                <div className="watermark-number">0{index + 1}</div>
                <div className="icon-glow-bg"></div>
                {service.icon?.asset && (
                  <div className="icon-main-wrapper">
                    <img
                      src={urlFor(service.icon).width(1200).url()}
                      alt={service.title}
                    />
                  </div>
                )}
              </div>

              <div className="zigzag-text">
                <h2>{service.title}</h2>
                {service.subtitle && <p className="service-subtitle-premium">{service.subtitle}</p>}

                <div className="service-rich-text">
                  <p>{service.summaryList || service.summaryHome}</p>
                </div>

                <Link
                  to={`/servicios/${service.slug}`}
                  className="btn-primary"
                  onClick={() => trackEvent('Services', 'Click', service.title)}
                >
                  Saber más
                </Link>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* GLOBAL CTA */}
      <Cta
        title="¿Listo para escalar?"
        description="No construimos sitios web, construimos herramientas de crecimiento. Agenda una consultoría técnica gratuita hoy mismo."
        buttonText="Iniciar Proyecto"
        pageName="Servicios"
      />
    </div>


  );
}
