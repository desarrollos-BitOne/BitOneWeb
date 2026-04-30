import { urlFor } from '../lib/sanity';
import './Marquee.css';

export default function Marquee({ clients }) {
  // Filtramos solo los clientes que tienen logo
  const displayClients = clients?.filter(c => c.logo) || [];
  
  // Triplicamos para asegurar que no haya huecos en la animación infinita
  const marqueeItems = [...displayClients, ...displayClients, ...displayClients];

  if (displayClients.length === 0) return null;

  return (
    <section className="marquee-section-v2">
      <div className="container">
        <p className="marquee-label">Empresas que impulsan su éxito con BitOne</p>
        <div className="marquee-viewport">
          <div className="marquee-track">
            {marqueeItems.map((proj, i) => (
              <div key={`${proj._id}-${i}`} className="marquee-item">
                <img 
                  src={urlFor(proj.logo).width(250).url()} 
                  alt={`Logo de ${proj.name}`} 
                  title={proj.name}
                  loading="lazy"
                  decoding="async"
                  width="150"
                  height="60"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
