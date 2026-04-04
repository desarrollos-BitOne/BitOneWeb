import React from 'react';
import Seo from '../components/Seo';
import Cta from '../components/Cta';
import './Proceso.css';

export default function Proceso() {
  const steps = [
    {
      num: '01',
      title: 'Descubrimiento y Diagnóstico',
      desc: 'Escuchamos tus procesos actuales y detectamos los cuellos de botella (tareas manuales, Excels gigantes, o sistemas que ya no dan abasto). Entendemos tu dolor antes de tocar una línea de código.',
      icon: '🔍',
    },
    {
      num: '02',
      title: 'Consultoría Estratégica',
      desc: 'Diseñamos una hoja de ruta con sentido común. Trazamos la arquitectura digital evitando venderte sobreingeniería: siempre recomendando el camino más rápido a la rentabilidad.',
      icon: '🗺️',
    },
    {
      num: '03',
      title: 'Implementación Técnica',
      desc: 'Ejecutamos con pragmatismo. Desarrollamos software a medida desde cero para operaciones complejas, o implementamos/integramos plataformas ya existentes en el mercado para ser ágiles y no sobre-gastar.',
      icon: '⚙️',
    },
    {
      num: '04',
      title: 'Pruebas y Despliegue',
      desc: 'Antes de lanzar, pasamos la solución por rigurosas pruebas de seguridad y lógica. Te capacitamos a ti y a tu equipo para asegurar la adopción de las nuevas herramientas.',
      icon: '🚀',
    },
    {
      num: '05',
      title: 'Seguimiento y Crecimiento',
      desc: 'La digitalización no es de un día. Te acompañamos activamente post-lanzamiento para garantizar que la solución acompañe directamente tus métricas de crecimiento y escalabilidad comercial.',
      icon: '📈',
    }
  ];

  return (
    <div className="process-page-modern">
      <Seo 
        title="Metodología de Desarrollo Ágil" 
        description="Cero suposiciones, puro código. Conoce nuestro proceso en 4 fases para crear la infraestructura de tu startup o pyme, con entregas rápidas y código limpio."
        url="/como-trabajamos"
      />
      
      <section className="process-hero hero-section-premium">
        <div className="container relative-z text-center">
          <div className="hero-badge-glass process-badge">
            <span className="live-dot-pulse"></span> Metodología BitOne
          </div>
          <h1 className="display-title-premium">
            <span className="gradient-text">¿Cómo</span> Trabajamos?
          </h1>
          <p className="hero-subtitle centered">
            Nuestro proceso está diseñado proteger tu bolsillo de la "sobreingeniería". No creamos cosas complejas porque sí; aplicamos tecnología práctica con sentido de negocios.
          </p>
        </div>
      </section>

      <section className="timeline-section">
        <div className="container relative-z">
          <div className="timeline-wrapper">
            {steps.map((step, index) => (
              <div key={step.num} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                {/* Punto central del timeline */}
                <div className="timeline-node">
                  <span className="node-icon">{step.icon}</span>
                  <div className="node-glow"></div>
                </div>

                {/* Tarjeta de contenido */}
                <div className="timeline-card">
                  <div className="card-glass">
                    <div className="step-badge">Paso {step.num}</div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cta 
        title="¿Listo para iniciar el Paso 01?"
        description="Realiza hoy un diagnóstico técnico sin costo y descubre el potencial de digitalización de tu empresa."
        buttonText="Empezar Auditoría"
        pageName="Proceso"
      />
    </div>
  );
}

