import { Link } from 'react-router-dom';
import './CtaFooter.css';

export default function CtaFooter() {
  return (
    <section className="cta-footer-section">
      <div className="cta-glow-bg"></div>
      <div className="container cta-flex">
        <div className="cta-content-side">
          <h2>No te quedes rezagado en el <span className="gradient-text">pasado digital</span></h2>
          <p>
            Ya conoces a BitOne. Es hora de llevar tus procesos al siguiente nivel con software limpio, moderno y accesible.
          </p>
        </div>
        <div className="cta-action-side">
          <a href="https://wa.me/526681963932?text=Hola,%20me%20interesa%20iniciar%20un%20análisis%20gratuito" className="btn-primary lg" target="_blank" rel="noopener noreferrer">Iniciar un Análisis Gratuito</a>
        </div>
      </div>
    </section>
  );
}
