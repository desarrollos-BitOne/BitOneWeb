import { urlFor } from '../lib/sanity';
import './Marquee.css';

export default function Marquee({ projects }) {
  // Filtramos solo los proyectos que tienen logo
  const displayProjects = projects?.filter(p => p.logo) || [];
  
  // Triplicamos para asegurar que no haya huecos en la animación infinita
  const marqueeItems = [...displayProjects, ...displayProjects, ...displayProjects];

  if (displayProjects.length === 0) return null;

  return (
    <section className="marquee-section-v2">
      <div className="container">
        <p className="marquee-label">Empresas que impulsan su éxito con BitOne</p>
        <div className="marquee-viewport">
          <div className="marquee-track">
            {marqueeItems.map((proj, i) => (
              <div key={`${proj._id}-${i}`} className="marquee-item">
                <img 
                  src={urlFor(proj.logo).width(600).url()} 
                  alt={`Logo de ${proj.name}`} 
                  title={proj.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
